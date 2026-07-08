# SELECT-only inventory pack: 現職者管理 / 入社手続きキュー

作成日: 2026-07-08

## 目的

入社手続きキューを設計する前に、既存Core DBの社員・権限・関連マスタを読み取り専用で確認するためのinventory packです。

このpackはSELECT-onlyです。INSERT / UPDATE / DELETE / DDL / GRANT / RLS / RPCは含みません。

## 確認対象

- `public.employees`
- `public.roles`
- `public.employee_roles`
- `public.stores`
- `public.departments`
- `public.positions`
- `public.job_types`
- 既存 `talent_` テーブル

## 1. 総務人事部の社員と権限

```sql
select
  e.id as employee_uuid,
  e.employee_id,
  e.full_name,
  e.email,
  d.department_name,
  r.role_key,
  r.role_name,
  er.scope_type,
  er.scope_id,
  er.is_active
from public.employees e
left join public.departments d on d.id = e.department_id
left join public.employee_roles er on er.employee_id = e.id
left join public.roles r on r.id = er.role_id
where d.department_name = '総務人事部'
order by e.employee_id, r.role_key;
```

確認したいこと:

- 総務人事部社員に `talent_admin` / `talent_editor` が付いているか
- `scope_type` が `all` になっているか
- `is_active=true` か

## 2. NOV Talent関連role一覧

```sql
select
  id,
  role_key,
  role_name,
  is_active
from public.roles
where role_key in ('talent_admin', 'talent_editor', 'talent_viewer')
order by role_key;
```

確認したいこと:

- NOV Talent用roleが存在するか
- 表示名が運用と一致しているか

## 3. 入社手続き承認者候補

```sql
select
  e.id as employee_uuid,
  e.employee_id,
  e.full_name,
  e.email,
  d.department_name,
  p.position_name,
  jt.job_type_name,
  r.role_key,
  er.scope_type,
  er.is_active
from public.employees e
left join public.departments d on d.id = e.department_id
left join public.positions p on p.id = e.position_id
left join public.job_types jt on jt.id = e.job_type_id
join public.employee_roles er on er.employee_id = e.id
join public.roles r on r.id = er.role_id
where er.is_active = true
  and r.role_key in ('super_admin', 'executive', 'backoffice', 'talent_admin')
order by r.role_key, e.employee_id;
```

確認したいこと:

- 入社手続きキューの承認権限候補が誰か
- HR系権限が別途必要か

## 4. 店舗マスタ確認

```sql
select
  id,
  store_code,
  store_name,
  is_active
from public.stores
order by store_name;
```

確認したいこと:

- 配属予定店舗に使える店舗が揃っているか
- inactive店舗がUI候補に出ないようにできるか

## 5. 部署・役職・職種マスタ確認

```sql
select 'department' as master_type, id, department_name as display_name, is_active
from public.departments
union all
select 'position' as master_type, id, position_name as display_name, is_active
from public.positions
union all
select 'job_type' as master_type, id, job_type_name as display_name, is_active
from public.job_types
order by master_type, display_name;
```

確認したいこと:

- 入社予定者へ付与する部署・役職・職種候補が揃っているか
- `レセプション` を役職ではなく職種として扱えるか

## 6. 入社手続き候補学生の確認

```sql
select
  s.id as student_id,
  s.student_code,
  s.full_name,
  s.school_name_snapshot,
  s.cohort,
  s.result_status,
  s.offer_status,
  s.expected_join_status,
  s.management_status,
  s.next_action,
  s.next_action_date,
  s.updated_at
from public.talent_students s
where s.management_status = '有効'
  and (
    s.offer_status in ('内定', '承諾')
    or s.expected_join_status in ('入社予定', '入社済')
  )
order by s.full_name, s.student_code;
```

確認したいこと:

- 現職者管理タブの候補者とDB上の対象が一致するか
- 内定・承諾・入社予定のステータス定義に漏れがないか

## 7. 既存talent_テーブル一覧

```sql
select
  table_schema,
  table_name
from information_schema.tables
where table_schema = 'public'
  and table_name like 'talent_%'
order by table_name;
```

確認したいこと:

- 既存テーブルと命名衝突しないか
- 既存ログ/フォロー/店舗希望/見学履歴と責務が重複しないか

## 8. 既存talent_カラム一覧

```sql
select
  table_name,
  column_name,
  data_type,
  is_nullable
from information_schema.columns
where table_schema = 'public'
  and table_name like 'talent_%'
order by table_name, ordinal_position;
```

確認したいこと:

- 既存の見学店舗履歴・配属希望店舗と入社手続きキューが重複しないか
- 既存APIで再利用できるカラムがあるか

## 未実行

- SELECT以外のSQL
- INSERT / UPDATE / DELETE
- DDL
- RLS / GRANT / RPC
- role / employee_roles変更
- Secret / service_role変更

