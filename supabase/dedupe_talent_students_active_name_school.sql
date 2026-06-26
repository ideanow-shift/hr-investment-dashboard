-- NOV Talent active student duplicate cleanup
-- Purpose:
--   1. Keep one active row per same full_name + school.
--   2. Mark duplicate rows as 管理対象外 so KPI counts do not double count them.
--   3. Replace the active unique index so duplicates are blocked across cohorts.
--
-- Safe policy:
--   - Do not delete rows.
--   - Do not delete followups or operation logs.
--   - Prefer the row with the most advanced status.

-- ============================================================
-- 1. Preview duplicate groups before applying
-- ============================================================

select
  regexp_replace(full_name, '\s+', '', 'g') as normalized_name,
  coalesce(school_id::text, regexp_replace(coalesce(school_name_snapshot, ''), '\s+', '', 'g')) as normalized_school,
  count(*) as duplicate_count,
  array_agg(student_code order by updated_at desc nulls last, created_at desc) as student_codes,
  array_agg(cohort order by updated_at desc nulls last, created_at desc) as cohorts,
  array_agg(offer_status order by updated_at desc nulls last, created_at desc) as offer_statuses
from public.talent_students
where management_status = '有効'
group by
  regexp_replace(full_name, '\s+', '', 'g'),
  coalesce(school_id::text, regexp_replace(coalesce(school_name_snapshot, ''), '\s+', '', 'g'))
having count(*) > 1
order by duplicate_count desc, normalized_name;

-- ============================================================
-- 2. Mark duplicate rows as 管理対象外
-- ============================================================

with ranked as (
  select
    id,
    student_code,
    full_name,
    school_name_snapshot,
    cohort,
    memo,
    row_number() over (
      partition by
        regexp_replace(full_name, '\s+', '', 'g'),
        coalesce(school_id::text, regexp_replace(coalesce(school_name_snapshot, ''), '\s+', '', 'g'))
      order by
        case expected_join_status
          when '入社済' then 100
          when '入社予定' then 90
          else 0
        end desc,
        case offer_status
          when '承諾' then 80
          when '内定' then 70
          else 0
        end desc,
        case result_status
          when '合格' then 60
          else 0
        end desc,
        case interview_status
          when '実施済' then 50
          when '予定' then 40
          else 0
        end desc,
        case salon_tour_status
          when '実施済' then 30
          when '予定' then 20
          else 0
        end desc,
        updated_at desc nulls last,
        created_at desc,
        student_code asc
    ) as keep_rank
  from public.talent_students
  where management_status = '有効'
),
duplicates as (
  select *
  from ranked
  where keep_rank > 1
)
update public.talent_students s
set
  management_status = '管理対象外',
  memo = trim(both E'\n' from concat_ws(
    E'\n',
    nullif(s.memo, ''),
    '重複整理により管理対象外へ変更: ' || to_char(now(), 'YYYY-MM-DD HH24:MI')
  )),
  updated_at = now()
from duplicates d
where s.id = d.id
returning
  s.student_code,
  s.full_name,
  s.school_name_snapshot,
  s.cohort,
  s.management_status,
  s.memo;

-- ============================================================
-- 3. Replace unique index to block duplicates across cohorts
-- ============================================================

drop index if exists public.talent_students_unique_active_name_school_cohort;

create unique index if not exists talent_students_unique_active_name_school
  on public.talent_students (
    regexp_replace(full_name, '\s+', '', 'g'),
    coalesce(school_id::text, regexp_replace(coalesce(school_name_snapshot, ''), '\s+', '', 'g'))
  )
  where management_status = '有効';

-- ============================================================
-- 4. Confirm no active duplicates remain
-- ============================================================

select
  regexp_replace(full_name, '\s+', '', 'g') as normalized_name,
  coalesce(school_id::text, regexp_replace(coalesce(school_name_snapshot, ''), '\s+', '', 'g')) as normalized_school,
  count(*) as duplicate_count,
  array_agg(student_code order by student_code) as student_codes
from public.talent_students
where management_status = '有効'
group by
  regexp_replace(full_name, '\s+', '', 'g'),
  coalesce(school_id::text, regexp_replace(coalesce(school_name_snapshot, ''), '\s+', '', 'g'))
having count(*) > 1
order by duplicate_count desc, normalized_name;
