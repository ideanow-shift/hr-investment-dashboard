-- NOV Talent / 人材投資管理システム
-- Supabase project: idea-nov-core
-- schema: public
--
-- Review draft only.
-- まだSupabase SQL Editorへ投入しないでください。
--
-- Core DB前提:
-- - 社員・店舗・法人・部署・役職・権限マスタは作成しない
-- - employees / stores / corporations / departments / positions / roles / employee_roles を参照する
-- - service_roleキーはGAS Script Propertiesのみで保持し、フロントには出さない

create extension if not exists pgcrypto;

-- ============================================================
-- 共通 updated_at 関数
-- Core DB側との衝突を避けるため talent_ prefix を付ける
-- ============================================================

create or replace function public.talent_set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- ============================================================
-- 年度目標・投資設定
-- ============================================================

create table if not exists public.talent_investment_settings (
  id uuid primary key default gen_random_uuid(),
  fiscal_year text not null,
  app_name text not null default 'NOV Talent',
  corporation_id uuid references public.corporations(id) on delete restrict,
  target_hires integer not null default 0,
  target_contacts integer not null default 0,
  target_interviews integer not null default 0,
  hiring_budget integer not null default 0,
  expected_joiners integer not null default 0,
  memo text,
  is_active boolean not null default true,
  created_by_employee_id uuid references public.employees(id) on delete set null,
  updated_by_employee_id uuid references public.employees(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists talent_investment_settings_year_corp_unique
  on public.talent_investment_settings (fiscal_year, corporation_id)
  where corporation_id is not null;

create unique index if not exists talent_investment_settings_year_all_unique
  on public.talent_investment_settings (fiscal_year)
  where corporation_id is null;

-- ============================================================
-- 学校マスタ
-- Core DBに学校マスタはないため、人材投資固有データとして作成する
-- ============================================================

create table if not exists public.talent_schools (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  display_name text,
  area text,
  owner_employee_id uuid references public.employees(id) on delete set null,
  memo text,
  is_active boolean not null default true,
  created_by_employee_id uuid references public.employees(id) on delete set null,
  updated_by_employee_id uuid references public.employees(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ============================================================
-- フェア実績
-- ============================================================

create table if not exists public.talent_fairs (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  held_date date,
  corporation_id uuid references public.corporations(id) on delete restrict,
  owner_employee_id uuid references public.employees(id) on delete set null,
  cost integer not null default 0,
  contacts integer not null default 0,
  line_registrations integer not null default 0,
  salon_tours integer not null default 0,
  memo text,
  is_active boolean not null default true,
  created_by_employee_id uuid references public.employees(id) on delete set null,
  updated_by_employee_id uuid references public.employees(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists talent_fairs_held_date_idx
  on public.talent_fairs (held_date);

create index if not exists talent_fairs_corporation_id_idx
  on public.talent_fairs (corporation_id);

-- ============================================================
-- 学生データ
-- ============================================================

create table if not exists public.talent_students (
  id uuid primary key default gen_random_uuid(),
  student_code text unique,
  cohort text not null default '27卒',
  full_name text not null,
  gender text not null default '未回答',

  -- 学校は人材投資固有マスタを正としつつ、移行初期の確認用に文字列スナップショットも保持する
  school_id uuid references public.talent_schools(id) on delete set null,
  school_name_snapshot text,
  grade text,

  source_type text,
  source_name_snapshot text,
  fair_id uuid references public.talent_fairs(id) on delete set null,
  contact_date date,

  line_status text not null default '未登録',
  salon_tour_status text not null default '未設定',
  interview_status text not null default '未設定',
  result_status text not null default '未定',
  offer_status text not null default '未定',
  expected_join_status text not null default '未定',

  owner_employee_id uuid references public.employees(id) on delete set null,
  preferred_store_id uuid references public.stores(id) on delete set null,
  tour_store_id uuid references public.stores(id) on delete set null,
  expected_store_id uuid references public.stores(id) on delete set null,

  next_action text,
  next_action_date date,
  memo text,
  management_status text not null default '有効',

  created_by_employee_id uuid references public.employees(id) on delete set null,
  updated_by_employee_id uuid references public.employees(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint talent_students_gender_check
    check (gender in ('男性', '女性', 'その他', '未回答')),
  constraint talent_students_management_status_check
    check (management_status in ('有効', '管理対象外')),
  constraint talent_students_line_status_check
    check (line_status in ('未登録', '登録済')),
  constraint talent_students_salon_tour_status_check
    check (salon_tour_status in ('未設定', '予定', '実施済', 'キャンセル')),
  constraint talent_students_interview_status_check
    check (interview_status in ('未設定', '予定', '実施済', 'キャンセル')),
  constraint talent_students_result_status_check
    check (result_status in ('未定', '合格', '不合格', '辞退')),
  constraint talent_students_offer_status_check
    check (offer_status in ('未定', '内定', '承諾', '辞退')),
  constraint talent_students_expected_join_status_check
    check (expected_join_status in ('未定', '入社予定', '入社済', '辞退'))
);

-- 有効な学生について、同一卒業区分・学校・氏名の重複を抑止する
-- school_idが未設定の移行初期は school_name_snapshot で判定する
-- 同一学生の複数リスト登録を防ぐため、cohortをまたいで有効学生を一意にする
create unique index if not exists talent_students_unique_active_name_school
  on public.talent_students (
    regexp_replace(full_name, '\s+', '', 'g'),
    coalesce(school_id::text, regexp_replace(coalesce(school_name_snapshot, ''), '\s+', '', 'g'))
  )
  where management_status = '有効';

create index if not exists talent_students_cohort_idx
  on public.talent_students (cohort);

create index if not exists talent_students_school_id_idx
  on public.talent_students (school_id);

create index if not exists talent_students_owner_employee_id_idx
  on public.talent_students (owner_employee_id);

create index if not exists talent_students_expected_store_id_idx
  on public.talent_students (expected_store_id);

-- ============================================================
-- 操作履歴
-- ============================================================

create table if not exists public.talent_operation_logs (
  id uuid primary key default gen_random_uuid(),
  action text not null,
  table_name text not null,
  record_id uuid,
  student_id uuid references public.talent_students(id) on delete set null,
  student_code text,
  student_name_snapshot text,
  actor_employee_id uuid references public.employees(id) on delete set null,
  detail text,
  before_data jsonb,
  after_data jsonb,
  created_at timestamptz not null default now()
);

create index if not exists talent_operation_logs_student_id_idx
  on public.talent_operation_logs (student_id);

create index if not exists talent_operation_logs_actor_employee_id_idx
  on public.talent_operation_logs (actor_employee_id);

create index if not exists talent_operation_logs_created_at_idx
  on public.talent_operation_logs (created_at desc);

-- ============================================================
-- 学生フォロー履歴
-- ============================================================

create table if not exists public.talent_student_followups (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references public.talent_students(id) on delete restrict,
  action_title text not null,
  due_date date,
  status text not null default '未対応',
  owner_employee_id uuid references public.employees(id) on delete set null,
  memo text,
  created_by_employee_id uuid references public.employees(id) on delete set null,
  updated_by_employee_id uuid references public.employees(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint talent_student_followups_status_check
    check (status in ('未対応', '対応中', '完了', '不要'))
);

create index if not exists talent_student_followups_student_id_idx
  on public.talent_student_followups (student_id);

create index if not exists talent_student_followups_owner_employee_id_idx
  on public.talent_student_followups (owner_employee_id);

create index if not exists talent_student_followups_due_date_idx
  on public.talent_student_followups (due_date);

-- ============================================================
-- ビュー
-- ============================================================

create or replace view public.talent_dashboard_student_summary as
select
  cohort,
  count(*) filter (where management_status = '有効') as active_students,
  count(*) filter (where management_status = '管理対象外') as inactive_students,
  count(*) filter (where gender = '男性' and management_status = '有効') as male,
  count(*) filter (where gender = '女性' and management_status = '有効') as female,
  count(*) filter (where salon_tour_status = '予定' and management_status = '有効') as salon_tour_scheduled,
  count(*) filter (where interview_status = '予定' and management_status = '有効') as interview_scheduled,
  count(*) filter (where offer_status in ('内定', '承諾') and management_status = '有効') as offered,
  count(*) filter (where expected_join_status in ('入社予定', '入社済') and management_status = '有効') as expected_joiners,
  count(*) filter (
    where next_action is not null
      and next_action <> ''
      and next_action_date is null
      and management_status = '有効'
  ) as needs_follow_up
from public.talent_students
group by cohort;

create or replace view public.talent_fair_roi_ranking as
select
  id,
  name,
  held_date,
  corporation_id,
  owner_employee_id,
  cost,
  contacts,
  line_registrations,
  salon_tours,
  case when contacts > 0 then salon_tours::numeric / contacts else 0 end as salon_tour_rate,
  case when contacts > 0 then cost::numeric / contacts else 0 end as cost_per_contact,
  case when salon_tours > 0 then cost::numeric / salon_tours else null end as cost_per_tour,
  case
    when contacts = 0 then 'D'
    when salon_tours::numeric / contacts >= 0.5 then 'S'
    when salon_tours::numeric / contacts >= 0.3 then 'A'
    when salon_tours::numeric / contacts >= 0.15 then 'B'
    when salon_tours > 0 then 'C'
    else 'D'
  end as roi_rank
from public.talent_fairs;

-- ============================================================
-- updated_at triggers
-- ============================================================

drop trigger if exists talent_set_investment_settings_updated_at on public.talent_investment_settings;
create trigger talent_set_investment_settings_updated_at
before update on public.talent_investment_settings
for each row execute function public.talent_set_updated_at();

drop trigger if exists talent_set_schools_updated_at on public.talent_schools;
create trigger talent_set_schools_updated_at
before update on public.talent_schools
for each row execute function public.talent_set_updated_at();

drop trigger if exists talent_set_fairs_updated_at on public.talent_fairs;
create trigger talent_set_fairs_updated_at
before update on public.talent_fairs
for each row execute function public.talent_set_updated_at();

drop trigger if exists talent_set_students_updated_at on public.talent_students;
create trigger talent_set_students_updated_at
before update on public.talent_students
for each row execute function public.talent_set_updated_at();

drop trigger if exists talent_set_student_followups_updated_at on public.talent_student_followups;
create trigger talent_set_student_followups_updated_at
before update on public.talent_student_followups
for each row execute function public.talent_set_updated_at();

-- ============================================================
-- RLS
-- Phase 1: GAS backend + service_role経由を基本にする
-- service_roleはRLSをバイパスするため、フロントからのanon直接書き込みポリシーは作らない
-- ============================================================

alter table public.talent_investment_settings enable row level security;
alter table public.talent_schools enable row level security;
alter table public.talent_fairs enable row level security;
alter table public.talent_students enable row level security;
alter table public.talent_operation_logs enable row level security;
alter table public.talent_student_followups enable row level security;

-- Phase 1では明示的なanon/authenticated書き込みポリシーを作らない。
-- 必要になった段階で、novHub.currentEmployee / Supabase Auth / employee_roles に合わせて追加する。
