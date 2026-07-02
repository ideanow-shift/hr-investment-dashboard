-- NOV Talent / LSTEP integration verification SQL
-- Purpose:
-- - Run this after supabase/talent_lstep_integration_review.sql has been applied.
-- - This file only reads metadata and counts rows. It does not change data or schema.

-- 1. Required LSTEP tables
with required_tables(table_name) as (
  values
    ('talent_line_accounts'),
    ('talent_line_events'),
    ('talent_line_messages'),
    ('talent_lstep_sync_runs')
)
select
  required_tables.table_name,
  case when tables.table_name is not null then 'ok' else 'missing' end as status
from required_tables
left join information_schema.tables
  on tables.table_schema = 'public'
 and tables.table_name = required_tables.table_name
order by required_tables.table_name;

-- 2. RLS status
select
  c.relname as table_name,
  c.relrowsecurity as rls_enabled
from pg_class c
join pg_namespace n on n.oid = c.relnamespace
where n.nspname = 'public'
  and c.relname in (
    'talent_line_accounts',
    'talent_line_events',
    'talent_line_messages',
    'talent_lstep_sync_runs'
  )
order by c.relname;

-- 3. service_role privileges
select
  table_name,
  privilege_type
from information_schema.role_table_grants
where table_schema = 'public'
  and grantee = 'service_role'
  and table_name in (
    'talent_line_accounts',
    'talent_line_events',
    'talent_line_messages',
    'talent_lstep_sync_runs'
  )
order by table_name, privilege_type;

-- 4. Required constraints
select
  conrelid::regclass::text as table_name,
  conname as constraint_name,
  contype as constraint_type
from pg_constraint
where conrelid in (
  'public.talent_line_accounts'::regclass,
  'public.talent_line_events'::regclass,
  'public.talent_line_messages'::regclass
)
  and conname in (
    'talent_line_accounts_id_student_unique',
    'talent_line_events_account_student_match',
    'talent_line_events_target_required',
    'talent_line_messages_account_student_match',
    'talent_line_messages_target_required'
  )
order by table_name, constraint_name;

-- 5. Current row counts
select 'talent_line_accounts' as table_name, count(*) as row_count
from public.talent_line_accounts
union all
select 'talent_line_events', count(*)
from public.talent_line_events
union all
select 'talent_line_messages', count(*)
from public.talent_line_messages
union all
select 'talent_lstep_sync_runs', count(*)
from public.talent_lstep_sync_runs;

-- 6. Unlinked or unresolved line accounts
select
  friend_status,
  is_active,
  count(*) as account_count
from public.talent_line_accounts
group by friend_status, is_active
order by is_active desc, friend_status;
