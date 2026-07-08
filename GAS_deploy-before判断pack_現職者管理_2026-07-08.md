# GAS deploy-before判断pack: 現職者管理 / 入社手続きキュー

作成日: 2026-07-08

## 判断

現時点ではGAS deploy-before packは「準備のみ」で十分です。GAS貼り替え・deployはまだ不要です。

## 理由

- 現職者管理はUI preview / 設計資料段階
- 入社手続きキュー用テーブルは未作成
- RLS / GRANT / RPCは未承認
- backendで保存すべき実体がまだ存在しない
- 既存のリクルート管理機能は現行GASで動作中

## deploy-before packが必要になる条件

以下のいずれかがCore承認済みになったら作成します。

1. `talent_employee_onboarding_cases` / `talent_employee_onboarding_check_items` が作成される
2. service_roleのGRANT方針が承認される
3. 入社手続きキューの作成・更新をGAS backendから行う
4. 操作ログに入社手続き操作を記録する
5. HUB context / roleKeys をbackendで再検証する関数を追加する

## 将来deploy-before packに含めるもの

### 追加予定関数候補

- `getOnboardingCases`
- `createOnboardingCaseFromStudent`
- `updateOnboardingCase`
- `completeOnboardingCheckItem`
- `cancelOnboardingCase`
- `logOnboardingOperation`

### 既存関数への影響確認

- `doGet`
- `handleWriteAction`
- `getDashboardData`
- `getSupabaseStudents_`
- `addSupabaseStudentFromDashboard_`
- `updateSupabaseStudentFromDashboard_`
- `writeSupabaseOperationLog_`

### テスト観点

- HUB連携済みユーザーで保存できる
- 権限なしユーザーはbackendで拒否される
- 拒否ログが残る
- service_role keyがフロントに出ない
- 既存の学生カード保存に影響しない
- GAS Connected v0.2の表示が維持される

## 現時点で実行しないこと

- GAS Code.gs貼り替え
- clasp push
- clasp deploy
- Script Properties変更
- service_role変更
- Supabase本番データ更新

