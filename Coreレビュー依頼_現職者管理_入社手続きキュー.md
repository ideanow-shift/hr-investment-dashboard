# Coreレビュー依頼: 現職者管理 / 入社手続きキュー

作成日: 2026-07-07

## 相談先判定

★Core DB番人 v2

## 理由

リクルート管理システムで内定・入社決定になった学生を、将来の現職者管理へ引き継ぐ場合、`talent_students.id` から `employees.id` へ接続する設計が必要になるためです。

社員マスタ、店舗、部署、役職、職種、権限、HR秘匿情報の境界に関わるため、実装前にCore DB / HUB / HR Moduleの責務分担を確認したいです。

## 現在の状態

- 現在の本番運用中心は `リクルート管理システム`
- 学生正本は `public.talent_students.id`
- 社員正本は `public.employees.id`
- 店舗は `public.stores.id`
- 部署は `public.departments.id`
- 役職は `public.positions.id`
- 職種は `public.job_types.id`
- 権限は `roles / employee_roles`
- 現職者管理は設計資料・モック段階で、DB変更は未実行

## 実行したいこと

将来的に、内定・承諾・入社日確定になった学生を、以下のような「入社手続きキュー」に送る設計を検討したいです。

```text
リクルート管理
  talent_students.id
    ↓
現職者管理
  入社手続きキュー
    ↓ 承認後
Core DB / HR Module側の社員化フロー
```

## 現在のUI実装状況

現時点ではDB変更なしで、以下を画面上のプレビューとして実装済みです。

- `現職者管理` タブ
- 入社手続き、異動、産休・育休・休職・復職、退職の構想カード
- 既存学生データからの `入社手続き候補` 表示
- 準備確認済み、配属希望未確認、見学履歴要確認、次アクション日未設定のサマリー
- 候補者ごとの不足ラベル
  - `不足: 配属希望店舗`
  - `不足: 次アクション日`
  - `確認: 見学店舗履歴`
  - `確認: 入社前フォロー`
  - `確認: 入社予定`

このUIは、現職者管理の本番DBではなく、Coreレビュー前の運用確認・設計確認用です。

## 検討中の画面

- 入社手続き
- 配属予定確認
- 必要書類チェック
- 雇用条件確認
- 社員マスタ反映待ち
- 操作・承認履歴

## 保持したい候補項目

| 項目 | 参照元/正本候補 | 備考 |
| --- | --- | --- |
| 引継ぎ元学生 | `talent_students.id` | 社員化前の候補者ID |
| 作成者 | `employees.id` | HUBログイン社員 |
| 更新者 | `employees.id` | HUBログイン社員 |
| 承認者 | `employees.id` | 管理者/総務人事責任者 |
| 配属予定店舗 | `stores.id` | 店舗名は保存しない |
| 部署 | `departments.id` | 必要な場合のみ |
| 役職 | `positions.id` | 必要な場合のみ |
| 職種 | `job_types.id` | 必要な場合のみ |
| 入社予定日 | 未定 | HR/Coreどちらの正本か確認 |
| 手続きステータス | 未定 | Talent側で持つかHR側で持つか確認 |
| 社員化後ID | `employees.id` | 作成後に紐付ける候補 |

## レビュー用DDL案

以下はレビュー用の案です。SQL Editorには投入していません。

### talent_employee_onboarding_cases

入社手続き1件を表すキューです。学生を社員マスタへ直接変換せず、総務人事部の確認・承認を挟むための中間状態として使います。

```sql
create table public.talent_employee_onboarding_cases (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references public.talent_students(id) on delete restrict,
  case_status text not null default 'draft',
  expected_join_date date,
  expected_store_id uuid references public.stores(id) on delete restrict,
  expected_department_id uuid references public.departments(id) on delete restrict,
  expected_position_id uuid references public.positions(id) on delete restrict,
  expected_job_type_id uuid references public.job_types(id) on delete restrict,
  owner_employee_id uuid references public.employees(id) on delete restrict,
  approved_by_employee_id uuid references public.employees(id) on delete restrict,
  approved_at timestamptz,
  converted_employee_id uuid references public.employees(id) on delete restrict,
  created_by_employee_id uuid references public.employees(id) on delete restrict,
  updated_by_employee_id uuid references public.employees(id) on delete restrict,
  memo text,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint talent_employee_onboarding_cases_status_check
    check (case_status in ('draft', 'in_review', 'approved', 'converted', 'cancelled'))
);
```

想定:

- `student_id` はNOV Talent側の学生正本を参照
- `converted_employee_id` は社員化後にCore DBの `employees.id` を保持
- 店舗・部署・役職・職種は表示名を保存せずCore DBのID参照
- HR秘匿情報は持たない

### talent_employee_onboarding_check_items

入社前に確認するチェック項目です。書類や配属確認など、総務人事部が「完了/不要/未完了」を管理する想定です。

```sql
create table public.talent_employee_onboarding_check_items (
  id uuid primary key default gen_random_uuid(),
  onboarding_case_id uuid not null references public.talent_employee_onboarding_cases(id) on delete restrict,
  item_key text not null,
  item_label text not null,
  item_status text not null default 'not_started',
  due_date date,
  completed_at timestamptz,
  completed_by_employee_id uuid references public.employees(id) on delete restrict,
  memo text,
  sort_order integer not null default 100,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint talent_employee_onboarding_check_items_status_check
    check (item_status in ('not_started', 'done', 'not_required'))
);
```

初期チェック項目候補:

- 入社予定日確認
- 配属予定店舗確認
- 配属希望店舗確認
- 見学店舗履歴確認
- 雇用条件確認
- 必要書類案内
- 必要書類回収
- 店舗共有
- 入社前フォロー

### インデックス案

```sql
create index talent_employee_onboarding_cases_student_idx
  on public.talent_employee_onboarding_cases(student_id);

create index talent_employee_onboarding_cases_status_idx
  on public.talent_employee_onboarding_cases(case_status)
  where is_active = true;

create unique index talent_employee_onboarding_cases_active_student_unique
  on public.talent_employee_onboarding_cases(student_id)
  where is_active = true and case_status in ('draft', 'in_review', 'approved');

create index talent_employee_onboarding_check_items_case_idx
  on public.talent_employee_onboarding_check_items(onboarding_case_id, sort_order);
```

## RLS / GRANT方針案

Phase 1では、既存方針と同じくGAS backend + service_role経由を前提にします。

```sql
alter table public.talent_employee_onboarding_cases enable row level security;
alter table public.talent_employee_onboarding_check_items enable row level security;
```

- `anon` / `authenticated` への直接書き込みpolicyは作らない
- GitHub PagesからSupabaseへ直接書き込まない
- service_role keyはGAS Script Propertiesのみ
- `delete` grantは付けない
- 物理削除ではなく `is_active=false` / `case_status='cancelled'` を使う

## GAS / API想定

現時点では未実装です。レビュー後に必要なら以下のようなbackend関数を追加します。

- `createOnboardingCaseFromStudent`
- `updateOnboardingCase`
- `completeOnboardingCheckItem`
- `getOnboardingCases`
- `convertOnboardingCaseToEmployee` はHR/Core側判断後に検討

保存・承認系は、フロントだけで判断せず、backend側で `employees.id` と `roles / employee_roles` を再確認します。

## HR秘匿情報として避けるもの

NOV Talent側には以下を正本保存しない方針です。

- マイナンバー
- 給与
- 税
- 社会保険
- 銀行口座
- 住所詳細
- 家族/扶養情報
- 健康情報
- 休職理由の詳細
- 契約書本文

## Core DB番人へ確認したいこと

1. 入社手続きキューは `talent_` prefixで持つべきか、HR Module側で持つべきか
2. `talent_students.id` と `employees.id` の紐付けは専用テーブルが必要か
3. 社員化前の候補者を `employees` に作るタイミングはどこか
4. 入社予定日、配属予定店舗、職種、雇用形態はどの段階でCore正本へ反映するべきか
5. 承認ログは `talent_` 側でよいか、共通監査ログへ寄せるべきか
6. HR秘匿情報に接近する項目は、どこからHR Moduleへ切り出すべきか
7. RLS / service_role / Edge Function / GAS backendの推奨境界
8. `talent_employee_onboarding_cases` と `talent_employee_onboarding_check_items` の2テーブル案で責務が過不足ないか
9. 入社手続きキューの承認者は `talent_admin` でよいか、HR権限も必要か
10. 社員化処理はNOV Talentから実行してよいか、HR ModuleまたはCore側の専用フローへ渡すべきか
11. `converted_employee_id` をTalent側に保持してよいか
12. 入社手続きチェック項目の履歴はTalent側で持つべきか、共通監査ログへ寄せるべきか

## まだ実行しないこと

- DDL投入
- RLS / GRANT / RPC追加
- `employees` INSERT / UPDATE
- `employee_assignment_histories` INSERT / UPDATE
- 物理削除
- Secret / service_role変更
- HUB context仕様変更
- 上記レビュー用DDL案のSQL Editor投入

## 希望する判断

現職者管理の入社手続きキューを、NOV Talent側の `talent_` 領域として設計してよいか。
それとも、HR Module側の領域として切り出すべきか。
