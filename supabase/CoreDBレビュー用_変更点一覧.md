# NOV Talent Supabase schema Core DB対応レビュー

## 1. 修正版 schema.sql

修正版は以下です。

```text
supabase/schema.sql
```

まだSupabase SQL Editorには投入しません。
Core DB側で影響確認後に投入します。

## 2. 変更点一覧

| 変更前 | 変更後 | 理由 |
| --- | --- | --- |
| `app_settings` | `talent_investment_settings` | アプリ固有テーブルのため `talent_` prefixへ統一 |
| `schools` | `talent_schools` | 学校はCore DBにないため人材投資固有マスタ化 |
| `fairs` | `talent_fairs` | フェア実績は人材投資固有データ |
| `students` | `talent_students` | 学生データは人材投資固有データ |
| `operation_logs` | `talent_operation_logs` | 操作履歴は人材投資固有データ |
| `student_followups` | `talent_student_followups` | 学生フォロー履歴は人材投資固有データ |
| `set_updated_at()` | `talent_set_updated_at()` | Core DB側関数との衝突回避 |
| `owner text` | `owner_employee_id uuid` | 社員マスタはCore DB `employees.id` を参照 |
| `created_by text` | `created_by_employee_id uuid` | 作成者はCore DB `employees.id` を参照 |
| `updated_by text` | `updated_by_employee_id uuid` | 更新者はCore DB `employees.id` を参照 |
| 店舗名文字列 | `preferred_store_id` / `tour_store_id` / `expected_store_id` | 店舗正本はCore DB `stores.id` を参照 |
| 法人名文字列 | `corporation_id` | 法人正本はCore DB `corporations.id` を参照 |
| authenticated書き込みRLS | 作成しない | Phase 1はGAS backend + service_role経由 |
| `unique (fiscal_year, corporation_id)` | 部分unique index 2本 | `corporation_id is null` の全社設定重複を防止 |
| `talent_student_followups.student_id on delete cascade` | `on delete restrict` | 学生削除時にフォロー履歴が消えないようにする |

## 2-1. Core DBレビュー後の追加修正

Core DB側レビュー結果を受け、Supabase投入前に以下を修正済みです。

- `talent_investment_settings` の年度uniqueをテーブル制約から部分unique indexへ変更
- `corporation_id is not null` の法人別年度設定は `(fiscal_year, corporation_id)` で一意
- `corporation_id is null` の全社年度設定は `fiscal_year` で一意
- `talent_student_followups.student_id` を `on delete cascade` から `on delete restrict` へ変更
- 実質マスタの `talent_investment_settings` / `talent_schools` / `talent_fairs` に `is_active boolean not null default true` を追加

## 3. Core DB参照カラム一覧

| talent_テーブル | カラム | 参照先 | 用途 |
| --- | --- | --- | --- |
| `talent_investment_settings` | `corporation_id` | `corporations(id)` | 法人別年度目標 |
| `talent_investment_settings` | `created_by_employee_id` | `employees(id)` | 作成者 |
| `talent_investment_settings` | `updated_by_employee_id` | `employees(id)` | 更新者 |
| `talent_schools` | `owner_employee_id` | `employees(id)` | 学校主担当 |
| `talent_schools` | `created_by_employee_id` | `employees(id)` | 作成者 |
| `talent_schools` | `updated_by_employee_id` | `employees(id)` | 更新者 |
| `talent_fairs` | `corporation_id` | `corporations(id)` | 法人別フェア投資 |
| `talent_fairs` | `owner_employee_id` | `employees(id)` | フェア主担当 |
| `talent_fairs` | `created_by_employee_id` | `employees(id)` | 作成者 |
| `talent_fairs` | `updated_by_employee_id` | `employees(id)` | 更新者 |
| `talent_students` | `owner_employee_id` | `employees(id)` | 学生担当者 |
| `talent_students` | `preferred_store_id` | `stores(id)` | 希望店舗 |
| `talent_students` | `tour_store_id` | `stores(id)` | 見学店舗 |
| `talent_students` | `expected_store_id` | `stores(id)` | 配属予定店舗 |
| `talent_students` | `created_by_employee_id` | `employees(id)` | 作成者 |
| `talent_students` | `updated_by_employee_id` | `employees(id)` | 更新者 |
| `talent_operation_logs` | `student_id` | `talent_students(id)` | 対象学生 |
| `talent_operation_logs` | `actor_employee_id` | `employees(id)` | 操作者 |
| `talent_student_followups` | `student_id` | `talent_students(id)` | 対象学生 |
| `talent_student_followups` | `owner_employee_id` | `employees(id)` | フォロー担当者 |
| `talent_student_followups` | `created_by_employee_id` | `employees(id)` | 作成者 |
| `talent_student_followups` | `updated_by_employee_id` | `employees(id)` | 更新者 |

## 4. 新規作成する talent_ テーブル一覧

| テーブル | 内容 |
| --- | --- |
| `talent_investment_settings` | 年度目標・採用投資設定 |
| `talent_schools` | 学校マスタ・学校接点情報 |
| `talent_fairs` | フェア実績・フェア投資情報 |
| `talent_students` | 学生個別データ |
| `talent_operation_logs` | 操作履歴 |
| `talent_student_followups` | 学生フォロー履歴 |

ビュー:

| ビュー | 内容 |
| --- | --- |
| `talent_dashboard_student_summary` | 学生サマリー集計 |
| `talent_fair_roi_ranking` | フェアROIランキング |

関数:

| 関数 | 内容 |
| --- | --- |
| `talent_set_updated_at()` | `updated_at` 自動更新 |

## 5. RLS方針

Phase 1では、GAS backendからSupabaseへ接続します。

- `service_role` キーはGAS Script Propertiesにのみ保存
- フロントエンドには `service_role` キーを出さない
- anon keyで直接insert/update/deleteできるポリシーは作らない
- RLSは全 `talent_` テーブルで有効化
- Phase 1では明示的なanon/authenticated書き込みポリシーは作らない

将来のHUB統合後:

- `novHub.currentEmployee` と `employees.id` を紐づけ
- `employee_roles` を見て、総務人事部だけ更新許可
- 店舗管理者・経営者は閲覧権限を分ける

## 6. GAS版からSupabase版への段階移行手順

### Phase 0: 現行維持

- 現行GAS + スプレッドシート版は停止しない
- 既存ダッシュボードはそのまま稼働
- Core DB側レビュー完了までSQLは投入しない

### Phase 1: Supabase DB作成

1. Core DB側レビュー完了
2. `supabase/schema.sql` をSQL Editorで実行
3. `talent_` テーブル作成を確認
4. RLS有効化を確認

### Phase 2: GAS backendからSupabaseへ接続

1. GAS Script PropertiesにSupabase URLとservice_roleを保存
2. GASからSupabase REST APIへ接続
3. まず読み取りだけSupabaseへ接続
4. 現行スプレッドシート版とKPIを比較

### Phase 3: データ移行

1. 既存スプレッドシートからCSVを作成
2. `talent_schools`、`talent_fairs`、`talent_students`へ投入
3. `employees.id`、`stores.id`、`corporations.id` との対応を補完
4. 不明な担当者・店舗は一旦nullで投入し、後で補完

### Phase 4: ダッシュボード読み取り切替

1. GASの取得元をSupabaseへ変更
2. ダッシュボードの表示値を確認
3. 学生件数・フェアROI・学校別分析を現行版と比較

### Phase 5: 追加・更新切替

1. 学生追加をSupabase insertへ変更
2. 学生更新をSupabase updateへ変更
3. 操作履歴を `talent_operation_logs` にinsert
4. 管理対象外、重複チェック、ステータス矛盾チェックを維持

### Phase 6: GAS / スプレッドシート縮退

1. 1週間以上、Supabase版で安定稼働
2. 総務人事部の操作確認完了
3. スプレッドシートをバックアップ扱いへ変更
4. GASのスプレッドシート書き込み処理を停止候補にする
