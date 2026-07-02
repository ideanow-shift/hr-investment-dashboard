-- Core DB / job_types post deploy check
-- SQL Editor投入後、この確認SQLを実行する。

-- 1. job_types が作成され、初期職種が入っていること
select
  job_type_key,
  name,
  display_order,
  is_active
from public.job_types
order by display_order, name;

-- 2. employees.job_type_id が追加されていること
select
  column_name,
  data_type,
  is_nullable
from information_schema.columns
where table_schema = 'public'
  and table_name = 'employees'
  and column_name = 'job_type_id';

-- 3. 外部キーが on delete restrict で作成されていること
select
  tc.constraint_name,
  kcu.column_name,
  ccu.table_name as foreign_table_name,
  ccu.column_name as foreign_column_name,
  rc.delete_rule
from information_schema.table_constraints tc
join information_schema.key_column_usage kcu
  on tc.constraint_name = kcu.constraint_name
  and tc.table_schema = kcu.table_schema
join information_schema.constraint_column_usage ccu
  on ccu.constraint_name = tc.constraint_name
  and ccu.table_schema = tc.table_schema
join information_schema.referential_constraints rc
  on rc.constraint_name = tc.constraint_name
  and rc.constraint_schema = tc.table_schema
where tc.table_schema = 'public'
  and tc.table_name = 'employees'
  and kcu.column_name = 'job_type_id';

-- 4. RLSが有効であること
select
  relname,
  relrowsecurity
from pg_class
where oid = 'public.job_types'::regclass;

-- 5. updated_at trigger が存在すること
select
  trigger_name,
  event_manipulation,
  action_timing
from information_schema.triggers
where event_object_schema = 'public'
  and event_object_table = 'job_types';

-- 6. service_role に必要権限があること
select
  grantee,
  table_name,
  privilege_type
from information_schema.role_table_grants
where table_schema = 'public'
  and table_name in ('job_types', 'employees')
  and grantee = 'service_role'
order by table_name, privilege_type;
