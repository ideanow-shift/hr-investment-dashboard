# NOV Talent GAS Supabase接続手順

## 目的

既存GAS版を止めずに、読み取りだけSupabase優先へ切り替えます。

```text
GitHub Pages
  -> GAS Web App
  -> Supabase
  -> PostgreSQL
```

Supabase読み取りに失敗した場合は、これまで通りGoogleスプレッドシートから読み取ります。

## 1. Code.gsを更新

以下のローカルファイルを開き、内容をApps Scriptの `Code.gs` に貼り替えます。

```text
C:\Users\bassa\Desktop\人財投資管理システム\hr-investment-dashboard-gas-retry\gas\Code.gs
```

貼り替え後、Apps Script画面で保存します。

## 2. Script Propertiesを設定

Apps Script画面の左メニューから、プロジェクトの設定を開きます。

スクリプト プロパティに以下を追加します。

| プロパティ | 内容 |
| --- | --- |
| `SUPABASE_URL` | Supabase Project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service_role key |

重要:

- `service_role` key はフロントエンド、GitHub、app.jsには置かない
- GAS Script Propertiesのみに保存する
- anon keyではなく、Phase 1はGAS backend + service_roleで読み書きを制御する

## 3. 動作確認

Apps Scriptの関数選択で `doGet` ではなく、以下のような簡易テスト関数を一時的に実行して確認できます。

```javascript
function testSupabaseDashboardData() {
  const data = getSupabaseDashboardData();
  Logger.log(JSON.stringify({
    settings: data.config,
    fairs: data.fairs.length,
    schools: data.schools.length,
    students: data.studentCohorts.find((cohort) => cohort.key === "all").students.length
  }, null, 2));
}
```

確認できたら、このテスト関数は残しても削除しても構いません。

## 4. 新しいデプロイを作成

Apps Script右上の「デプロイ」から、新しいデプロイを作成します。

- 種類: ウェブアプリ
- 実行ユーザー: 自分
- アクセス: 全員、または既存設定に合わせる

作成後、WebアプリURLをダッシュボード側の `GAS_API_URL` と照合します。

既存URLを維持できる場合は、GitHub Pages側の変更は不要です。

## 5. ダッシュボード確認

GitHub Pagesのダッシュボードを開き、「データ更新」を押します。

確認ポイント:

- 学生全件が698件になっている
- 27卒、28卒、サロン実習のタブ件数が合う
- フェア件数が35件
- 学校件数が104件前後
- 右上バッジはGAS経由接続なので、現時点では `GAS Connected v0.2` 表示でOK

## 6. 注意

この段階では、学生追加・更新はまだGoogleスプレッドシート側保存のままです。

次のPhaseで、学生追加・更新もSupabase保存へ切り替えます。
