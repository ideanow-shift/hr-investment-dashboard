-- NOV Talent: active student duplicate guard normalization hardening
-- Purpose:
--   Recreate the active duplicate guard so full-width spaces and SQL-visible whitespace
--   are ignored for full_name and school_name_snapshot.
--   Run this only after active duplicates have been cleaned up.

begin;

drop index if exists public.talent_students_unique_active_name_school;

create unique index talent_students_unique_active_name_school
  on public.talent_students (
    regexp_replace(full_name, '[[:space:]　]+', '', 'g'),
    coalesce(school_id::text, regexp_replace(coalesce(school_name_snapshot, ''), '[[:space:]　]+', '', 'g'))
  )
  where management_status = '有効';

commit;

-- Confirm no active duplicates remain under the same normalized rule.
select
  regexp_replace(full_name, '[[:space:]　]+', '', 'g') as normalized_name,
  coalesce(school_id::text, regexp_replace(coalesce(school_name_snapshot, ''), '[[:space:]　]+', '', 'g')) as normalized_school,
  count(*) as active_count,
  string_agg(coalesce(student_code, id::text), ' / ' order by student_code) as student_codes
from public.talent_students
where management_status = '有効'
group by 1, 2
having count(*) > 1
order by active_count desc, normalized_name;