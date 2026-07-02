-- Core DB / employee attribute master
-- 職種マスタ追加DDL
--
-- 方針:
-- - job_types はCore共通マスタとして public に作成する
-- - NOV Talent側では独自職種マスタを作らず、job_types.id を参照する
-- - 未設定はDB値にせず NULL で扱う
-- - Phase 1 は backend / service_role 経由、anon直接書き込みなし

-- 前提確認:
-- select proname from pg_proc where proname = 'talent_set_updated_at';

create table if not exists public.job_types (
  id uuid primary key default gen_random_uuid(),
  job_type_key text not null unique,
  name text not null,
  display_order integer not null default 0,
  memo text,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.job_types is 'Core DB共通: 社員の職種マスタ。雇用形態とは分離して管理する。';
comment on column public.job_types.job_type_key is '内部キー。例: stylist, reception, colorist, head_office, other';
comment on column public.job_types.name is '表示名。例: 美容師、レセプション、カラーリスト';
comment on column public.job_types.is_active is 'falseの場合は新規選択肢として非表示。履歴参照のため物理削除しない。';

alter table public.employees
  add column if not exists job_type_id uuid references public.job_types(id) on delete restrict;

comment on column public.employees.job_type_id is 'Core DB共通: 社員の職種。未設定はNULL。雇用形態 employment_type とは分離する。';

create index if not exists job_types_is_active_display_order_idx
  on public.job_types (is_active, display_order, name);

create index if not exists employees_job_type_id_idx
  on public.employees (job_type_id);

drop trigger if exists job_types_set_updated_at on public.job_types;
create trigger job_types_set_updated_at
before update on public.job_types
for each row execute function public.talent_set_updated_at();

alter table public.job_types enable row level security;

-- Phase 1: backend / service_role 経由で参照・更新する
grant select, insert, update on public.job_types to service_role;
grant select, update on public.employees to service_role;

insert into public.job_types (job_type_key, name, display_order, is_active)
values
  ('stylist', '美容師', 10, true),
  ('reception', 'レセプション', 20, true),
  ('colorist', 'カラーリスト', 30, true),
  ('head_office', '本部スタッフ', 40, true),
  ('other', 'その他', 90, true)
on conflict (job_type_key) do update
set
  name = excluded.name,
  display_order = excluded.display_order,
  is_active = excluded.is_active,
  updated_at = now();

-- master_change_logs 記録方針:
-- Core DB側の master_change_logs に以下の変更履歴を記録する。
-- 対象: public.job_types 追加、public.employees.job_type_id 追加
-- 理由: 社員属性を「部署・役職・職種・雇用形態・就労ステータス・休職種別・権限」に分離するため
-- 影響: Shift / NOV Talent / Management Platform / LSTEP連携で職種をCore DB参照に寄せる
