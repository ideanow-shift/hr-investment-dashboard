# NOV Talent LSTEP連携設計

## 2026-07-07 現行方針

LINE公式アカウント側の現行運用との兼ね合いにより、求人領域のLSTEP本接続は約2か月後まで保留する。

現時点では、API/Webhook/定期同期の実接続は進めない。進める範囲は以下に限定する。

- 未紐付け学生の確認
- CSV照合用テンプレートの整備
- 制作会社へ確認する項目の整理
- LSTEP再開時に必要な設計メモの保持

本接続を再開する際は、LSTEP制作会社から取得できるID・CSV/API仕様・LINE公式側の運用整理状況を確認し、Core DB番人レビュー後に実装を進める。

## 目的

NOV Talentの学生データを、将来的にLSTEP/LINEの接点データと同期できるようにする。

現在の正本はSupabaseの `talent_students`。LSTEP連携では、学生本人とLINE/LSTEP側ユーザーIDを安全に紐付け、LINE登録、ブロック、メッセージ、リマインドなどを学生管理に反映できる状態を目指す。

## 現在できていること

- 学生データはSupabase `talent_students` を正本として管理
- ダッシュボード上から学生追加・更新が可能
- HUBログイン情報とCore DB権限を使った保存制御が進行中
- 操作履歴は `talent_operation_logs` に保存
- LINE登録状態は `line_status` として学生データ側に保持

## LSTEP同期に必要な追加要素

### 1. 学生とLINE/LSTEP IDの紐付け

追加候補テーブル:

- `talent_line_accounts`

主な役割:

- `talent_students.id` と `line_user_id` を紐付ける
- `lstep_user_id` を保持する
- LINE友だち状態を保持する
- 最終同期日時を保持する

このテーブルができると、同じ学生に対してLINE登録状況やLSTEP側の接触履歴を紐付けられる。

### 2. LSTEPイベント履歴

追加候補テーブル:

- `talent_line_events`

主な役割:

- LSTEPから受け取ったイベントを保存する
- 友だち追加、ブロック、タグ変更、フォーム回答などのイベントを記録する
- 自動処理に失敗した場合も原因を残す
- 未紐付けイベントは `external_line_user_id` / `lstep_user_id` で一時保存する
- `line_account_id` と `student_id` が両方入る場合は、DB制約で同じ学生を指すことを保証する

### 3. LINEメッセージ履歴

追加候補テーブル:

- `talent_line_messages`

主な役割:

- 送受信メッセージの最低限の履歴を保存する
- 見学前リマインド、面接前リマインド、内定後フォローなどの接点を確認できるようにする
- 未紐付けメッセージは `external_line_user_id` / `lstep_user_id` で一時保存する
- `line_account_id` と `student_id` が両方入る場合は、DB制約で同じ学生を指すことを保証する

### 4. 同期実行ログ

追加候補テーブル:

- `talent_lstep_sync_runs`

主な役割:

- 手動同期、定期同期、Webhook同期の実行結果を残す
- 何件受信し、何件更新し、何件失敗したかを確認する

## 同期方式

### Phase 1: CSV/手動同期

LSTEPから出力したCSVをもとに、GASまたは管理者操作でSupabaseへ取り込む。

メリット:

- 実装リスクが低い
- LSTEP API仕様に左右されにくい
- 総務人事部の運用確認と並行しやすい

### Phase 2: GAS経由の定期同期

GASの時間主導トリガーでLSTEP側データを取り込み、Supabaseに反映する。

メリット:

- ダッシュボードのLINE登録・フォロー情報を定期的に更新できる
- フロントに秘密鍵を出さずに済む

### Phase 3: Webhook/API同期

LSTEPのWebhookまたはAPI連携が可能な場合、イベントをリアルタイムに受け取る。

メリット:

- LINE登録やブロックを即時反映できる
- 見学・面接リマインドの自動化につなげやすい

## セキュリティ方針

- LSTEP APIキーやトークンはフロントに出さない
- 秘密情報はGAS Script Properties、または将来的なサーバー/Edge Functionに保持する
- Supabaseへの書き込みはGAS backend + service_role経由を基本にする
- anon keyでLSTEP系テーブルに直接書き込ませない
- 操作・同期失敗はログに残す

## Core DB確認が必要な点

以下はCore DB側確認後に進める。

- `talent_line_accounts` などの新規テーブル追加
- `employees.id` を作成者・更新者・同期実行者として参照する設計
- HUBログイン社員の権限別にLSTEP同期ボタンを表示/非表示にする設計

## Core DBレビュー反映

条件付きOKの指摘を反映済み。

- `talent_line_events` / `talent_line_messages` に `external_line_user_id` / `lstep_user_id` を追加
- 未紐付けデータでも保存できるようにした
- `line_account_id` と `student_id` が両方入る場合、`talent_line_accounts(id, student_id)` への複合外部キーで食い違いを防ぐ
- `line_account_id` / `student_id` / `external_line_user_id` / `lstep_user_id` のいずれかは必須にした

## 次の実装順

1. Supabase SQL Editorへ `supabase/talent_lstep_integration_review.sql` を投入する
2. `supabase/talent_lstep_integration_verify.sql` でテーブル、RLS、service_role権限、制約を確認する
3. データ更新後、LSTEP連携状況が「LSTEP受け皿あり」になることを確認する
4. LSTEP未紐付けCSVと連携テンプレートを出力し、LSTEP側の友だち情報と照合する
5. CSV/手動同期で `talent_line_accounts` に紐付けデータを登録する
6. GAS定期同期またはLSTEP API/Webhook連携方式を決める
7. 同期実行ログと失敗時の再実行導線を整える

## 2026-07-02 現在の状態

NOV TalentはLSTEP同期を見据えた方向に進んでいる。

- Core DB側レビューは条件付きOKを反映済み
- ダッシュボードには「LSTEP連携状況」と「未紐付け学生を見る」「データ品質で確認」「未紐付けCSV」の導線を追加済み
- GASは `talent_line_accounts` / `talent_line_events` / `talent_line_messages` を読みに行く実装済み
- Supabase側にLSTEP系テーブルが未投入の場合、画面では「LSTEP連携テーブルは未作成または未同期」と表示する
- LSTEP系テーブル投入後は、データ更新で受け皿作成済みの表示に切り替わる想定
- 画面上の「連携テンプレート」から、LSTEP制作会社へ渡すCSV列案を出力できる
- 投入後確認用に `supabase/talent_lstep_integration_verify.sql` を追加済み

## 現時点の結論

現時点では学生正本 `talent_students` を中心に、LSTEP/LINEユーザーIDとの正式な紐付けテーブルを受け入れる準備まで完了。次の段階で `talent_line_accounts` を中心に受け皿を作ることで、LSTEPとの同期に進める。
## 2026-07-02 Core DB統合方針追記

LSTEP / LINE連携でも、社内担当者は `employees.id`、学生は `talent_students.id` を軸にする。

- LSTEP同期実行者、作成者、更新者、担当者を保存する場合は `employees.id` を参照する
- 学生との紐付けは `talent_students.id` を正本にする
- 店舗関連のLINE配信・見学案内・配属希望に関わる場合は `stores.id` を参照する
- LSTEP APIキー、service_role keyはGAS Script Properties等のbackend側のみで保持し、フロントへ出さない
- LSTEP関連DDLを追加・変更する場合は、SQL Editor投入前にOS/Core DB側レビューを通す
