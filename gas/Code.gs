/**
 * 人材投資管理システム — GAS WebアプリAPI
 * 
 * スプレッドシートをデータベースとして使い、
 * フロントエンド（GitHub Pages）にJSON APIを提供する。
 * 
 * 関数一覧:
 *   doGet(e)            — Webアプリのエントリポイント
 *   getDashboardData()  — 全データを統合して返す
 *   getConfig()         — 「年度設定」シートから設定を取得
 *   getFairData()       — 「フェア実績」シートから配列を取得
 *   getSchoolData()     — 「学校別分析」シートから配列を取得
 *   setupSampleSheets() — シート・ヘッダー・サンプルデータを自動作成
 */

// ============================================================
// Webアプリ エントリポイント
// ============================================================

/**
 * doGet — GAS Webアプリのエントリポイント
 * すべてのGETリクエストに対してJSONまたはJSONPレスポンスを返す。
 * GitHub Pagesから利用する場合は callback パラメータ付きのJSONPを使う。
 */
function doGet(e) {
  try {
    var data = getDashboardData();
    return createApiResponse_(data, e);
  } catch (error) {
    return createApiResponse_({ error: error.message }, e);
  }
}

/**
 * createApiResponse_ — JSON / JSONP レスポンスを生成する
 * callback パラメータがある場合は callback({...}) のJavaScriptとして返す。
 */
function createApiResponse_(data, e) {
  var callback = e && e.parameter ? e.parameter.callback : '';
  var json = JSON.stringify(data);

  if (callback) {
    if (!/^[A-Za-z_$][0-9A-Za-z_$]*$/.test(callback)) {
      return ContentService
        .createTextOutput('Invalid callback')
        .setMimeType(ContentService.MimeType.TEXT);
    }

    return ContentService
      .createTextOutput(callback + '(' + json + ');')
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  }

  return ContentService
    .createTextOutput(json)
    .setMimeType(ContentService.MimeType.JSON);
}

// ============================================================
// データ取得関数
// ============================================================

/**
 * getDashboardData — 全データを統合して返す
 * config, fairs, schools を1つのオブジェクトにまとめる。
 */
function getDashboardData() {
  return {
    config: getConfig(),
    fairs: getFairData(),
    schools: getSchoolData()
  };
}

/**
 * getConfig — 「年度設定」シートから設定を取得
 * 最初のデータ行（2行目）を読み取り、設定オブジェクトとして返す。
 * 
 * シート構造:
 *   A: 年度 | B: 採用目標人数 | C: 採用予算 | D: 入社予定数
 */
function getConfig() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName('年度設定');

  if (!sheet) {
    // シートが存在しない場合はデフォルト値を返す
    return {
      appName: 'Talent Investment Dashboard',
      targetHires: 0,
      hiringBudget: 0,
      expectedJoiners: 0
    };
  }

  var lastRow = sheet.getLastRow();
  if (lastRow < 2) {
    return {
      appName: 'Talent Investment Dashboard',
      targetHires: 0,
      hiringBudget: 0,
      expectedJoiners: 0
    };
  }

  // 最新の年度データ（最終行）を取得
  var row = sheet.getRange(lastRow, 1, 1, 4).getValues()[0];

  return {
    appName: 'Talent Investment Dashboard',
    targetHires: Number(row[1]) || 0,
    hiringBudget: Number(row[2]) || 0,
    expectedJoiners: Number(row[3]) || 0
  };
}

/**
 * getFairData — 「フェア実績」シートから配列を取得
 * 
 * シート構造:
 *   A: フェア名 | B: 開催日 | C: 費用 | D: 接触数 | E: LINE登録数 | F: 見学取得数
 */
function getFairData() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName('フェア実績');

  if (!sheet) {
    return [];
  }

  var lastRow = sheet.getLastRow();
  if (lastRow < 2) {
    return [];
  }

  var data = sheet.getRange(2, 1, lastRow - 1, 6).getValues();
  var result = [];

  for (var i = 0; i < data.length; i++) {
    var row = data[i];
    // 空行をスキップ
    if (!row[0]) continue;

    // 日付の整形（Date型 → YYYY-MM-DD 文字列）
    var dateValue = row[1];
    var dateStr = '';
    if (dateValue instanceof Date) {
      dateStr = Utilities.formatDate(dateValue, 'Asia/Tokyo', 'yyyy-MM-dd');
    } else {
      dateStr = String(dateValue);
    }

    result.push({
      name: String(row[0]),
      date: dateStr,
      cost: Number(row[2]) || 0,
      contacts: Number(row[3]) || 0,
      lineRegistrations: Number(row[4]) || 0,
      salonTours: Number(row[5]) || 0
    });
  }

  return result;
}

/**
 * getSchoolData — 「学校別分析」シートから配列を取得
 * 
 * シート構造:
 *   A: 学校名 | B: 接触数 | C: LINE登録数 | D: 見学数 | E: 面接数 | F: 合格数 | G: 内定数
 */
function getSchoolData() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName('学校別分析');

  if (!sheet) {
    return [];
  }

  var lastRow = sheet.getLastRow();
  if (lastRow < 2) {
    return [];
  }

  var data = sheet.getRange(2, 1, lastRow - 1, 7).getValues();
  var result = [];

  for (var i = 0; i < data.length; i++) {
    var row = data[i];
    // 空行をスキップ
    if (!row[0]) continue;

    result.push({
      name: String(row[0]),
      contacts: Number(row[1]) || 0,
      lineRegistrations: Number(row[2]) || 0,
      salonTours: Number(row[3]) || 0,
      interviews: Number(row[4]) || 0,
      passed: Number(row[5]) || 0,
      offers: Number(row[6]) || 0
    });
  }

  return result;
}

// ============================================================
// セットアップ関数
// ============================================================

/**
 * setupSampleSheets — シート・ヘッダー・サンプルデータを自動作成
 * 
 * GASエディタから手動実行する。
 * 既存シートがある場合はスキップし、上書きしない。
 */
function setupSampleSheets() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();

  // --- シート①: 年度設定 ---
  setupSheet_(ss, '年度設定',
    ['年度', '採用目標人数', '採用予算', '入社予定数'],
    [
      ['2026', 18, 1200000, 9]
    ]
  );

  // --- シート②: フェア実績 ---
  setupSheet_(ss, 'フェア実績',
    ['フェア名', '開催日', '費用', '接触数', 'LINE登録数', '見学取得数'],
    [
      ['さんぽう美容就職フェア 高田馬場', new Date(2026, 3, 18), 165000, 22, 22, 6],
      ['ヘアワークス 立川', new Date(2026, 4, 12), 220000, 40, 38, 8],
      ['エイド 代々木', new Date(2026, 4, 24), 297000, 54, 44, 0],
      ['ヘアワークス 新宿', new Date(2026, 5, 3), 242000, 27, 27, 14],
      ['東京総合', new Date(2026, 5, 15), 10000, 37, 36, 19]
    ]
  );

  // --- シート③: 学校別分析 ---
  setupSheet_(ss, '学校別分析',
    ['学校名', '接触数', 'LINE登録数', '見学数', '面接数', '合格数', '内定数'],
    [
      ['国際文化理容美容専門学校 国分寺校', 36, 31, 13, 7, 5, 4],
      ['山野美容専門学校', 44, 39, 10, 6, 4, 3],
      ['パリ総合美容専門学校', 22, 18, 7, 5, 3, 2],
      ['高山美容専門学校', 18, 14, 4, 2, 1, 1],
      ['横浜ビューティーアート専門学校', 29, 26, 9, 4, 3, 2],
      ['マリールイズ美容専門学校', 16, 12, 3, 1, 1, 0]
    ]
  );

  // 完了メッセージ
  SpreadsheetApp.getUi().alert(
    'セットアップ完了',
    '年度設定・フェア実績・学校別分析の3シートをサンプルデータ付きで作成しました。',
    SpreadsheetApp.getUi().ButtonSet.OK
  );
}

/**
 * setupSheet_ — 個別シートのセットアップ（ヘルパー関数）
 * シートが既に存在する場合はスキップする。
 * 
 * @param {SpreadsheetApp.Spreadsheet} ss - スプレッドシート
 * @param {string} sheetName - シート名
 * @param {string[]} headers - ヘッダー行の配列
 * @param {Array[]} sampleData - サンプルデータの2次元配列
 */
function setupSheet_(ss, sheetName, headers, sampleData) {
  var sheet = ss.getSheetByName(sheetName);

  if (sheet) {
    // 既存シートがある場合、データが入っていればスキップ
    if (sheet.getLastRow() > 1) {
      Logger.log('シート「' + sheetName + '」は既にデータがあるためスキップしました。');
      return;
    }
  } else {
    // 新規シート作成
    sheet = ss.insertSheet(sheetName);
  }

  // ヘッダー行を設定
  var headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setValues([headers]);
  headerRange.setFontWeight('bold');
  headerRange.setBackground('#f0f0f0');

  // サンプルデータを挿入
  if (sampleData.length > 0) {
    sheet.getRange(2, 1, sampleData.length, sampleData[0].length)
      .setValues(sampleData);
  }

  // 列幅を自動調整
  for (var i = 1; i <= headers.length; i++) {
    sheet.autoResizeColumn(i);
  }

  Logger.log('シート「' + sheetName + '」をセットアップしました。');
}
