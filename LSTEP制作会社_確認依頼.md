# LSTEP制作会社への確認依頼

NOV TalentとLSTEPを連携する前提で、以下の項目をご確認ください。

## 目的

NOV Talent側の学生正本 `talent_students` と、LSTEP/LINE側の友だち情報を安全に紐付けたいです。

まずはCSV連携を想定し、可能であればAPIまたはWebhook連携へ進めます。

## 確認したい項目

1. ユーザー識別子
   - LINEユーザーIDを出力できますか。
   - LSTEP側のユーザーIDを出力できますか。
   - どちらを一意キーとして扱うのが安定しますか。

2. 友だち状態
   - 友だち、ブロック、配信不可、未登録などを判別できますか。
   - CSV/APIでの項目名と値の例を教えてください。

3. 最終接点
   - 最終メッセージ日時を取得できますか。
   - 最終反応日時、フォーム回答日時を取得できますか。

4. タグ・シナリオ
   - 付与済みタグを一覧出力できますか。
   - シナリオ名、ステップ名、配信グループ名を取得できますか。

5. 同期方法
   - CSV手動出力に対応できますか。
   - APIによる定期取得に対応できますか。
   - Webhookによるリアルタイム受信に対応できますか。

6. 制限事項
   - 1回あたりの出力件数制限はありますか。
   - API利用回数制限はありますか。
   - 個人情報項目の出力制限や契約上の制限はありますか。

## NOV Talent側で用意済みの列案

ダッシュボードの「学生フォロー」画面にある「LSTEP連携状況」から「連携テンプレート」を出力できます。

テンプレート列:

- student_id
- student_name
- school_name
- line_user_id
- lstep_user_id
- friend_status
- blocked_at
- last_message_at
- last_reaction_at
- tag_names
- scenario_names
- memo

## セキュリティ方針

- LSTEP APIキーや秘密情報はフロント画面に保持しません。
- 保存・同期はGAS backendまたは将来的なサーバー/Edge Function経由で行います。
- Supabaseのservice_role keyはGAS Script Properties等のbackend側だけで保持します。
