# Core/HUBレビュー依頼: 総務人事管理システム構想

作成日: 2026-07-06

## 相談先判定

相談先判定: ★Core DB番人 v2 / ☆HUB Core / ☆HUB人事労務管理

理由:

- リクルート管理から入社後手続き、社員マスタ反映までを扱う構想のため
- `employees`、`stores`、`departments`、`positions`、`job_types`、`roles`、`employee_assignment_histories` に関わる可能性があるため
- 入社手続き、休職、産休、育休、退職などHR秘匿情報に接近するため

## 背景

現在のNOV Talent / 人材投資管理は、実態としてリクルート管理システムになっている。
今後、総務人事部が以下を一元管理できる上位システムとして再整理したい。

```text
総務人事管理システム
├─ ① リクルート管理システム
└─ ② 現職者管理システム
```

## 実現したいこと

### ① リクルート管理システム

現在のNOV Talentを継続する。

- 学生管理
- フェア分析
- 学校分析
- 面接管理
- 内定・入社予定
- 採用ROI
- LSTEP連携

### ② 現職者管理システム

入社決定後の手続きを管理したい。

- 入社後の手続き
- 産休・育休・休職手続き
- 復職手続き
- 退職手続き
- 異動手続き
- 社員マスタ反映待ち

## 想定フロー

```text
リクルート管理
  学生が内定 / 入社決定
↓
現職者管理
  入社手続き開始
↓
必要情報・書類・配属・雇用条件を確認
↓
総務人事部または管理者が承認
↓
Core DB employees / assignment histories へ反映
```

## 重要な設計方針案

- 社員・店舗・部署・役職・職種・権限は独自マスタ化しない
- 社員は `public.employees.id` を正本にする
- 店舗は `public.stores.id` を正本にする
- 部署は `public.departments.id` を正本にする
- 役職は `public.positions.id` を正本にする
- 職種は `public.job_types.id` を正本にする
- 権限は `public.roles` / `public.employee_roles` を正本にする
- 入社、異動、休職、退職などの履歴はCore DB方針と合わせる
- HR秘匿情報はNOV Talent側に安易に持ち込まない
- 社員マスタへの反映は、最初は自動ではなく承認制にする

## レビューしてほしいこと

1. この上位構成を「総務人事管理システム」として進めてよいか
2. 現職者管理はNOV Talent配下の別タブで始めてよいか、それともHUB HR Module側に寄せるべきか
3. 入社決定者を `employees` に反映する前の中間テーブルが必要か
4. 入社・異動・休職・退職の手続き履歴はどのschema / table境界で持つべきか
5. `employee_assignment_histories` への反映はどの承認フローを通すべきか
6. 現職者管理で扱ってよい情報と、HR秘匿領域に分けるべき情報
7. 総務人事部スタッフの権限を `talent_admin` と別にする必要があるか
8. HUBカードやナビゲーション上の表示名をどう整理するべきか

## 現時点で実行していないこと

- DDL投入
- Core DB更新
- `employees` 更新
- `employee_assignment_histories` 更新
- role / employee_roles変更
- GRANT / RLS / RPC変更
- Secret / service_role変更
- HR秘匿情報の保存
- 本番deploy

## 希望する判断

まずは、現職者管理システムを作る場合の責務境界を確認したい。

特に以下を判断してほしい。

- NOV Talent拡張として進めるべきか
- HUB HR Module側に寄せるべきか
- 中間テーブル・承認キューが必要か
- Core DBに反映する前の安全なPhase 1運用は何か
