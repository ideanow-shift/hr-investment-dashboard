# Core DBレビュー依頼：NOV Talent フェア項目追加・学校訪問管理

## 相談先判定

★④ Core DB番人 v2

## 理由

NOV Talentで総務人事部から以下の追加要望が出ています。

- フェア分析に会場名、運営会社、担当者、備考を持たせたい
- 学校訪問管理ページを追加したい

既存UIだけでは表示できますが、Supabase正本として保存する場合は `talent_` テーブル/カラム追加が必要になるため、Core DB番人レビューを依頼します。

## 影響範囲

- NOV Talent固有データ
- `public.talent_fairs`
- 新規候補 `public.talent_school_visits`
- Core参照: `public.employees(id)`, `public.talent_schools(id)`

社員・店舗・部署・役職・職種・権限の独自マスタは作りません。

## 1. フェア項目追加案

### 追加したい項目

- 会場名
- 運営会社
- 備考
- 担当者

担当者は既存方針どおり `owner_employee_id references public.employees(id)` を使います。

運営会社はフェア運営会社の分類です。Core DBの法人マスタとは別物のため、初期は `text` または `check` 制約でよいか確認したいです。

### 運営会社候補

- エイドクリエイツ
- セイファート
- ヘアワークス
- トーコン
- ビューティープロ
- さんぽう
- ディーラー
- 学校開催
- 他

### DDL案

```sql
alter table public.talent_fairs
  add column if not exists venue_name text,
  add column if not exists organizer_name text;

comment on column public.talent_fairs.venue_name is 'フェア会場名。正本マスタではなくフェア実績の表示・検索用スナップショット。';
comment on column public.talent_fairs.organizer_name is 'フェア運営会社分類。Core法人マスタではなく採用フェア運用上の分類。';
```

### 確認したいこと

1. `organizer_name text` でよいか
2. 運営会社マスタを作る必要があるか
3. `check` 制約で候補値を固定すべきか
4. 既存 `memo` はそのまま備考として使ってよいか

## 2. 学校訪問管理ページ追加案

### 目的

学校との関係構築、訪問履歴、先生との会話、次回持参物をNOV Talent内で確認できるようにする。

### 項目

- 学校名
- 訪問日
- 訪問者
- 担当の先生氏名
- 持参物
- 会話内容

### 正本方針

- 学校: `public.talent_schools(id)`
- 訪問者: `public.employees(id)`
- 作成者/更新者: `public.employees(id)`
- 先生氏名、持参物、会話内容はNOV Talent固有の履歴情報として保存

### DDL案

```sql
create table if not exists public.talent_school_visits (
  id uuid primary key default gen_random_uuid(),
  school_id uuid references public.talent_schools(id) on delete restrict,
  visited_on date not null,
  visitor_employee_id uuid references public.employees(id) on delete set null,
  teacher_name text,
  bring_items text,
  conversation_note text,
  memo text,
  is_active boolean not null default true,
  created_by_employee_id uuid references public.employees(id) on delete set null,
  updated_by_employee_id uuid references public.employees(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists talent_school_visits_school_id_idx
  on public.talent_school_visits (school_id);

create index if not exists talent_school_visits_visited_on_idx
  on public.talent_school_visits (visited_on desc);

create index if not exists talent_school_visits_visitor_employee_id_idx
  on public.talent_school_visits (visitor_employee_id);

drop trigger if exists talent_set_school_visits_updated_at on public.talent_school_visits;
create trigger talent_set_school_visits_updated_at
before update on public.talent_school_visits
for each row execute function public.talent_set_updated_at();

alter table public.talent_school_visits enable row level security;

grant select, insert, update on public.talent_school_visits to service_role;
```

### RLS方針

- RLS enable
- Phase1はGAS backend + service_role経由
- anon/authenticatedへの直接書き込みpolicyなし

## 3. 実行可否の希望

レビューOKなら、まずDDL投入ではなく以下の順で進めたいです。

1. Core DB番人レビュー
2. SQL Editor投入は脇田さん実行
3. GAS `Code.gs` に取得・保存API追加
4. NOV Talent UIに学校訪問タブ追加
5. 総務人事部で入力テスト

## 4. 実行していないこと

- DDL投入
- UPDATE/DELETE
- GRANT/RLS変更
- role/employee_roles変更
- Secret変更
- Coreマスタ変更
