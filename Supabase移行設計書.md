# NOV Talent Supabase移行設計書

## 目的

NOV Talentのデータ管理をGoogleスプレッドシート + GASからSupabaseへ段階移行し、IDEA NOV OS / Core DB と整合した人財投資管理システムとして運用できる状態にする。

目的は以下です。

- 学生データをDBで安全に管理する
- ダッシュボードからの追加・更新を安定させる
- 操作履歴、更新者、更新日時をDBで保持する
- Core DBの社員・店舗・法人マスタと接続する
- Lステップ連携に備える
- 将来的な認証、権限、分析拡張に耐える構造にする

## 移行方針

最終的にはSupabaseを正規DBとします。

ただし、既存GAS版はすぐ止めません。最初はGAS backendを中継してSupabaseへ接続し、スプレッドシート版とKPIを照合しながら段階移行します。

## Core DB前提

Supabase project: `idea-nov-core`

schema: `public`

人材投資管理システム側で、以下のマスタは新規作成しません。

- 社員マスタ: `employees`
- 店舗マスタ: `stores`
- 法人: `corporations`
- 部署: `departments`
- 役職: `positions`
- 権限: `roles` / `employee_roles`
- 異動・昇格・退職履歴: `employee_assignment_histories`
- 複数店舗所属: `employee_store_assignments`

参照方針:

- 社員の主キーは `employees.id`
- 社員番号は `employees.employee_id`
- 店舗の主キーは `stores.id`
- 部署は `departments.id`
- 役職は `positions.id`
- 店舗名・社員名・法人名は表示時にCore DBから取得する

## アプリ固有テーブル

### `talent_investment_settings`

年度ごとの目標値を管理する。

- 年度
- 法人ID: `corporation_id`
- 採用目標人数
- 接触人数目標
- 面接成約目標
- 採用予算
- 入社予定数

### `talent_schools`

学校マスタ。

Core DBに学校マスタはないため、NOV Talent固有テーブルとして保持する。

### `talent_fairs`

フェア実績。

費用、接触数、LINE登録数、見学取得数を保持する。

主担当者は `owner_employee_id` で `employees.id` を参照する。

### `talent_students`

学生個別データ。

27卒、28卒、サロン実習は `cohort` で区分する。

管理対象外は削除せず `management_status` で管理する。

希望店舗・見学店舗・配属予定店舗は、店舗名ではなく `stores.id` を参照する。

学校名・接点名は、移行初期の確認用として snapshot を保持できる。ただし正本は参照先テーブル。

### `talent_operation_logs`

学生追加、更新、管理対象外変更などの操作履歴。

操作した社員は `actor_employee_id` で `employees.id` を参照する。

### `talent_student_followups`

フォロータスク管理用。

学生ごとの次アクション、期日、担当者、対応状況を履歴として残す。

## 画面側の変更方針

現在:

```text
GitHub Pages -> GAS JSONP -> Googleスプレッドシート
```

Phase 1:

```text
GitHub Pages -> GAS backend -> Supabase -> PostgreSQL
```

将来:

```text
NOV HUBログイン文脈 -> API backend -> Supabase -> PostgreSQL
```

変更対象:

- `app.js` のデータ取得処理
- 学生追加処理
- 学生更新処理
- 操作履歴保存処理
- データ更新ボタン
- Core DB参照データの表示処理

## 認証方針

Phase 1では、既存のGitHub Pages画面からSupabaseへ直接書き込みません。

service_roleキーはGAS Script Propertiesにのみ保存します。フロントエンドには出しません。

将来的には `novHub.currentEmployee` を利用し、操作社員・権限・所属店舗をCore DBと接続します。

## RLS方針

RLSは全 `talent_` テーブルで有効化します。

Phase 1では、GAS backend + service_role 経由を基本とします。

設計方針:

- anon keyで直接書き込みできるポリシーは作らない
- service_roleはRLSをバイパスするため、GAS側で入力検証・操作ログ保存を必ず行う
- 本番の直接API化は、HUBログイン・社員権限・RLSポリシー設計後に行う

将来の権限候補:

- `hr_admin`: 全件読み書き
- `manager`: 閲覧のみ
- `executive`: 集計閲覧のみ

## Lステップ連携の拡張

今後、以下のテーブル追加を検討する。

- `talent_line_accounts`
- `talent_line_messages`
- `talent_line_events`

学生とLINE IDを紐づけることで、以下が可能になる。

- LINE登録状況の自動反映
- 見学リマインド
- 面接リマインド
- 内定後フォロー
- 返信状況の可視化

## 移行完了条件

- Supabaseに全学生データが入っている
- ダッシュボードのKPIが現行版と一致している
- 学生追加・更新がSupabaseに保存される
- 操作履歴がSupabaseに残る
- 管理対象外運用が機能する
- Core DBの社員・店舗・法人マスタ参照が機能する
- 総務人事部がダッシュボード操作で日常運用できる
