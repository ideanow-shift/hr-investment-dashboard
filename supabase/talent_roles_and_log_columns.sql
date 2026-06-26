-- NOV Talent role and audit log extension
-- Review: IDEA NOV OS / Core DB approved on 2026-06-26
-- Apply this in Supabase SQL Editor before enabling strict GAS role checks in production.

insert into public.roles (role_no, role_key, role_name, is_active)
values
  ('0101', 'talent_admin', 'NOV Talent 管理者', true),
  ('0102', 'talent_editor', 'NOV Talent 編集者', true),
  ('0103', 'talent_viewer', 'NOV Talent 閲覧者', true)
on conflict (role_key) do update
set
  role_name = excluded.role_name,
  is_active = excluded.is_active,
  updated_at = now();

alter table public.talent_operation_logs
  add column if not exists actor_email text,
  add column if not exists result text not null default 'success',
  add column if not exists reason text,
  add column if not exists target_type text,
  add column if not exists target_id text,
  add column if not exists occurred_at timestamptz not null default now();

create index if not exists talent_operation_logs_result_idx
  on public.talent_operation_logs (result);

create index if not exists talent_operation_logs_occurred_at_idx
  on public.talent_operation_logs (occurred_at desc);
