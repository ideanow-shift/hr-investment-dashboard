-- NOV Talent / LSTEP integration review DDL
-- Supabase project: idea-nov-core
-- schema: public
--
-- Review draft only.
-- Core DB側確認後にSupabase SQL Editorへ投入してください。
--
-- 方針:
-- - 学生の正本は public.talent_students
-- - LSTEP / LINE の識別子は NOV Talent 固有データとして talent_ prefix で保持する
-- - 社員・店舗・部署・役職などCore DBマスタは作らない
-- - service_roleキーはGAS Script Propertiesのみで保持し、フロントには出さない
-- - Phase 1はGAS backend + service_role経由で同期する

create extension if not exists pgcrypto;

-- ============================================================
-- 学生とLINE/LSTEPアカウントの紐付け
-- ============================================================

create table if not exists public.talent_line_accounts (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references public.talent_students(id) on delete restrict,

  -- LINE/LSTEP側の識別子
  line_user_id text not null,
  lstep_user_id text,

  -- 表示・照合用スナップショット。正本ではない。
  display_name_snapshot text,
  phone_snapshot text,
  email_snapshot text,

  friend_status text not null default 'unknown'
    check (friend_status in ('unknown', 'friend', 'blocked', 'unlinked')),

  linked_at timestamptz,
  last_synced_at timestamptz,
  memo text,
  is_active boolean not null default true,

  created_by_employee_id uuid references public.employees(id) on delete set null,
  updated_by_employee_id uuid references public.employees(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists talent_line_accounts_active_student_unique
  on public.talent_line_accounts (student_id)
  where is_active = true;

create unique index if not exists talent_line_accounts_active_line_user_unique
  on public.talent_line_accounts (line_user_id)
  where is_active = true;

alter table public.talent_line_accounts
  drop constraint if exists talent_line_accounts_id_student_unique;

alter table public.talent_line_accounts
  add constraint talent_line_accounts_id_student_unique
  unique (id, student_id);

create index if not exists talent_line_accounts_lstep_user_id_idx
  on public.talent_line_accounts (lstep_user_id);

create index if not exists talent_line_accounts_last_synced_at_idx
  on public.talent_line_accounts (last_synced_at);

drop trigger if exists talent_line_accounts_set_updated_at
  on public.talent_line_accounts;

create trigger talent_line_accounts_set_updated_at
before update on public.talent_line_accounts
for each row execute function public.talent_set_updated_at();

-- ============================================================
-- LSTEP/LINEイベント受信履歴
-- ============================================================

create table if not exists public.talent_line_events (
  id uuid primary key default gen_random_uuid(),
  line_account_id uuid references public.talent_line_accounts(id) on delete restrict,
  student_id uuid references public.talent_students(id) on delete restrict,

  -- 未紐付けイベントを保存するための外部ID。
  -- 学生と紐付いた後の正本は talent_line_accounts。
  external_line_user_id text,
  lstep_user_id text,

  event_source text not null default 'lstep',
  event_type text not null,
  event_payload jsonb not null default '{}'::jsonb,

  occurred_at timestamptz not null default now(),
  processed_at timestamptz,
  result text not null default 'received'
    check (result in ('received', 'processed', 'ignored', 'failed')),
  error_message text,

  created_at timestamptz not null default now()
);

alter table public.talent_line_events
  drop constraint if exists talent_line_events_account_student_match;

alter table public.talent_line_events
  add constraint talent_line_events_account_student_match
  foreign key (line_account_id, student_id)
  references public.talent_line_accounts(id, student_id)
  on delete restrict;

alter table public.talent_line_events
  drop constraint if exists talent_line_events_target_required;

alter table public.talent_line_events
  add constraint talent_line_events_target_required
  check (
    line_account_id is not null
    or student_id is not null
    or external_line_user_id is not null
    or lstep_user_id is not null
  );

create index if not exists talent_line_events_student_id_idx
  on public.talent_line_events (student_id);

create index if not exists talent_line_events_account_id_idx
  on public.talent_line_events (line_account_id);

create index if not exists talent_line_events_external_line_user_id_idx
  on public.talent_line_events (external_line_user_id);

create index if not exists talent_line_events_lstep_user_id_idx
  on public.talent_line_events (lstep_user_id);

create index if not exists talent_line_events_occurred_at_idx
  on public.talent_line_events (occurred_at desc);

create index if not exists talent_line_events_result_idx
  on public.talent_line_events (result);

-- ============================================================
-- LSTEP/LINEメッセージ履歴
-- ============================================================

create table if not exists public.talent_line_messages (
  id uuid primary key default gen_random_uuid(),
  line_account_id uuid references public.talent_line_accounts(id) on delete restrict,
  student_id uuid references public.talent_students(id) on delete restrict,

  -- 未紐付けメッセージを保存するための外部ID。
  -- 学生と紐付いた後の正本は talent_line_accounts。
  external_line_user_id text,
  lstep_user_id text,

  direction text not null check (direction in ('inbound', 'outbound')),
  message_type text not null default 'text',
  message_text text,
  lstep_message_id text,

  sent_at timestamptz,
  received_at timestamptz,
  created_at timestamptz not null default now()
);

alter table public.talent_line_messages
  drop constraint if exists talent_line_messages_account_student_match;

alter table public.talent_line_messages
  add constraint talent_line_messages_account_student_match
  foreign key (line_account_id, student_id)
  references public.talent_line_accounts(id, student_id)
  on delete restrict;

alter table public.talent_line_messages
  drop constraint if exists talent_line_messages_target_required;

alter table public.talent_line_messages
  add constraint talent_line_messages_target_required
  check (
    line_account_id is not null
    or student_id is not null
    or external_line_user_id is not null
    or lstep_user_id is not null
  );

create index if not exists talent_line_messages_student_id_idx
  on public.talent_line_messages (student_id);

create index if not exists talent_line_messages_account_id_idx
  on public.talent_line_messages (line_account_id);

create index if not exists talent_line_messages_external_line_user_id_idx
  on public.talent_line_messages (external_line_user_id);

create index if not exists talent_line_messages_lstep_user_id_idx
  on public.talent_line_messages (lstep_user_id);

create index if not exists talent_line_messages_created_at_idx
  on public.talent_line_messages (created_at desc);

-- ============================================================
-- LSTEP同期実行ログ
-- ============================================================

create table if not exists public.talent_lstep_sync_runs (
  id uuid primary key default gen_random_uuid(),
  sync_type text not null default 'manual'
    check (sync_type in ('manual', 'scheduled', 'webhook')),
  status text not null default 'started'
    check (status in ('started', 'success', 'partial_success', 'failed')),
  received_count integer not null default 0,
  linked_count integer not null default 0,
  updated_count integer not null default 0,
  ignored_count integer not null default 0,
  error_count integer not null default 0,
  error_message text,

  triggered_by_employee_id uuid references public.employees(id) on delete set null,
  started_at timestamptz not null default now(),
  finished_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists talent_lstep_sync_runs_started_at_idx
  on public.talent_lstep_sync_runs (started_at desc);

-- ============================================================
-- RLS
-- ============================================================

alter table public.talent_line_accounts enable row level security;
alter table public.talent_line_events enable row level security;
alter table public.talent_line_messages enable row level security;
alter table public.talent_lstep_sync_runs enable row level security;

-- Phase 1:
-- GAS backend + service_role経由を基本とする。
-- anon keyで直接書き込みできるpolicyは作成しない。

grant select, insert, update on public.talent_line_accounts to service_role;
grant select, insert, update on public.talent_line_events to service_role;
grant select, insert, update on public.talent_line_messages to service_role;
grant select, insert, update on public.talent_lstep_sync_runs to service_role;

-- 参照専用ビューやHUBログイン連動RLSは、LSTEP接続方式確定後に追加する。
