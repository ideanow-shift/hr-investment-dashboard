/**
 * 人材投資管理システム - GAS WebアプリAPI
 *
 * このCode.gsは、必ず対象のGoogleスプレッドシートから
 * 「拡張機能 > Apps Script」で開いたプロジェクトに貼り付けて使います。
 */

const APP_NAME = "Talent Investment Dashboard";

function doGet(e) {
  try {
    const data = getDashboardData();
    return createResponse(data, e);
  } catch (error) {
    return createResponse({ error: error.message }, e);
  }
}

function createResponse(data, e) {
  const callback = e && e.parameter ? e.parameter.callback : "";
  const json = JSON.stringify(data);

  if (callback) {
    if (!/^[A-Za-z_$][0-9A-Za-z_$]*$/.test(callback)) {
      return ContentService
        .createTextOutput("Invalid callback")
        .setMimeType(ContentService.MimeType.TEXT);
    }

    return ContentService
      .createTextOutput(`${callback}(${json});`)
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  }

  return ContentService
    .createTextOutput(json)
    .setMimeType(ContentService.MimeType.JSON);
}

function getDashboardData() {
  return {
    config: getConfig(),
    fairs: getFairData(),
    schools: getSchoolData()
  };
}

function getConfig() {
  const sheet = getRequiredSheet("年度設定");
  const values = sheet.getDataRange().getValues();

  if (values.length < 2) {
    return {
      appName: APP_NAME,
      targetHires: 0,
      hiringBudget: 0,
      expectedJoiners: 0
    };
  }

  const row = values[values.length - 1];
  return {
    appName: APP_NAME,
    targetHires: Number(row[1]) || 0,
    hiringBudget: Number(row[2]) || 0,
    expectedJoiners: Number(row[3]) || 0
  };
}

function getFairData() {
  const sheet = getRequiredSheet("フェア実績");
  const values = sheet.getDataRange().getValues();
  const rows = values.slice(1).filter((row) => row[0]);

  return rows.map((row) => ({
    name: String(row[0] || ""),
    date: formatDateValue(row[1]),
    cost: Number(row[2]) || 0,
    contacts: Number(row[3]) || 0,
    lineRegistrations: Number(row[4]) || 0,
    salonTours: Number(row[5]) || 0
  }));
}

function getSchoolData() {
  const sheet = getRequiredSheet("学校別分析");
  const values = sheet.getDataRange().getValues();
  const rows = values.slice(1).filter((row) => row[0]);

  return rows.map((row) => ({
    name: String(row[0] || ""),
    contacts: Number(row[1]) || 0,
    lineRegistrations: Number(row[2]) || 0,
    salonTours: Number(row[3]) || 0,
    interviews: Number(row[4]) || 0,
    passed: Number(row[5]) || 0,
    offers: Number(row[6]) || 0
  }));
}

function setupSampleSheets() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  setupSheet(ss, "年度設定",
    ["年度", "採用目標人数", "採用予算", "入社予定数"],
    [["2026", 18, 1200000, 9]]
  );

  setupSheet(ss, "フェア実績",
    ["フェア名", "開催日", "費用", "接触数", "LINE登録数", "見学取得数"],
    [
      ["さんぽう美容就職フェア 高田馬場", new Date(2026, 3, 18), 165000, 22, 22, 6],
      ["ヘアワークス 立川", new Date(2026, 4, 12), 220000, 40, 38, 8],
      ["エイド 代々木", new Date(2026, 4, 24), 297000, 54, 44, 0],
      ["ヘアワークス 新宿", new Date(2026, 5, 3), 242000, 27, 27, 14],
      ["東京総合", new Date(2026, 5, 15), 10000, 37, 36, 19]
    ]
  );

  setupSheet(ss, "学校別分析",
    ["学校名", "接触数", "LINE登録数", "見学数", "面接数", "合格数", "内定数"],
    [
      ["国際文化理容美容専門学校 国分寺校", 36, 31, 13, 7, 5, 4],
      ["山野美容専門学校", 44, 39, 10, 6, 4, 3],
      ["パリ総合美容専門学校", 22, 18, 7, 5, 3, 2],
      ["高山美容専門学校", 18, 14, 4, 2, 1, 1],
      ["横浜ビューティーアート専門学校", 29, 26, 9, 4, 3, 2],
      ["マリールイズ美容専門学校", 16, 12, 3, 1, 1, 0]
    ]
  );

  SpreadsheetApp.getUi().alert("人材投資管理システム用シートを作成しました。");
}

function setupSheet(ss, sheetName, headers, rows) {
  let sheet = ss.getSheetByName(sheetName);
  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
  }

  sheet.clear();
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold").setBackground("#f9f9f9");

  if (rows.length > 0) {
    sheet.getRange(2, 1, rows.length, headers.length).setValues(rows);
  }

  for (let col = 1; col <= headers.length; col++) {
    sheet.autoResizeColumn(col);
  }
}

function getRequiredSheet(sheetName) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  if (!sheet) {
    throw new Error(`シート「${sheetName}」が見つかりません。setupSampleSheets() を実行してください。`);
  }
  return sheet;
}

function formatDateValue(value) {
  if (value instanceof Date) {
    return Utilities.formatDate(value, "Asia/Tokyo", "yyyy-MM-dd");
  }
  return String(value || "");
}
