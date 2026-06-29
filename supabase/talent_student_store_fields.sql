-- NOV Talent: student store preferences and tour histories
-- Core DB reviewed: store and employee master data remain in public.stores / public.employees.
-- Phase 1 access: GAS backend with service_role only. Do not expose service_role to frontend.

-- Pre-check before running this file:
-- select proname from pg_proc where proname = 'talent_set_updated_at';

create table if not exists public.talent_student_store_preferences (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references public.talent_students(id) on delete restrict,
  store_id uuid not null references public.stores(id) on delete restrict,
  preference_rank integer not null,
  memo text,
  is_active boolean not null default true,
  created_by_employee_id uuid references public.employees(id) on delete set null,
  updated_by_employee_id uuid references public.employees(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint talent_student_store_preferences_rank_check
    check (preference_rank between 1 and 3)
);

create index if not exists talent_student_store_preferences_student_idx
  on public.talent_student_store_preferences (student_id);

create index if not exists talent_student_store_preferences_store_idx
  on public.talent_student_store_preferences (store_id);

create unique index if not exists talent_student_store_preferences_active_rank_unique
  on public.talent_student_store_preferences (student_id, preference_rank)
  where is_active = true;

create unique index if not exists talent_student_store_preferences_active_store_unique
  on public.talent_student_store_preferences (student_id, store_id)
  where is_active = true;

drop trigger if exists talent_set_student_store_preferences_updated_at
  on public.talent_student_store_preferences;

create trigger talent_set_student_store_preferences_updated_at
before update on public.talent_student_store_preferences
for each row execute function public.talent_set_updated_at();

alter table public.talent_student_store_preferences enable row level security;

grant select, insert, update
  on public.talent_student_store_preferences
  to service_role;


create table if not exists public.talent_student_store_tour_histories (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references public.talent_students(id) on delete restrict,
  store_id uuid not null references public.stores(id) on delete restrict,
  tour_date date,
  tour_status text not null default '予定',
  memo text,
  is_active boolean not null default true,
  created_by_employee_id uuid references public.employees(id) on delete set null,
  updated_by_employee_id uuid references public.employees(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint talent_student_store_tour_histories_status_check
    check (tour_status in ('予定', '実施済', 'キャンセル'))
);

create index if not exists talent_student_store_tour_histories_student_idx
  on public.talent_student_store_tour_histories (student_id);

create index if not exists talent_student_store_tour_histories_store_idx
  on public.talent_student_store_tour_histories (store_id);

create index if not exists talent_student_store_tour_histories_date_idx
  on public.talent_student_store_tour_histories (tour_date);

create unique index if not exists talent_student_store_tour_histories_active_unique
  on public.talent_student_store_tour_histories (
    student_id,
    store_id,
    coalesce(tour_date, date '1900-01-01')
  )
  where is_active = true;

drop trigger if exists talent_set_student_store_tour_histories_updated_at
  on public.talent_student_store_tour_histories;

create trigger talent_set_student_store_tour_histories_updated_at
before update on public.talent_student_store_tour_histories
for each row execute function public.talent_set_updated_at();

alter table public.talent_student_store_tour_histories enable row level security;

grant select, insert, update
  on public.talent_student_store_tour_histories
  to service_role;

grant select on public.stores to service_role;
