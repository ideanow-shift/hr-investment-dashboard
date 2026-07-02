# NOV Talent HUB連携設計

## 2026-07-02 HUB側確認結果

人財投資管理システム（NOV Talent）は、Management Platformと同じく NOV HUB Context 方式で連携する。

## 基本方針

- NOV HUBを入口にする
- HUBログイン後、`hub_context` をURLパラメータで渡す
- NOV Talent側では `hub_context` の社員情報・所属・roleKeysをもとに表示を切り替える
- 独自の社員マスタ・権限マスタは作らない
- Core DBの `employees` / `employee_roles` / `roles` を正本にする

## hub_contextで参照する情報

- `employeeId` / `coreEmployeeId` / `supabaseEmployeeId`
- `employeeNumber`
- `fullName`
- `email` / `authEmail`
- `storeId` / `storeName`
- `departmentId` / `departmentName`
- `positionId` / `positionName`
- `jobTypeId` / `jobTypeName`（Core DB側で `job_types` 新設後）
- `roleKeys`
- `roles`
- `permissions`
- `authType`

## hub_contextに含めない情報

以下は絶対に `hub_context` に含めない。

- PIN
- PIN hash
- Firebase ID token
- Supabase service_role key
- LINE WORKS Secret
- API Secret類

## 権限判定

画面表示は `roleKeys` / `permissions` ベースで行う。

ただし、重要な登録・更新・承認処理はフロントだけで判断しない。GAS backend / Edge Function側でも再検証する。

## HUBカード表示方針

HUB側では、NOV Talentカード表示を `roleKeys` / `permissions` ベースで制御する。

初期推奨:

| roleKey | 表示方針 |
| --- | --- |
| `executive` | 表示 |
| `super_admin` | 表示 |
| `backoffice` | 表示 |
| `department_manager` | 必要に応じて表示 |
| `store_manager` | 必要に応じて表示 |
| `staff` | 原則非表示。本人向け導線がある場合のみ表示 |

## 連携URL方針

将来的にHUBからの遷移は以下の形式へ統一する。

```text
https://ideanow-shift.github.io/idea-nov-hub/human-capital-investment/?hub_context=...
```

現行のNOV Talent公開URLとは別に、HUB側のルーティング名を統一する可能性がある。URL変更時はHUB側とNOV Talent側の両方で確認する。

## NOV Talent側の実装方針

- `hub_context` を受け取り、保存前にHUB社員情報を保持する
- 操作履歴には `actor_employee_id` を優先して記録する
- 表示用に氏名・役職・所属を出してもよいが、正本はCore DBのIDとする
- 職種を表示・判定に使う場合も、正本はCore DBの `job_types.id` とする
- HUB未連携時は保存系操作を制限する
- 保存系操作はbackend側でも `employee_roles` / `roles` を確認する
- role新設・権限追加・Core DB参照変更はOS/Core DB側レビュー後に進める

## 注意

service_role key、LSTEP APIキー、その他Secretはフロント・GitHub Pages・Obsidian本文・config.jsに出さない。

## 社員属性の扱い

NOV Talentでは社員属性を独自マスタ化しない。

| 属性 | 正本 |
| --- | --- |
| 部署 | `departments.id` |
| 役職 | `positions.id` |
| 職種 | `job_types.id` |
| 権限 | `roles` / `employee_roles` |

雇用形態、就労ステータス、休職種別はCore DBの社員属性として参照する。`レセプションパート` のような混合値はNOV Talent側で新たに作らず、Core DB側の方針に合わせて職種と雇用形態を分離する。
