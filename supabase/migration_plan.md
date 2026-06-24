# NOV Talent Supabase移行手順

## 方針

NOV Talentは、IDEA NOV OS / Core DB の一部として `idea-nov-core` に段階移行します。

社員・店舗・法人・部署・役職・権限は、人材投資管理システム専用には作成しません。Core DB既存テーブルを参照します。

- 社員: `employees.id`
- 社員番号: `employees.employee_id`
- 店舗: `stores.id`
- 法人: `corporations.id`
- 部署: `departments.id`
- 役職: `positions.id`
- 権限: `roles` / `employee_roles`

人材投資固有のデータだけ、`talent_` prefix の専用テーブルとして作成します。

## 重要な前提

この `schema.sql` はレビュー用です。まだ Supabase SQL Editor へ投入しません。

Core DB側で外部キー影響を確認してから、投入します。

## Phase 1: レビュー

確認対象:

- `supabase/schema.sql`
- `supabase/CoreDBレビュー用_変更点一覧.md`
- `Supabase移行設計書.md`

確認ポイント:

- Core DB既存テーブルを新規作成していない
- `talent_` prefix に統一されている
- `employees.id` / `stores.id` / `corporations.id` への外部キーが妥当
- `talent_set_updated_at()` が Core DB の関数名と衝突しない
- RLSが有効化されている
- anon key で直接書き込みできる設計になっていない

## Phase 2: DB作成

Core DB側レビューOK後に実施します。

1. Supabase project `idea-nov-core` を開きます。
2. SQL Editorで `supabase/schema.sql` を実行します。
3. 以下の app 固有テーブルが作成されていることを確認します。

- `talent_investment_settings`
- `talent_schools`
- `talent_fairs`
- `talent_students`
- `talent_operation_logs`
- `talent_student_followups`

作成されるビュー:

- `talent_dashboard_student_summary`
- `talent_fair_roi_ranking`

## Phase 3: データ移行

現在のGoogleスプレッドシート、または移行済みExcelからCSVを作成します。

推奨CSV:

- `talent_investment_settings.csv`
- `talent_schools.csv`
- `talent_fairs.csv`
- `talent_students.csv`
- `talent_operation_logs.csv`
- `talent_student_followups.csv`

移行マッピング:

| 現在のシート | Supabase |
| --- | --- |
| 年度設定 | `talent_investment_settings` |
| フェア実績 | `talent_fairs` |
| 学校別分析 | `talent_schools` / 集計ビュー |
| 学生管理_27卒 | `talent_students.cohort = 27卒` |
| 学生管理_28卒 | `talent_students.cohort = 28卒` |
| 学生管理_サロン実習 | `talent_students.cohort = サロン実習` |
| 操作履歴 | `talent_operation_logs` |

学生データは、27卒・28卒・サロン実習を `talent_students.cohort` で区分します。

## Phase 4: GAS経由でSupabase接続

Phase 1では、既存のGitHub PagesフロントからSupabaseへ直接書き込みません。

```text
GitHub Pages
  -> GAS backend
  -> Supabase REST / SQL
  -> PostgreSQL
```

service_roleキーはGASの Script Properties にのみ保存します。`app.js` やGitHub Pagesには置きません。

この段階では、GAS版スプレッドシート連携はすぐ止めず、読み取り結果とKPIを比較します。

## Phase 5: 読み取り切替

最初は読み取りだけSupabaseへ切り替えます。

確認ポイント:

- 全体サマリーの人数が合う
- フェアROIが合う
- 学校別分析が合う
- 学生一覧の件数が合う
- 27卒・28卒・サロン実習の区分が合う
- 管理対象外が通常一覧から除外される
- 男性・女性の集計が合う

## Phase 6: 学生追加・更新切替

次に、学生追加・更新をSupabase保存へ切り替えます。

保存時に行うこと:

- `talent_students` をinsert/update
- `talent_operation_logs` に履歴をinsert
- `owner_employee_id` などは将来的に `novHub.currentEmployee` から設定
- 重複チェック
- ステータス矛盾チェック
- 管理対象外切替

## Phase 7: GAS / スプレッドシートの役割変更

Supabase版で以下が確認できたら、GAS / スプレッドシートはバックアップまたは移行用ツール扱いに変更します。

- 1週間、学生追加・更新に問題がない
- 主要KPIがスプレッドシート版と一致
- 操作履歴がSupabaseに残っている
- 総務人事部がダッシュボード入力に慣れている

## 注意点

- フロントに service_role キーは絶対に置かない
- Phase 1では anon key に書き込み権限を与えない
- 社員名・店舗名・法人名はCore DBを正本とする
- 表示名が必要な場合は snapshot として保持する
- Lステップ連携を考える場合、学生IDとLINEユーザーIDの対応テーブルを追加検討する
