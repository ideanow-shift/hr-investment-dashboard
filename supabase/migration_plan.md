# NOV Talent Supabase移行手順

## 方針

スプレッドシート運用は停止し、Supabaseを正規DBにします。

ただし、既存データを守るために、以下の順番で進めます。

1. Supabaseにテーブルを作成
2. 現在のスプレッドシートデータをCSV化
3. CSVをSupabaseへ投入
4. ダッシュボードをSupabase読み取りへ切り替え
5. 学生追加・更新をSupabase保存へ切り替え
6. GAS / スプレッドシートはバックアップ扱いに変更

## Phase 1: DB作成

1. Supabaseでプロジェクトを作成します。
2. SQL Editorを開きます。
3. `supabase/schema.sql` を実行します。
4. 以下のテーブルが作成されていることを確認します。

- `app_settings`
- `schools`
- `fairs`
- `students`
- `operation_logs`
- `student_followups`

## Phase 2: データ移行

現在のGoogleスプレッドシート、または移行済みExcelからCSVを作成します。

推奨CSV:

- `app_settings.csv`
- `schools.csv`
- `fairs.csv`
- `students.csv`
- `operation_logs.csv`

学生データは、27卒・28卒・サロン実習を `students.cohort` に入れて1テーブルで管理します。

| 現在のシート | Supabase |
| --- | --- |
| 年度設定 | app_settings |
| フェア実績 | fairs |
| 学校別分析 | schools / 集計ビュー |
| 学生管理_27卒 | students.cohort = 27卒 |
| 学生管理_28卒 | students.cohort = 28卒 |
| 学生管理_サロン実習 | students.cohort = サロン実習 |
| 操作履歴 | operation_logs |

## Phase 3: ダッシュボード読み取り切替

最初は読み取りだけSupabaseへ切り替えます。

確認ポイント:

- 全体サマリーの人数が合う
- フェアROIが合う
- 学校別分析が合う
- 学生一覧の件数が合う
- 管理対象外が通常一覧から除外される

## Phase 4: 学生追加・更新切替

次に、学生追加・更新をSupabaseへ切り替えます。

保存時に行うこと:

- `students` をinsert/update
- `operation_logs` に履歴をinsert
- 重複チェック
- ステータス矛盾チェック
- 管理対象外切替

## Phase 5: GAS停止

Supabase版で以下が確認できたら、GASは停止候補です。

- 1週間、学生追加・更新に問題がない
- 主要KPIがスプレッドシート版と一致
- 操作履歴がSupabaseに残っている
- 総務人事部がダッシュボード入力に慣れている

## 注意点

- SupabaseのAnon Keyを公開フロントに置く場合、RLSは必須です。
- 本番前に認証方式を決めます。
- Lステップ連携を考えるなら、学生IDとLINEユーザーIDの対応テーブルを追加します。
- スプレッドシートは移行完了後も当面バックアップとして残します。

