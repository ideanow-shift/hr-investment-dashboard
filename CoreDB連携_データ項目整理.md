# NOV Talent Core DB連携 データ項目整理

## 前提

人材投資管理システムは、Supabaseプロジェクト `idea-nov-core` の `public` schema を利用する。

社員・店舗・法人・部署・役職・権限は、Core DBの既存テーブルを参照する。

人材投資管理システム専用の社員マスタ、店舗マスタ、部署マスタ、役職マスタは作らない。

## Core DBで持つもの

| 項目 | Core DBテーブル | 参照キー | 人材投資側での使い方 |
| --- | --- | --- | --- |
| 社員 | `employees` | `employees.id` | 学生担当者、更新者、作成者、面談担当者 |
| 社員番号 | `employees` | `employees.employee_id` | 表示・検索用。主キーとしては使わない |
| 店舗 | `stores` | `stores.id` | 希望店舗、見学店舗、配属予定店舗、担当店舗 |
| 法人 | `corporations` | `corporations.id` | 法人別採用投資、法人別目標管理 |
| 部署 | `departments` | `departments.id` | 総務人事部などの所属確認、権限判断 |
| 役職 | `positions` | `positions.id` | 店長候補分析、面談者属性、権限判断 |
| 職種 | `job_types` | `job_types.id` | 職種別の採用分析、教育対象分類、LSTEP配信対象の将来利用 |
| 雇用形態 | `employees` | `employment_type` | 表示・分析用。NOV Talent専用マスタは作らない |
| 就労ステータス | `employees` | `employment_status` | 表示・分析用。NOV Talent専用マスタは作らない |
| 休職種別 | `employees` | `leave_type` | 表示・分析用。NOV Talent専用マスタは作らない |
| 権限 | `roles` / `employee_roles` | role ID | 閲覧・編集・管理者権限 |
| 異動・昇格・退職履歴 | `employee_assignment_histories` | `employees.id` | 入社後定着率、店長候補輩出分析で将来利用 |
| 複数店舗所属 | `employee_store_assignments` | `employees.id`, `stores.id` | 店舗別採用効果・配属後分析で将来利用 |

## 人材投資アプリ固有テーブルで持つもの

### 1. 学生データ

候補テーブル名: `talent_students`

| 項目 | DB列案 | 備考 |
| --- | --- | --- |
| 学生ID | `student_code` | 既存の `S-0001` 等。表示・移行用 |
| 氏名 | `full_name` | 学生本人の氏名 |
| 性別 | `gender` | 男性 / 女性 / その他 / 未回答 |
| 卒業区分 | `cohort` | 27卒 / 28卒 / サロン実習 |
| 学校名 | `school_name` | 初期は文字列。将来 `talent_schools.id` 参照も検討 |
| 学年 | `grade` | 1年 / 2年 / 既卒 / その他 |
| 流入元種別 | `source_type` | フェア / 学校訪問 / 紹介 / その他 |
| 流入元名 | `source_name` | フェア名、学校訪問名など |
| 接触日 | `contact_date` | 最初の接触日 |
| LINE登録 | `line_status` | 未登録 / 登録済 |
| 見学ステータス | `salon_tour_status` | 未設定 / 予定 / 実施済 / キャンセル |
| 面接ステータス | `interview_status` | 未設定 / 予定 / 実施済 / キャンセル |
| 選考結果 | `result_status` | 未定 / 合格 / 不合格 / 辞退 |
| 内定ステータス | `offer_status` | 未定 / 内定 / 承諾 / 辞退 |
| 入社予定 | `expected_join_status` | 未定 / 入社予定 / 入社済 / 辞退 |
| 次アクション | `next_action` | フォロー内容 |
| 次アクション日 | `next_action_date` | フォロー予定日 |
| メモ | `memo` | 自由記述 |
| 管理状態 | `management_status` | 有効 / 管理対象外 |
| 担当社員 | `owner_employee_id` | `employees.id` を参照 |
| 希望店舗 | `preferred_store_id` | `stores.id` を参照。店舗名は保存しない |
| 見学店舗 | `tour_store_id` | `stores.id` を参照 |
| 配属予定店舗 | `expected_store_id` | `stores.id` を参照 |
| 作成者 | `created_by_employee_id` | `employees.id` を参照 |
| 更新者 | `updated_by_employee_id` | `employees.id` を参照 |

Core DB参照:

- `owner_employee_id` → `employees.id`
- `preferred_store_id` → `stores.id`
- `tour_store_id` → `stores.id`
- `expected_store_id` → `stores.id`
- `created_by_employee_id` → `employees.id`
- `updated_by_employee_id` → `employees.id`

### 2. フェア実績

候補テーブル名: `talent_fairs`

| 項目 | DB列案 | 備考 |
| --- | --- | --- |
| フェア名 | `name` | フェア表示名 |
| 開催日 | `held_date` | 開催日 |
| 費用 | `cost` | 投資額 |
| 接触数 | `contacts` | フェア接触数 |
| LINE登録数 | `line_registrations` | LINE獲得数 |
| 見学取得数 | `salon_tours` | 見学予約・取得数 |
| 主担当社員 | `owner_employee_id` | `employees.id` 参照 |
| 対象法人 | `corporation_id` | `corporations.id` 参照。法人別投資判断に利用 |
| メモ | `memo` | 自由記述 |

Core DB参照:

- `owner_employee_id` → `employees.id`
- `corporation_id` → `corporations.id`

### 3. 学校分析・学校接点

候補テーブル名: `talent_schools`

Core DBに学校マスタはない前提のため、人材投資固有マスタとして持つ。

| 項目 | DB列案 | 備考 |
| --- | --- | --- |
| 学校名 | `name` | 正式名称 |
| 表示名 | `display_name` | 表記ゆれ対策 |
| エリア | `area` | 任意 |
| 接触人数 | `contacts` | 集計値。将来的には学生から集計可能 |
| LINE登録数 | `line_registrations` | 集計値 |
| 見学数 | `salon_tours` | 集計値 |
| 面接数 | `interviews` | 集計値 |
| 合格数 | `passed` | 集計値 |
| 内定数 | `offers` | 集計値 |
| 主担当社員 | `owner_employee_id` | `employees.id` 参照 |
| メモ | `memo` | 自由記述 |

Core DB参照:

- `owner_employee_id` → `employees.id`

### 4. 年度目標・投資設定

候補テーブル名: `talent_investment_settings`

| 項目 | DB列案 | 備考 |
| --- | --- | --- |
| 年度 | `fiscal_year` | 2026など |
| 採用目標人数 | `target_hires` | 年度目標 |
| 接触人数目標 | `target_contacts` | 年度目標 |
| 面接成約目標 | `target_interviews` | 年度目標 |
| 採用予算 | `hiring_budget` | 年度予算 |
| 入社予定数 | `expected_joiners` | 年度目標 |
| 対象法人 | `corporation_id` | `corporations.id` 参照 |

Core DB参照:

- `corporation_id` → `corporations.id`

### 5. 操作履歴

候補テーブル名: `talent_operation_logs`

| 項目 | DB列案 | 備考 |
| --- | --- | --- |
| 操作 | `action` | 追加 / 更新 / 管理対象外 / 復帰 |
| 対象テーブル | `table_name` | students等 |
| 対象ID | `record_id` | 対象レコードID |
| 学生ID | `student_id` | `talent_students.id` 参照 |
| 操作者 | `actor_employee_id` | `employees.id` 参照 |
| 内容 | `detail` | 操作説明 |
| 変更前 | `before_data` | jsonb |
| 変更後 | `after_data` | jsonb |
| 作成日時 | `created_at` | 操作日時 |

Core DB参照:

- `actor_employee_id` → `employees.id`

### 6. 学生フォロー履歴

候補テーブル名: `talent_student_followups`

| 項目 | DB列案 | 備考 |
| --- | --- | --- |
| 学生 | `student_id` | `talent_students.id` 参照 |
| フォロー内容 | `action_title` | 次アクション |
| 期限 | `due_date` | 対応期限 |
| 状態 | `status` | 未対応 / 対応中 / 完了 / 不要 |
| 担当社員 | `owner_employee_id` | `employees.id` 参照 |
| メモ | `memo` | 自由記述 |

Core DB参照:

- `owner_employee_id` → `employees.id`

## アプリ固有テーブル候補一覧

| テーブル案 | 用途 | Core DB参照 |
| --- | --- | --- |
| `talent_students` | 学生個別管理 | employees, stores |
| `talent_fairs` | フェア別投資管理 | employees, corporations |
| `talent_schools` | 学校別投資効果 | employees |
| `talent_investment_settings` | 年度目標・予算 | corporations |
| `talent_operation_logs` | 操作履歴 | employees |
| `talent_student_followups` | フォロー履歴 | employees, talent_students |

## Core DB側へ影響確認が必要な点

新規テーブル作成前に、Core DB側チャットへ以下を確認する。

1. `employees.id` を人材投資側の担当者・更新者として参照してよいか
2. `stores.id` を希望店舗・見学店舗・配属予定店舗として参照してよいか
3. `corporations.id` を採用目標・フェア投資の法人別集計に使ってよいか
4. `roles / employee_roles` の現在の権限設計に、HR編集者・閲覧者を追加する方針でよいか
5. `novHub.currentEmployee` から取得できる社員情報の形式
6. Lステップ連携時に、学生とLINEユーザーIDをどのテーブルで持つべきか

## 現時点で作らないもの

以下はCore DBに既存テーブルがあるため、人材投資管理システム専用では作らない。

- 社員マスタ
- 店舗マスタ
- 法人マスタ
- 部署マスタ
- 役職マスタ
- 職種マスタ
- 権限マスタ
- 雇用形態マスタ
- 就労ステータスマスタ
- 休職種別マスタ
- 社員所属履歴
- 複数店舗所属
## 2026-07-02 Core DB統合方針追記

IDEA NOV OS / Core DB側で、Management Platformの環境整備チェックに `target_employee_id` を追加する方針が承認された。

NOV Talent側でも、今後は「人に関する履歴」を最終的に Core DB の `employees.id` を軸に接続する。

### NOV Talent側の設計ルール

- 社員・店舗・部署・役職は独自管理せず、Core DBの既存マスタを参照する
- 職種はCore DB側で `job_types` が追加された後、`job_types.id` を参照する
- 雇用形態、就労ステータス、休職種別はCore DBの社員属性として扱い、NOV Talent専用マスタは作らない
- 社員を記録する場合は、氏名ではなく `employees.id` を保存する
- 店舗を記録する場合は、店舗名ではなく `stores.id` を保存する
- 作成者・更新者・面談担当者・採用担当者など、社内社員に紐づくカラムは `employees.id` を参照する
- 学生の正本は引き続き `talent_students.id`
- 学生と店舗の希望・見学履歴は `stores.id` で紐づける
- LSTEP / LINE連携でも、社内担当者は `employees.id`、学生は `talent_students.id` を軸にする
- RLSはenable、Phase1はGAS backend + service_role経由、anon直接書き込みなし
- service_role keyやLSTEP APIキーはフロントへ出さない
- DDLを追加する場合は `talent_` prefixで作成し、SQL Editor投入前にOS側レビューを通す

### 補足

NOV Talentでは社員評価や管理者育成データを直接持たない。ただし、採用担当者・面談者・作成者・更新者など、社内社員に関わる情報は必ず Core DB の `employees.id` 参照に寄せる。

## 2026-07-02 社員属性分離方針

各アプリ共通指示として、社員属性は以下のように分離する。

| 属性 | 正本 |
| --- | --- |
| 部署 | `departments` |
| 役職 | `positions` |
| 職種 | `job_types` |
| 雇用形態 | `employment_type` |
| 就労ステータス | `employment_status` |
| 休職種別 | `leave_type` |
| 権限 | `roles` / `employee_roles` |

NOV Talentでは、これらの社員属性を独自マスタ化しない。

保存・参照時は以下を使う。

- 社員: `employees.id`
- 店舗: `stores.id`
- 部署: `departments.id`
- 役職: `positions.id`
- 職種: `job_types.id`（Core DB側で新設後）
- 権限: `roles` / `employee_roles`

表示名はCore DBから参照する。`レセプションパート` のような混合値は、将来的に `employment_type = パート・アルバイト` + `job_type = レセプション` のように分離する。
