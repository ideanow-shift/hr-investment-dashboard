# RLS / RPC / GRANT 分割ゲート案: 現職者管理

作成日: 2026-07-08

## 目的

現職者管理 / 入社手続きキューを本番化する前に、DB定義、権限、API、GAS deployを一気に進めず、確認ゲートを分割するための案です。

## Gate 0: UI preview / docs

状態:

- 既に進行中
- DB変更なし
- 現職者管理タブ、入社手続き候補、確認サマリーを表示

許可:

- UI改善
- docs / checklist / Claude pack
- SELECT-only inventory

禁止:

- DDL
- UPDATE / DELETE
- GRANT / RLS / RPC
- Secret変更

## Gate 1: DDL candidate review

成果物:

- `DDL候補pack_現職者管理_入社手続きキュー_2026-07-08.md`
- `SELECT-only_inventory_pack_現職者管理_2026-07-08.md`

CoreOS判断:

- テーブル責務
- HR Moduleとの境界
- employees/stores/departments/positions/job_types参照
- converted_employee_id保持可否

実行:

- まだSQL Editor投入しない

## Gate 2: DDL-only apply

Core承認後に検討。

範囲:

- table作成
- index作成
- updated_at trigger
- RLS enable

まだしない:

- RPC作成
- GRANT拡張
- API接続
- GAS deploy
- 本番データ作成

## Gate 3: GRANT / backend access

DDL-only apply後に検討。

範囲:

- `service_role` に必要最小限の `select, insert, update`
- `delete` grantなし
- anon/authenticated向け直接書き込みpolicyなし

確認:

- GAS Script Propertiesのservice_roleを使う
- GitHub Pagesへsecretを出さない
- 監査ログの保存先

## Gate 4: RPC / API design

GAS backendまたは将来Edge Functionで実装する操作を設計。

候補:

- `createOnboardingCaseFromStudent`
- `updateOnboardingCase`
- `completeOnboardingCheckItem`
- `cancelOnboardingCase`
- `getOnboardingCases`

注意:

- `convertOnboardingCaseToEmployee` はHR/Core側判断後
- employees更新はこのGateでは行わない

## Gate 5: GAS deploy-before pack

GAS更新が必要になった段階で作成。

含めるもの:

- 追加する関数一覧
- 既存関数への影響
- Script Properties変更有無
- deploy前テスト
- deploy後テスト
- rollback方法

## Gate 6: limited operation test

総務人事部の限定ユーザーで検証。

確認:

- 候補作成
- チェック項目更新
- 承認
- 取消
- 操作ログ
- 権限なしユーザーの拒否

## 常時禁止

- Secretをフロントへ出す
- GitHub PagesからSupabaseへ直接書き込む
- `employees` をNOV Talentから無レビューで更新する
- HR秘匿情報をNOV Talentへ保存する
- 物理削除を通常操作にする

