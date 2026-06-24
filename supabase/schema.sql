-- NOV Talent Supabase schema
-- PostgreSQL / Supabase 用の初期DB設計案です。
-- 実行前に Supabase SQL Editor で内容を確認してください。

create extension if not exists pgcrypto;

create table if not exists app_settings (
  id uuid primary key default gen_random_uuid(),
  fiscal_year text not null default '2026',
  app_name text not null default 'NOV Talent',
  target_hires integer not null default 0,
  target_contacts integer not null default 0,
  target_interviews integer not null default 0,
  hiring_budget integer not null default 0,
  expected_joiners integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists schools (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  display_name text,
  area text,
  memo text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists fairs (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  held_date date,
  cost integer not null default 0,
  contacts integer not null default 0,
  line_registrations integer not null default 0,
  salon_tours integer not null default 0,
  memo text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists students (
  id uuid primary key default gen_random_uuid(),
  student_code text unique,
  cohort text not null default '27卒',
  full_name text not null,
  gender text not null default '未回答',
  school_id uuid references schools(id) on delete set null,
  school_name text not null,
  grade text,
  source_type text,
  source_name text,
  fair_id uuid references fairs(id) on delete set null,
  contact_date date,
  line_status text not null default '未登録',
  salon_tour_status text not null default '未設定',
  interview_status text not null default '未設定',
  result_status text not null default '未定',
  offer_status text not null default '未定',
  expected_join_status text not null default '未定',
  owner text,
  next_action text,
  next_action_date date,
  memo text,
  management_status text not null default '有効',
  created_by text,
  updated_by text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint students_gender_check check (gender in ('男性', '女性', 'その他', '未回答')),
  constraint students_management_status_check check (management_status in ('有効', '管理対象外')),
  constraint students_line_status_check check (line_status in ('未登録', '登録済')),
  constraint students_salon_tour_status_check check (salon_tour_status in ('未設定', '予定', '実施済', 'キャンセル')),
  constraint students_interview_status_check check (interview_status in ('未設定', '予定', '実施済', 'キャンセル')),
  constraint students_result_status_check check (result_status in ('未定', '合格', '不合格', '辞退')),
  constraint students_offer_status_check check (offer_status in ('未定', '内定', '承諾', '辞退')),
  constraint students_expected_join_status_check check (expected_join_status in ('未定', '入社予定', '入社済', '辞退'))
);

create unique index if not exists students_unique_name_school_cohort
  on students (regexp_replace(full_name, '\s+', '', 'g'), regexp_replace(school_name, '\s+', '', 'g'), cohort)
  where management_status = '有効';

create table if not exists operation_logs (
  id uuid primary key default gen_random_uuid(),
  action text not null,
  table_name text not null,
  record_id uuid,
  student_id uuid references students(id) on delete set null,
  student_code text,
  student_name text,
  actor text,
  detail text,
  before_data jsonb,
  after_data jsonb,
  created_at timestamptz not null default now()
);

create table if not exists student_followups (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references students(id) on delete cascade,
  action_title text not null,
  due_date date,
  status text not null default '未対応',
  memo text,
  created_by text,
  updated_by text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint student_followups_status_check check (status in ('未対応', '対応中', '完了', '不要'))
);

create or replace view dashboard_student_summary as
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
  count(*) filter (where next_action is not null and next_action <> '' and next_action_date is null and management_status = '有効') as needs_follow_up
from students
group by cohort;

create or replace view fair_roi_ranking as
select
  id,
  name,
  held_date,
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
from fairs;

create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists set_app_settings_updated_at on app_settings;
create trigger set_app_settings_updated_at
before update on app_settings
for each row execute function set_updated_at();

drop trigger if exists set_schools_updated_at on schools;
create trigger set_schools_updated_at
before update on schools
for each row execute function set_updated_at();

drop trigger if exists set_fairs_updated_at on fairs;
create trigger set_fairs_updated_at
before update on fairs
for each row execute function set_updated_at();

drop trigger if exists set_students_updated_at on students;
create trigger set_students_updated_at
before update on students
for each row execute function set_updated_at();

drop trigger if exists set_student_followups_updated_at on student_followups;
create trigger set_student_followups_updated_at
before update on student_followups
for each row execute function set_updated_at();

alter table app_settings enable row level security;
alter table schools enable row level security;
alter table fairs enable row level security;
alter table students enable row level security;
alter table operation_logs enable row level security;
alter table student_followups enable row level security;

-- 初期検証用ポリシーです。本番前に認証方式に合わせて見直してください。
create policy "authenticated read app_settings" on app_settings for select to authenticated using (true);
create policy "authenticated write app_settings" on app_settings for all to authenticated using (true) with check (true);

create policy "authenticated read schools" on schools for select to authenticated using (true);
create policy "authenticated write schools" on schools for all to authenticated using (true) with check (true);

create policy "authenticated read fairs" on fairs for select to authenticated using (true);
create policy "authenticated write fairs" on fairs for all to authenticated using (true) with check (true);

create policy "authenticated read students" on students for select to authenticated using (true);
create policy "authenticated write students" on students for all to authenticated using (true) with check (true);

create policy "authenticated read operation_logs" on operation_logs for select to authenticated using (true);
create policy "authenticated insert operation_logs" on operation_logs for insert to authenticated with check (true);

create policy "authenticated read followups" on student_followups for select to authenticated using (true);
create policy "authenticated write followups" on student_followups for all to authenticated using (true) with check (true);
