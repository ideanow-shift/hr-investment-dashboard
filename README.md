# Talent Investment Dashboard

IDEA NOVグループ向けの「人材投資管理システム」ダッシュボードです。

このアプリは、単なる求人管理ではなく、採用活動を「人材投資」として可視化するためのダッシュボードです。総務人事部が、求人費・就職フェア・学校接点・学生接触データをもとに、採用ROI、学校別投資効果、フェア別投資判断、次に取るべき行動を確認できることを目的としています。

## 起動方法

1. `hr-investment-dashboard` フォルダを開きます。
2. `index.html` をブラウザで開きます。

ローカルサーバーを使う場合は、以下のように起動できます。

```bash
python -m http.server 8000
```

その後、ブラウザで `http://localhost:8000/` を開きます。

## 現在の状態

- HTML / CSS / JavaScriptで動作するダッシュボード
- **Googleスプレッドシート＋GAS連携に対応**（v0.2）
- GAS API未設定の場合はサンプルデータで動作
- Firebase接続なし
- 認証なし
- GitHub Pagesで公開可能
- PC / スマホ対応
- NOV HUBに組み込める前提のカード型ダッシュボードUI

## 主な機能

- 人材投資サマリー（KPIカード）
- 採用ファネル可視化
- フェア別ROIランキング
- 学校別投資効果分析
- ルールベースのAI風アクション提案

---

## Googleスプレッドシート連携

### 概要

Googleスプレッドシートをデータベースとして使い、Google Apps Script（GAS）のWebアプリAPIを通じてダッシュボードにデータを提供します。

```
[スプレッドシート] → [GAS WebアプリAPI] → [GitHub Pages ダッシュボード]
    3シート             JSONP API             app.js で scriptタグ読み込み
```

GitHub Pagesの静的HTMLからGAS Webアプリを直接 `fetch()` すると、ブラウザのCORS制限で失敗する場合があります。そのため、このプロトタイプでは `callback` パラメータを使うJSONP方式でデータを取得します。

### スプレッドシート構成

GASエディタで `setupSampleSheets()` を実行すると、以下の3シートが自動作成されます。

#### シート①：年度設定

| 列 | ヘッダー | 内容 |
|----|---------|------|
| A | 年度 | 例: 2026 |
| B | 採用目標人数 | 例: 18 |
| C | 採用予算 | 例: 1200000 |
| D | 入社予定数 | 例: 9 |

#### シート②：フェア実績

| 列 | ヘッダー | 内容 |
|----|---------|------|
| A | フェア名 | 例: さんぽう美容就職フェア 高田馬場 |
| B | 開催日 | 例: 2026/4/18 |
| C | 費用 | 例: 165000 |
| D | 接触数 | 例: 22 |
| E | LINE登録数 | 例: 22 |
| F | 見学取得数 | 例: 6 |

#### シート③：学校別分析

| 列 | ヘッダー | 内容 |
|----|---------|------|
| A | 学校名 | 例: 国際文化理容美容専門学校 国分寺校 |
| B | 接触数 | 例: 36 |
| C | LINE登録数 | 例: 31 |
| D | 見学数 | 例: 13 |
| E | 面接数 | 例: 7 |
| F | 合格数 | 例: 5 |
| G | 内定数 | 例: 4 |

---

## GASデプロイ方法

### 前提条件

- Node.js がインストール済み
- `clasp` がインストール済み（`npm install -g @google/clasp`）
- `clasp login` で認証済み
- Google Apps Script API が有効（https://script.google.com/home/usersettings）

### 手順

#### 1. GASプロジェクトへプッシュ

```bash
clasp push
```

`.clasp.json` はリポジトリ直下にあり、`rootDir` が `gas` に設定されています。そのため、`clasp push` は `hr-investment-dashboard` フォルダ直下で実行してください。

#### 2. GASエディタでスプレッドシートを紐づける

1. `clasp open` でGASエディタを開く
2. GASエディタの左サイドバーで **プロジェクトの設定** をクリック
3. スプレッドシートを新規作成し、そのIDをスクリプトプロパティに設定するか、  
   またはスプレッドシートのGASエディタから「拡張機能 → Apps Script」で開き直す

**推奨手順**：
1. Googleドライブで新しいスプレッドシートを作成
2. スプレッドシートのメニュー「拡張機能 → Apps Script」を開く
3. `gas/Code.gs` の内容をGASエディタに貼り付ける
4. `appsscript.json` の内容もマニフェストに反映する

#### 3. setupSampleSheets() を実行

1. GASエディタで `setupSampleSheets` 関数を選択
2. ▶ 実行ボタンをクリック
3. 初回実行時は権限の承認が必要です
4. 実行完了後、スプレッドシートに3シート＋サンプルデータが作成されます

#### 4. Webアプリとしてデプロイ

1. GASエディタ右上の「デプロイ → 新しいデプロイ」をクリック
2. 種類の選択で「ウェブアプリ」を選択
3. 設定：
   - **実行するユーザー**: 自分
   - **アクセスできるユーザー**: 全員
4. 「デプロイ」をクリック
5. 表示されたWebアプリURLをコピー

---

## GAS API URLの設定方法

`app.js` の先頭にある `GAS_API_URL` 定数に、デプロイで取得したURLを設定します。

```javascript
// app.js の5行目付近
const GAS_API_URL = "https://script.google.com/macros/s/XXXXXXXX/exec";
```

`app.js` 側で自動的に `?callback=...` を付けて読み込むため、URLには `/exec` までを貼り付ければOKです。

GitHub PagesでGAS連携表示を行う場合は、このURLを設定した状態でコミットします。GAS WebアプリURL自体は公開ページから参照される前提ですが、APIキー・個人情報・認証情報はコミットしないでください。

## 接続確認

`index.html` をブラウザで開き、ヘッダー右上のバッジを確認します。

- 成功時: `● GAS Connected` / `v0.2`
- 失敗時: `Sample Data` / `v0.1`

失敗時は、ブラウザの開発者ツールでConsoleを確認してください。GAS URL未設定、デプロイ権限、またはWebアプリURLの貼り間違いが主な原因です。

---

## GitHub Pages反映手順

1. 変更をコミット

```bash
git add -A
git commit -m "GAS連携対応を追加"
```

2. GitHubにプッシュ

```bash
git push origin main
```

3. GitHub Pages の設定を確認
   - リポジトリの Settings → Pages
   - Source: `Deploy from a branch`
   - Branch: `main` / `/ (root)`
   - Save

数分後に https://ideanow-shift.github.io/hr-investment-dashboard/ に反映されます。

---

## ファイル構成

```
hr-investment-dashboard/
├── index.html          ← ダッシュボードHTML
├── style.css           ← スタイルシート
├── app.js              ← フロントエンドロジック（GAS API対応）
├── README.md           ← このファイル
└── gas/                ← GASプロジェクト（clasp管理）
    ├── .clasp.json     ← claspプロジェクト設定
    ├── appsscript.json ← GASマニフェスト
    └── Code.gs         ← GAS WebアプリAPI
```

## 今後の接続予定

- Firebase連携
- 認証機能
- 学生個別ステータス管理
- 学校別LTV分析
- 入社後定着率分析
- 店長候補輩出分析
- AIによるアクション提案

## 拡張メモ

GAS APIが返すJSONの形式は `app.js` 内のサンプルデータと完全互換です。スプレッドシートのデータを編集するだけで、ダッシュボードに即座に反映されます。
