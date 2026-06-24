/**
 * 人材投資管理システム - GAS WebアプリAPI
 *
 * このCode.gsは、必ず対象のGoogleスプレッドシートから
 * 「拡張機能 > Apps Script」で開いたプロジェクトに貼り付けて使います。
 */

const APP_NAME = "NOV Talent";

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu("NOV Talent")
    .addItem("入力規則を再設定", "resetInputRulesFromMenu")
    .addItem("既存シートを最新化", "upgradeExistingSheetsToLatestSchema")
    .addSeparator()
    .addItem("初期サンプルシートを作成", "setupSampleSheets")
    .addToUi();
}

function doGet(e) {
  try {
    if (e && e.parameter && e.parameter.action) {
      return createResponse(handleWriteAction(e.parameter), e);
    }

    const data = getDashboardData();
    return createResponse(data, e);
  } catch (error) {
    return createResponse({ ok: false, error: error.message }, e);
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
  const students = getStudentData();
  const studentCohorts = getStudentCohorts();
  return {
    config: getConfig(),
    fairs: getFairData(),
    schools: getSchoolData(),
    students: students,
    studentCohorts: studentCohorts,
    studentSummary: buildStudentSummary(students)
  };
}

function getConfig() {
  const sheet = getRequiredSheet("年度設定");
  const values = sheet.getDataRange().getValues();

  if (values.length < 2) {
    return {
      appName: APP_NAME,
      targetHires: 0,
      targetContacts: 0,
      targetInterviews: 0,
      hiringBudget: 0,
      expectedJoiners: 0
    };
  }

  const row = values[values.length - 1];
  return {
    appName: APP_NAME,
    targetHires: Number(row[1]) || 0,
    targetContacts: Number(row[2]) || 0,
    targetInterviews: Number(row[3]) || 0,
    hiringBudget: Number(row[4]) || 0,
    expectedJoiners: Number(row[5]) || 0
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

function getStudentData() {
  return getStudentDataFromSheet("学生管理", "27卒");
}

function getStudentCohorts() {
  const cohorts = [];
  const cohortSheets = [
    { key: "27", label: "27卒", sheetName: "学生管理_27卒" },
    { key: "28", label: "28卒", sheetName: "学生管理_28卒" },
    { key: "intern", label: "サロン実習", sheetName: "学生管理_サロン実習" },
    { key: "all", label: "全件参考", sheetName: "学生管理_全件参考" }
  ];

  cohortSheets.forEach((cohort) => {
    if (getOptionalSheet(cohort.sheetName)) {
      cohorts.push({
        key: cohort.key,
        label: cohort.label,
        sheetName: cohort.sheetName,
        students: getStudentDataFromSheet(cohort.sheetName, cohort.label)
      });
    }
  });

  if (cohorts.length === 0) {
    cohorts.push({
      key: "standard",
      label: "学生管理",
      sheetName: "学生管理",
      students: getStudentDataFromSheet("学生管理", "学生管理")
    });
  }

  return cohorts;
}

function getStudentDataFromSheet(sheetName, cohortLabel) {
  const sheet = getRequiredSheet(sheetName);
  const values = sheet.getDataRange().getValues();
  const rows = values.slice(1).filter((row) => row[0]);

  return rows.map((row) => ({
    studentId: String(row[0] || ""),
    cohort: String(cohortLabel || ""),
    name: String(row[1] || ""),
    gender: String(row[2] || ""),
    school: String(row[3] || ""),
    grade: String(row[4] || ""),
    source: String(row[5] || ""),
    contactDate: formatDateValue(row[6]),
    lineStatus: String(row[7] || ""),
    salonTourStatus: String(row[8] || ""),
    interviewStatus: String(row[9] || ""),
    resultStatus: String(row[10] || ""),
    offerStatus: String(row[11] || ""),
    expectedJoinStatus: String(row[12] || ""),
    owner: String(row[13] || ""),
    nextAction: String(row[14] || ""),
    nextActionDate: formatDateValue(row[15]),
    memo: String(row[16] || "")
  }));
}

function handleWriteAction(params) {
  const action = String(params.action || "");

  if (action === "addStudent") {
    return addStudentFromDashboard(params);
  }

  if (action === "updateStudent") {
    return updateStudentFromDashboard(params);
  }

  throw new Error(`未対応の操作です: ${action}`);
}

function addStudentFromDashboard(params) {
  const sheet = getWritableStudentSheet(params.sheetName);
  const name = sanitizeText(params.name);
  const school = sanitizeText(params.school);

  if (!name) {
    throw new Error("氏名を入力してください。");
  }

  if (!school) {
    throw new Error("学校名を入力してください。");
  }

  const studentId = generateNextStudentId(sheet);
  const row = [
    studentId,
    name,
    sanitizeText(params.gender) || "未回答",
    school,
    sanitizeText(params.grade),
    sanitizeText(params.source),
    parseDateOrText(params.contactDate),
    sanitizeText(params.lineStatus) || "未登録",
    sanitizeText(params.salonTourStatus) || "未設定",
    sanitizeText(params.interviewStatus) || "未設定",
    sanitizeText(params.resultStatus) || "未定",
    sanitizeText(params.offerStatus) || "未定",
    sanitizeText(params.expectedJoinStatus) || "未定",
    sanitizeText(params.owner) || "総務人事",
    sanitizeText(params.nextAction),
    parseDateOrText(params.nextActionDate),
    sanitizeText(params.memo)
  ];

  sheet.appendRow(row);
  applySheetRules(SpreadsheetApp.getActiveSpreadsheet());

  return {
    ok: true,
    action: "addStudent",
    sheetName: sheet.getName(),
    studentId: studentId
  };
}

function updateStudentFromDashboard(params) {
  const sheet = getWritableStudentSheet(params.sheetName);
  const studentId = sanitizeText(params.studentId);

  if (!studentId) {
    throw new Error("学生IDが見つかりません。");
  }

  const rowNumber = findStudentRow(sheet, studentId);
  if (!rowNumber) {
    throw new Error(`学生ID「${studentId}」が見つかりません。`);
  }

  const updates = [
    { col: 2, value: sanitizeText(params.name) },
    { col: 3, value: sanitizeText(params.gender) || "未回答" },
    { col: 4, value: sanitizeText(params.school) },
    { col: 5, value: sanitizeText(params.grade) },
    { col: 6, value: sanitizeText(params.source) },
    { col: 7, value: parseDateOrText(params.contactDate) },
    { col: 8, value: sanitizeText(params.lineStatus) || "未登録" },
    { col: 9, value: sanitizeText(params.salonTourStatus) || "未設定" },
    { col: 10, value: sanitizeText(params.interviewStatus) || "未設定" },
    { col: 11, value: sanitizeText(params.resultStatus) || "未定" },
    { col: 12, value: sanitizeText(params.offerStatus) || "未定" },
    { col: 13, value: sanitizeText(params.expectedJoinStatus) || "未定" },
    { col: 14, value: sanitizeText(params.owner) || "総務人事" },
    { col: 15, value: sanitizeText(params.nextAction) },
    { col: 16, value: parseDateOrText(params.nextActionDate) },
    { col: 17, value: sanitizeText(params.memo) }
  ];

  updates.forEach((update) => {
    sheet.getRange(rowNumber, update.col).setValue(update.value);
  });

  applySheetRules(SpreadsheetApp.getActiveSpreadsheet());

  return {
    ok: true,
    action: "updateStudent",
    sheetName: sheet.getName(),
    studentId: studentId
  };
}

function getWritableStudentSheet(sheetName) {
  const allowedSheetNames = [
    "学生管理",
    "学生管理_27卒",
    "学生管理_28卒",
    "学生管理_サロン実習"
  ];
  const targetSheetName = sanitizeText(sheetName) || "学生管理";

  if (targetSheetName === "学生管理_全件参考") {
    throw new Error("全件参考シートは編集できません。27卒、28卒、サロン実習の各シートで編集してください。");
  }

  if (allowedSheetNames.indexOf(targetSheetName) === -1) {
    throw new Error(`編集できないシートです: ${targetSheetName}`);
  }

  return getRequiredSheet(targetSheetName);
}

function findStudentRow(sheet, studentId) {
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return 0;

  const ids = sheet.getRange(2, 1, lastRow - 1, 1).getValues();
  for (let index = 0; index < ids.length; index += 1) {
    if (String(ids[index][0] || "").trim() === studentId) {
      return index + 2;
    }
  }

  return 0;
}

function generateNextStudentId(sheet) {
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return "S-0001";

  const ids = sheet.getRange(2, 1, lastRow - 1, 1).getValues();
  const maxNumber = ids.reduce((max, row) => {
    const match = String(row[0] || "").match(/^S-(\d+)$/);
    return match ? Math.max(max, Number(match[1])) : max;
  }, 0);

  return `S-${String(maxNumber + 1).padStart(4, "0")}`;
}

function sanitizeText(value) {
  return String(value || "").trim();
}

function parseDateOrText(value) {
  const text = sanitizeText(value);
  if (!text) return "";

  const match = text.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) return text;

  return new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
}

function buildStudentSummary(students) {
  return students.reduce((summary, student) => {
    if (student.nextAction && !student.nextActionDate) summary.needsFollowUp += 1;
    if (student.salonTourStatus === "予定") summary.salonTourScheduled += 1;
    if (student.interviewStatus === "予定") summary.interviewScheduled += 1;
    if (student.offerStatus === "内定") summary.offered += 1;
    if (student.expectedJoinStatus === "入社予定") summary.expectedJoiners += 1;
    if (student.gender === "男性") summary.male += 1;
    if (student.gender === "女性") summary.female += 1;
    return summary;
  }, {
    needsFollowUp: 0,
    salonTourScheduled: 0,
    interviewScheduled: 0,
    offered: 0,
    expectedJoiners: 0,
    male: 0,
    female: 0
  });
}

function setupSampleSheets() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  setupSheet(ss, "年度設定",
    ["年度", "採用目標人数", "接触人数目標", "面接成約目標", "採用予算", "入社予定数"],
    [["2026", 18, 220, 30, 1200000, 9]]
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

  setupSheet(ss, "学生管理",
    [
      "学生ID",
      "氏名",
      "性別",
      "学校名",
      "学年",
      "流入元",
      "接触日",
      "LINE登録",
      "見学ステータス",
      "面接ステータス",
      "選考結果",
      "内定ステータス",
      "入社予定",
      "担当者",
      "次アクション",
      "次アクション日",
      "メモ"
    ],
    [
      ["S-0001", "山田 花", "女性", "国際文化理容美容専門学校 国分寺校", "2年", "ヘアワークス 新宿", new Date(2026, 5, 3), "登録済", "実施済", "実施済", "合格", "内定", "入社予定", "総務人事", "内定後フォロー面談", new Date(2026, 6, 5), "BASSA池袋に関心"],
      ["S-0002", "佐藤 美咲", "女性", "山野美容専門学校", "2年", "東京総合", new Date(2026, 5, 15), "登録済", "予定", "未設定", "未定", "未定", "未定", "総務人事", "見学前リマインド", new Date(2026, 5, 25), "カラー教育に興味"],
      ["S-0003", "鈴木 里奈", "女性", "横浜ビューティーアート専門学校", "2年", "学校訪問", new Date(2026, 5, 10), "登録済", "実施済", "予定", "未定", "未定", "未定", "総務人事", "面接日程確認", new Date(2026, 5, 28), ""],
      ["S-0004", "田中 優", "男性", "パリ総合美容専門学校", "2年", "さんぽう美容就職フェア 高田馬場", new Date(2026, 3, 18), "登録済", "未設定", "未設定", "未定", "未定", "未定", "総務人事", "見学誘導LINE送信", "", "LINE反応あり"],
      ["S-0005", "高橋 杏", "女性", "高山美容専門学校", "1年", "エイド 代々木", new Date(2026, 4, 24), "登録済", "未設定", "未設定", "未定", "未定", "未定", "総務人事", "学校訪問時に再接点", "", "次年度候補"]
    ]
  );

  applySheetRules(ss);

  Logger.log("人材投資管理システム用シートを作成しました。");
  return "人材投資管理システム用シートを作成しました。";
}

function resetInputRulesFromMenu() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  applySheetRules(ss);
  ss.toast("入力規則と表示形式を再設定しました。", "NOV Talent", 5);
  return "入力規則と表示形式を再設定しました。";
}

function upgradeExistingSheetsToLatestSchema() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const configSheet = getRequiredSheet("年度設定");
  const studentSheet = getRequiredSheet("学生管理");

  ensureColumnAfterHeader(configSheet, "接触人数目標", "採用目標人数");
  ensureColumnAfterHeader(configSheet, "面接成約目標", "接触人数目標");
  fillBlankColumnValues(configSheet, "接触人数目標", 220, "年度");
  fillBlankColumnValues(configSheet, "面接成約目標", 30, "年度");

  ensureColumnAfterHeader(studentSheet, "性別", "氏名");
  fillBlankColumnValues(studentSheet, "性別", "未回答", "学生ID");

  applySheetRules(ss);

  ss.toast("既存シートを最新の列構成へ更新しました。", "NOV Talent", 5);
  Logger.log("既存シートを最新の列構成へ更新しました。既存データは保持されています。");
  return "既存シートを最新の列構成へ更新しました。既存データは保持されています。";
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

function ensureColumnAfterHeader(sheet, headerName, previousHeaderName) {
  const existingIndex = findHeaderIndex(sheet, headerName);
  if (existingIndex) return existingIndex;

  const previousIndex = findHeaderIndex(sheet, previousHeaderName);
  if (!previousIndex) {
    throw new Error(`シート「${sheet.getName()}」に列「${previousHeaderName}」が見つかりません。`);
  }

  sheet.insertColumnAfter(previousIndex);
  const newIndex = previousIndex + 1;
  sheet.getRange(1, newIndex).setValue(headerName);
  return newIndex;
}

function findHeaderIndex(sheet, headerName) {
  const lastColumn = Math.max(sheet.getLastColumn(), 1);
  const headers = sheet.getRange(1, 1, 1, lastColumn).getValues()[0];
  const index = headers.findIndex((header) => String(header || "").trim() === headerName);
  return index >= 0 ? index + 1 : 0;
}

function fillBlankColumnValues(sheet, targetHeaderName, defaultValue, requiredHeaderName) {
  const targetIndex = findHeaderIndex(sheet, targetHeaderName);
  const requiredIndex = requiredHeaderName ? findHeaderIndex(sheet, requiredHeaderName) : 0;
  const lastRow = sheet.getLastRow();

  if (!targetIndex || lastRow < 2) return;

  const width = Math.max(sheet.getLastColumn(), targetIndex, requiredIndex);
  const rows = sheet.getRange(2, 1, lastRow - 1, width).getValues();
  const nextValues = rows.map((row) => {
    const hasRequiredValue = !requiredIndex || row[requiredIndex - 1] !== "";
    const currentValue = row[targetIndex - 1];
    if (hasRequiredValue && (currentValue === "" || currentValue === null)) {
      return [defaultValue];
    }
    return [currentValue];
  });

  sheet.getRange(2, targetIndex, nextValues.length, 1).setValues(nextValues);
}

function applySheetRules(ss) {
  formatBasicSheet(ss.getSheetByName("年度設定"), 6);
  formatBasicSheet(ss.getSheetByName("フェア実績"), 6);
  formatBasicSheet(ss.getSheetByName("学校別分析"), 7);
  formatBasicSheet(ss.getSheetByName("学生管理"), 17);

  const configSheet = ss.getSheetByName("年度設定");
  configSheet.getRange("B2:F100").setNumberFormat("0");

  const fairSheet = ss.getSheetByName("フェア実績");
  fairSheet.getRange("B2:B1000").setNumberFormat("yyyy/mm/dd");
  fairSheet.getRange("C2:F1000").setNumberFormat("0");

  const schoolSheet = ss.getSheetByName("学校別分析");
  schoolSheet.getRange("B2:G1000").setNumberFormat("0");

  [
    "学生管理",
    "学生管理_27卒",
    "学生管理_28卒",
    "学生管理_サロン実習",
    "学生管理_全件参考"
  ].forEach((sheetName) => {
    const studentSheet = ss.getSheetByName(sheetName);
    if (!studentSheet) return;

    formatBasicSheet(studentSheet, 17);
    studentSheet.getRange("G2:G1000").setNumberFormat("yyyy/mm/dd");
    studentSheet.getRange("P2:P1000").setNumberFormat("yyyy/mm/dd");

    setDropdown(studentSheet, "C2:C1000", ["男性", "女性", "その他", "未回答"]);
    setDropdown(studentSheet, "E2:E1000", ["1年", "2年", "既卒", "その他"]);
    setDropdown(studentSheet, "H2:H1000", ["未登録", "登録済"]);
    setDropdown(studentSheet, "I2:I1000", ["未設定", "予定", "実施済", "キャンセル"]);
    setDropdown(studentSheet, "J2:J1000", ["未設定", "予定", "実施済", "キャンセル"]);
    setDropdown(studentSheet, "K2:K1000", ["未定", "合格", "不合格", "辞退"]);
    setDropdown(studentSheet, "L2:L1000", ["未定", "内定", "承諾", "辞退"]);
    setDropdown(studentSheet, "M2:M1000", ["未定", "入社予定", "入社済", "辞退"]);
  });
}

function formatBasicSheet(sheet, columnCount) {
  if (!sheet) return;

  ensureMinRows(sheet, 1000);
  sheet.setFrozenRows(1);
  sheet.getRange(1, 1, 1, columnCount)
    .setFontWeight("bold")
    .setBackground("#eef5fc")
    .setFontColor("#1f1f1f");
  sheet.getRange(1, 1, sheet.getMaxRows(), columnCount)
    .setVerticalAlignment("middle");
}

function ensureMinRows(sheet, minRows) {
  const currentRows = sheet.getMaxRows();
  if (currentRows < minRows) {
    sheet.insertRowsAfter(currentRows, minRows - currentRows);
  }
}

function setDropdown(sheet, rangeA1, values) {
  const rule = SpreadsheetApp.newDataValidation()
    .requireValueInList(values, true)
    .setAllowInvalid(false)
    .build();
  sheet.getRange(rangeA1).setDataValidation(rule);
}

function getRequiredSheet(sheetName) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  if (!sheet) {
    throw new Error(`シート「${sheetName}」が見つかりません。setupSampleSheets() を実行してください。`);
  }
  return sheet;
}

function getOptionalSheet(sheetName) {
  return SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
}

function formatDateValue(value) {
  if (value instanceof Date) {
    return Utilities.formatDate(value, "Asia/Tokyo", "yyyy-MM-dd");
  }
  return String(value || "");
}
