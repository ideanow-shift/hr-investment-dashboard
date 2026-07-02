-- NOV Talent / student job type references
-- 学生の希望職種・応募職種を扱う段階で投入する追加DDL
--
-- 方針:
-- - 職種表示名を talent_students に保存しない
-- - Core DB共通マスタ public.job_types(id) を参照する
-- - 未設定はNULL

alter table public.talent_students
  add column if not exists desired_job_type_id uuid references public.job_types(id) on delete restrict,
  add column if not exists applied_job_type_id uuid references public.job_types(id) on delete restrict;

comment on column public.talent_students.desired_job_type_id is '学生の希望職種。正本は public.job_types.id。未設定はNULL。';
comment on column public.talent_students.applied_job_type_id is '学生の応募・採用想定職種。正本は public.job_types.id。未設定はNULL。';

create index if not exists talent_students_desired_job_type_id_idx
  on public.talent_students (desired_job_type_id);

create index if not exists talent_students_applied_job_type_id_idx
  on public.talent_students (applied_job_type_id);

grant select on public.job_types to service_role;
grant select, update on public.talent_students to service_role;
