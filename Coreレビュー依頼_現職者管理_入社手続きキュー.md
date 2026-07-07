# Coreレビュー依頼: 現職者管理 / 入社手続きキュー

作成日: 2026-07-07

## 相談先判定

★Core DB番人 v2

## 理由

リクルート管理システムで内定・入社決定になった学生を、将来の現職者管理へ引き継ぐ場合、`talent_students.id` から `employees.id` へ接続する設計が必要になるためです。

社員マスタ、店舗、部署、役職、職種、権限、HR秘匿情報の境界に関わるため、実装前にCore DB / HUB / HR Moduleの責務分担を確認したいです。

## 現在の状態

- 現在の本番運用中心は `リクルート管理システム`
- 学生正本は `public.talent_students.id`
- 社員正本は `public.employees.id`
- 店舗は `public.stores.id`
- 部署は `public.departments.id`
- 役職は `public.positions.id`
- 職種は `public.job_types.id`
- 権限は `roles / employee_roles`
- 現職者管理は設計資料・モック段階で、DB変更は未実行

## 実行したいこと

将来的に、内定・承諾・入社日確定になった学生を、以下のような「入社手続きキュー」に送る設計を検討したいです。

```text
リクルート管理
  talent_students.id
    ↓
現職者管理
  入社手続きキュー
    ↓ 承認後
Core DB / HR Module側の社員化フロー
```

## 検討中の画面

- 入社手続き
- 配属予定確認
- 必要書類チェック
- 雇用条件確認
- 社員マスタ反映待ち
- 操作・承認履歴

## 保持したい候補項目

| 項目 | 参照元/正本候補 | 備考 |
| --- | --- | --- |
| 引継ぎ元学生 | `talent_students.id` | 社員化前の候補者ID |
| 作成者 | `employees.id` | HUBログイン社員 |
| 更新者 | `employees.id` | HUBログイン社員 |
| 承認者 | `employees.id` | 管理者/総務人事責任者 |
| 配属予定店舗 | `stores.id` | 店舗名は保存しない |
| 部署 | `departments.id` | 必要な場合のみ |
| 役職 | `positions.id` | 必要な場合のみ |
| 職種 | `job_types.id` | 必要な場合のみ |
| 入社予定日 | 未定 | HR/Coreどちらの正本か確認 |
| 手続きステータス | 未定 | Talent側で持つかHR側で持つか確認 |
| 社員化後ID | `employees.id` | 作成後に紐付ける候補 |

## HR秘匿情報として避けるもの

NOV Talent側には以下を正本保存しない方針です。

- マイナンバー
- 給与
- 税
- 社会保険
- 銀行口座
- 住所詳細
- 家族/扶養情報
- 健康情報
- 休職理由の詳細
- 契約書本文

## Core DB番人へ確認したいこと

1. 入社手続きキューは `talent_` prefixで持つべきか、HR Module側で持つべきか
2. `talent_students.id` と `employees.id` の紐付けは専用テーブルが必要か
3. 社員化前の候補者を `employees` に作るタイミングはどこか
4. 入社予定日、配属予定店舗、職種、雇用形態はどの段階でCore正本へ反映するべきか
5. 承認ログは `talent_` 側でよいか、共通監査ログへ寄せるべきか
6. HR秘匿情報に接近する項目は、どこからHR Moduleへ切り出すべきか
7. RLS / service_role / Edge Function / GAS backendの推奨境界

## まだ実行しないこと

- DDL投入
- RLS / GRANT / RPC追加
- `employees` INSERT / UPDATE
- `employee_assignment_histories` INSERT / UPDATE
- 物理削除
- Secret / service_role変更
- HUB context仕様変更

## 希望する判断

現職者管理の入社手続きキューを、NOV Talent側の `talent_` 領域として設計してよいか。
それとも、HR Module側の領域として切り出すべきか。

