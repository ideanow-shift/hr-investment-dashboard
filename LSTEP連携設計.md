# NOV Talent LSTEP連携設計

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

### 3. LINEメッセージ履歴

追加候補テーブル:

- `talent_line_messages`

主な役割:

- 送受信メッセージの最低限の履歴を保存する
- 見学前リマインド、面接前リマインド、内定後フォローなどの接点を確認できるようにする

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

## 次の実装順

1. Core DB側へ `supabase/talent_lstep_integration_review.sql` を共有する
2. OK後、Supabase SQL EditorへDDLを投入する
3. GASにLSTEP同期用の読み書き関数を追加する
4. ダッシュボードに「LSTEP連携状況」表示を追加する
5. 手動CSV同期またはGAS定期同期を実装する
6. LSTEP側のAPI/Webhook可否を確認し、自動同期方式を決める

## 現時点の結論

NOV TalentはLSTEP同期を見据えた方向に進んでいる。

ただし、現時点では `line_status` のみで、LSTEP/LINEユーザーIDとの正式な紐付けテーブルは未作成。次の段階で `talent_line_accounts` を中心に受け皿を作ることで、LSTEPとの同期に進める。
