const GAS_API_URL = "https://script.google.com/macros/s/AKfycbx0X9DvO6zydd8txe_Mgme1COTfltp7ZxueJyrIPQsJSwWCvbVrM2otmlgarPTDmU5iWg/exec";

const HUB_DISPLAY_APP_NAME = "リクルート管理システム";
const HUB_DISPLAY_APP_SUBTITLE = "人材投資の可視化";
const INTERVIEW_MANUAL_URL = "https://docs.google.com/document/d/10F304BImOElyueoVWhX6GyrhGES2c6u_KKX2d2VHTBw/edit?usp=drive_link";
const DESKTOP_STUDENT_LIST_COUNT = 50;
const MOBILE_STUDENT_LIST_COUNT = 20;
const HUB_CONTEXT_KEY = "novHub.currentEmployee";
const HUB_CONTEXT_MAX_AGE_MS = 12 * 60 * 60 * 1000;

let dashboardConfig = {
  appName: HUB_DISPLAY_APP_NAME,
  targetHires: 18,
  targetContacts: 220,
  targetInterviews: 30,
  hiringBudget: 1200000,
  expectedJoiners: 9
};

let fairData = [
  {
    name: "さんぽう美容就職フェア 高田馬場",
    date: "2026-04-18",
    cost: 165000,
    contacts: 22,
    lineRegistrations: 22,
    salonTours: 6
  },
  {
    name: "ヘアワークス 立川",
    date: "2026-05-12",
    cost: 220000,
    contacts: 40,
    lineRegistrations: 38,
    salonTours: 8
  },
  {
    name: "エイド 代々木",
    date: "2026-05-24",
    cost: 297000,
    contacts: 54,
    lineRegistrations: 44,
    salonTours: 0
  },
  {
    name: "ヘアワークス 新宿",
    date: "2026-06-03",
    cost: 242000,
    contacts: 27,
    lineRegistrations: 27,
    salonTours: 14
  },
  {
    name: "東京総合",
    date: "2026-06-15",
    cost: 10000,
    contacts: 37,
    lineRegistrations: 36,
    salonTours: 19
  }
];

let schoolData = [
  {
    name: "国際文化理容美容専門学校 国分寺校",
    contacts: 36,
    lineRegistrations: 31,
    salonTours: 13,
    interviews: 7,
    passed: 5,
    offers: 4
  },
  {
    name: "山野美容専門学校",
    contacts: 44,
    lineRegistrations: 39,
    salonTours: 10,
    interviews: 6,
    passed: 4,
    offers: 3
  },
  {
    name: "パリ総合美容専門学校",
    contacts: 22,
    lineRegistrations: 18,
    salonTours: 7,
    interviews: 5,
    passed: 3,
    offers: 2
  },
  {
    name: "高山美容専門学校",
    contacts: 18,
    lineRegistrations: 14,
    salonTours: 4,
    interviews: 2,
    passed: 1,
    offers: 1
  },
  {
    name: "横浜ビューティーアート専門学校",
    contacts: 29,
    lineRegistrations: 26,
    salonTours: 9,
    interviews: 4,
    passed: 3,
    offers: 2
  },
  {
    name: "マリールイズ美容専門学校",
    contacts: 16,
    lineRegistrations: 12,
    salonTours: 3,
    interviews: 1,
    passed: 1,
    offers: 0
  }
];

let studentData = [
  {
    studentId: "S-0001",
    name: "山田 花",
    gender: "女性",
    school: "国際文化理容美容専門学校 国分寺校",
    grade: "2年",
    source: "ヘアワークス 新宿",
    contactDate: "2026-06-03",
    lineStatus: "登録済",
    salonTourStatus: "実施済",
    interviewStatus: "実施済",
    resultStatus: "合格",
    offerStatus: "内定",
    expectedJoinStatus: "入社予定",
    owner: "総務人事",
    nextAction: "内定後フォロー面談",
    nextActionDate: "2026-07-05",
    memo: "BASSA池袋に関心"
  },
  {
    studentId: "S-0002",
    name: "佐藤 美咲",
    gender: "女性",
    school: "山野美容専門学校",
    grade: "2年",
    source: "東京総合",
    contactDate: "2026-06-15",
    lineStatus: "登録済",
    salonTourStatus: "予定",
    interviewStatus: "未設定",
    resultStatus: "未定",
    offerStatus: "未定",
    expectedJoinStatus: "未定",
    owner: "総務人事",
    nextAction: "見学前リマインド",
    nextActionDate: "2026-06-25",
    memo: "カラー教育に興味"
  },
  {
    studentId: "S-0003",
    name: "鈴木 里奈",
    gender: "女性",
    school: "横浜ビューティーアート専門学校",
    grade: "2年",
    source: "学校訪問",
    contactDate: "2026-06-10",
    lineStatus: "登録済",
    salonTourStatus: "実施済",
    interviewStatus: "予定",
    resultStatus: "未定",
    offerStatus: "未定",
    expectedJoinStatus: "未定",
    owner: "総務人事",
    nextAction: "面接日程確認",
    nextActionDate: "2026-06-28",
    memo: ""
  },
  {
    studentId: "S-0004",
    name: "田中 優",
    gender: "男性",
    school: "パリ総合美容専門学校",
    grade: "2年",
    source: "さんぽう美容就職フェア 高田馬場",
    contactDate: "2026-04-18",
    lineStatus: "登録済",
    salonTourStatus: "未設定",
    interviewStatus: "未設定",
    resultStatus: "未定",
    offerStatus: "未定",
    expectedJoinStatus: "未定",
    owner: "総務人事",
    nextAction: "見学誘導LINE送信",
    nextActionDate: "",
    memo: "LINE反応あり"
  },
  {
    studentId: "S-0005",
    name: "高橋 杏",
    gender: "女性",
    school: "高山美容専門学校",
    grade: "1年",
    source: "エイド 代々木",
    contactDate: "2026-05-24",
    lineStatus: "登録済",
    salonTourStatus: "未設定",
    interviewStatus: "未設定",
    resultStatus: "未定",
    offerStatus: "未定",
    expectedJoinStatus: "未定",
    owner: "総務人事",
    nextAction: "学校訪問時に再接点",
    nextActionDate: "",
    memo: "次年度候補"
  }
];

let studentCohorts = [
  { key: "standard", label: "学生管理", sheetName: "学生管理", students: studentData }
];
let activeStudentCohort = "standard";
let activeStudentFilter = "all";
let activeStudentDueFilter = "all";
let activeStudentSort = "priority";
let studentSearchQuery = "";
let studentListVisibleCount = getInitialStudentListCount();
let studentSummary = buildStudentSummary(studentData);
let interviewSearchQuery = "";
let activeInterviewStatusFilter = "all";
let activeInterviewDateFilter = "";
let activeDataQualityFilter = "all";
let operationLogs = [];
let activeOperationLogFilter = "all";
let operationLogSearchQuery = "";
let lstepSummary = buildDefaultLstepSummary();
let storeOptions = [];
let lastDataRefreshAt = null;
let hasAttemptedDataLoad = false;
let activeDashboardView = "overview";

async function fetchDashboardData() {
  if (!GAS_API_URL) {
    return false;
  }

  try {
    const data = await loadJsonp(GAS_API_URL, {}, isMobileViewport() ? 25000 : 20000);
    applyDashboardData(data);
    return true;
  } catch (error) {
    console.warn("[WARN] GAS APIからの取得に失敗しました。サンプルデータで表示します。", error.message);
    return false;
  }
}

function loadJsonp(apiUrl, params = {}, timeoutMs = 30000) {
  return new Promise((resolve, reject) => {
    const callbackName = `talentInvestmentDashboard_${Date.now()}_${Math.random().toString(36).slice(2)}`;
    const script = document.createElement("script");
    const timeoutId = window.setTimeout(() => {
      cleanup();
      reject(new Error("GAS APIの読み込みがタイムアウトしました"));
    }, timeoutMs);

    function cleanup() {
      window.clearTimeout(timeoutId);
      delete window[callbackName];
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    }

    window[callbackName] = (data) => {
      cleanup();
      resolve(data);
    };

    script.onerror = () => {
      cleanup();
      reject(new Error("GAS APIのJSONPスクリプトを読み込めませんでした"));
    };

    const url = new URL(apiUrl);
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.set(key, String(value));
      }
    });
    url.searchParams.set("callback", callbackName);
    url.searchParams.set("_", String(Date.now()));
    script.src = url.toString();
    document.head.appendChild(script);
  });
}

function callGasAction(action, params = {}) {
  if (!GAS_API_URL) {
    return Promise.reject(new Error("GAS API URLが未設定です"));
  }

  const employee = getHubCurrentEmployee();
  const operatorParams = getHubOperatorParams();
  if (!employee) {
    return Promise.reject(new Error("保存できませんでした：NOV HUBから開き直してください。HUBログイン情報がないため、操作履歴に社員IDを記録できません。"));
  }

  return loadJsonp(GAS_API_URL, { action, ...operatorParams, ...params });
}

function applyDashboardData(data) {
  if (!data || typeof data !== "object") {
    throw new Error("GAS APIのレスポンス形式が不正です");
  }

  if (data.error) {
    throw new Error(data.error);
  }

  if (data.config) {
    dashboardConfig = {
      appName: normalizeAppName(data.config.appName),
      targetHires: Number(data.config.targetHires) || 0,
      targetContacts: Number(data.config.targetContacts) || dashboardConfig.targetContacts || 0,
      targetInterviews: Number(data.config.targetInterviews) || dashboardConfig.targetInterviews || 0,
      hiringBudget: Number(data.config.hiringBudget) || 0,
      expectedJoiners: Number(data.config.expectedJoiners) || 0,
      fiscalYear: String(data.config.fiscalYear || dashboardConfig.fiscalYear || new Date().getFullYear())
    };
  }

  if (Array.isArray(data.fairs)) {
    fairData = data.fairs.map((fair) => ({
      id: String(fair.id || ""),
      name: String(fair.name || ""),
      date: String(fair.date || ""),
      cost: Number(fair.cost) || 0,
      contacts: Number(fair.contacts) || 0,
      lineRegistrations: Number(fair.lineRegistrations) || 0,
      salonTours: Number(fair.salonTours) || 0,
      memo: String(fair.memo || "")
    }));
  }

  if (Array.isArray(data.schools)) {
    schoolData = data.schools.map((school) => ({
      id: String(school.id || ""),
      name: String(school.name || ""),
      displayName: String(school.displayName || school.name || ""),
      area: String(school.area || ""),
      memo: String(school.memo || ""),
      contacts: Number(school.contacts) || 0,
      lineRegistrations: Number(school.lineRegistrations) || 0,
      salonTours: Number(school.salonTours) || 0,
      interviews: Number(school.interviews) || 0,
      passed: Number(school.passed) || 0,
      offers: Number(school.offers) || 0
    }));
  }

  if (Array.isArray(data.stores)) {
    storeOptions = data.stores.map(normalizeStoreOption)
      .filter((store) => store.id && store.isActive !== false)
      .sort((a, b) => a.name.localeCompare(b.name, "ja"));
  }

  if (Array.isArray(data.studentCohorts) && data.studentCohorts.length) {
    studentCohorts = data.studentCohorts.map((cohort) => ({
      key: String(cohort.key || cohort.label || ""),
      label: String(cohort.label || cohort.sheetName || "学生管理"),
      sheetName: String(cohort.sheetName || "学生管理"),
      students: Array.isArray(cohort.students) ? cohort.students.map(normalizeStudent) : []
    })).filter((cohort) => cohort.key);
    if (!studentCohorts.some((cohort) => cohort.key === activeStudentCohort)) {
      activeStudentCohort = studentCohorts[0]?.key || "standard";
    }
    studentData = getActiveStudents();
  } else if (Array.isArray(data.students)) {
    studentData = data.students.map(normalizeStudent);
    studentCohorts = [{ key: "standard", label: "学生管理", sheetName: "学生管理", students: studentData }];
    activeStudentCohort = "standard";
  }

  if (Array.isArray(data.operationLogs)) {
    operationLogs = data.operationLogs.map(normalizeOperationLog);
  }

  lstepSummary = normalizeLstepSummary(data.lstepSummary);

  studentSummary = buildStudentSummary(getActiveStudents());
}

function buildDefaultLstepSummary() {
  return {
    configured: false,
    linkedAccounts: 0,
    activeAccounts: 0,
    friendAccounts: 0,
    blockedAccounts: 0,
    unlinkedEvents: 0,
    unprocessedEvents: 0,
    recentMessages: 0,
    lastSyncedAt: "",
    status: "not_ready",
    note: "LSTEP連携に向けて、未紐付け学生とLINE反応履歴の受け皿を確認できます。"
  };
}

function normalizeLstepSummary(summary) {
  if (!summary || typeof summary !== "object") {
    return buildDefaultLstepSummary();
  }

  return {
    configured: Boolean(summary.configured),
    source: String(summary.source || ""),
    linkedAccounts: Number(summary.linkedAccounts) || 0,
    activeAccounts: Number(summary.activeAccounts) || 0,
    friendAccounts: Number(summary.friendAccounts) || 0,
    blockedAccounts: Number(summary.blockedAccounts) || 0,
    unlinkedEvents: Number(summary.unlinkedEvents) || 0,
    unprocessedEvents: Number(summary.unprocessedEvents) || 0,
    recentMessages: Number(summary.recentMessages) || 0,
    lastSyncedAt: String(summary.lastSyncedAt || ""),
    status: String(summary.status || "not_ready"),
    note: String(summary.note || "")
  };
}

function normalizeStudent(student) {
  return {
    id: String(student.id || ""),
    studentId: String(student.studentId || ""),
    cohort: String(student.cohort || ""),
    name: String(student.name || ""),
    gender: String(student.gender || ""),
    school: String(student.school || ""),
    grade: String(student.grade || ""),
    source: String(student.source || ""),
    contactDate: String(student.contactDate || ""),
    lineStatus: String(student.lineStatus || ""),
    salonTourStatus: String(student.salonTourStatus || ""),
    interviewStatus: String(student.interviewStatus || ""),
    resultStatus: String(student.resultStatus || ""),
    offerStatus: String(student.offerStatus || ""),
    expectedJoinStatus: String(student.expectedJoinStatus || ""),
    owner: String(student.owner || ""),
    nextAction: String(student.nextAction || ""),
    nextActionDate: String(student.nextActionDate || ""),
    memo: String(student.memo || ""),
    updatedAt: String(student.updatedAt || ""),
    updatedBy: String(student.updatedBy || ""),
    managementStatus: String(student.managementStatus || "有効"),
    storePreferences: Array.isArray(student.storePreferences) ? student.storePreferences.map(normalizeStorePreference) : [],
    storeTourHistories: Array.isArray(student.storeTourHistories) ? student.storeTourHistories.map(normalizeStoreTourHistory) : [],
    followups: Array.isArray(student.followups) ? student.followups.map(normalizeFollowup) : [],
    lineAccount: normalizeLineAccount(student.lineAccount)
  };
}

function normalizeStoreOption(store) {
  return {
    id: String(store.id || ""),
    name: String(store.name || store.displayName || store.storeName || store.id || ""),
    code: String(store.code || ""),
    isActive: store.isActive !== false
  };
}

function normalizeStorePreference(preference) {
  return {
    id: String(preference.id || ""),
    studentRecordId: String(preference.studentRecordId || ""),
    storeId: String(preference.storeId || ""),
    storeName: String(preference.storeName || ""),
    preferenceRank: Number(preference.preferenceRank) || 0,
    memo: String(preference.memo || ""),
    updatedAt: String(preference.updatedAt || "")
  };
}

function normalizeStoreTourHistory(history) {
  return {
    id: String(history.id || ""),
    studentRecordId: String(history.studentRecordId || ""),
    storeId: String(history.storeId || ""),
    storeName: String(history.storeName || ""),
    tourDate: String(history.tourDate || ""),
    tourStatus: String(history.tourStatus || "予定"),
    memo: String(history.memo || ""),
    updatedAt: String(history.updatedAt || ""),
    updatedBy: String(history.updatedBy || "")
  };
}

function normalizeLineAccount(account) {
  if (!account || typeof account !== "object") return null;

  return {
    id: String(account.id || ""),
    studentRecordId: String(account.studentRecordId || ""),
    lineUserId: String(account.lineUserId || ""),
    lstepUserId: String(account.lstepUserId || ""),
    displayName: String(account.displayName || ""),
    friendStatus: String(account.friendStatus || "unknown"),
    linkedAt: String(account.linkedAt || ""),
    lastSyncedAt: String(account.lastSyncedAt || ""),
    memo: String(account.memo || "")
  };
}

function normalizeFollowup(followup) {
  return {
    id: String(followup.id || ""),
    actionTitle: String(followup.actionTitle || ""),
    dueDate: String(followup.dueDate || ""),
    status: String(followup.status || "未対応"),
    memo: String(followup.memo || ""),
    createdAt: String(followup.createdAt || ""),
    updatedAt: String(followup.updatedAt || ""),
    updatedBy: String(followup.updatedBy || ""),
    updatedByEmployeeId: String(followup.updatedByEmployeeId || "")
  };
}

function normalizeOperationLog(log) {
  return {
    id: String(log.id || ""),
    action: String(log.action || ""),
    tableName: String(log.tableName || ""),
    recordId: String(log.recordId || ""),
    studentId: String(log.studentId || ""),
    studentCode: String(log.studentCode || ""),
    studentName: String(log.studentName || ""),
    actorEmployeeId: String(log.actorEmployeeId || ""),
    actorEmail: String(log.actorEmail || ""),
    actorName: String(log.actorName || ""),
    result: String(log.result || "success"),
    reason: String(log.reason || ""),
    targetType: String(log.targetType || ""),
    targetId: String(log.targetId || ""),
    detail: String(log.detail || ""),
    createdAt: String(log.createdAt || "")
  };
}

function getActiveStudents() {
  const activeCohort = studentCohorts.find((cohort) => cohort.key === activeStudentCohort) || studentCohorts[0];
  return activeCohort ? activeCohort.students : studentData;
}

function findStudentById(studentId) {
  const id = String(studentId || "");
  if (!id) return null;
  const allCohortStudents = studentCohorts.flatMap((cohort) => cohort.students || []);
  return allCohortStudents.find((student) => String(student.id || "") === id)
    || studentData.find((student) => String(student.id || "") === id)
    || null;
}

function getManagedStudents() {
  return getActiveStudents().filter((student) => student.managementStatus !== "管理対象外");
}

function getActiveCohort() {
  return studentCohorts.find((cohort) => cohort.key === activeStudentCohort) || studentCohorts[0] || null;
}

function getActiveCohortLabel() {
  return getActiveCohort()?.label || "学生管理";
}

function getActiveSheetName() {
  return getActiveCohort()?.sheetName || "学生管理";
}

function isActiveCohortEditable() {
  const sheetName = getActiveSheetName();
  return sheetName !== "学生管理_全件参考" && sheetName !== "Supabase_全件参考";
}

const formatNumber = new Intl.NumberFormat("ja-JP");
const formatCurrency = new Intl.NumberFormat("ja-JP", {
  style: "currency",
  currency: "JPY",
  maximumFractionDigits: 0
});

const percent = (value) => `${Math.round(value * 100)}%`;
const safeDivide = (numerator, denominator) => denominator ? numerator / denominator : 0;
const loadingValue = "-";
const escapeHtml = (value) => String(value ?? "").replace(/[&<>"']/g, (char) => ({
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  "\"": "&quot;",
  "'": "&#39;"
})[char]);

function shouldMaskDashboardNumbers() {
  return !hasAttemptedDataLoad;
}

function hasDisplayableNumber(value) {
  return value !== null && value !== undefined && Number.isFinite(Number(value));
}

function displayNumber(value) {
  if (shouldMaskDashboardNumbers() || !hasDisplayableNumber(value)) return loadingValue;
  return formatNumber.format(Number(value));
}

function displayCurrency(value) {
  if (shouldMaskDashboardNumbers() || !hasDisplayableNumber(value)) return loadingValue;
  return formatCurrency.format(Number(value));
}

function displayPercent(value) {
  if (shouldMaskDashboardNumbers() || !hasDisplayableNumber(value)) return loadingValue;
  return percent(Number(value));
}

function displayValueWithUnit(value, unit = "") {
  if (shouldMaskDashboardNumbers()) {
    return `<span>${loadingValue}</span>`;
  }

  const displayValue = typeof value === "number" ? formatNumber.format(value) : escapeHtml(value);
  return `
    <span>${displayValue}</span>
    ${unit ? `<span class="kpi-unit">${escapeHtml(unit)}</span>` : ""}
  `;
}

function isMobileViewport() {
  return typeof window !== "undefined"
    && typeof window.matchMedia === "function"
    && window.matchMedia("(max-width: 640px)").matches;
}

function getInitialStudentListCount() {
  return isMobileViewport() ? MOBILE_STUDENT_LIST_COUNT : DESKTOP_STUDENT_LIST_COUNT;
}

const normalizeAppName = (name) => {
  const trimmed = String(name || "").trim();
  if (!trimmed || trimmed === "Talent Investment Dashboard" || trimmed === "NOV Talent") {
    return HUB_DISPLAY_APP_NAME;
  }
  return trimmed;
};

function getFairRank(tourRate) {
  if (tourRate >= 0.5) return { rank: "S", label: "非常に良い", className: "rank-s" };
  if (tourRate >= 0.3) return { rank: "A", label: "良い", className: "rank-a" };
  if (tourRate >= 0.15) return { rank: "B", label: "普通", className: "rank-b" };
  if (tourRate > 0) return { rank: "C", label: "改善必要", className: "rank-c" };
  return { rank: "D", label: "次回見送り候補", className: "rank-d" };
}

function getSchoolPromise(school) {
  const score = (school.salonTours * 2) + (school.interviews * 3) + (school.offers * 5);

  if (score >= 45) {
    return { label: "重点投資", className: "promise-high", score };
  }

  if (score >= 28) {
    return { label: "有望", className: "promise-middle", score };
  }

  if (score >= 14) {
    return { label: "育成中", className: "promise-watch", score };
  }

  return { label: "要検証", className: "promise-low", score };
}

function getRankedFairs() {
  return fairData
    .map((fair) => {
      const tourRate = safeDivide(fair.salonTours, fair.contacts);
      const lineRate = safeDivide(fair.lineRegistrations, fair.contacts);
      const contactCost = safeDivide(fair.cost, fair.contacts);
      const tourCost = safeDivide(fair.cost, fair.salonTours);
      const rank = getFairRank(tourRate);

      return { ...fair, tourRate, lineRate, contactCost, tourCost, rank };
    })
    .sort((a, b) => {
      if (b.tourRate !== a.tourRate) return b.tourRate - a.tourRate;
      return a.contactCost - b.contactCost;
    });
}

function buildMetrics() {
  const fairTotals = fairData.reduce((acc, fair) => {
    acc.cost += fair.cost;
    acc.contacts += fair.contacts;
    acc.lineRegistrations += fair.lineRegistrations;
    acc.salonTours += fair.salonTours;
    return acc;
  }, { cost: 0, contacts: 0, lineRegistrations: 0, salonTours: 0 });

  const schoolTotals = schoolData.reduce((acc, school) => {
    acc.interviews += school.interviews;
    acc.passed += school.passed;
    acc.offers += school.offers;
    return acc;
  }, { interviews: 0, passed: 0, offers: 0 });

  return {
    targetHires: dashboardConfig.targetHires,
    targetContacts: dashboardConfig.targetContacts,
    targetInterviews: dashboardConfig.targetInterviews,
    currentOffers: schoolTotals.offers,
    achievementRate: safeDivide(schoolTotals.offers, dashboardConfig.targetHires),
    contacts: fairTotals.contacts,
    contactAchievementRate: safeDivide(fairTotals.contacts, dashboardConfig.targetContacts),
    lineRegistrations: fairTotals.lineRegistrations,
    salonTours: fairTotals.salonTours,
    interviews: schoolTotals.interviews,
    interviewAchievementRate: safeDivide(schoolTotals.interviews, dashboardConfig.targetInterviews),
    passed: schoolTotals.passed,
    hiringBudget: dashboardConfig.hiringBudget,
    spentBudget: fairTotals.cost,
    costPerOffer: safeDivide(fairTotals.cost, schoolTotals.offers),
    expectedJoiners: dashboardConfig.expectedJoiners
  };
}

function getOpenFollowups(student) {
  return (Array.isArray(student.followups) ? student.followups : [])
    .filter((followup) => !["完了", "不要"].includes(followup.status || "未対応"));
}

function hasOpenFollowup(student) {
  return getOpenFollowups(student).length > 0;
}

function getCompletedFollowups(student) {
  return (Array.isArray(student.followups) ? student.followups : [])
    .filter((followup) => followup.status === "完了")
    .sort((a, b) => getActionSortDate(b.dueDate).localeCompare(getActionSortDate(a.dueDate)));
}

function hasCompletedFollowup(student) {
  return getCompletedFollowups(student).length > 0;
}

function getCompletedFollowupAction(student) {
  const followup = getCompletedFollowups(student)[0];
  if (!followup) return null;
  return {
    student,
    title: followup.actionTitle || "完了フォロー",
    dueDate: followup.dueDate || "",
    status: followup.status || "完了",
    sourceLabel: "完了履歴",
    followupId: followup.id || "",
    isFollowup: true,
    isCompleted: true
  };
}

function getActionSortDate(value) {
  return value || "9999-12-31";
}

function parseLocalDate(value) {
  if (!value) return null;
  const parts = String(value).split("-").map(Number);
  if (parts.length !== 3 || parts.some((part) => Number.isNaN(part))) return null;
  return new Date(parts[0], parts[1] - 1, parts[2]);
}

function getActionUrgency(dueDate) {
  const target = parseLocalDate(dueDate);
  if (!target) return { label: "日程未設定", className: "urgency-unscheduled", level: "unscheduled", sortWeight: 3 };
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  target.setHours(0, 0, 0, 0);
  const diffDays = Math.round((target - today) / 86400000);
  if (diffDays < 0) return { label: `${Math.abs(diffDays)}日超過`, className: "urgency-overdue", level: "overdue", sortWeight: 0 };
  if (diffDays === 0) return { label: "今日対応", className: "urgency-today", level: "today", sortWeight: 1 };
  if (diffDays === 1) return { label: "明日対応", className: "urgency-tomorrow", level: "tomorrow", sortWeight: 2 };
  if (diffDays <= 3) return { label: `${diffDays}日以内`, className: "urgency-soon", level: "soon", sortWeight: 2 };
  return { label: "予定あり", className: "urgency-normal", level: "normal", sortWeight: 4 };
}

function renderUrgencyBadge(dueDate) {
  const urgency = getActionUrgency(dueDate);
  return `<em class="urgency-badge ${urgency.className}">${escapeHtml(urgency.label)}</em>`;
}

function getActionSortWeight(dueDate) {
  return getActionUrgency(dueDate).sortWeight;
}

function getStudentUrgencyClass(action) {
  if (!action) return "student-card-unscheduled";
  if (action.isCompleted || action.status === "完了") return "student-card-completed";
  return `student-card-${getActionUrgency(action.dueDate).level}`;
}

function renderActionBadge(action) {
  if (action?.isCompleted || action?.status === "完了") {
    return `<em class="urgency-badge urgency-done">完了済み</em>`;
  }
  return renderUrgencyBadge(action?.dueDate);
}

function getStudentActionItems(student) {
  const items = [];
  if (student.nextAction) {
    items.push({
      student,
      title: student.nextAction,
      dueDate: student.nextActionDate || "",
      status: student.nextActionDate ? "予定" : "日程未設定",
      sourceLabel: "学生管理",
      isFollowup: false
    });
  }

  getOpenFollowups(student).forEach((followup) => {
    items.push({
      student,
      title: followup.actionTitle || "フォロー内容未設定",
      dueDate: followup.dueDate || "",
      status: followup.status || "未対応",
      sourceLabel: "フォロー履歴",
      followupId: followup.id || "",
      isFollowup: true
    });
  });

  return items;
}

function canCompleteFollowupAction(action) {
  return Boolean(action?.isFollowup && action.followupId && !["完了", "不要"].includes(action.status || ""));
}

function renderFollowupCompleteButton(action, label = "完了") {
  if (!canCompleteFollowupAction(action)) return "";
  return `<button class="followup-complete-button" type="button" data-followup-complete="${escapeHtml(action.followupId)}">${escapeHtml(label)}</button>`;
}

function getPrimaryStudentAction(student) {
  const items = getStudentActionItems(student).sort((a, b) => {
    const urgencyCompare = getActionSortWeight(a.dueDate) - getActionSortWeight(b.dueDate);
    if (urgencyCompare !== 0) return urgencyCompare;
    const dateCompare = getActionSortDate(a.dueDate).localeCompare(getActionSortDate(b.dueDate));
    if (dateCompare !== 0) return dateCompare;
    return Number(b.isFollowup) - Number(a.isFollowup);
  });
  return items[0] || null;
}

function buildStudentSummary(students) {
  return students.reduce((summary, student) => {
    if (student.managementStatus === "管理対象外") return summary;

    if ((student.nextAction && !student.nextActionDate) || hasOpenFollowup(student)) summary.needsFollowUp += 1;
    if (student.salonTourStatus === "予定") summary.salonTourScheduled += 1;
    if (student.interviewStatus === "予定") summary.interviewScheduled += 1;
    if (student.offerStatus === "内定") summary.offered += 1;
    if (student.expectedJoinStatus === "入社予定") summary.expectedJoiners += 1;
    if (student.gender === "男性") summary.male += 1;
    if (student.gender === "女性") summary.female += 1;

    const followups = Array.isArray(student.followups) ? student.followups : [];
    followups.forEach((followup) => {
      const status = followup.status || "未対応";
      if (!["完了", "不要"].includes(status)) {
        summary.openFollowups += 1;
        const urgency = getActionUrgency(followup.dueDate).level;
        if (urgency === "overdue") summary.overdueFollowups += 1;
        if (urgency === "today") summary.todayFollowups += 1;
        if (["tomorrow", "soon"].includes(urgency)) summary.soonFollowups += 1;
        if (urgency === "unscheduled") summary.unscheduledFollowups += 1;
      }
      if (status === "完了") summary.completedFollowups += 1;
    });

    return summary;
  }, {
    needsFollowUp: 0,
    salonTourScheduled: 0,
    interviewScheduled: 0,
    offered: 0,
    expectedJoiners: 0,
    male: 0,
    female: 0,
    openFollowups: 0,
    overdueFollowups: 0,
    todayFollowups: 0,
    soonFollowups: 0,
    unscheduledFollowups: 0,
    completedFollowups: 0
  });
}

function renderKpis(metrics) {
  const kpis = [
    { label: "採用目標人数", value: metrics.targetHires, unit: "名", sub: "今年度の投資目標" },
    { label: "現在の内定数", value: metrics.currentOffers, unit: "名", sub: "学校接点からの内定" },
    {
      label: "達成率",
      value: percent(metrics.achievementRate),
      unit: "",
      sub: "現在内定数 / 採用目標人数",
      status: metrics.achievementRate >= 0.5 ? "good" : "caution"
    },
    { label: "接触人数目標", value: metrics.targetContacts, unit: "名", sub: "今年度の学生接点目標" },
    { label: "接触学生数", value: metrics.contacts, unit: "名", sub: "フェア接点の合計" },
    {
      label: "接触達成率",
      value: percent(metrics.contactAchievementRate),
      unit: "",
      sub: "接触学生数 / 接触人数目標",
      status: metrics.contactAchievementRate >= 0.7 ? "good" : "caution"
    },
    { label: "面接成約目標", value: metrics.targetInterviews, unit: "件", sub: "今年度の面接化目標" },
    { label: "LINE登録数", value: metrics.lineRegistrations, unit: "名", sub: `登録率 ${percent(safeDivide(metrics.lineRegistrations, metrics.contacts))}` },
    { label: "サロン見学数", value: metrics.salonTours, unit: "名", sub: `見学率 ${percent(safeDivide(metrics.salonTours, metrics.contacts))}` },
    { label: "面接数", value: metrics.interviews, unit: "件", sub: "学校別分析の合計" },
    {
      label: "面接成約達成率",
      value: percent(metrics.interviewAchievementRate),
      unit: "",
      sub: "面接数 / 面接成約目標",
      status: metrics.interviewAchievementRate >= 0.7 ? "good" : "caution"
    },
    { label: "合格数", value: metrics.passed, unit: "名", sub: "将来の活躍人材候補" },
    { label: "採用予算", value: formatCurrency.format(metrics.hiringBudget), unit: "", sub: "年間想定投資枠" },
    { label: "使用済み予算", value: formatCurrency.format(metrics.spentBudget), unit: "", sub: `予算消化率 ${percent(safeDivide(metrics.spentBudget, metrics.hiringBudget))}` },
    { label: "1人あたり採用投資額", value: formatCurrency.format(metrics.costPerOffer), unit: "", sub: "使用済み予算 / 現在の内定数" }
  ];

  document.getElementById("kpiGrid").innerHTML = kpis.map((kpi) => `
    <article class="kpi-card ${kpi.status ? `status-${kpi.status}` : ""}">
      <p class="kpi-label">${kpi.label}</p>
      <div class="kpi-value">
        ${displayValueWithUnit(kpi.value, kpi.unit)}
      </div>
      <p class="kpi-sub">${shouldMaskDashboardNumbers() ? "データ取得後に表示します" : kpi.sub}</p>
    </article>
  `).join("");
}

function renderDecisionSummary(metrics) {
  const rankedFairs = getRankedFairs();
  const bestFair = rankedFairs[0];
  const reviewFair = rankedFairs.find((fair) => fair.rank.rank === "D")
    || [...rankedFairs].sort((a, b) => b.cost - a.cost)[0];
  const topSchool = [...schoolData].sort((a, b) => getSchoolPromise(b).score - getSchoolPromise(a).score)[0];
  const followUpCount = studentSummary.needsFollowUp || 0;
  const budgetUseRate = safeDivide(metrics.spentBudget, metrics.hiringBudget);

  const decisions = [
    bestFair && {
      type: "重点投資",
      title: bestFair.name,
      value: `${displayPercent(bestFair.tourRate)} 見学率`,
      body: "次年度も参加候補です。見学予約導線を残し、同じ勝ち筋を再現します。",
      className: "decision-good"
    },
    reviewFair && {
      type: "見直し候補",
      title: reviewFair.name,
      value: shouldMaskDashboardNumbers()
        ? loadingValue
        : (reviewFair.salonTours ? `${formatCurrency.format(reviewFair.tourCost)} / 見学` : "見学取得 0"),
      body: "出展内容、声かけ、参加可否を見直す対象です。代替フェアや学校訪問への振替も検討します。",
      className: "decision-risk"
    },
    topSchool && {
      type: "優先学校",
      title: topSchool.name,
      value: `${displayNumber(getSchoolPromise(topSchool).score)} 有望度`,
      body: "学校訪問や先生連携を優先し、将来の活躍人材との接点を増やします。",
      className: "decision-blue"
    },
    {
      type: "運用注意",
      title: "学生フォロー",
      value: `${displayNumber(followUpCount)}名 要確認`,
      body: budgetUseRate >= 0.75
        ? "予算消化が進んでいます。未フォロー学生の見学・面接化を優先してください。"
        : "次アクション日未設定の学生を減らし、接点を次の行動へ進めます。",
      className: followUpCount > 0 ? "decision-caution" : "decision-good"
    }
  ].filter(Boolean);

  document.getElementById("decisionGrid").innerHTML = decisions.map((decision) => `
    <article class="decision-card ${decision.className}">
      <span>${decision.type}</span>
      <h3>${decision.title}</h3>
      <strong>${decision.value}</strong>
      <p>${decision.body}</p>
    </article>
  `).join("");
}

function renderFunnel(metrics) {
  const steps = [
    { label: "接触", value: metrics.contacts },
    { label: "LINE登録", value: metrics.lineRegistrations },
    { label: "サロン見学", value: metrics.salonTours },
    { label: "面接", value: metrics.interviews },
    { label: "合格", value: metrics.passed },
    { label: "内定", value: metrics.currentOffers },
    { label: "入社予定", value: metrics.expectedJoiners }
  ];

  const firstValue = steps[0].value;

  document.getElementById("funnelList").innerHTML = steps.map((step, index) => {
    const previousValue = index === 0 ? firstValue : steps[index - 1].value;
    const conversionRate = index === 0 ? 1 : safeDivide(step.value, previousValue);
    const width = shouldMaskDashboardNumbers()
      ? 0
      : Math.max(safeDivide(step.value, firstValue) * 100, step.value > 0 ? 4 : 0);

    return `
      <div class="funnel-step">
        <div class="funnel-label">${step.label}</div>
        <div class="funnel-bar" aria-hidden="true">
          <div class="funnel-fill" style="width: ${width}%"></div>
        </div>
        <div class="funnel-meta">
          <strong>${displayNumber(step.value)}${shouldMaskDashboardNumbers() ? "" : "名"}</strong><br>
          ${index === 0 ? "起点" : `転換率 ${displayPercent(conversionRate)}`}
        </div>
      </div>
    `;
  }).join("");
}

function getFairKey(fair) {
  return fair?.id || fair?.name || "";
}

function findFairByKey(fairs, key) {
  return fairs.find((fair) => getFairKey(fair) === key) || null;
}

function renderFairTable() {
  const rankedFairs = getRankedFairs();
  setupFairCsvExport(rankedFairs.length);

  document.getElementById("fairTableBody").innerHTML = rankedFairs.map((fair) => `
    <tr>
      <td><span class="rank-pill ${fair.rank.className}">${fair.rank.rank}</span> ${fair.rank.label}</td>
      <td><button class="detail-link" type="button" data-fair-key="${escapeHtml(getFairKey(fair))}">${escapeHtml(fair.name)}</button></td>
      <td>${escapeHtml(fair.date)}</td>
      <td>${displayCurrency(fair.cost)}</td>
      <td>${displayNumber(fair.contacts)}</td>
      <td>${displayNumber(fair.lineRegistrations)} <span class="muted">(${displayPercent(fair.lineRate)})</span></td>
      <td>${displayNumber(fair.salonTours)}</td>
      <td>${displayPercent(fair.tourRate)}</td>
      <td>${displayCurrency(fair.contactCost)}</td>
      <td>${shouldMaskDashboardNumbers() ? loadingValue : (fair.salonTours ? formatCurrency.format(fair.tourCost) : "未取得")}</td>
    </tr>
  `).join("");

  document.querySelectorAll("[data-fair-key]").forEach((button) => {
    button.addEventListener("click", () => {
      const selectedFair = findFairByKey(rankedFairs, button.dataset.fairKey);
      renderFairDetail(selectedFair);
    });
  });

  renderFairDetail(rankedFairs[0]);
}

function downloadFairCsv() {
  const fairs = getRankedFairs();
  if (!fairs.length) return;

  downloadCsvFile(
    `nov-talent-fairs-${new Date().toISOString().slice(0, 10)}.csv`,
    [
      "評価",
      "評価内容",
      "フェア名",
      "開催日",
      "費用",
      "接触数",
      "LINE登録数",
      "LINE登録率",
      "見学取得数",
      "見学率",
      "接触単価",
      "見学取得単価",
      "関連学生数",
      "メモ"
    ],
    fairs.map((fair) => [
      fair.rank.rank,
      fair.rank.label,
      fair.name,
      fair.date,
      fair.cost,
      fair.contacts,
      fair.lineRegistrations,
      percent(fair.lineRate),
      fair.salonTours,
      percent(fair.tourRate),
      Math.round(fair.contactCost || 0),
      fair.salonTours ? Math.round(fair.tourCost || 0) : "未取得",
      getActiveStudents().filter((student) => student.source === fair.name).length,
      fair.memo || ""
    ])
  );
}

function setupFairCsvExport(count) {
  const button = document.getElementById("fairCsvExportButton");
  if (!button) return;
  button.disabled = count === 0;
  const countLabel = button.querySelector("span");
  if (countLabel) countLabel.textContent = displayNumber(count);
  button.onclick = downloadFairCsv;
}

function renderFairDetail(fair) {
  const detail = document.getElementById("fairDetail");

  if (!fair) {
    detail.innerHTML = "";
    return;
  }

  const relatedStudents = getActiveStudents().filter((student) => student.source === fair.name);
  const investmentDecision = fair.rank.rank === "S" || fair.rank.rank === "A"
    ? "次年度も参加候補。事前告知と見学予約導線を強化すると、さらに投資効果が伸びます。"
    : fair.rank.rank === "D"
      ? "次回は出展内容の見直し、または参加見送り候補。学校訪問や別フェアへの振替も検討してください。"
      : "改善余地あり。LINE登録後24時間以内の見学誘導と、当日の声かけ内容を見直してください。";

  detail.innerHTML = `
    <div class="detail-header-row">
      <div>
        <p class="section-kicker">Fair Drilldown</p>
        <h3>${escapeHtml(fair.name)}</h3>
        <p class="detail-lead">${investmentDecision}</p>
      </div>
      <button class="detail-button compact" type="button" data-fair-edit-key="${escapeHtml(getFairKey(fair))}">フェア編集</button>
    </div>
    <div class="detail-grid">
      <div class="detail-metric"><span>評価</span><strong>${fair.rank.rank}</strong><small>${fair.rank.label}</small></div>
      <div class="detail-metric"><span>見学率</span><strong>${displayPercent(fair.tourRate)}</strong><small>見学取得 / 接触</small></div>
      <div class="detail-metric"><span>接触単価</span><strong>${displayCurrency(fair.contactCost)}</strong><small>費用 / 接触数</small></div>
      <div class="detail-metric"><span>関連学生</span><strong>${displayNumber(relatedStudents.length)}</strong><small>個別管理シート連携</small></div>
    </div>
    <div class="related-list">
      <strong>関連する学生フォロー</strong>
      ${relatedStudents.length ? relatedStudents.map((student) => `
        <p>${escapeHtml(student.name)} / ${escapeHtml(student.school)} / ${escapeHtml(student.nextAction || "次アクション未設定")}</p>
      `).join("") : "<p>このフェアに紐づく学生データはまだありません。</p>"}
    </div>
  `;

  const editButton = detail.querySelector("[data-fair-edit-key]");
  if (editButton) {
    editButton.addEventListener("click", () => {
      const selectedFair = findFairByKey(getRankedFairs(), editButton.dataset.fairEditKey);
      openFairModal(selectedFair || fair, "update");
    });
  }
}

function getFairFormPayload(form) {
  const formData = new FormData(form);
  return {
    fairId: String(formData.get("fairId") || ""),
    originalName: String(formData.get("originalName") || ""),
    name: String(formData.get("name") || "").trim(),
    date: String(formData.get("date") || ""),
    cost: Number(String(formData.get("cost") || "0").replace(/,/g, "")) || 0,
    contacts: Number(String(formData.get("contacts") || "0").replace(/,/g, "")) || 0,
    lineRegistrations: Number(String(formData.get("lineRegistrations") || "0").replace(/,/g, "")) || 0,
    salonTours: Number(String(formData.get("salonTours") || "0").replace(/,/g, "")) || 0,
    memo: String(formData.get("memo") || "").trim()
  };
}

function getFairValidationErrors(payload, mode) {
  const errors = [];
  const duplicate = fairData.find((fair) => {
    if (mode !== "add" && getFairKey(fair) === payload.fairId) return false;
    if (mode !== "add" && fair.name === payload.originalName) return false;
    return fair.name.replace(/\s+/g, "") === payload.name.replace(/\s+/g, "");
  });

  if (!payload.name) errors.push("フェア名を入力してください。");
  ["cost", "contacts", "lineRegistrations", "salonTours"].forEach((key) => {
    if (!Number.isFinite(payload[key]) || payload[key] < 0) {
      errors.push("費用・人数は0以上の数値で入力してください。");
    }
  });
  if (payload.lineRegistrations > payload.contacts) errors.push("LINE登録数は接触数以下にしてください。");
  if (payload.salonTours > payload.contacts) errors.push("見学取得数は接触数以下にしてください。");
  if (mode === "add" && duplicate) errors.push(`同じフェア名が既にあります：${duplicate.name}`);
  if (mode === "update" && duplicate) errors.push(`変更後のフェア名は既に使われています：${duplicate.name}`);

  return [...new Set(errors)];
}

function renderFairForm(fair = {}, mode = "update") {
  const isAdd = mode === "add";
  return `
    <form class="student-edit-form" data-fair-form="${mode}">
      <input type="hidden" name="fairId" value="${escapeHtml(getFairKey(fair))}">
      <input type="hidden" name="originalName" value="${escapeHtml(fair.name || "")}">
      <div class="student-form-heading">
        <div>
          <h3>${isAdd ? "フェアを追加" : "フェア実績を更新"}</h3>
          <p>費用・接触数・LINE登録・見学取得を更新すると、ROIランキングへ反映されます。</p>
        </div>
      </div>
      <div class="student-form-guide">
        <strong>入力のポイント</strong>
        <ul>
          <li>フェア名は学生の流入元と紐づくため、表記をできるだけ統一してください。</li>
          <li>LINE登録数・見学取得数は接触数以下で入力してください。</li>
          <li>保存後、フェアROI・採用ファネル・次に取るべき行動へ再反映されます。</li>
        </ul>
      </div>
      ${renderOperatorNotice()}
      <div class="student-form-grid">
        <label>
          <span>${renderRequiredLabel("フェア名")}</span>
          <input name="name" value="${escapeHtml(fair.name || "")}" placeholder="例：ヘアワークス 新宿" required>
        </label>
        <label>
          <span>開催日</span>
          <input name="date" type="date" value="${escapeHtml(fair.date || "")}">
        </label>
        <label>
          <span>費用</span>
          <input name="cost" type="number" min="0" step="1" value="${Number(fair.cost) || 0}">
        </label>
        <label>
          <span>接触数</span>
          <input name="contacts" type="number" min="0" step="1" value="${Number(fair.contacts) || 0}">
        </label>
        <label>
          <span>LINE登録数</span>
          <input name="lineRegistrations" type="number" min="0" step="1" value="${Number(fair.lineRegistrations) || 0}">
        </label>
        <label>
          <span>見学取得数</span>
          <input name="salonTours" type="number" min="0" step="1" value="${Number(fair.salonTours) || 0}">
        </label>
      </div>
      <label class="student-form-full">
        <span>メモ</span>
        <textarea name="memo" rows="3" placeholder="次回判断・改善メモなど">${escapeHtml(fair.memo || "")}</textarea>
      </label>
      <div class="student-form-actions">
        <p class="student-form-status" aria-live="polite"></p>
        <button class="refresh-button" type="submit" ${getWriteDisabledAttribute()}>${isAdd ? "フェアを追加" : "更新を保存"}</button>
      </div>
    </form>
  `;
}

function openFairModal(fair = {}, mode = "update") {
  const modal = document.getElementById("studentModal");
  const content = document.getElementById("studentModalContent");
  content.innerHTML = `
    <div class="modal-header">
      <div>
        <p class="section-kicker">Fair Management</p>
        <h2 id="studentModalTitle">${mode === "add" ? "フェア追加" : escapeHtml(fair?.name || "フェア編集")}</h2>
        <p>フェア別投資判断に使う実績値を編集します。</p>
      </div>
    </div>
    ${renderFairForm(fair, mode)}
  `;
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  setupRenderedFairForm();
}

function setupRenderedFairForm() {
  const form = document.querySelector("[data-fair-form]");
  if (!form) return;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const mode = form.dataset.fairForm;
    const submitButton = form.querySelector("button[type='submit']");
    const status = form.querySelector(".student-form-status");
    const payload = getFairFormPayload(form);
    const validationErrors = getFairValidationErrors(payload, mode);

    if (validationErrors.length) {
      status.classList.add("is-error");
      status.innerHTML = validationErrors.map((error) => `・${escapeHtml(error)}`).join("<br>");
      return;
    }

    const message = mode === "add"
      ? `フェア「${payload.name}」を追加します。よろしいですか？`
      : `フェア「${payload.name}」を更新します。よろしいですか？`;
    if (!window.confirm(message)) {
      status.classList.remove("is-error");
      status.textContent = "保存をキャンセルしました。";
      return;
    }

    try {
      submitButton.disabled = true;
      status.classList.remove("is-error");
      status.textContent = "保存中...";
      const result = await callGasAction(mode === "add" ? "addFair" : "updateFair", payload);
      if (!result || result.ok === false || result.error) {
        throw new Error(result?.error || "保存に失敗しました");
      }
      status.textContent = "保存しました。データを再取得しています...";
      closeStudentModal();
      await refreshDashboardData();
    } catch (error) {
      status.classList.add("is-error");
      status.textContent = `保存できませんでした：${error.message}`;
      submitButton.disabled = false;
    }
  });
}

function setupFairModal() {
  const addButton = document.getElementById("addFairButton");
  if (addButton) {
    addButton.addEventListener("click", () => openFairModal({}, "add"));
  }
}

function getSchoolKey(school) {
  return school?.id || school?.name || "";
}

function findSchoolByKey(key) {
  return schoolData.find((school) => getSchoolKey(school) === key) || null;
}

function renderSchools() {
  const rankedSchools = getRankedSchools();
  setupSchoolCsvExport(rankedSchools.length);

  document.getElementById("schoolGrid").innerHTML = rankedSchools.map((school, index) => {
    const promise = getSchoolPromise(school);

    return `
      <article class="school-card">
        <h3>${escapeHtml(school.displayName || school.name)}</h3>
        <p class="score-text">${escapeHtml(school.area || "エリア未設定")}</p>
        <div class="school-stats">
          <div class="school-stat"><span>接触</span><strong>${displayNumber(school.contacts)}</strong></div>
          <div class="school-stat"><span>LINE</span><strong>${displayNumber(school.lineRegistrations)}</strong></div>
          <div class="school-stat"><span>見学</span><strong>${displayNumber(school.salonTours)}</strong></div>
          <div class="school-stat"><span>面接</span><strong>${displayNumber(school.interviews)}</strong></div>
          <div class="school-stat"><span>合格</span><strong>${displayNumber(school.passed)}</strong></div>
          <div class="school-stat"><span>内定</span><strong>${displayNumber(school.offers)}</strong></div>
        </div>
        <div class="school-card-footer">
          <span class="promise-pill ${promise.className}">${promise.label}</span>
          <span class="score-text">有望度スコア ${displayNumber(promise.score)}</span>
        </div>
        <button class="detail-button" type="button" data-school-index="${index}">詳細を見る</button>
      </article>
    `;
  }).join("");

  document.querySelectorAll("[data-school-index]").forEach((button) => {
    button.addEventListener("click", () => {
      const selectedSchool = rankedSchools[Number(button.dataset.schoolIndex)];
      renderSchoolDetail(selectedSchool || rankedSchools[0]);
    });
  });

  renderSchoolDetail(rankedSchools[0]);
}

function getRankedSchools() {
  return [...schoolData].sort((a, b) => {
    const scoreCompare = getSchoolPromise(b).score - getSchoolPromise(a).score;
    if (scoreCompare !== 0) return scoreCompare;
    if (b.offers !== a.offers) return b.offers - a.offers;
    if (b.interviews !== a.interviews) return b.interviews - a.interviews;
    return b.contacts - a.contacts;
  });
}

function downloadSchoolCsv() {
  const schools = getRankedSchools();
  if (!schools.length) return;

  downloadCsvFile(
    `nov-talent-schools-${new Date().toISOString().slice(0, 10)}.csv`,
    [
      "有望度",
      "有望度スコア",
      "学校名",
      "表示名",
      "エリア",
      "接触人数",
      "LINE登録数",
      "LINE登録率",
      "見学数",
      "見学率",
      "面接数",
      "面接率",
      "合格数",
      "内定数",
      "内定率",
      "関連学生数",
      "メモ"
    ],
    schools.map((school) => {
      const promise = getSchoolPromise(school);
      return [
        promise.label,
        promise.score,
        school.name,
        school.displayName || school.name,
        school.area || "",
        school.contacts,
        school.lineRegistrations,
        percent(safeDivide(school.lineRegistrations, school.contacts)),
        school.salonTours,
        percent(safeDivide(school.salonTours, school.contacts)),
        school.interviews,
        percent(safeDivide(school.interviews, school.contacts)),
        school.passed,
        school.offers,
        percent(safeDivide(school.offers, school.contacts)),
        getActiveStudents().filter((student) => student.school === school.name).length,
        school.memo || ""
      ];
    })
  );
}

function setupSchoolCsvExport(count) {
  const button = document.getElementById("schoolCsvExportButton");
  if (!button) return;
  button.disabled = count === 0;
  const countLabel = button.querySelector("span");
  if (countLabel) countLabel.textContent = displayNumber(count);
  button.onclick = downloadSchoolCsv;
}

function downloadMonthlyReportCsv() {
  const metrics = buildMetrics();
  const rankedFairs = getRankedFairs();
  const rankedSchools = getRankedSchools();
  const managedStudents = getManagedStudents();
  const summary = buildStudentSummary(managedStudents);
  const actions = getRecommendedActions();
  const reportDate = new Date().toISOString().slice(0, 10);
  const rows = [
    ["基本情報", "アプリ名", dashboardConfig.appName, "月次確認用レポート"],
    ["基本情報", "年度", dashboardConfig.fiscalYear || "", "年度設定"],
    ["基本情報", "出力日", reportDate, ""],
    ["KPI", "採用目標人数", metrics.targetHires, "名"],
    ["KPI", "現在の内定数", metrics.currentOffers, "名"],
    ["KPI", "採用目標達成率", percent(metrics.achievementRate), "現在内定数 / 採用目標人数"],
    ["KPI", "接触人数目標", metrics.targetContacts, "名"],
    ["KPI", "接触学生数", metrics.contacts, "名"],
    ["KPI", "接触達成率", percent(metrics.contactAchievementRate), "接触学生数 / 接触人数目標"],
    ["KPI", "面接成約目標", metrics.targetInterviews, "件"],
    ["KPI", "面接数", metrics.interviews, "件"],
    ["KPI", "面接成約達成率", percent(metrics.interviewAchievementRate), "面接数 / 面接成約目標"],
    ["KPI", "採用予算", metrics.hiringBudget, "円"],
    ["KPI", "使用済み予算", metrics.spentBudget, "円"],
    ["KPI", "予算消化率", percent(safeDivide(metrics.spentBudget, metrics.hiringBudget)), "使用済み予算 / 採用予算"],
    ["KPI", "1人あたり採用投資額", Math.round(metrics.costPerOffer || 0), "円"],
    ["学生フォロー", "管理対象学生", managedStudents.length, "名"],
    ["学生フォロー", "要フォロー", summary.needsFollowUp, "名"],
    ["学生フォロー", "未完了フォロー", summary.openFollowups, "件"],
    ["学生フォロー", "期限超過", summary.overdueFollowups, "件"],
    ["学生フォロー", "今日対応", summary.todayFollowups, "件"],
    ["学生フォロー", "近日対応", summary.soonFollowups, "件"],
    ["学生フォロー", "見学予定者", summary.salonTourScheduled, "名"],
    ["学生フォロー", "面接予定者", summary.interviewScheduled, "名"],
    ["学生フォロー", "内定者", summary.offered, "名"],
    ["学生フォロー", "入社予定者", summary.expectedJoiners, "名"]
  ];

  rankedFairs.slice(0, 8).forEach((fair, index) => {
    rows.push([
      "フェア投資判断",
      `${index + 1}. ${fair.name}`,
      `${fair.rank.rank} / ${fair.rank.label}`,
      `見学率 ${percent(fair.tourRate)}・接触単価 ${Math.round(fair.contactCost || 0)}円`
    ]);
  });

  rankedSchools.slice(0, 10).forEach((school, index) => {
    const promise = getSchoolPromise(school);
    rows.push([
      "学校別投資効果",
      `${index + 1}. ${school.displayName || school.name}`,
      `${promise.label} / ${promise.score}`,
      `接触 ${school.contacts}名・見学 ${school.salonTours}名・内定 ${school.offers}名`
    ]);
  });

  actions.forEach((action, index) => {
    rows.push(["次に取るべき行動", `${index + 1}. ${action.title}`, action.body, "ルールベース提案"]);
  });

  downloadCsvFile(
    `nov-talent-monthly-report-${reportDate}.csv`,
    ["区分", "項目", "値", "補足"],
    rows
  );
}

function setupMonthlyReportExport() {
  const button = document.getElementById("monthlyReportCsvButton");
  if (!button) return;
  button.addEventListener("click", downloadMonthlyReportCsv);
}

function renderSchoolDetail(school) {
  const detail = document.getElementById("schoolDetail");

  if (!school) {
    detail.innerHTML = "";
    return;
  }

  const promise = getSchoolPromise(school);
  const relatedStudents = getActiveStudents().filter((student) => student.school === school.name);
  const tourRate = safeDivide(school.salonTours, school.contacts);
  const offerRate = safeDivide(school.offers, school.contacts);

  detail.innerHTML = `
    <div class="detail-header-row">
      <div>
        <p class="section-kicker">School Drilldown</p>
        <h3>${escapeHtml(school.displayName || school.name)}</h3>
        <p class="detail-lead">有望度は「${promise.label}」です。見学・面接・内定につながる接点を優先して、学校訪問や先生との関係づくりを判断します。</p>
        <p class="detail-lead">${escapeHtml(school.area || "エリア未設定")} / ${escapeHtml(school.memo || "学校メモはまだありません。")}</p>
      </div>
      <button class="detail-button compact" type="button" data-school-edit-key="${escapeHtml(getSchoolKey(school))}">学校編集</button>
    </div>
    <div class="detail-grid">
      <div class="detail-metric"><span>有望度</span><strong>${displayNumber(promise.score)}</strong><small>${promise.label}</small></div>
      <div class="detail-metric"><span>見学率</span><strong>${displayPercent(tourRate)}</strong><small>見学 / 接触</small></div>
      <div class="detail-metric"><span>内定率</span><strong>${displayPercent(offerRate)}</strong><small>内定 / 接触</small></div>
      <div class="detail-metric"><span>関連学生</span><strong>${displayNumber(relatedStudents.length)}</strong><small>個別管理シート連携</small></div>
    </div>
    <div class="related-list">
      <strong>この学校の学生フォロー</strong>
      ${relatedStudents.length ? relatedStudents.map((student) => `
        <p>${escapeHtml(student.name)} / ${escapeHtml(student.grade)} / ${escapeHtml(student.nextAction || "次アクション未設定")}</p>
      `).join("") : "<p>この学校に紐づく学生データはまだありません。</p>"}
    </div>
  `;

  const editButton = detail.querySelector("[data-school-edit-key]");
  if (editButton) {
    editButton.addEventListener("click", () => {
      openSchoolModal(findSchoolByKey(editButton.dataset.schoolEditKey) || school, "update");
    });
  }
}

function getSchoolFormPayload(form) {
  const formData = new FormData(form);
  return {
    schoolId: String(formData.get("schoolId") || ""),
    originalName: String(formData.get("originalName") || ""),
    name: String(formData.get("name") || "").trim(),
    displayName: String(formData.get("displayName") || "").trim(),
    area: String(formData.get("area") || "").trim(),
    memo: String(formData.get("memo") || "").trim()
  };
}

function getSchoolValidationErrors(payload, mode) {
  const errors = [];
  const normalizedName = normalizeForDuplicateCheck(payload.name);
  const duplicate = schoolData.find((school) => {
    if (mode !== "add" && getSchoolKey(school) === payload.schoolId) return false;
    if (mode !== "add" && school.name === payload.originalName) return false;
    return school.name.replace(/\s+/g, "") === normalizedName;
  });

  if (!payload.name) errors.push("学校名を入力してください。");
  if (mode === "add" && duplicate) errors.push(`同じ学校名が既にあります：${duplicate.name}`);
  if (mode === "update" && duplicate) errors.push(`変更後の学校名は既に使われています：${duplicate.name}`);
  return errors;
}

function renderSchoolForm(school = {}, mode = "update") {
  const isAdd = mode === "add";
  return `
    <form class="student-edit-form" data-school-form="${mode}">
      <input type="hidden" name="schoolId" value="${escapeHtml(getSchoolKey(school))}">
      <input type="hidden" name="originalName" value="${escapeHtml(school.name || "")}">
      <div class="student-form-heading">
        <div>
          <h3>${isAdd ? "学校を追加" : "学校マスタを更新"}</h3>
          <p>学校名・エリア・関係構築メモを管理します。接触数などの実績は学生データから自動集計されます。</p>
        </div>
      </div>
      <div class="student-form-guide">
        <strong>入力のポイント</strong>
        <ul>
          <li>学校名は学生データとの紐づけに使います。表記を統一してください。</li>
          <li>表示名は画面表示用です。空欄の場合は学校名を使います。</li>
          <li>エリア・メモは学校訪問や重点投資判断の補足情報として使います。</li>
        </ul>
      </div>
      ${renderOperatorNotice()}
      <div class="student-form-grid">
        <label>
          <span>${renderRequiredLabel("学校名")}</span>
          <input name="name" value="${escapeHtml(school.name || "")}" placeholder="例：山野美容専門学校" required>
        </label>
        <label>
          <span>表示名</span>
          <input name="displayName" value="${escapeHtml(school.displayName || school.name || "")}" placeholder="画面表示用の名称">
        </label>
        <label>
          <span>エリア</span>
          <input name="area" value="${escapeHtml(school.area || "")}" placeholder="例：東京 / 神奈川">
        </label>
      </div>
      <label class="student-form-full">
        <span>メモ</span>
        <textarea name="memo" rows="3" placeholder="先生との関係性・次回訪問予定・重点度など">${escapeHtml(school.memo || "")}</textarea>
      </label>
      <div class="student-form-actions">
        <p class="student-form-status" aria-live="polite"></p>
        <button class="refresh-button" type="submit" ${getWriteDisabledAttribute()}>${isAdd ? "学校を追加" : "更新を保存"}</button>
      </div>
    </form>
  `;
}

function openSchoolModal(school = {}, mode = "update") {
  const modal = document.getElementById("studentModal");
  const content = document.getElementById("studentModalContent");
  content.innerHTML = `
    <div class="modal-header">
      <div>
        <p class="section-kicker">School Management</p>
        <h2 id="studentModalTitle">${mode === "add" ? "学校追加" : escapeHtml(school?.displayName || school?.name || "学校編集")}</h2>
        <p>学校別投資効果に使う学校マスタを編集します。</p>
      </div>
    </div>
    ${renderSchoolForm(school, mode)}
  `;
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  setupRenderedSchoolForm();
}

function setupRenderedSchoolForm() {
  const form = document.querySelector("[data-school-form]");
  if (!form) return;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const mode = form.dataset.schoolForm;
    const submitButton = form.querySelector("button[type='submit']");
    const status = form.querySelector(".student-form-status");
    const payload = getSchoolFormPayload(form);
    const validationErrors = getSchoolValidationErrors(payload, mode);

    if (validationErrors.length) {
      status.classList.add("is-error");
      status.innerHTML = validationErrors.map((error) => `・${escapeHtml(error)}`).join("<br>");
      return;
    }

    const message = mode === "add"
      ? `学校「${payload.name}」を追加します。よろしいですか？`
      : `学校「${payload.name}」を更新します。よろしいですか？`;
    if (!window.confirm(message)) {
      status.classList.remove("is-error");
      status.textContent = "保存をキャンセルしました。";
      return;
    }

    try {
      submitButton.disabled = true;
      status.classList.remove("is-error");
      status.textContent = "保存中...";
      const result = await callGasAction(mode === "add" ? "addSchool" : "updateSchool", payload);
      if (!result || result.ok === false || result.error) {
        throw new Error(result?.error || "保存に失敗しました");
      }
      status.textContent = "保存しました。データを再取得しています...";
      closeStudentModal();
      await refreshDashboardData();
    } catch (error) {
      status.classList.add("is-error");
      status.textContent = `保存できませんでした：${error.message}`;
      submitButton.disabled = false;
    }
  });
}

function setupSchoolModal() {
  const addButton = document.getElementById("addSchoolButton");
  if (addButton) {
    addButton.addEventListener("click", () => openSchoolModal({}, "add"));
  }
}

function getRecommendedActions() {
  const fairInsights = fairData.map((fair) => {
    const tourRate = safeDivide(fair.salonTours, fair.contacts);
    const lineRate = safeDivide(fair.lineRegistrations, fair.contacts);
    return { ...fair, tourRate, lineRate, rank: getFairRank(tourRate) };
  });

  const highLineLowTour = fairInsights.find((fair) => fair.lineRate >= 0.8 && fair.tourRate < 0.15);
  const bestFair = [...fairInsights].sort((a, b) => b.tourRate - a.tourRate)[0];
  const costlyLowResult = [...fairInsights].sort((a, b) => b.cost - a.cost).find((fair) => fair.salonTours === 0 || fair.rank.rank === "C" || fair.rank.rank === "D");
  const topSchool = [...schoolData].sort((a, b) => getSchoolPromise(b).score - getSchoolPromise(a).score)[0];

  return [
    highLineLowTour && {
      title: "見学誘導メッセージを改善",
      body: `${highLineLowTour.name}はLINE登録率が${percent(highLineLowTour.lineRate)}と高い一方、見学率が${percent(highLineLowTour.tourRate)}です。登録直後のサロン見学案内を強化してください。`
    },
    topSchool && {
      title: "学校訪問の優先度を上げる",
      body: `${topSchool.name}は見学・面接・内定につながる有望度が高い学校です。次回の学校訪問や先生との関係構築を優先してください。`
    },
    bestFair && {
      title: "高ROIフェアを次年度候補にする",
      body: `${bestFair.name}は見学率${percent(bestFair.tourRate)}で、フェア別投資判断として有力です。次年度も参加候補として検討できます。`
    },
    costlyLowResult && {
      title: "高コスト低成果フェアを見直す",
      body: `${costlyLowResult.name}は費用が${formatCurrency.format(costlyLowResult.cost)}で、見学取得が伸びていません。出展内容、声かけ導線、次回参加可否を見直してください。`
    }
  ].filter(Boolean);
}

function generateActionCards() {
  if (shouldMaskDashboardNumbers()) {
    document.getElementById("actionCards").innerHTML = `
      <article class="action-card">
        <strong>データ読み込み中</strong>
        <p>取得完了後に、フェア・学校・学生フォローの状況から次に取るべき行動を表示します。</p>
      </article>
    `;
    return;
  }

  const actions = getRecommendedActions();

  document.getElementById("actionCards").innerHTML = actions.map((action, index) => `
    <article class="action-card">
      <strong>${index + 1}. ${action.title}</strong>
      <p>${action.body}</p>
    </article>
  `).join("");
}

function renderStudentSummary() {
  studentSummary = buildStudentSummary(getManagedStudents());
  updateStudentUrgentTabBadge(studentSummary);
  const summaryItems = [
    { label: "要フォロー", value: studentSummary.needsFollowUp || 0, unit: "名", sub: "未対応・対応中フォローがある学生", filterKey: "needsFollowUp", dueKey: "all" },
    { label: "未完了フォロー", value: studentSummary.openFollowups || 0, unit: "件", sub: "完了・不要を除く履歴", filterKey: "needsFollowUp", dueKey: "all" },
    { label: "期限超過", value: studentSummary.overdueFollowups || 0, unit: "件", sub: "本日より前の未完了フォロー", filterKey: "needsFollowUp", dueKey: "overdue" },
    { label: "今日対応", value: studentSummary.todayFollowups || 0, unit: "件", sub: "本日期日の未完了フォロー", filterKey: "needsFollowUp", dueKey: "today" },
    { label: "近日対応", value: studentSummary.soonFollowups || 0, unit: "件", sub: "明日から7日以内の未完了フォロー", filterKey: "needsFollowUp", dueKey: "soon" },
    { label: "完了履歴", value: studentSummary.completedFollowups || 0, unit: "件", sub: "完了済みフォロー履歴", filterKey: "completedFollowup", dueKey: "all" },
    { label: "見学予定者", value: studentSummary.salonTourScheduled || 0, unit: "名", sub: "サロン見学につなげる学生", filterKey: "salonTour", dueKey: "all" },
    { label: "面接予定者", value: studentSummary.interviewScheduled || 0, unit: "名", sub: "選考フォロー対象", filterKey: "interview", dueKey: "all" },
    { label: "内定者", value: studentSummary.offered || 0, unit: "名", sub: "内定後フォロー対象", filterKey: "offered", dueKey: "all" },
    { label: "入社予定者", value: studentSummary.expectedJoiners || 0, unit: "名", sub: "入社準備フォロー対象", filterKey: "expectedJoin", dueKey: "all" },
    { label: "男性", value: studentSummary.male || 0, unit: "名", sub: "学生管理の性別区分", filterKey: "male", dueKey: "all" },
    { label: "女性", value: studentSummary.female || 0, unit: "名", sub: "学生管理の性別区分", filterKey: "female", dueKey: "all" }
  ];

  const summaryGrid = document.getElementById("studentSummaryGrid");
  summaryGrid.innerHTML = summaryItems.map((item) => `
    <button class="student-summary-card clickable" type="button" data-summary-filter="${escapeHtml(item.filterKey || "all")}" data-summary-due="${escapeHtml(item.dueKey || "all")}">
      <p>${item.label}</p>
      <strong>${displayNumber(item.value)}${shouldMaskDashboardNumbers() ? "" : `<span>${escapeHtml(item.unit || "名")}</span>`}</strong>
      <small>${item.sub}</small>
    </button>
  `).join("");

  summaryGrid.querySelectorAll("[data-summary-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      activeStudentFilter = button.dataset.summaryFilter || "all";
      activeStudentDueFilter = button.dataset.summaryDue || "all";
      studentSearchQuery = "";
      studentListVisibleCount = getInitialStudentListCount();
      renderStudentList();
      document.getElementById("studentList")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

function renderStudentQualityNotice() {
  const container = document.getElementById("studentQualityNotice");
  if (!container) return;

  const issues = getStudentQualityIssues();
  const needsFix = issues.filter((issue) => issue.severity === "要修正").length;
  const warnings = issues.filter((issue) => issue.severity === "注意").length;
  const duplicates = issues.filter((issue) => issue.type === "重複候補").length;

  const hasIssues = needsFix || warnings || duplicates;
  container.innerHTML = `
    <div class="student-quality-summary ${hasIssues ? "is-warning" : "is-clear"}">
      <div>
        <span>データ品質</span>
        <strong>${hasIssues ? "確認が必要な項目があります" : "主要チェックは問題ありません"}</strong>
        <p>重複候補 ${displayNumber(duplicates)}件 / 要修正 ${displayNumber(needsFix)}件 / 注意 ${displayNumber(warnings)}件</p>
      </div>
      <button class="detail-button compact" type="button" data-quality-summary-open>データ品質を見る</button>
    </div>
  `;

  container.querySelector("[data-quality-summary-open]")?.addEventListener("click", () => {
    activateDashboardView("quality");
  });
}

function renderLstepIntegrationStatus() {
  const container = document.getElementById("lstepIntegrationStatus");
  if (!container) return;

  const isReady = Boolean(lstepSummary.configured);
  const statusClass = lstepSummary.status === "linked"
    ? "is-linked"
    : (isReady ? "is-ready" : "is-pending");
  const statusLabel = lstepSummary.status === "linked"
    ? "LSTEP紐付けあり"
    : (isReady ? "LSTEP受け皿あり" : "LSTEP未確認");
  const lastSyncedText = lstepSummary.lastSyncedAt
    ? formatDate(lstepSummary.lastSyncedAt)
    : "未同期";
  const rawNote = lstepSummary.note || "LSTEP連携の準備状況を確認します。";
  const displayNote = /読み取り失敗|Could not find the table|PGRST205|Invalid path/i.test(rawNote)
    ? "LSTEP連携テーブルは未作成または未同期です。学生データ側の未紐付け確認はこの画面で進められます。"
    : rawNote;
  const unlinkedStudents = getLstepUnlinkedStudents();
  const unlinkedCount = unlinkedStudents.length;
  const unlinkedOfferCount = unlinkedStudents.filter((student) => {
    return ["内定", "承諾"].includes(student.offerStatus) || ["入社予定", "入社済"].includes(student.expectedJoinStatus);
  }).length;

  const metrics = [
    { label: "有効な紐付け", value: lstepSummary.activeAccounts, unit: "件" },
    { label: "友だち", value: lstepSummary.friendAccounts, unit: "件" },
    { label: "未紐付け学生", value: unlinkedCount, unit: "名", tone: unlinkedCount ? "is-warning" : "is-linked" },
    { label: "内定後未紐付け", value: unlinkedOfferCount, unit: "名", tone: unlinkedOfferCount ? "is-danger" : "is-linked" },
    { label: "未処理イベント", value: lstepSummary.unprocessedEvents, unit: "件", tone: lstepSummary.unprocessedEvents ? "is-warning" : "" },
    { label: "最終同期", value: lastSyncedText, unit: "" }
  ];
  const nextSteps = [
    unlinkedCount
      ? `LSTEP未紐付けの学生 ${formatNumber.format(unlinkedCount)}名をCSVで照合する`
      : "学生とLSTEP/LINEアカウントの紐付けは現在クリア",
    lstepSummary.unprocessedEvents
      ? `未処理イベント ${formatNumber.format(lstepSummary.unprocessedEvents)}件を同期対象として確認する`
      : "未処理イベントは現在クリア",
    "連携テンプレートを制作会社へ渡し、出力可能な列名とID形式を確認する",
    "本接続時はLSTEP側IDと学生IDを突合し、GAS backend経由で保存する"
  ];
  const readinessItems = [
    {
      label: "学生正本",
      detail: "Supabase talent_students で管理中",
      done: true
    },
    {
      label: "未紐付け確認",
      detail: "学生一覧・データ品質・CSVで確認可能",
      done: true
    },
    {
      label: "制作会社向けテンプレート",
      detail: "必要な列名とID形式をCSVで共有可能",
      done: true
    },
    {
      label: "LSTEP受け皿SQL",
      detail: isReady ? "GASからLSTEP系テーブルを確認済み" : "supabase/talent_lstep_integration_review.sql の投入待ち",
      done: isReady
    },
    {
      label: "本同期方式",
      detail: "LSTEP側のAPI/Webhook/CSV仕様回答待ち",
      done: lstepSummary.status === "linked"
    }
  ];
  const vendorQuestions = [
    {
      label: "ユーザー識別子",
      detail: "LINEユーザーID、LSTEPユーザーIDのどちらをCSV/APIで取得できるか"
    },
    {
      label: "友だち状態",
      detail: "友だち、ブロック、配信不可、未登録を判別できる項目名"
    },
    {
      label: "最終接点",
      detail: "最終メッセージ日時、最終反応日時、フォーム回答日時の取得可否"
    },
    {
      label: "タグ・シナリオ",
      detail: "タグ名、シナリオ名、ステップ名を一覧で出力できるか"
    },
    {
      label: "同期方法",
      detail: "CSV手動、API定期取得、Webhook受信のどれに対応できるか"
    },
    {
      label: "制限事項",
      detail: "出力件数、API回数、個人情報項目、契約上の制限"
    }
  ];

  container.innerHTML = `
    <div class="lstep-status-header">
      <div>
        <p class="section-kicker">LSTEP Integration</p>
        <h3>LSTEP連携状況</h3>
        <p>${escapeHtml(displayNote)}</p>
      </div>
      <span class="lstep-status-pill ${statusClass}">${escapeHtml(statusLabel)}</span>
    </div>
    <div class="lstep-status-grid">
      ${metrics.map((item) => `
        <article class="lstep-status-card ${item.tone || ""}">
          <span>${escapeHtml(item.label)}</span>
          <strong>${typeof item.value === "number" ? displayNumber(item.value) : escapeHtml(item.value)}${item.unit && !shouldMaskDashboardNumbers() ? `<small>${escapeHtml(item.unit)}</small>` : ""}</strong>
        </article>
      `).join("")}
    </div>
    <div class="lstep-action-panel">
      <div>
        <strong>LSTEP本接続前の確認</strong>
        <p>未紐付け学生を先に整理しておくと、LSTEP同期時の名寄せミスを減らせます。</p>
      </div>
      <div class="lstep-action-buttons">
        <button type="button" data-lstep-open-students>未紐付け学生を見る</button>
        <button type="button" data-lstep-open-quality>データ品質で確認</button>
        <button type="button" data-lstep-export-unlinked ${unlinkedCount ? "" : "disabled"}>未紐付けCSV</button>
        <button type="button" data-lstep-export-template>連携テンプレート</button>
      </div>
      <ul>
        ${nextSteps.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
      </ul>
    </div>
    <div class="lstep-readiness-list" aria-label="LSTEP準備チェックリスト">
      ${readinessItems.map((item) => `
        <article class="${item.done ? "is-done" : "is-waiting"}">
          <span>${item.done ? "完了" : "待ち"}</span>
          <div>
            <strong>${escapeHtml(item.label)}</strong>
            <p>${escapeHtml(item.detail)}</p>
          </div>
        </article>
      `).join("")}
    </div>
    <div class="lstep-vendor-questions">
      <div>
        <strong>制作会社へ確認する項目</strong>
        <p>返答が来たら、この6項目を埋めると同期方式をすぐ決められます。</p>
      </div>
      <div class="lstep-vendor-question-grid">
        ${vendorQuestions.map((item) => `
          <article>
            <strong>${escapeHtml(item.label)}</strong>
            <p>${escapeHtml(item.detail)}</p>
          </article>
        `).join("")}
      </div>
    </div>
  `;

  container.querySelector("[data-lstep-open-students]")?.addEventListener("click", () => {
    activeStudentFilter = "lstepUnlinked";
    activeStudentDueFilter = "all";
    activeStudentSearchTerm = "";
    activeStudentSearchScope = "all";
    activateDashboardView("student");
    renderStudentList();
  });

  container.querySelector("[data-lstep-open-quality]")?.addEventListener("click", () => {
    activeDataQualityFilter = "lstepUnlinked";
    activateDashboardView("quality");
    renderDataQuality();
  });

  container.querySelector("[data-lstep-export-unlinked]")?.addEventListener("click", downloadLstepUnlinkedStudentCsv);
  container.querySelector("[data-lstep-export-template]")?.addEventListener("click", downloadLstepProviderTemplateCsv);
}
function updateStudentUrgentTabBadge(summary) {
  const badge = document.getElementById("studentUrgentTabBadge");
  if (!badge) return;
  if (shouldMaskDashboardNumbers()) {
    badge.hidden = true;
    badge.textContent = "";
    return;
  }
  const count = (summary.overdueFollowups || 0) + (summary.todayFollowups || 0);
  badge.hidden = count === 0;
  badge.textContent = formatNumber.format(count);
  badge.setAttribute("aria-label", `期限超過・今日対応 ${count}件`);
}

function renderStudentCohortTabs() {
  const tabs = document.getElementById("studentCohortTabs");
  if (!tabs) return;

  if (studentCohorts.length <= 1) {
    tabs.innerHTML = "";
    renderStudentEditControls();
    return;
  }

  tabs.innerHTML = studentCohorts.map((cohort) => `
    <button class="student-cohort-tab ${cohort.key === activeStudentCohort ? "active" : ""}" type="button" data-student-cohort="${cohort.key}">
      ${cohort.label}<span>${displayNumber(cohort.students.length)}</span>
    </button>
  `).join("");

  tabs.querySelectorAll("[data-student-cohort]").forEach((button) => {
    button.addEventListener("click", () => {
      activeStudentCohort = button.dataset.studentCohort;
      studentData = getActiveStudents();
      studentListVisibleCount = getInitialStudentListCount();
      renderStudentSummary();
      renderStudentActions();
      renderStudentList();
      renderDataQuality();
      renderStudentCohortTabs();
      renderStudentEditControls();
    });
  });

  renderStudentEditControls();
}

function renderStudentEditControls() {
  const addButton = document.getElementById("addStudentButton");
  const editNote = document.getElementById("studentEditNote");
  const editable = isActiveCohortEditable();
  const canEditStudents = canWriteActionFromDashboard("edit");
  const sheetName = getActiveSheetName();

  if (addButton) {
    addButton.disabled = !editable || !canEditStudents;
    addButton.textContent = !editable ? "全件参考は編集不可" : "学生追加";
    addButton.title = !canEditStudents ? "この操作に必要なNOV Talent権限がありません" : "";
  }

  if (editNote) {
    editNote.textContent = !canEditStudents
      ? "学生追加・更新にはNOV Talent編集権限が必要です。権限はGAS側でも確認されます。"
      : editable
      ? `${getActiveCohortLabel()}に学生を追加・更新します。保存後はスプレッドシートにも反映されます。`
      : `${sheetName}は集約確認用です。追加・更新は27卒、28卒、サロン実習の各タブで行ってください。`;
  }
}

const studentSelectOptions = {
  gender: ["男性", "女性", "その他", "未回答"],
  grade: ["1年", "2年", "既卒", "その他"],
  lineStatus: ["未登録", "登録済"],
  salonTourStatus: ["未設定", "予定", "実施済", "キャンセル"],
  interviewStatus: ["未設定", "予定", "実施済", "キャンセル"],
  resultStatus: ["未定", "合格", "条件付き合格", "再面接", "不合格", "辞退"],
  offerStatus: ["未定", "内定", "承諾", "辞退"],
  expectedJoinStatus: ["未定", "入社予定", "入社済", "辞退"],
  offerJoinStatus: ["未定", "内定", "入社予定", "入社済", "辞退"],
  managementStatus: ["有効", "管理対象外"]
};

function getOfferJoinStatusValue(student = {}) {
  if (student.expectedJoinStatus === "入社済") return "入社済";
  if (student.expectedJoinStatus === "入社予定") return "入社予定";
  if (student.offerStatus === "内定") return "内定";
  if (student.offerStatus === "承諾") return "内定";
  if (student.offerStatus === "辞退" || student.expectedJoinStatus === "辞退") return "辞退";
  return "未定";
}

function splitOfferJoinStatus(value) {
  switch (value) {
    case "内定":
      return { offerStatus: "内定", expectedJoinStatus: "未定" };
    case "入社予定":
      return { offerStatus: "内定", expectedJoinStatus: "入社予定" };
    case "入社済":
      return { offerStatus: "承諾", expectedJoinStatus: "入社済" };
    case "辞退":
      return { offerStatus: "辞退", expectedJoinStatus: "辞退" };
    default:
      return { offerStatus: "未定", expectedJoinStatus: "未定" };
  }
}

function renderSelectField(name, label, options, value = "", disabled = "") {
  return `
    <label>
      <span>${label}</span>
      <select name="${name}" ${disabled}>
        ${options.map((option) => `
          <option value="${escapeHtml(option)}" ${option === value ? "selected" : ""}>${escapeHtml(option)}</option>
        `).join("")}
      </select>
    </label>
  `;
}

function renderRequiredLabel(label) {
  return `${label}<b class="required-mark">必須</b>`;
}

function canWriteFromDashboard() {
  return Boolean(getHubCurrentEmployee());
}

function getHubRoleKeys() {
  const employee = getHubCurrentEmployee();
  if (!employee || typeof employee !== "object") return [];
  const rawRoles = []
    .concat(Array.isArray(employee.roleKeys) ? employee.roleKeys : [])
    .concat(Array.isArray(employee.roles) ? employee.roles : [])
    .concat(Array.isArray(employee.role_keys) ? employee.role_keys : []);

  return rawRoles.map((role) => {
    if (typeof role === "string") return role;
    if (role && typeof role === "object") {
      return role.roleKey || role.role_key || role.key || role.name || "";
    }
    return "";
  }).map(normalizeHubRoleKey).filter(Boolean);
}

function normalizeHubRoleKey(roleKey) {
  const normalized = String(roleKey || "")
    .trim()
    .replace(/([a-z0-9])([A-Z])/g, "$1_$2")
    .replace(/[\s-]+/g, "_")
    .toLowerCase();

  const aliases = {
    talent_admin_user: "talent_admin",
    nov_talent_admin: "talent_admin",
    nov_talent_editor: "talent_editor",
    nov_talent_viewer: "talent_viewer"
  };
  return aliases[normalized] || normalized;
}

function getHubDepartmentName() {
  const employee = getHubCurrentEmployee();
  if (!employee || typeof employee !== "object") return "";
  return String(
    employee.departmentName
    || employee.department_name
    || employee.department?.departmentName
    || employee.department?.department_name
    || employee.department?.name
    || ""
  ).trim();
}

function isHumanResourcesHubEmployee() {
  return getHubDepartmentName() === "総務人事部";
}

function canWriteActionFromDashboard(action = "edit") {
  if (!canWriteFromDashboard()) return false;
  return true;
}

function getTalentPermissionState() {
  const employee = getHubCurrentEmployee();
  const roleKeys = getHubRoleKeys().map((roleKey) => String(roleKey).trim()).filter(Boolean);
  const departmentName = getHubDepartmentName();

  if (!employee) {
    return {
      label: "HUB未連携",
      description: "NOV HUBから開くと保存操作と操作履歴の社員ID記録が有効になります。",
      roleKeys,
      canEdit: false,
      canAdmin: false,
      className: "is-missing"
    };
  }

  const canAdmin = roleKeys.some((roleKey) => ["super_admin", "talent_admin"].includes(roleKey));
  const canEdit = canAdmin || roleKeys.includes("talent_editor");
  const isViewer = roleKeys.includes("talent_viewer");

  if (!canAdmin && isHumanResourcesHubEmployee()) {
    return {
      label: "総務人事",
      description: "総務人事部として保存操作を有効にしています。保存時はGAS側でCore DB権限を最終確認します。",
      roleKeys,
      canEdit: true,
      canAdmin: true,
      className: "is-admin",
      departmentName
    };
  }

  if (canAdmin) {
    return {
      label: "管理者",
      description: "年度目標・学生データの保存ができます。保存時はGAS側でもCore DB権限を確認します。",
      roleKeys,
      canEdit: true,
      canAdmin: true,
      className: "is-admin"
    };
  }

  if (canEdit) {
    return {
      label: "編集者",
      description: "学生データの追加・更新ができます。年度目標の保存は管理者権限が必要です。",
      roleKeys,
      canEdit: true,
      canAdmin: false,
      className: "is-editor"
    };
  }

  if (isViewer) {
    return {
      label: "閲覧のみ",
      description: "閲覧できます。保存操作には talent_editor 以上の権限が必要です。",
      roleKeys,
      canEdit: false,
      canAdmin: false,
      className: "is-viewer"
    };
  }

  if (!roleKeys.length) {
    return {
      label: "権限未取得",
      description: "HUBからroleKeysを受け取れていません。保存時にGAS側でCore DB権限を最終確認します。",
      roleKeys,
      canEdit: true,
      canAdmin: false,
      className: "is-pending"
    };
  }

  return {
    label: "権限不足",
    description: "NOV Talentの編集権限がありません。Core DB側の employee_roles を確認してください。",
    roleKeys,
    canEdit: false,
    canAdmin: false,
    className: "is-denied"
  };
}

function getWriteDisabledAttribute(extraDisabled = false, action = "edit") {
  if (extraDisabled) return "disabled";
  if (!canWriteFromDashboard()) {
    return 'disabled title="NOV HUBから開き直すと保存できます"';
  }
  if (!canWriteActionFromDashboard(action)) {
    return 'disabled title="この操作に必要なNOV Talent権限がありません"';
  }
  return "";
}

function buildStudentSaveConfirmMessage(payload, mode) {
  const action = mode === "add" ? "追加" : "更新";
  const offerJoinStatus = payload.expectedJoinStatus && payload.expectedJoinStatus !== "未定"
    ? payload.expectedJoinStatus
    : (payload.offerStatus || "未定");
  const nextAction = payload.nextAction
    ? `${payload.nextAction} / ${payload.nextActionDate || "日程未設定"}`
    : "未設定";

  return [
    `学生データを${action}します。`,
    "",
    "【基本情報】",
    `氏名：${payload.name || "未入力"}`,
    `学校：${payload.school || "未入力"}`,
    `区分：${getActiveCohortLabel()}`,
    `管理状態：${payload.managementStatus}`,
    "",
    "【選考状況】",
    `LINE：${payload.lineStatus || "未設定"}`,
    `見学：${payload.salonTourStatus || "未設定"}`,
    `面接：${payload.interviewStatus || "未設定"}`,
    `選考結果：${payload.resultStatus || "未定"}`,
    `内定・入社：${offerJoinStatus}`,
    "",
    "【次の対応】",
    `次アクション：${nextAction}`,
    "",
    "保存後はSupabaseへ反映され、操作履歴にも記録されます。"
  ].join("\n");
}

function renderSettingsNumberField(name, label, value, unit, helpText) {
  return `
    <label>
      <span>${escapeHtml(label)}</span>
      <input name="${escapeHtml(name)}" type="number" min="0" step="1" value="${Number(value) || 0}" inputmode="numeric">
      <small>${escapeHtml(helpText || unit || "")}</small>
    </label>
  `;
}

function renderSettingsForm() {
  return `
    <form class="student-edit-form settings-edit-form" data-settings-form>
      <div class="student-form-heading">
        <div>
          <h3>年度目標を編集</h3>
          <p>Supabaseの年度設定に保存します。保存後、サマリーKPIへ反映されます。</p>
        </div>
      </div>
      <div class="student-form-guide">
        <strong>入力のポイント</strong>
        <ul>
          <li>年度目標は経営判断の基準値です。月次確認前に最新化してください。</li>
          <li>採用目標・接触目標・面接成約目標は、サマリーの達成率計算に使います。</li>
          <li>保存後は右上バッジがGAS Connectedの状態で再取得されます。</li>
        </ul>
      </div>
      ${renderOperatorNotice()}
      <div class="student-form-grid">
        <label>
          <span>年度</span>
          <input name="fiscalYear" value="${escapeHtml(dashboardConfig.fiscalYear || String(new Date().getFullYear()))}" placeholder="例：2026">
        </label>
        <label>
          <span>アプリ名</span>
          <input name="appName" value="${escapeHtml(dashboardConfig.appName || HUB_DISPLAY_APP_NAME)}" placeholder="${escapeHtml(HUB_DISPLAY_APP_NAME)}">
        </label>
        ${renderSettingsNumberField("targetHires", "採用目標人数", dashboardConfig.targetHires, "名", "今年度の内定・採用目標")}
        ${renderSettingsNumberField("targetContacts", "接触人数目標", dashboardConfig.targetContacts, "名", "フェア・学校接点の目標")}
        ${renderSettingsNumberField("targetInterviews", "面接成約目標", dashboardConfig.targetInterviews, "件", "面接化の目標")}
        ${renderSettingsNumberField("hiringBudget", "採用予算", dashboardConfig.hiringBudget, "円", "年間の人材投資予算")}
        ${renderSettingsNumberField("expectedJoiners", "入社予定数", dashboardConfig.expectedJoiners, "名", "入社準備・配属計画の目安")}
      </div>
      <div class="student-form-actions">
        <p class="student-form-status" aria-live="polite"></p>
        <button class="refresh-button" type="submit" ${getWriteDisabledAttribute(false, "updateSettings")}>目標を保存</button>
      </div>
    </form>
  `;
}

function getSettingsFormPayload(form) {
  const formData = new FormData(form);
  const toNumber = (name) => Number(String(formData.get(name) || "0").replace(/,/g, "")) || 0;
  return {
    fiscalYear: String(formData.get("fiscalYear") || "").trim(),
    appName: String(formData.get("appName") || "").trim(),
    targetHires: toNumber("targetHires"),
    targetContacts: toNumber("targetContacts"),
    targetInterviews: toNumber("targetInterviews"),
    hiringBudget: toNumber("hiringBudget"),
    expectedJoiners: toNumber("expectedJoiners")
  };
}

function getSettingsValidationErrors(payload) {
  const errors = [];
  if (!payload.fiscalYear) errors.push("年度を入力してください。");
  if (!payload.appName) errors.push("アプリ名を入力してください。");
  [
    ["採用目標人数", payload.targetHires],
    ["接触人数目標", payload.targetContacts],
    ["面接成約目標", payload.targetInterviews],
    ["採用予算", payload.hiringBudget],
    ["入社予定数", payload.expectedJoiners]
  ].forEach(([label, value]) => {
    if (!Number.isFinite(value) || value < 0) errors.push(`${label}は0以上の数値で入力してください。`);
  });
  return errors;
}

function buildSettingsSaveConfirmMessage(payload) {
  return [
    "年度目標を保存します。",
    "",
    `年度：${payload.fiscalYear}`,
    `採用目標人数：${formatNumber.format(payload.targetHires)}名`,
    `接触人数目標：${formatNumber.format(payload.targetContacts)}名`,
    `面接成約目標：${formatNumber.format(payload.targetInterviews)}件`,
    `採用予算：${formatCurrency.format(payload.hiringBudget)}`,
    `入社予定数：${formatNumber.format(payload.expectedJoiners)}名`,
    "",
    "保存してよろしいですか？"
  ].join("\n");
}

function openSettingsModal() {
  const modal = document.getElementById("studentModal");
  const content = document.getElementById("studentModalContent");

  content.innerHTML = `
    <div class="modal-header">
      <div>
        <p class="section-kicker">Investment Settings</p>
        <h2 id="studentModalTitle">年度目標編集</h2>
        <p>採用目標・接触人数目標・面接成約目標・予算をダッシュボードから更新します。</p>
      </div>
    </div>
    ${renderSettingsForm()}
  `;

  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  setupRenderedSettingsForm();
}

function setupRenderedSettingsForm() {
  const form = document.querySelector("[data-settings-form]");
  if (!form) return;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const submitButton = form.querySelector("button[type='submit']");
    const status = form.querySelector(".student-form-status");
    const payload = getSettingsFormPayload(form);
    const validationErrors = getSettingsValidationErrors(payload);

    if (validationErrors.length) {
      status.classList.add("is-error");
      status.innerHTML = validationErrors.map((error) => `・${escapeHtml(error)}`).join("<br>");
      return;
    }

    if (!window.confirm(buildSettingsSaveConfirmMessage(payload))) {
      status.classList.remove("is-error");
      status.textContent = "保存をキャンセルしました。";
      return;
    }

    try {
      submitButton.disabled = true;
      status.classList.remove("is-error");
      status.textContent = "保存中...";
      const result = await callGasAction("updateSettings", payload);
      if (!result || result.ok === false || result.error) {
        throw new Error(result?.error || "保存に失敗しました");
      }
      status.textContent = "保存しました。データを再取得しています...";
      closeStudentModal();
      await refreshDashboardData();
    } catch (error) {
      status.classList.add("is-error");
      status.textContent = `保存できませんでした：${error.message}`;
      submitButton.disabled = false;
    }
  });
}

function setupSettingsModal() {
  const settingsButton = document.getElementById("settingsEditButton");
  if (settingsButton) {
    settingsButton.addEventListener("click", openSettingsModal);
  }
}
function getStudentFormPayload(form) {
  const formData = new FormData(form);
  const offerJoinStatus = splitOfferJoinStatus(String(formData.get("offerJoinStatus") || "未定"));
  return {
    sheetName: getActiveSheetName(),
    studentRecordId: String(formData.get("studentRecordId") || ""),
    studentId: String(formData.get("studentId") || ""),
    name: String(formData.get("name") || "").trim(),
    gender: String(formData.get("gender") || "未回答"),
    school: String(formData.get("school") || "").trim(),
    grade: String(formData.get("grade") || ""),
    source: String(formData.get("source") || "").trim(),
    contactDate: String(formData.get("contactDate") || ""),
    lineStatus: String(formData.get("lineStatus") || "未登録"),
    salonTourStatus: String(formData.get("salonTourStatus") || "未設定"),
    interviewStatus: String(formData.get("interviewStatus") || "未設定"),
    resultStatus: String(formData.get("resultStatus") || "未定"),
    offerStatus: offerJoinStatus.offerStatus,
    expectedJoinStatus: offerJoinStatus.expectedJoinStatus,
    owner: String(formData.get("owner") || "総務人事").trim(),
    nextAction: String(formData.get("nextAction") || "").trim(),
    nextActionDate: String(formData.get("nextActionDate") || ""),
    memo: String(formData.get("memo") || "").trim(),
    managementStatus: String(formData.get("managementStatus") || "有効")
  };
}

function normalizeForDuplicateCheck(value) {
  return normalizeStudentSearchText(value);
}

function formatDuplicateStudentSummary(student) {
  return [
    student.studentId || "ID未取得",
    student.name || "氏名未入力",
    student.school || "学校未入力",
    student.cohort || "区分未設定",
    student.managementStatus || "管理状態未設定"
  ].join(" / ");
}

function getStudentValidationErrors(payload, mode) {
  const errors = [];
  const students = getAllActiveStudentsForDuplicateCheck();
  const normalizedName = normalizeForDuplicateCheck(payload.name);
  const normalizedSchool = normalizeForDuplicateCheck(payload.school);
  const duplicate = students.find((student) => {
    if (mode !== "add" && student.studentId === payload.studentId) return false;
    if (student.managementStatus === "管理対象外") return false;
    return normalizeForDuplicateCheck(student.name) === normalizedName
      && normalizeForDuplicateCheck(student.school) === normalizedSchool;
  });

  if (!payload.name) errors.push("氏名を入力してください。");
  if (!payload.school) errors.push("学校名を入力してください。");
  if (duplicate) {
    errors.push(`同じ氏名・学校名の学生が既にいます：${formatDuplicateStudentSummary(duplicate)}`);
  }
  if ((payload.salonTourStatus === "予定" || payload.interviewStatus === "予定") && !payload.nextActionDate) {
    errors.push("見学予定・面接予定の場合は、次アクション日を入力してください。");
  }

  return errors;
}

function getAllActiveStudentsForDuplicateCheck() {
  const byId = new Map();
  const allCohortStudents = studentCohorts.flatMap((cohort) => cohort.students || []);
  const source = allCohortStudents.length ? allCohortStudents : studentData;

  source.forEach((student) => {
    const key = student.studentId || `${student.name}__${student.school}__${student.cohort || ""}`;
    if (!byId.has(key)) byId.set(key, student);
  });

  return Array.from(byId.values()).filter((student) => student.managementStatus !== "管理対象外");
}

function getAllStudentsForLookup() {
  const byKey = new Map();
  const allCohortStudents = studentCohorts.flatMap((cohort) => cohort.students || []);
  const source = allCohortStudents.length ? allCohortStudents : studentData;

  source.forEach((student) => {
    const key = student.id || student.studentId || `${student.name}__${student.school}__${student.cohort || ""}`;
    if (!byKey.has(key)) byKey.set(key, student);
  });

  return Array.from(byKey.values());
}

function findStudentByOperationLog(log) {
  const candidates = [
    log.studentId,
    log.studentCode,
    log.targetId,
    log.recordId
  ].filter(Boolean).map(String);
  if (!candidates.length) return null;

  return getAllStudentsForLookup().find((student) => {
    return candidates.includes(String(student.id || ""))
      || candidates.includes(String(student.studentId || ""));
  }) || null;
}

function getOperationLogsForStudent(student) {
  if (!student) return [];
  const studentKeys = [
    student.id,
    student.studentId
  ].filter(Boolean).map(String);

  if (!studentKeys.length) return [];

  return operationLogs
    .filter((log) => {
      const logKeys = [
        log.studentId,
        log.studentCode,
        log.targetId,
        log.recordId
      ].filter(Boolean).map(String);
      return logKeys.some((key) => studentKeys.includes(key));
    })
    .slice(0, 5);
}

function renderStudentOperationLogSection(student) {
  const logs = getOperationLogsForStudent(student);
  if (!logs.length) {
    return `
      <section class="student-operation-log-panel">
        <div class="student-form-heading">
          <div>
            <h3>操作履歴</h3>
            <p>この学生に紐づく操作履歴はまだ取得できていません。</p>
          </div>
        </div>
      </section>
    `;
  }

  return `
    <section class="student-operation-log-panel">
      <div class="student-form-heading">
        <div>
          <h3>操作履歴</h3>
          <p>この学生に紐づく最近の操作を最大5件表示します。</p>
        </div>
      </div>
      <div class="student-operation-log-list">
        ${logs.map((log) => {
          const isDenied = log.result === "denied";
          const isInactiveChange = isManagementExcludedOperationLog(log);
          const actionClass = isDenied ? "is-danger" : (isInactiveChange ? "is-inactive" : getOperationLogActionClass(log.action));
          const actionLabel = isDenied ? "拒否" : (isInactiveChange ? "対象外" : (log.action || "操作"));
          return `
            <article class="student-operation-log-item ${isDenied ? "is-denied" : ""} ${isInactiveChange ? "is-inactive" : ""}">
              <span class="operation-log-action ${actionClass}">${escapeHtml(actionLabel)}</span>
              <div>
                <strong>${escapeHtml(formatOperationLogDate(log.createdAt))}</strong>
                <p>${escapeHtml(log.detail || "詳細未記録")}</p>
                ${log.reason ? `<small>理由：${escapeHtml(log.reason)}</small>` : ""}
              </div>
            </article>
          `;
        }).join("")}
      </div>
    </section>
  `;
}

function renderStudentStoreSection(student) {
  const preferences = Array.isArray(student.storePreferences) ? student.storePreferences : [];
  const histories = Array.isArray(student.storeTourHistories) ? student.storeTourHistories : [];
  return `
    <section class="student-store-panel">
      <div class="student-form-heading">
        <div>
          <h3>店舗希望・見学履歴</h3>
          <p>配属希望店舗と、実際に見学した店舗を分けて管理します。</p>
        </div>
      </div>
      <div class="student-store-grid">
        <div class="student-store-card">
          <strong>配属希望店舗</strong>
          ${preferences.length ? preferences.map((preference) => `
            <p><span>第${escapeHtml(String(preference.preferenceRank || ""))}希望</span>${escapeHtml(preference.storeName || "店舗未設定")}</p>
            ${preference.memo ? `<small>${escapeHtml(preference.memo)}</small>` : ""}
          `).join("") : `<p class="student-empty compact">配属希望店舗は未設定です。</p>`}
        </div>
        <div class="student-store-card">
          <strong>見学店舗履歴</strong>
          ${histories.length ? histories.map((history) => `
            <article class="store-history-item">
              <div>
                <b>${escapeHtml(history.storeName || "店舗未設定")}</b>
                <span>${escapeHtml(history.tourDate || "日付未設定")} / ${escapeHtml(history.tourStatus || "予定")}</span>
              </div>
              ${history.memo ? `<p>${escapeHtml(history.memo)}</p>` : ""}
            </article>
          `).join("") : `<p class="student-empty compact">見学店舗履歴はまだありません。</p>`}
        </div>
      </div>
      ${renderStorePreferenceForm(student)}
      ${renderStoreTourHistoryForm(student)}
    </section>
  `;
}

function renderStorePreferenceForm(student) {
  const disabled = isActiveCohortEditable() ? "" : "disabled";
  return `
    <form class="student-edit-form compact-form" data-store-preference-form>
      <input type="hidden" name="studentId" value="${escapeHtml(student.studentId || "")}">
      <input type="hidden" name="studentRecordId" value="${escapeHtml(student.id || "")}">
      ${renderStorePreferenceFields(student, disabled)}
      <div class="student-form-actions">
        <p class="student-form-status" aria-live="polite"></p>
        <button class="refresh-button" type="submit" ${getWriteDisabledAttribute(!isActiveCohortEditable() || !storeOptions.length)}>配属希望を保存</button>
      </div>
    </form>
  `;
}

function renderStoreTourHistoryForm(student) {
  const disabled = isActiveCohortEditable() ? "" : "disabled";
  return `
    <form class="student-edit-form compact-form" data-store-tour-history-form>
      <input type="hidden" name="studentId" value="${escapeHtml(student.studentId || "")}">
      <input type="hidden" name="studentRecordId" value="${escapeHtml(student.id || "")}">
      <div class="student-form-grid">
        ${renderStoreSelectField("storeId", "見学店舗", "", disabled)}
        <label>
          <span>見学日</span>
          <input name="tourDate" type="date" ${disabled}>
        </label>
        ${renderSelectField("tourStatus", "見学状態", ["予定", "実施済", "キャンセル"], "実施済", disabled)}
      </div>
      <label class="student-form-full">
        <span>見学メモ</span>
        <textarea name="memo" rows="2" placeholder="見学時の反応、希望、店舗側のメモなど" ${disabled}></textarea>
      </label>
      <div class="student-form-actions">
        <p class="student-form-status" aria-live="polite"></p>
        <button class="refresh-button" type="submit" ${getWriteDisabledAttribute(!isActiveCohortEditable() || !storeOptions.length)}>見学履歴を追加</button>
      </div>
    </form>
  `;
}

function getStoreTourHistoryPayload(form) {
  const formData = new FormData(form);
  return {
    studentId: String(formData.get("studentId") || ""),
    studentRecordId: String(formData.get("studentRecordId") || ""),
    storeId: String(formData.get("storeId") || ""),
    tourDate: String(formData.get("tourDate") || ""),
    tourStatus: String(formData.get("tourStatus") || "予定"),
    memo: String(formData.get("memo") || "").trim()
  };
}

function getStorePreferencePayload(form) {
  const formData = new FormData(form);
  return {
    studentId: String(formData.get("studentId") || ""),
    studentRecordId: String(formData.get("studentRecordId") || ""),
    storePreferences: [1, 2, 3].map((rank) => ({
      preferenceRank: rank,
      storeId: String(formData.get(`preferredStore${rank}`) || ""),
      memo: String(formData.get(`preferredStoreMemo${rank}`) || "").trim()
    })).filter((preference) => preference.storeId)
  };
}

function setupRenderedStorePreferenceForm() {
  const form = document.querySelector("[data-store-preference-form]");
  if (!form) return;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const submitButton = form.querySelector("button[type='submit']");
    const status = form.querySelector(".student-form-status");
    const payload = getStorePreferencePayload(form);

    if (!isActiveCohortEditable()) {
      status.textContent = "全件参考シートは編集できません。";
      return;
    }
    if (!storeOptions.length) {
      status.classList.add("is-error");
      status.textContent = "店舗マスタを取得できていません。データ更新後に再度お試しください。";
      return;
    }

    try {
      submitButton.disabled = true;
      status.classList.remove("is-error");
      status.textContent = "保存中...";
      await saveStudentStorePreferences(payload);
      status.textContent = "保存しました。データを再取得しています...";
      await refreshStudentModalAfterStoreSave(payload, status);
    } catch (error) {
      status.classList.add("is-error");
      status.textContent = `保存できませんでした：${error.message}`;
    } finally {
      submitButton.disabled = false;
    }
  });
}

function setupRenderedStoreTourHistoryForm() {
  const form = document.querySelector("[data-store-tour-history-form]");
  if (!form) return;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const submitButton = form.querySelector("button[type='submit']");
    const status = form.querySelector(".student-form-status");
    const payload = getStoreTourHistoryPayload(form);

    if (!isActiveCohortEditable()) {
      status.textContent = "全件参考シートは編集できません。";
      return;
    }
    if (!payload.storeId) {
      status.classList.add("is-error");
      status.textContent = "見学店舗を選択してください。";
      return;
    }

    try {
      submitButton.disabled = true;
      status.classList.remove("is-error");
      status.textContent = "保存中...";
      const result = await callGasAction("addStudentStoreTourHistory", payload);
      if (!result || result.ok === false || result.error) {
        throw new Error(result?.error || "保存に失敗しました");
      }
      if (!result.verified || !result.tourHistoryId) {
        throw new Error("保存確認ができませんでした。データ更新後に再度確認してください。");
      }
      status.textContent = "保存しました。データを再取得しています...";
      await refreshStudentModalAfterStoreSave({
        ...payload,
        studentRecordId: result.studentRecordId || payload.studentRecordId || "",
        studentId: result.studentId || payload.studentId || ""
      }, status);
    } catch (error) {
      status.classList.add("is-error");
      status.textContent = `保存できませんでした：${error.message}`;
    } finally {
      submitButton.disabled = false;
    }
  });
}

async function refreshStudentModalAfterStoreSave(payload, statusElement) {
  try {
    await refreshDashboardData();
  } catch (error) {
    if (statusElement) {
      statusElement.classList.add("is-error");
      statusElement.textContent = `保存は完了しましたが、再取得に失敗しました：${error.message}。右上の「データ更新」を押してください。`;
    }
    return;
  }

  const updatedStudent = getAllStudentsForLookup().find((student) => {
    return String(student.id || "") === String(payload.studentRecordId || "")
      || String(student.studentId || "") === String(payload.studentId || "");
  });

  if (updatedStudent) {
    openStudentModal(updatedStudent);
  } else {
    if (statusElement) {
      statusElement.classList.add("is-error");
      statusElement.textContent = "保存は完了しましたが、学生カードの再表示ができませんでした。右上の「データ更新」を押してください。";
    }
  }
}

function renderStudentFollowupSection(student) {
  const followups = Array.isArray(student.followups) ? student.followups : [];
  return `
    <section class="student-followup-panel">
      <div class="student-form-heading">
        <div>
          <h3>フォロー履歴</h3>
          <p>LINE連絡、面談、見学前後フォローなどを履歴として残します。</p>
        </div>
      </div>
      <div class="followup-list">
        ${followups.length ? followups.map((followup) => `
          <article class="followup-item">
            <div>
              <strong>${escapeHtml(followup.actionTitle || "対応内容未設定")}</strong>
              <p>${escapeHtml(followup.memo || "メモなし")}</p>
            </div>
            <div class="student-action-meta">
              <span>${escapeHtml(followup.dueDate || "期日未設定")}</span>
              <b>${escapeHtml(followup.status || "未対応")}</b>
            </div>
            <p class="followup-audit">
              最終更新：${escapeHtml(followup.updatedAt || "未記録")} / ${escapeHtml(followup.updatedBy || followup.updatedByEmployeeId || "更新者未記録")}
            </p>
            ${followup.id ? `
              <form class="followup-status-form" data-followup-status-form>
                <input type="hidden" name="followupId" value="${escapeHtml(followup.id)}">
                <select name="status" ${isActiveCohortEditable() ? "" : "disabled"}>
                  ${["未対応", "対応中", "完了", "不要"].map((status) => `<option value="${status}" ${status === followup.status ? "selected" : ""}>${status}</option>`).join("")}
                </select>
                <button class="detail-button compact" type="submit" ${getWriteDisabledAttribute(!isActiveCohortEditable())}>状態更新</button>
                <span class="followup-status-message" aria-live="polite"></span>
              </form>
            ` : ""}
          </article>
        `).join("") : `<div class="student-empty">フォロー履歴はまだありません。</div>`}
      </div>
      ${renderFollowupForm(student)}
    </section>
  `;
}

function renderFollowupForm(student) {
  const disabled = isActiveCohortEditable() ? "" : "disabled";
  return `
    <form class="student-edit-form compact-form" data-followup-form>
      <input type="hidden" name="studentId" value="${escapeHtml(student.studentId || "")}">
      <input type="hidden" name="studentRecordId" value="${escapeHtml(student.id || "")}">
      <div class="student-form-grid">
        <label>
          <span>${renderRequiredLabel("対応内容")}</span>
          <input name="actionTitle" placeholder="例：見学後フォローLINE" required ${disabled}>
        </label>
        <label>
          <span>期日</span>
          <input name="dueDate" type="date" ${disabled}>
        </label>
        ${renderSelectField("status", "状態", ["未対応", "対応中", "完了", "不要"], "未対応", disabled)}
      </div>
      <label class="student-form-full">
        <span>メモ</span>
        <textarea name="memo" rows="2" placeholder="対応内容、反応、次回確認事項など" ${disabled}></textarea>
      </label>
      <div class="student-form-actions">
        <p class="student-form-status" aria-live="polite"></p>
        <button class="refresh-button" type="submit" ${getWriteDisabledAttribute(!isActiveCohortEditable())}>履歴を追加</button>
      </div>
    </form>
  `;
}

function getFollowupFormPayload(form) {
  const formData = new FormData(form);
  return {
    studentId: String(formData.get("studentId") || ""),
    studentRecordId: String(formData.get("studentRecordId") || ""),
    actionTitle: String(formData.get("actionTitle") || "").trim(),
    dueDate: String(formData.get("dueDate") || ""),
    status: String(formData.get("status") || "未対応"),
    memo: String(formData.get("memo") || "").trim()
  };
}

function setupRenderedFollowupForm() {
  const form = document.querySelector("[data-followup-form]");
  if (!form) return;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const submitButton = form.querySelector("button[type='submit']");
    const status = form.querySelector(".student-form-status");
    const payload = getFollowupFormPayload(form);

    if (!isActiveCohortEditable()) {
      status.textContent = "全件参考シートは編集できません。";
      return;
    }
    if (!payload.actionTitle) {
      status.classList.add("is-error");
      status.textContent = "対応内容を入力してください。";
      return;
    }

    try {
      submitButton.disabled = true;
      status.classList.remove("is-error");
      status.textContent = "保存中...";
      const result = await callGasAction("addFollowup", payload);
      if (!result || result.ok === false || result.error) {
        throw new Error(result?.error || "保存に失敗しました");
      }
      status.textContent = "保存しました。データを再取得しています...";
      closeStudentModal();
      await refreshDashboardData();
    } catch (error) {
      status.classList.add("is-error");
      status.textContent = `保存できませんでした：${error.message}`;
      submitButton.disabled = false;
    }
  });
}

function setupRenderedFollowupStatusForms() {
  document.querySelectorAll("[data-followup-status-form]").forEach((form) => {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const statusMessage = form.querySelector(".followup-status-message");
      const submitButton = form.querySelector("button[type='submit']");
      const formData = new FormData(form);
      const payload = {
        followupId: String(formData.get("followupId") || ""),
        status: String(formData.get("status") || "未対応")
      };

      if (!isActiveCohortEditable()) {
        statusMessage.textContent = "全件参考シートは編集できません。";
        return;
      }

      try {
        submitButton.disabled = true;
        statusMessage.classList.remove("is-error");
        statusMessage.textContent = "更新中...";
        const result = await callGasAction("updateFollowup", payload);
        if (!result || result.ok === false || result.error) {
          throw new Error(result?.error || "更新に失敗しました");
        }
        statusMessage.textContent = "更新しました。";
        closeStudentModal();
        await refreshDashboardData();
      } catch (error) {
        statusMessage.classList.add("is-error");
        statusMessage.textContent = `更新できませんでした：${error.message}`;
        submitButton.disabled = false;
      }
    });
  });
}
function setupFollowupCompleteButtons(scope = document) {
  if (!scope) return;

  scope.querySelectorAll("[data-followup-complete]").forEach((button) => {
    button.addEventListener("click", async (event) => {
      event.preventDefault();
      event.stopPropagation();

      const followupId = button.dataset.followupComplete;
      if (!followupId || button.disabled) return;
      if (!isActiveCohortEditable()) {
        alert("全件参考シートは編集できません。");
        return;
      }

      const originalText = button.textContent;
      try {
        button.disabled = true;
        button.textContent = "完了中...";
        const result = await callGasAction("updateFollowup", { followupId, status: "完了" });
        if (!result || result.ok === false || result.error) {
          throw new Error(result?.error || "更新に失敗しました");
        }
        button.textContent = "完了済み";
        await refreshDashboardData();
      } catch (error) {
        button.disabled = false;
        button.textContent = originalText || "完了";
        alert(`フォロー完了にできませんでした：${error.message}`);
      }
    });
  });
}

function getStorePreferenceByRank(student, rank) {
  return (student.storePreferences || []).find((preference) => Number(preference.preferenceRank) === rank) || {};
}

function renderStoreSelectField(name, label, selectedStoreId, disabled = "") {
  const options = storeOptions.length
    ? storeOptions.map((store) => `<option value="${escapeHtml(store.id)}" ${store.id === selectedStoreId ? "selected" : ""}>${escapeHtml(store.name || store.id)}</option>`).join("")
    : "";
  return `
    <label>
      <span>${escapeHtml(label)}</span>
      <select name="${escapeHtml(name)}" ${disabled} ${storeOptions.length ? "" : "disabled"}>
        <option value="">未設定</option>
        ${options}
      </select>
      ${storeOptions.length ? "" : "<small>店舗マスタを取得できていません。</small>"}
    </label>
  `;
}

function renderStorePreferenceFields(student, disabled = "") {
  return `
    <section class="student-store-form-section">
      <div class="student-form-heading">
        <div>
          <h3>配属希望店舗</h3>
          <p>第1希望から第3希望まで登録できます。店舗名の正本はCore DBの店舗マスタです。</p>
        </div>
      </div>
      <div class="student-form-grid">
        ${[1, 2, 3].map((rank) => {
          const preference = getStorePreferenceByRank(student, rank);
          return `
            ${renderStoreSelectField(`preferredStore${rank}`, `第${rank}希望店舗`, preference.storeId || "", disabled)}
            <label>
              <span>第${rank}希望メモ</span>
              <input name="preferredStoreMemo${rank}" value="${escapeHtml(preference.memo || "")}" placeholder="例：本人希望・通勤面など" ${disabled}>
            </label>
          `;
        }).join("")}
      </div>
    </section>
  `;
}

function buildStorePreferenceSavePayload(payload, studentIdOverride = "") {
  return {
    studentId: studentIdOverride || payload.studentId || "",
    studentRecordId: payload.studentRecordId || "",
    storePreferences: JSON.stringify(payload.storePreferences || [])
  };
}

async function saveStudentStorePreferences(payload, studentIdOverride = "") {
  if (!storeOptions.length) return null;
  const result = await callGasAction("updateStudentStorePreferences", buildStorePreferenceSavePayload(payload, studentIdOverride));
  if (!result || result.ok === false || result.error) {
    throw new Error(result?.error || "配属希望店舗の保存に失敗しました");
  }
  return result;
}

function renderStudentForm(student = {}, mode = "update") {
  const isAdd = mode === "add";
  const disabled = isActiveCohortEditable() ? "" : "disabled";
  const submitText = isAdd ? "学生を追加" : "更新を保存";

  return `
    <form class="student-edit-form" data-student-form="${mode}">
      <input type="hidden" name="studentRecordId" value="${escapeHtml(student.id || "")}">
      <input type="hidden" name="studentId" value="${escapeHtml(student.studentId || "")}">
      <input type="hidden" name="owner" value="${escapeHtml(student.owner || "総務人事")}">
      <div class="student-form-heading">
        <div>
          <h3>${isAdd ? "学生を追加" : "日常フォローを更新"}</h3>
          <p>${escapeHtml(getActiveCohortLabel())} / ${escapeHtml(getActiveSheetName())}</p>
        </div>
      </div>
      <div class="student-form-guide">
        <strong>入力のポイント</strong>
        <ul>
          <li>氏名と学校名は重複チェックに使います。正式名称で入力してください。</li>
          <li>見学予定・面接予定にする場合は、次アクション日も入力してください。</li>
          <li>内定・入社ステータスは「内定」「入社予定」「入社済」「辞退」の進行管理に使います。</li>
          <li>誤登録や対象外は削除せず、管理状態を「管理対象外」にします。</li>
        </ul>
      </div>
      ${renderOperatorNotice()}
      <section class="student-form-section student-form-section-priority">
        <div class="student-form-section-title">
          <span>1</span>
          <div>
            <h4>今日更新すること</h4>
            <p>日常運用では、次アクションと期限をまず更新します。</p>
          </div>
        </div>
        <div class="student-form-grid">
          <label>
            <span>次アクション日</span>
            <input name="nextActionDate" type="date" value="${escapeHtml(student.nextActionDate || "")}" ${disabled}>
          </label>
          <label>
            <span>次アクション</span>
            <input name="nextAction" value="${escapeHtml(student.nextAction || "")}" placeholder="例：見学前リマインド" ${disabled}>
          </label>
        </div>
        <label class="student-form-full">
          <span>メモ</span>
          <textarea name="memo" rows="3" placeholder="次回確認すること、本人の希望、面談メモなど" ${disabled}>${escapeHtml(student.memo || "")}</textarea>
        </label>
      </section>
      <section class="student-form-section">
        <div class="student-form-section-title">
          <span>2</span>
          <div>
            <h4>選考状況</h4>
            <p>LINE、見学、面接、内定・入社の進み具合を更新します。</p>
          </div>
        </div>
        <div class="student-form-grid">
          ${renderSelectField("lineStatus", "LINE登録", studentSelectOptions.lineStatus, student.lineStatus || "未登録", disabled)}
          ${renderSelectField("salonTourStatus", "見学ステータス", studentSelectOptions.salonTourStatus, student.salonTourStatus || "未設定", disabled)}
          ${renderSelectField("interviewStatus", "面接ステータス", studentSelectOptions.interviewStatus, student.interviewStatus || "未設定", disabled)}
          ${renderSelectField("resultStatus", "選考結果", studentSelectOptions.resultStatus, student.resultStatus || "未定", disabled)}
          ${renderSelectField("offerJoinStatus", "内定・入社ステータス", studentSelectOptions.offerJoinStatus, getOfferJoinStatusValue(student), disabled)}
        </div>
      </section>
      <section class="student-form-section">
        <div class="student-form-section-title">
          <span>3</span>
          <div>
            <h4>基本情報</h4>
            <p>初回登録時または情報が変わった時だけ確認します。</p>
          </div>
        </div>
        <div class="student-form-grid">
          <label>
            <span>${renderRequiredLabel("氏名")}</span>
            <input name="name" value="${escapeHtml(student.name || "")}" placeholder="例：山田 花" ${isAdd ? "required" : ""} ${disabled}>
          </label>
          ${renderSelectField("gender", "性別", studentSelectOptions.gender, student.gender || "未回答", disabled)}
          <label>
            <span>${renderRequiredLabel("学校名")}</span>
            <input name="school" value="${escapeHtml(student.school || "")}" placeholder="例：山野美容専門学校" ${isAdd ? "required" : ""} ${disabled}>
          </label>
          ${renderSelectField("grade", "学年", studentSelectOptions.grade, student.grade || "2年", disabled)}
          <label>
            <span>流入元</span>
            <input name="source" value="${escapeHtml(student.source || "")}" placeholder="フェア名・学校訪問など" ${disabled}>
          </label>
          <label>
            <span>接触日</span>
            <input name="contactDate" type="date" value="${escapeHtml(student.contactDate || "")}" ${disabled}>
          </label>
        </div>
      </section>
      <details class="student-admin-details">
        <summary>管理項目を表示</summary>
        <div class="student-form-grid">
          ${renderSelectField("managementStatus", "管理状態", studentSelectOptions.managementStatus, student.managementStatus || "有効", disabled)}
          <label>
            <span>担当者</span>
            <input value="${escapeHtml(student.owner || "総務人事")}" disabled>
          </label>
          <label>
            <span>学生ID</span>
            <input value="${escapeHtml(student.studentId || "未採番")}" disabled>
          </label>
          <label>
            <span>DB ID</span>
            <input value="${escapeHtml(student.id || "未取得")}" disabled>
          </label>
        </div>
      </details>
      <div class="student-form-actions">
        <p class="student-form-status" aria-live="polite"></p>
        <button class="refresh-button" type="submit" ${getWriteDisabledAttribute(!isActiveCohortEditable())}>${submitText}</button>
      </div>
    </form>
  `;
}

function setupRenderedStudentForm() {
  const form = document.querySelector("[data-student-form]");
  if (!form) return;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const mode = form.dataset.studentForm;
    const submitButton = form.querySelector("button[type='submit']");
    const status = form.querySelector(".student-form-status");
    const payload = getStudentFormPayload(form);

    if (!isActiveCohortEditable()) {
      status.textContent = "全件参考シートは編集できません。";
      return;
    }

    const validationErrors = getStudentValidationErrors(payload, mode);
    if (validationErrors.length) {
      status.classList.add("is-error");
      status.innerHTML = validationErrors.map((error) => `・${escapeHtml(error)}`).join("<br>");
      return;
    }

    if (!window.confirm(buildStudentSaveConfirmMessage(payload, mode))) {
      status.classList.remove("is-error");
      status.textContent = "保存をキャンセルしました。";
      return;
    }

    try {
      submitButton.disabled = true;
      status.classList.remove("is-error");
      status.textContent = "保存中...";
      const result = await callGasAction(mode === "add" ? "addStudent" : "updateStudent", payload);
      if (!result || result.ok === false || result.error) {
        throw new Error(result?.error || "保存に失敗しました");
      }
      status.textContent = "保存しました。データを再取得しています...";
      closeStudentModal();
      await refreshDashboardData();
    } catch (error) {
      status.classList.add("is-error");
      status.textContent = `保存できませんでした：${error.message}`;
      submitButton.disabled = false;
    }
  });
}

function renderStudentActions() {
  const actionItems = getManagedStudents()
    .flatMap(getStudentActionItems)
    .sort((a, b) => {
      const urgencyCompare = getActionSortWeight(a.dueDate) - getActionSortWeight(b.dueDate);
      if (urgencyCompare !== 0) return urgencyCompare;
      const dateCompare = getActionSortDate(a.dueDate).localeCompare(getActionSortDate(b.dueDate));
      if (dateCompare !== 0) return dateCompare;
      return Number(b.isFollowup) - Number(a.isFollowup);
    })
    .slice(0, 8);

  if (actionItems.length === 0) {
    document.getElementById("studentActionList").innerHTML = `
      <div class="student-empty">次アクションが登録されている学生はいません。</div>
    `;
    return;
  }

  document.getElementById("studentActionList").innerHTML = actionItems.map((item) => `
    <article class="student-action-item">
      <div>
        <strong>${escapeHtml(item.student.name || "氏名未設定")}</strong>
        <p>${escapeHtml(item.student.school || "学校未設定")} / ${escapeHtml(item.student.source || "接点未設定")} / ${escapeHtml(item.sourceLabel)}</p>
      </div>
      <div class="student-action-meta">
        <span>${escapeHtml(item.dueDate || "日付未設定")}</span>
        ${renderActionBadge(item)}
        <b>${escapeHtml(item.title)}</b>
        <small>${escapeHtml(item.status)}</small>
        <div class="student-action-buttons">
          <button class="detail-button compact" type="button" data-open-student-id="${escapeHtml(item.student.studentId)}">カルテ</button>
          ${renderFollowupCompleteButton(item)}
        </div>
      </div>
    </article>
  `).join("");

  setupFollowupCompleteButtons(document.getElementById("studentActionList"));
  setupStudentOpenButtons(document.getElementById("studentActionList"));
}

function getStudentFilters() {
  return [
    { key: "all", label: "すべて", predicate: () => true },
    { key: "needsFollowUp", label: "要フォロー", predicate: (student) => (student.nextAction && !student.nextActionDate) || hasOpenFollowup(student) },
    { key: "completedFollowup", label: "完了履歴", predicate: hasCompletedFollowup },
    { key: "salonTour", label: "見学予定", predicate: (student) => student.salonTourStatus === "予定" },
    { key: "interview", label: "面接予定", predicate: (student) => student.interviewStatus === "予定" },
    { key: "offered", label: "内定", predicate: (student) => student.offerStatus === "内定" },
    { key: "expectedJoin", label: "入社予定", predicate: (student) => student.expectedJoinStatus === "入社予定" },
    { key: "lstepUnlinked", label: "LSTEP未紐付け", predicate: (student) => !student.lineAccount || !student.lineAccount.id },
    { key: "lstepFriend", label: "LSTEP友だち", predicate: (student) => student.lineAccount?.friendStatus === "friend" },
    { key: "lstepBlocked", label: "LSTEPブロック", predicate: (student) => student.lineAccount?.friendStatus === "blocked" },
    { key: "inactive", label: "管理対象外", predicate: (student) => student.managementStatus === "管理対象外" },
    { key: "male", label: "男性", predicate: (student) => student.gender === "男性" },
    { key: "female", label: "女性", predicate: (student) => student.gender === "女性" }
  ];
}

function getStudentDueFilters() {
  return [
    { key: "all", label: "期限すべて", predicate: () => true },
    { key: "overdue", label: "期限超過", predicate: (student) => getActionUrgency(getPrimaryStudentAction(student)?.dueDate).level === "overdue" },
    { key: "today", label: "今日対応", predicate: (student) => getActionUrgency(getPrimaryStudentAction(student)?.dueDate).level === "today" },
    { key: "soon", label: "近日対応", predicate: (student) => ["tomorrow", "soon"].includes(getActionUrgency(getPrimaryStudentAction(student)?.dueDate).level) },
    { key: "unscheduled", label: "日程未設定", predicate: (student) => getActionUrgency(getPrimaryStudentAction(student)?.dueDate).level === "unscheduled" }
  ];
}

function getStudentQuickFilters() {
  return [
    { label: "今日対応", filterKey: "needsFollowUp", dueKey: "today", tone: "danger" },
    { label: "期限超過", filterKey: "needsFollowUp", dueKey: "overdue", tone: "danger" },
    { label: "日程未設定", filterKey: "needsFollowUp", dueKey: "unscheduled", tone: "warning" },
    { label: "見学予定", filterKey: "salonTour", dueKey: "all", tone: "blue" },
    { label: "面接予定", filterKey: "interview", dueKey: "all", tone: "blue" },
    { label: "内定者", filterKey: "offered", dueKey: "all", tone: "green" },
    { label: "LSTEP未紐付け", filterKey: "lstepUnlinked", dueKey: "all", tone: "warning" }
  ];
}

function getStudentFilterCount(filterKey, dueKey = "all") {
  const statusFilter = getStudentFilters().find((filter) => filter.key === filterKey) || getStudentFilters()[0];
  const dueFilter = getStudentDueFilters().find((filter) => filter.key === dueKey) || getStudentDueFilters()[0];
  const sourceStudents = filterKey === "inactive" ? getActiveStudents() : getManagedStudents();
  return sourceStudents
    .filter(statusFilter.predicate)
    .filter(matchesStudentSearch)
    .filter(dueFilter.predicate).length;
}

function renderStudentQuickFilters() {
  const wrap = document.getElementById("studentQuickFilters");
  if (!wrap) return;

  wrap.innerHTML = getStudentQuickFilters().map((filter) => {
    const count = getStudentFilterCount(filter.filterKey, filter.dueKey);
    const isActive = activeStudentFilter === filter.filterKey && activeStudentDueFilter === filter.dueKey;
    return `
      <button class="student-quick-filter ${isActive ? "active" : ""} tone-${escapeHtml(filter.tone)}" type="button" data-student-filter="${escapeHtml(filter.filterKey)}" data-student-due-filter="${escapeHtml(filter.dueKey)}">
        <span>${escapeHtml(filter.label)}</span>
        <strong>${displayNumber(count)}</strong>
      </button>
    `;
  }).join("");

  wrap.querySelectorAll("[data-student-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      activeStudentFilter = button.dataset.studentFilter || "all";
      activeStudentDueFilter = button.dataset.studentDueFilter || "all";
      studentListVisibleCount = getInitialStudentListCount();
      renderStudentList();
    });
  });
}

function getStudentListFocusItems() {
  return [
    { label: "今日対応", caption: "本日中に見る", filterKey: "needsFollowUp", dueKey: "today", tone: "danger" },
    { label: "期限超過", caption: "対応漏れ確認", filterKey: "needsFollowUp", dueKey: "overdue", tone: "danger" },
    { label: "日程未設定", caption: "予定日を入れる", filterKey: "needsFollowUp", dueKey: "unscheduled", tone: "warning" },
    { label: "見学予定", caption: "来店準備", filterKey: "salonTour", dueKey: "all", tone: "blue" },
    { label: "面接予定", caption: "選考準備", filterKey: "interview", dueKey: "all", tone: "blue" },
    { label: "内定者", caption: "内定後フォロー", filterKey: "offered", dueKey: "all", tone: "green" }
  ];
}

function renderStudentListFocusSummary() {
  const wrap = document.getElementById("studentListFocusSummary");
  if (!wrap) return;

  wrap.innerHTML = getStudentListFocusItems().map((item) => {
    const count = getStudentFilterCount(item.filterKey, item.dueKey);
    const isActive = activeStudentFilter === item.filterKey && activeStudentDueFilter === item.dueKey;
    return `
      <button class="student-focus-card ${isActive ? "active" : ""} tone-${escapeHtml(item.tone)}" type="button" data-student-filter="${escapeHtml(item.filterKey)}" data-student-due-filter="${escapeHtml(item.dueKey)}">
        <span>${escapeHtml(item.label)}</span>
        <strong>${displayNumber(count)}</strong>
        <small>${escapeHtml(item.caption)}</small>
      </button>
    `;
  }).join("");

  wrap.querySelectorAll("[data-student-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      activeStudentFilter = button.dataset.studentFilter || "all";
      activeStudentDueFilter = button.dataset.studentDueFilter || "all";
      studentListVisibleCount = getInitialStudentListCount();
      renderStudentList();
    });
  });
}
function renderStudentDueFilters(activeKey = activeStudentDueFilter) {
  const filters = getStudentDueFilters();
  const filterWrap = document.getElementById("studentDueFilters");
  if (!filterWrap) return;

  const countBase = activeStudentFilter === "inactive" ? getActiveStudents() : getManagedStudents();
  const statusFilter = getStudentFilters().find((filter) => filter.key === activeStudentFilter) || getStudentFilters()[0];
  const scopedStudents = countBase.filter(statusFilter.predicate).filter(matchesStudentSearch);

  filterWrap.innerHTML = filters.map((filter) => {
    const count = scopedStudents.filter(filter.predicate).length;
    return `
      <button class="student-filter student-due-filter ${filter.key === activeKey ? "active" : ""}" type="button" data-student-due-filter="${filter.key}">
        ${filter.label}<span>${displayNumber(count)}</span>
      </button>
    `;
  }).join("");

  filterWrap.querySelectorAll("[data-student-due-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      activeStudentDueFilter = button.dataset.studentDueFilter;
      studentListVisibleCount = getInitialStudentListCount();
      renderStudentList();
    });
  });
}
function renderStudentFilters(activeKey = activeStudentFilter) {
  const filters = getStudentFilters();
  const filterWrap = document.getElementById("studentFilters");
  if (!filterWrap) return;

  filterWrap.innerHTML = filters.map((filter) => {
    const countBase = filter.key === "inactive" ? getActiveStudents() : getManagedStudents();
    const count = countBase.filter(filter.predicate).length;
    return `
      <button class="student-filter ${filter.key === activeKey ? "active" : ""}" type="button" data-student-filter="${filter.key}">
        ${filter.label}<span>${displayNumber(count)}</span>
      </button>
    `;
  }).join("");

  filterWrap.querySelectorAll("[data-student-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      activeStudentFilter = button.dataset.studentFilter;
      studentListVisibleCount = getInitialStudentListCount();
      renderStudentList();
    });
  });
}

function getStudentSortOptions() {
  return [
    { key: "priority", label: "対応優先順" },
    { key: "updated", label: "更新が新しい順" },
    { key: "contact", label: "接触日が新しい順" },
    { key: "name", label: "氏名順" },
    { key: "school", label: "学校名順" },
    { key: "offer", label: "内定・入社予定順" }
  ];
}

function normalizeStudentSearchText(value) {
  return String(value || "")
    .normalize("NFKC")
    .toLowerCase()
    .replace(/[\s\u3000\u200B-\u200D\uFEFF]+/g, "")
    .replace(/[髙﨑]/g, (char) => ({ "髙": "高", "﨑": "崎" }[char] || char))
    .replace(/[邉邊]/g, "辺")
    .replace(/[齋齊]/g, "斉");
}

function getStudentSearchText(student) {
  const followupText = Array.isArray(student.followups)
    ? student.followups.map((followup) => [followup.actionTitle, followup.memo, followup.status].join(" ")).join(" ")
    : "";
  return normalizeStudentSearchText([
    student.studentId,
    student.name,
    student.school,
    student.grade,
    student.gender,
    student.source,
    student.lineStatus,
    student.salonTourStatus,
    student.interviewStatus,
    student.resultStatus,
    student.offerStatus,
    student.expectedJoinStatus,
    student.owner,
    student.nextAction,
    student.memo,
    getStudentLstepStatus(student).label,
    student.lineAccount?.displayName,
    followupText
  ].join(" "));
}

function matchesStudentSearch(student) {
  const query = normalizeStudentSearchText(studentSearchQuery);
  if (!query) return true;
  return getStudentSearchText(student).includes(query);
}

function renderStudentSearchControls() {
  const input = document.getElementById("studentSearchInput");
  const resetButton = document.getElementById("studentFilterResetButton");
  const sortSelect = document.getElementById("studentSortSelect");
  if (!input) return;

  if (document.activeElement !== input) {
    input.value = studentSearchQuery;
  }

  input.oninput = () => {
    studentSearchQuery = input.value;
    studentListVisibleCount = getInitialStudentListCount();
    renderStudentList();
  };

  if (sortSelect) {
    sortSelect.innerHTML = getStudentSortOptions().map((option) => `
      <option value="${escapeHtml(option.key)}" ${option.key === activeStudentSort ? "selected" : ""}>${escapeHtml(option.label)}</option>
    `).join("");
    sortSelect.onchange = () => {
      activeStudentSort = sortSelect.value;
      studentListVisibleCount = getInitialStudentListCount();
      renderStudentList();
    };
  }

  if (resetButton) {
    const hasCondition = activeStudentFilter !== "all" || activeStudentDueFilter !== "all" || activeStudentSort !== "priority" || Boolean(studentSearchQuery.trim());
    resetButton.disabled = !hasCondition;
    resetButton.onclick = resetStudentListConditions;
  }
}

function getStudentPriority(student) {
  if ((student.nextAction && !student.nextActionDate) || hasOpenFollowup(student)) return { label: "要フォロー", className: "priority-high" };
  if (student.salonTourStatus === "予定" || student.interviewStatus === "予定") return { label: "予定フォロー", className: "priority-middle" };
  if (student.offerStatus === "内定" || student.expectedJoinStatus === "入社予定") return { label: "内定後フォロー", className: "priority-good" };
  return { label: "通常フォロー", className: "priority-low" };
}

function getFilteredStudentList(activeKey = activeStudentFilter) {
  const filters = getStudentFilters();
  const activeFilter = filters.find((filter) => filter.key === activeKey) || filters[0];
  activeStudentFilter = activeFilter.key;

  const dueFilters = getStudentDueFilters();
  const activeDueFilter = dueFilters.find((filter) => filter.key === activeStudentDueFilter) || dueFilters[0];
  activeStudentDueFilter = activeDueFilter.key;

  const sourceStudents = activeStudentFilter === "inactive" ? getActiveStudents() : getManagedStudents();
  return {
    activeFilter,
    activeDueFilter,
    students: sortStudentsForList(sourceStudents
      .filter(activeFilter.predicate)
      .filter(matchesStudentSearch)
      .filter(activeDueFilter.predicate))
  };
}

function downloadStudentCsv() {
  const { students } = getFilteredStudentList();
  if (!students.length) return;

  const headers = [
    "学生ID",
    "区分",
    "氏名",
    "性別",
    "学校名",
    "学年",
    "流入元",
    "接触日",
    "LINE登録",
    "LSTEP状態",
    "見学",
    "面接",
    "選考結果",
    "内定",
    "入社予定",
    "担当",
    "次アクション日",
    "次アクション",
    "管理状態",
    "最終更新",
    "更新者"
  ];
  const csvRows = [
    headers.map(escapeCsvCell).join(","),
    ...students.map((student) => [
      student.studentId,
      student.cohort || getActiveCohortLabel(),
      student.name,
      student.gender,
      student.school,
      student.grade,
      student.source,
      student.contactDate,
      student.lineStatus,
      getStudentLstepStatus(student).label,
      student.salonTourStatus,
      student.interviewStatus,
      student.resultStatus,
      student.offerStatus,
      student.expectedJoinStatus,
      student.owner,
      student.nextActionDate,
      student.nextAction,
      student.managementStatus,
      student.updatedAt,
      student.updatedBy
    ].map(escapeCsvCell).join(","))
  ];

  const blob = new Blob([`\ufeff${csvRows.join("\r\n")}`], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `nov-talent-students-${getActiveCohortLabel()}-${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function getLstepUnlinkedStudents() {
  return getManagedStudents()
    .filter((student) => !student.lineAccount || !student.lineAccount.id)
    .sort((a, b) => {
      const schoolCompare = (a.school || "").localeCompare(b.school || "", "ja");
      if (schoolCompare !== 0) return schoolCompare;
      return (a.name || "").localeCompare(b.name || "", "ja");
    });
}

function downloadLstepUnlinkedStudentCsv() {
  const students = getLstepUnlinkedStudents();
  if (!students.length) return;

  downloadCsvFile(
    `nov-talent-lstep-unlinked-${getActiveCohortLabel()}-${new Date().toISOString().slice(0, 10)}.csv`,
    ["学生ID", "区分", "氏名", "学校名", "学年", "性別", "流入元", "LINE登録", "内定", "入社予定", "担当者", "次アクション日", "次アクション", "メモ"],
    students.map((student) => [
      student.studentId,
      student.cohort || getActiveCohortLabel(),
      student.name,
      student.school,
      student.grade,
      student.gender,
      student.source,
      student.lineStatus,
      student.offerStatus,
      student.expectedJoinStatus,
      student.owner,
      student.nextActionDate,
      student.nextAction,
      student.memo
    ])
  );
}
function downloadLstepProviderTemplateCsv() {
  downloadCsvFile(
    `nov-talent-lstep-import-template-${new Date().toISOString().slice(0, 10)}.csv`,
    [
      "student_id",
      "student_name",
      "school_name",
      "line_user_id",
      "lstep_user_id",
      "friend_status",
      "blocked_at",
      "last_message_at",
      "last_reaction_at",
      "tag_names",
      "scenario_names",
      "memo"
    ],
    [[
      "S-0001",
      "山田 花",
      "学校名サンプル",
      "Uxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
      "lstep-user-id-sample",
      "friend",
      "",
      "2026-07-01 10:00",
      "2026-07-01 10:05",
      "見学希望;27卒",
      "サロン見学案内;内定後フォロー",
      "制作会社確認用サンプル。実データ投入時はGAS backend経由で処理。"
    ]]
  );
}

function setupStudentCsvExport(count) {
  const button = document.getElementById("studentCsvExportButton");
  if (!button) return;
  button.disabled = count === 0;
  const countLabel = button.querySelector("span");
  if (countLabel) countLabel.textContent = formatNumber.format(count);
  button.onclick = downloadStudentCsv;
}

function setupLstepUnlinkedCsvExport() {
  const button = document.getElementById("lstepUnlinkedCsvButton");
  if (!button) return;

  const count = getLstepUnlinkedStudents().length;
  button.disabled = count === 0;
  const countLabel = button.querySelector("span");
  if (countLabel) countLabel.textContent = formatNumber.format(count);
  button.onclick = downloadLstepUnlinkedStudentCsv;
}

function getStudentQualityIssues() {
  const students = getActiveStudents();
  const duplicateMap = students.reduce((map, student) => {
    if (student.managementStatus === "管理対象外") return map;
    const key = `${normalizeForDuplicateCheck(student.name)}__${normalizeForDuplicateCheck(student.school)}`;
    if (!student.name || !student.school) return map;
    map.set(key, [...(map.get(key) || []), student]);
    return map;
  }, new Map());

  const issues = [];
  students.forEach((student) => {
    const isInactive = student.managementStatus === "管理対象外";
    const base = {
      studentId: student.studentId || "",
      name: student.name || "氏名未入力",
      school: student.school || "学校未入力",
      cohort: student.cohort || getActiveCohortLabel(),
      managementStatus: student.managementStatus || "有効"
    };
    const addIssue = (severity, type, detail, action, extra = {}) => {
      issues.push({ ...base, ...extra, severity, type, detail, action });
    };

    if (!student.name) addIssue("要修正", "必須項目未入力", "氏名が未入力です。", "学生詳細を開き、氏名を入力してください。");
    if (!student.school) addIssue("要修正", "必須項目未入力", "学校名が未入力です。", "学校名を正式名称で入力してください。");
    if (!student.source) addIssue("確認", "流入元未入力", "流入元が未入力です。", "フェア・学校訪問・紹介など、最初の接点を入力してください。");
    if (!student.contactDate) addIssue("確認", "接触日未入力", "接触日が未入力です。", "初回接触日を入力してください。");
    if (!student.gender || student.gender === "未回答") addIssue("確認", "性別未回答", "性別が未回答です。", "必要に応じて男性・女性・その他を選択してください。");
    if (!student.owner) addIssue("確認", "担当者未入力", "担当者が未入力です。", "担当者を入力してください。");
    if (!isInactive && (!student.lineAccount || !student.lineAccount.id)) {
      const isOfferStage = ["内定", "承諾"].includes(student.offerStatus) || ["入社予定", "入社済"].includes(student.expectedJoinStatus);
      addIssue(
        isOfferStage ? "注意" : "確認",
        "LSTEP未紐付け",
        isOfferStage
          ? "内定・入社予定フェーズですが、LSTEP/LINEアカウントが未紐付けです。"
          : "LSTEP/LINEアカウントが未紐付けです。",
        "学生フォロー画面のLSTEP未紐付けCSVを出力し、LSTEP側の友だち情報と照合してください。"
      );
    }

    const duplicateKey = `${normalizeForDuplicateCheck(student.name)}__${normalizeForDuplicateCheck(student.school)}`;
    const duplicates = duplicateMap.get(duplicateKey) || [];
    if (!isInactive && duplicates.length > 1) {
      addIssue(
        "要修正",
        "重複候補",
        `同じ氏名・学校名の学生が${duplicates.length}件あります。`,
        "残す1件を決め、他の行は学生詳細から管理状態を「管理対象外」にしてください。",
        {
          relatedStudents: duplicates.map((item) => ({
            studentId: item.studentId || "ID未取得",
            name: item.name || "氏名未入力",
            school: item.school || "学校未入力",
            cohort: item.cohort || getActiveCohortLabel(),
            offerStatus: item.offerStatus || "未定",
            expectedJoinStatus: item.expectedJoinStatus || "未定",
            managementStatus: item.managementStatus || "有効"
          }))
        }
      );
    }

    if ((student.offerStatus === "内定" || student.offerStatus === "承諾") && student.interviewStatus !== "実施済") {
      addIssue("要修正", "ステータス矛盾", "内定・承諾なのに面接が実施済ではありません。", "面接ステータスを確認してください。");
    }
    if ((student.expectedJoinStatus === "入社予定" || student.expectedJoinStatus === "入社済") && !["内定", "承諾"].includes(student.offerStatus)) {
      addIssue("要修正", "ステータス矛盾", "入社予定・入社済なのに内定ステータスが未確定です。", "内定ステータスを確認してください。");
    }
    if (student.resultStatus === "不合格" && ["内定", "承諾"].includes(student.offerStatus)) {
      addIssue("要修正", "ステータス矛盾", "不合格なのに内定・承諾になっています。", "選考結果か内定ステータスを修正してください。");
    }
    if ((student.salonTourStatus === "予定" || student.interviewStatus === "予定") && !student.nextActionDate) {
      addIssue("要修正", "次アクション日未設定", "見学予定・面接予定なのに次アクション日が未設定です。", "次アクション日を入力してください。");
    }
    if (isInactive && hasOpenFollowup(student)) {
      addIssue("注意", "管理対象外フォロー", "管理対象外ですが未完了フォローがあります。", "フォローを完了・不要にするか、管理状態を確認してください。");
    }
  });

  return issues.sort((a, b) => {
    const severityWeight = { "要修正": 0, "注意": 1, "確認": 2 };
    return (severityWeight[a.severity] ?? 9) - (severityWeight[b.severity] ?? 9)
      || a.type.localeCompare(b.type, "ja")
      || a.name.localeCompare(b.name, "ja");
  });
}

function getDuplicateStudentAuditScore(student) {
  let score = 0;
  if (["内定", "承諾"].includes(student.offerStatus)) score += 40;
  if (["入社予定", "入社済"].includes(student.expectedJoinStatus)) score += 30;
  if (student.managementStatus === "有効") score += 10;
  if (student.cohort && !student.cohort.includes("サロン実習")) score += 5;
  return score;
}

function getDuplicateStudentAuditLabel(student, bestScore) {
  const score = getDuplicateStudentAuditScore(student);
  if (student.managementStatus === "管理対象外") return { label: "対象外済", className: "is-inactive" };
  if (score === bestScore && bestScore > 0) return { label: "残す候補", className: "is-keep-candidate" };
  if (student.cohort && student.cohort.includes("サロン実習")) return { label: "対象外候補", className: "is-remove-candidate" };
  return { label: "確認", className: "is-review" };
}

function getSortedDuplicateRelatedStudents(issue) {
  if (!Array.isArray(issue.relatedStudents) || !issue.relatedStudents.length) return [];
  return [...issue.relatedStudents].sort((a, b) => {
    return getDuplicateStudentAuditScore(b) - getDuplicateStudentAuditScore(a)
      || String(a.studentId || "").localeCompare(String(b.studentId || ""), "ja");
  });
}

function getDuplicateIssueBestScore(issue) {
  return getSortedDuplicateRelatedStudents(issue).reduce((max, student) => Math.max(max, getDuplicateStudentAuditScore(student)), 0);
}

function canQuickExcludeDuplicateStudent(student, audit) {
  return audit.className === "is-remove-candidate"
    && student.managementStatus !== "管理対象外"
    && isActiveCohortEditable();
}

function buildStudentUpdatePayloadFromRecord(student, overrides = {}) {
  return {
    sheetName: getActiveSheetName(),
    studentId: student.studentId || "",
    name: student.name || "",
    gender: student.gender || "未回答",
    school: student.school || "",
    grade: student.grade || "",
    source: student.source || "",
    contactDate: student.contactDate || "",
    lineStatus: student.lineStatus || "未登録",
    salonTourStatus: student.salonTourStatus || "未設定",
    interviewStatus: student.interviewStatus || "未設定",
    resultStatus: student.resultStatus || "未定",
    offerStatus: student.offerStatus || "未定",
    expectedJoinStatus: student.expectedJoinStatus || "未定",
    owner: student.owner || "総務人事",
    nextAction: student.nextAction || "",
    nextActionDate: student.nextActionDate || "",
    memo: student.memo || "",
    managementStatus: student.managementStatus || "有効",
    ...overrides
  };
}

function renderQualityIssueExtra(issue) {
  if (!Array.isArray(issue.relatedStudents) || !issue.relatedStudents.length) return "";
  const sortedStudents = getSortedDuplicateRelatedStudents(issue);
  const bestScore = getDuplicateIssueBestScore(issue);
  const keepCandidates = sortedStudents.filter((student) => getDuplicateStudentAuditLabel(student, bestScore).className === "is-keep-candidate");
  const removeCandidates = sortedStudents.filter((student) => getDuplicateStudentAuditLabel(student, bestScore).className === "is-remove-candidate");
  const keepCount = keepCandidates.length;
  const removeCount = removeCandidates.length;
  const reviewCount = sortedStudents.length - keepCount - removeCount;
  const bulkExcludeIds = removeCandidates
    .filter((student) => student.managementStatus !== "管理対象外")
    .map((student) => student.studentId)
    .filter(Boolean);
  return `
    <div class="quality-related-list" aria-label="関連する学生ID">
      <div class="quality-related-heading">
        <strong>関連する学生</strong>
        <span>残す候補 ${formatNumber.format(keepCount)}</span>
        <span>対象外候補 ${formatNumber.format(removeCount)}</span>
        ${reviewCount ? `<span>確認 ${formatNumber.format(reviewCount)}</span>` : ""}
        ${bulkExcludeIds.length ? `<button class="quality-related-bulk-exclude" type="button" data-quality-bulk-exclude-ids="${escapeHtml(bulkExcludeIds.join(","))}" ${getWriteDisabledAttribute(!isActiveCohortEditable())}>対象外候補をまとめて対象外にする</button>` : ""}
      </div>
      ${sortedStudents.map((student) => {
        const audit = getDuplicateStudentAuditLabel(student, bestScore);
        const showExcludeButton = canQuickExcludeDuplicateStudent(student, audit);
        return `
        <div class="quality-related-student ${audit.className}">
          <button class="quality-related-open" type="button" data-quality-related-student-id="${escapeHtml(student.studentId)}">
            <b>${escapeHtml(student.studentId)}</b>
            <strong>${escapeHtml(student.name || "氏名未取得")}</strong>
            <em>${escapeHtml(student.cohort)}</em>
            <span class="quality-related-audit-label">${escapeHtml(audit.label)}</span>
            <small>${escapeHtml(student.school || "学校未取得")} / 内定:${escapeHtml(student.offerStatus)} / 入社:${escapeHtml(student.expectedJoinStatus)} / ${escapeHtml(student.managementStatus)}</small>
          </button>
          ${showExcludeButton ? `<button class="quality-related-exclude" type="button" data-quality-exclude-student-id="${escapeHtml(student.studentId)}" ${getWriteDisabledAttribute(!isActiveCohortEditable())}>対象外にする</button>` : ""}
        </div>
      `;
      }).join("")}
      <small class="quality-related-note">目安：内定・入社予定がある行を残し、サロン実習などの重複元を管理対象外にします。</small>
    </div>
  `;
}

function setupQualityRelatedStudentActions(list) {
  list.querySelectorAll("[data-quality-related-student-id]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      const selectedStudent = getActiveStudents().find((student) => student.studentId === button.dataset.qualityRelatedStudentId);
      if (selectedStudent) openStudentModal(selectedStudent);
    });
  });

  list.querySelectorAll("[data-quality-bulk-exclude-ids]").forEach((button) => {
    button.addEventListener("click", async (event) => {
      event.stopPropagation();
      if (button.disabled) return;
      const targetIds = String(button.dataset.qualityBulkExcludeIds || "")
        .split(",")
        .map((id) => id.trim())
        .filter(Boolean);
      const targetStudents = targetIds
        .map((id) => getActiveStudents().find((student) => student.studentId === id))
        .filter(Boolean);
      if (!targetStudents.length) return;

      const message = [
        `${targetStudents.length}件の対象外候補をまとめて管理対象外にします。`,
        "",
        ...targetStudents.map((student) => `・${student.name || "氏名未取得"}（${student.studentId || "ID未取得"} / ${student.cohort || "区分未設定"}）`),
        "",
        "この操作後、サマリー・内定数・重複判定から外れます。よろしいですか？"
      ].join("\n");
      if (!window.confirm(message)) return;

      const originalText = button.textContent;
      try {
        button.disabled = true;
        button.textContent = "まとめて対象外化中...";
        for (const student of targetStudents) {
          const payload = buildStudentUpdatePayloadFromRecord(student, { managementStatus: "管理対象外" });
          const result = await callGasAction("updateStudent", payload);
          if (!result || result.ok === false || result.error) {
            throw new Error(`${student.studentId || student.name}：${result?.error || "管理対象外にできませんでした"}`);
          }
        }
        button.textContent = "対象外済";
        await refreshDashboardData();
      } catch (error) {
        button.disabled = false;
        button.textContent = originalText || "対象外候補をまとめて対象外にする";
        alert(`まとめて対象外にできませんでした：${error.message}`);
      }
    });
  });

  list.querySelectorAll("[data-quality-exclude-student-id]").forEach((button) => {
    button.addEventListener("click", async (event) => {
      event.stopPropagation();
      const selectedStudent = getActiveStudents().find((student) => student.studentId === button.dataset.qualityExcludeStudentId);
      if (!selectedStudent || button.disabled) return;
      const message = `${selectedStudent.name || selectedStudent.studentId}（${selectedStudent.studentId}）を管理対象外にします。\n\nこの学生はサマリー・内定数・重複判定から外れます。よろしいですか？`;
      if (!window.confirm(message)) return;

      const originalText = button.textContent;
      try {
        button.disabled = true;
        button.textContent = "対象外化中...";
        const payload = buildStudentUpdatePayloadFromRecord(selectedStudent, { managementStatus: "管理対象外" });
        const result = await callGasAction("updateStudent", payload);
        if (!result || result.ok === false || result.error) {
          throw new Error(result?.error || "管理対象外にできませんでした");
        }
        button.textContent = "対象外済";
        await refreshDashboardData();
      } catch (error) {
        button.disabled = false;
        button.textContent = originalText || "対象外にする";
        alert(`管理対象外にできませんでした：${error.message}`);
      }
    });
  });
}

function getQualitySeverityClass(severity) {
  if (severity === "要修正") return "quality-danger";
  if (severity === "注意") return "quality-warning";
  return "quality-check";
}

function getDataQualitySummary(issues) {
  return issues.reduce((acc, issue) => {
    const removeCandidateCount = getDataQualityRemoveCandidateRows([issue]).length;
    acc[issue.severity] = (acc[issue.severity] || 0) + 1;
    if (issue.type === "重複候補") acc.duplicate = (acc.duplicate || 0) + 1;
    if (issue.type === "ステータス矛盾") acc.statusMismatch = (acc.statusMismatch || 0) + 1;
    if (issue.type === "LSTEP未紐付け") acc.lstepUnlinked = (acc.lstepUnlinked || 0) + 1;
    if (removeCandidateCount) acc.removeCandidate = (acc.removeCandidate || 0) + removeCandidateCount;
    return acc;
  }, {});
}

function getDataQualityFilters(summary, totalCount) {
  return [
    { key: "all", label: "すべて", count: totalCount },
    { key: "要修正", label: "要修正", count: summary["要修正"] || 0 },
    { key: "注意", label: "注意", count: summary["注意"] || 0 },
    { key: "確認", label: "確認", count: summary["確認"] || 0 },
    { key: "duplicate", label: "重複候補", count: summary.duplicate || 0 },
    { key: "statusMismatch", label: "ステータス矛盾", count: summary.statusMismatch || 0 },
    { key: "lstepUnlinked", label: "LSTEP未紐付け", count: summary.lstepUnlinked || 0 },
    { key: "removeCandidate", label: "対象外候補あり", count: summary.removeCandidate || 0 }
  ];
}

function getFilteredDataQualityIssues(issues) {
  if (activeDataQualityFilter === "all") return issues;
  if (activeDataQualityFilter === "duplicate") return issues.filter((issue) => issue.type === "重複候補");
  if (activeDataQualityFilter === "statusMismatch") return issues.filter((issue) => issue.type === "ステータス矛盾");
  if (activeDataQualityFilter === "lstepUnlinked") return issues.filter((issue) => issue.type === "LSTEP未紐付け");
  if (activeDataQualityFilter === "removeCandidate") return issues.filter((issue) => getDataQualityRemoveCandidateRows([issue]).length > 0);
  return issues.filter((issue) => issue.severity === activeDataQualityFilter);
}

function renderDataQualityFilters(summary, totalCount) {
  return `
    <div class="quality-filters" aria-label="データ品質絞り込み">
      ${getDataQualityFilters(summary, totalCount).map((filter) => `
        <button class="student-filter ${activeDataQualityFilter === filter.key ? "active" : ""}" type="button" data-quality-filter="${escapeHtml(filter.key)}">
          ${escapeHtml(filter.label)}<span>${formatNumber.format(filter.count)}</span>
        </button>
      `).join("")}
    </div>
  `;
}

function getQualityIssueFocusLabel(issue) {
  if (issue.type === "重複候補") return "同一学生か確認";
  if (issue.type === "管理対象外候補") return "対象外にするか確認";
  if (issue.type.includes("ステータス")) return "ステータスを整理";
  if (issue.type.includes("未入力")) return "不足項目を入力";
  return "学生カルテで確認";
}

function setupDataQualityFilters() {
  document.querySelectorAll("[data-quality-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      activeDataQualityFilter = button.dataset.qualityFilter || "all";
      renderDataQuality();
    });
  });
}

function updateDataQualityTabBadge(summary) {
  const badge = document.getElementById("dataQualityTabBadge");
  if (!badge) return;
  if (shouldMaskDashboardNumbers()) {
    badge.hidden = true;
    badge.textContent = "";
    return;
  }
  const count = summary["要修正"] || 0;
  badge.hidden = count === 0;
  badge.textContent = formatNumber.format(count);
  badge.setAttribute("aria-label", `要修正 ${count}件`);
}

function renderDataQuality() {
  const issues = getStudentQualityIssues();
  const summary = getDataQualitySummary(issues);
  const filteredIssues = getFilteredDataQualityIssues(issues);
  const removeCandidateRows = getDataQualityRemoveCandidateRows(filteredIssues);
  const summaryContainer = document.getElementById("dataQualitySummary");
  const list = document.getElementById("dataQualityList");
  const exportButton = document.getElementById("dataQualityCsvButton");
  const duplicateExportButton = document.getElementById("dataQualityDuplicateCsvButton");
  const removeCandidateExportButton = document.getElementById("dataQualityRemoveCandidateCsvButton");

  updateDataQualityTabBadge(summary);

  if (exportButton) {
    exportButton.disabled = filteredIssues.length === 0;
    const countLabel = exportButton.querySelector("span");
    if (countLabel) countLabel.textContent = displayNumber(filteredIssues.length);
    exportButton.onclick = downloadDataQualityCsv;
  }

  const duplicateRows = getDataQualityDuplicateCandidateRows(filteredIssues);
  if (duplicateExportButton) {
    duplicateExportButton.disabled = duplicateRows.length === 0;
    const countLabel = duplicateExportButton.querySelector("span");
    if (countLabel) countLabel.textContent = displayNumber(duplicateRows.length);
    duplicateExportButton.onclick = downloadDataQualityDuplicateCandidateCsv;
  }

  if (removeCandidateExportButton) {
    removeCandidateExportButton.disabled = removeCandidateRows.length === 0;
    const countLabel = removeCandidateExportButton.querySelector("span");
    if (countLabel) countLabel.textContent = displayNumber(removeCandidateRows.length);
    removeCandidateExportButton.onclick = downloadDataQualityRemoveCandidateCsv;
  }

  if (summaryContainer) {
    const duplicateIssueCount = issues.filter((issue) => issue.type === "重複候補").length;
    const removeCandidateTotal = getDataQualityRemoveCandidateRows(issues).length;
    summaryContainer.innerHTML = `
      <div class="operation-log-summary-card ${issues.length ? "is-warning" : "is-linked"}">
        <span>品質チェック件数</span>
        <strong>${displayNumber(issues.length)}</strong>
        <small>${escapeHtml(getActiveCohortLabel())} の確認対象</small>
      </div>
      <div class="operation-log-summary-card ${summary["要修正"] ? "is-warning" : "is-linked"}">
        <span>要修正</span>
        <strong>${displayNumber(summary["要修正"] || 0)}</strong>
        <small>保存前に直したい項目</small>
      </div>
      <div class="operation-log-summary-card">
        <span>注意</span>
        <strong>${displayNumber(summary["注意"] || 0)}</strong>
        <small>運用確認が必要</small>
      </div>
      <div class="operation-log-summary-card">
        <span>確認</span>
        <strong>${displayNumber(summary["確認"] || 0)}</strong>
        <small>精度向上の補足項目</small>
      </div>
      <div class="operation-log-summary-card ${duplicateIssueCount ? "is-warning" : "is-linked"}">
        <span>重複候補</span>
        <strong>${displayNumber(duplicateIssueCount)}</strong>
        <small>同姓同校の確認対象</small>
      </div>
      <div class="operation-log-summary-card ${removeCandidateTotal ? "is-warning" : "is-linked"}">
        <span>対象外候補</span>
        <strong>${displayNumber(removeCandidateTotal)}</strong>
        <small>整理候補としてCSV出力可</small>
      </div>
    `;
  }

  if (!list) return;
  if (!issues.length) {
    list.innerHTML = `
      <div class="student-empty">
        現在の学生区分では、重複・未入力・ステータス矛盾は見つかっていません。
      </div>
    `;
    return;
  }

  list.innerHTML = `
    ${renderDataQualityFilters(summary, issues.length)}
    ${filteredIssues.length ? filteredIssues.map((issue) => `
    <article class="quality-card ${getQualitySeverityClass(issue.severity)}" data-quality-student-id="${escapeHtml(issue.studentId)}">
      <div>
        <div class="quality-card-header">
          <span class="priority-pill ${issue.severity === "要修正" ? "priority-high" : issue.severity === "注意" ? "priority-middle" : "priority-low"}">${escapeHtml(issue.severity)}</span>
          <span class="quality-focus-label">${escapeHtml(getQualityIssueFocusLabel(issue))}</span>
        </div>
        <h3>${escapeHtml(issue.type)}</h3>
        <p>${escapeHtml(issue.detail)}</p>
        <div class="quality-action-box">
          <span>推奨対応</span>
          <strong>${escapeHtml(issue.action)}</strong>
        </div>
        ${renderQualityIssueExtra(issue)}
        <button class="quality-edit-button" type="button" data-quality-open-student-id="${escapeHtml(issue.studentId)}">学生カルテを開く</button>
      </div>
      <div class="quality-card-meta">
        <span>${escapeHtml(issue.studentId || "ID未取得")}</span>
        <strong>${escapeHtml(issue.name)}</strong>
        <small>${escapeHtml(issue.school)}</small>
        <small>${escapeHtml(issue.managementStatus)}</small>
      </div>
    </article>
  `).join("") : `
    <div class="student-empty">
      選択中の重要度では、該当する品質チェック項目はありません。
    </div>
  `}
  `;

  list.querySelectorAll("[data-quality-student-id]").forEach((card) => {
    card.addEventListener("click", () => {
      const selectedStudent = getActiveStudents().find((student) => student.studentId === card.dataset.qualityStudentId);
      openStudentModal(selectedStudent);
    });
  });
  list.querySelectorAll("[data-quality-open-student-id]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      const selectedStudent = getActiveStudents().find((student) => student.studentId === button.dataset.qualityOpenStudentId);
      openStudentModal(selectedStudent);
    });
  });
  setupQualityRelatedStudentActions(list);
  setupDataQualityFilters();
}

function getUniqueDuplicateGroups(issues) {
  const groups = new Map();
  issues
    .filter((issue) => issue.type === "重複候補" && Array.isArray(issue.relatedStudents) && issue.relatedStudents.length > 1)
    .forEach((issue) => {
      const groupKey = issue.relatedStudents
        .map((student) => student.studentId || `${student.name}-${student.school}-${student.cohort}`)
        .sort()
        .join("__");
      if (!groups.has(groupKey)) groups.set(groupKey, issue);
    });
  return [...groups.values()];
}

function getDataQualityDuplicateCandidateRows(issues) {
  return getUniqueDuplicateGroups(issues).flatMap((issue, groupIndex) => {
    const sortedStudents = getSortedDuplicateRelatedStudents(issue);
    const bestScore = getDuplicateIssueBestScore(issue);
    const keepCandidates = sortedStudents
      .filter((student) => getDuplicateStudentAuditLabel(student, bestScore).className === "is-keep-candidate")
      .map((student) => student.studentId || "ID未取得");

    return sortedStudents.map((student) => {
      const audit = getDuplicateStudentAuditLabel(student, bestScore);
      return { issue, student, audit, keepCandidates, groupNo: groupIndex + 1 };
    });
  });
}

function getDataQualityRemoveCandidateRows(issues) {
  return getUniqueDuplicateGroups(issues).flatMap((issue) => {
    const sortedStudents = getSortedDuplicateRelatedStudents(issue);
    if (!sortedStudents.length) return [];
    const bestScore = getDuplicateIssueBestScore(issue);
    const keepCandidates = sortedStudents
      .filter((student) => getDuplicateStudentAuditLabel(student, bestScore).className === "is-keep-candidate")
      .map((student) => student.studentId || "ID未取得");

    return sortedStudents
      .map((student) => {
        const audit = getDuplicateStudentAuditLabel(student, bestScore);
        return { issue, student, audit, keepCandidates };
      })
      .filter(({ audit }) => audit.className === "is-remove-candidate");
  });
}

function downloadDataQualityCsv() {
  const issues = getFilteredDataQualityIssues(getStudentQualityIssues());
  if (!issues.length) return;
  const filterLabel = activeDataQualityFilter === "all" ? "all" : activeDataQualityFilter;
  const formatRelatedStudentAudit = (issue) => {
    const relatedStudents = getSortedDuplicateRelatedStudents(issue);
    if (!relatedStudents.length) return "";
    const bestScore = getDuplicateIssueBestScore(issue);
    return relatedStudents.map((student) => {
      const audit = getDuplicateStudentAuditLabel(student, bestScore);
      const status = [
        student.cohort || "区分未設定",
        `内定:${student.offerStatus || "未定"}`,
        `入社:${student.expectedJoinStatus || "未定"}`,
        student.managementStatus || "管理状態未設定"
      ].join(" / ");
      return `${student.studentId || "ID未取得"}:${audit.label}（${status}）`;
    }).join(" / ");
  };
  downloadCsvFile(
    `nov-talent-data-quality-${getActiveCohortLabel()}-${filterLabel}-${new Date().toISOString().slice(0, 10)}.csv`,
    ["重要度", "種類", "学生ID", "氏名", "学校名", "区分", "管理状態", "関連ID", "関連学生判断", "内容", "対応"],
    issues.map((issue) => [
      issue.severity,
      issue.type,
      issue.studentId,
      issue.name,
      issue.school,
      issue.cohort,
      issue.managementStatus,
      Array.isArray(issue.relatedStudents) ? issue.relatedStudents.map((student) => student.studentId).join(" / ") : "",
      formatRelatedStudentAudit(issue),
      issue.detail,
      issue.action
    ])
  );
}

function downloadDataQualityDuplicateCandidateCsv() {
  const issues = getFilteredDataQualityIssues(getStudentQualityIssues());
  const rows = getDataQualityDuplicateCandidateRows(issues);
  if (!rows.length) return;
  const filterLabel = activeDataQualityFilter === "all" ? "all" : activeDataQualityFilter;
  downloadCsvFile(
    `nov-talent-duplicate-candidates-${getActiveCohortLabel()}-${filterLabel}-${new Date().toISOString().slice(0, 10)}.csv`,
    ["重複グループ", "学生ID", "氏名", "学校名", "区分", "内定", "入社予定", "管理状態", "推奨判定", "残す候補ID", "内容", "推奨対応"],
    rows.map(({ issue, student, audit, keepCandidates, groupNo }) => [
      groupNo,
      student.studentId || "",
      student.name || "",
      student.school || "",
      student.cohort || "",
      student.offerStatus || "",
      student.expectedJoinStatus || "",
      student.managementStatus || "",
      audit.label,
      keepCandidates.join(" / "),
      issue.detail,
      audit.className === "is-remove-candidate" ? "管理対象外候補。画面で内容確認後に対象外化" : "残す候補または確認対象"
    ])
  );
}

function downloadDataQualityRemoveCandidateCsv() {
  const issues = getFilteredDataQualityIssues(getStudentQualityIssues());
  const rows = getDataQualityRemoveCandidateRows(issues);
  if (!rows.length) return;
  const filterLabel = activeDataQualityFilter === "all" ? "all" : activeDataQualityFilter;
  downloadCsvFile(
    `nov-talent-remove-candidates-${getActiveCohortLabel()}-${filterLabel}-${new Date().toISOString().slice(0, 10)}.csv`,
    ["対象外候補ID", "氏名", "学校名", "区分", "内定", "入社予定", "管理状態", "残す候補ID", "判定理由", "推奨対応"],
    rows.map(({ issue, student, keepCandidates }) => [
      student.studentId || "",
      student.name || "",
      student.school || "",
      student.cohort || "",
      student.offerStatus || "",
      student.expectedJoinStatus || "",
      student.managementStatus || "",
      keepCandidates.join(" / "),
      issue.detail,
      "画面で内容を確認し、問題なければ「対象外にする」"
    ])
  );
}

function renderStudentConditionChips(activeFilter, activeDueFilter) {
  const activeSort = getStudentSortOptions().find((option) => option.key === activeStudentSort) || getStudentSortOptions()[0];
  const chips = [
    `区分：${getActiveCohortLabel()}`,
    `状態：${activeFilter.label}`,
    `並び：${activeSort.label}`
  ];
  if (activeDueFilter.key !== "all") chips.push(`期限：${activeDueFilter.label}`);
  if (studentSearchQuery.trim()) chips.push(`検索：${studentSearchQuery.trim()}`);

  return `
    <span class="student-condition-summary">${chips.map((chip) => `<em>${escapeHtml(chip)}</em>`).join("")}</span>
  `;
}

function getStudentListTotalCountForActiveScope() {
  return activeStudentFilter === "inactive" ? getActiveStudents().length : getManagedStudents().length;
}

function getStudentSortDateValue(student) {
  return student.updatedAt || student.updated_at || student.contactDate || "";
}

function getStudentOfferSortWeight(student) {
  if (student.expectedJoinStatus === "入社予定") return 0;
  if (student.offerStatus === "内定" || student.offerStatus === "承諾") return 1;
  if (student.interviewStatus === "予定") return 2;
  if (student.salonTourStatus === "予定") return 3;
  return 4;
}

function sortStudentsForList(students) {
  return students.sort((a, b) => {
    if (activeStudentSort === "updated") {
      const dateCompare = getStudentSortDateValue(b).localeCompare(getStudentSortDateValue(a));
      if (dateCompare !== 0) return dateCompare;
      return (a.name || "").localeCompare(b.name || "", "ja");
    }

    if (activeStudentSort === "contact") {
      const dateCompare = String(b.contactDate || "").localeCompare(String(a.contactDate || ""));
      if (dateCompare !== 0) return dateCompare;
      return (a.name || "").localeCompare(b.name || "", "ja");
    }

    if (activeStudentSort === "name") {
      return (a.name || "").localeCompare(b.name || "", "ja");
    }

    if (activeStudentSort === "school") {
      const schoolCompare = (a.school || "").localeCompare(b.school || "", "ja");
      if (schoolCompare !== 0) return schoolCompare;
      return (a.name || "").localeCompare(b.name || "", "ja");
    }

    if (activeStudentSort === "offer") {
      const offerCompare = getStudentOfferSortWeight(a) - getStudentOfferSortWeight(b);
      if (offerCompare !== 0) return offerCompare;
      return (a.name || "").localeCompare(b.name || "", "ja");
    }

    const aAction = activeStudentFilter === "completedFollowup" ? (getCompletedFollowupAction(a) || getPrimaryStudentAction(a)) : getPrimaryStudentAction(a);
    const bAction = activeStudentFilter === "completedFollowup" ? (getCompletedFollowupAction(b) || getPrimaryStudentAction(b)) : getPrimaryStudentAction(b);
    const urgencyCompare = getActionSortWeight(aAction?.dueDate) - getActionSortWeight(bAction?.dueDate);
    if (urgencyCompare !== 0) return urgencyCompare;
    const dateCompare = getActionSortDate(aAction?.dueDate).localeCompare(getActionSortDate(bAction?.dueDate));
    if (dateCompare !== 0) return dateCompare;
    return (a.name || "").localeCompare(b.name || "", "ja");
  });
}

function getStudentLstepStatus(student) {
  const account = student?.lineAccount;
  if (!account || !account.id) {
    return { label: "LSTEP 未紐付け", className: "is-pending", detail: "LINE/LSTEPアカウント未連携" };
  }

  if (account.friendStatus === "blocked") {
    return { label: "LSTEP ブロック", className: "is-warning", detail: "ブロックまたは配信不可" };
  }

  if (account.friendStatus === "friend") {
    return { label: "LSTEP 友だち", className: "is-linked", detail: "友だち状態で紐付け済み" };
  }

  return { label: "LSTEP 紐付け済み", className: "is-ready", detail: "アカウント紐付け済み" };
}

function renderStudentLstepStatusChip(student) {
  const status = getStudentLstepStatus(student);
  return `<span class="student-lstep-chip ${status.className}" title="${escapeHtml(status.detail)}">${escapeHtml(status.label)}</span>`;
}

function renderStudentManagementBadge(student) {
  const status = student.managementStatus || "有効";
  const className = status === "管理対象外" ? "is-inactive" : "is-active";
  return `<span class="student-management-badge ${className}">${escapeHtml(status)}</span>`;
}

function maskExternalId(value) {
  const text = String(value || "");
  if (!text) return "未取得";
  if (text.length <= 8) return text;
  return `${text.slice(0, 4)}...${text.slice(-4)}`;
}

function renderStudentLstepDetail(student) {
  const account = student?.lineAccount;
  const status = getStudentLstepStatus(student);

  if (!account || !account.id) {
    return `
      <div class="student-lstep-detail ${status.className}">
        <div>
          <span>LSTEP / LINE</span>
          <strong>${escapeHtml(status.label)}</strong>
          <p>CSV/API同期後に、学生ごとのLINEアカウント紐付け状況をここで確認できます。</p>
        </div>
      </div>
    `;
  }

  return `
    <div class="student-lstep-detail ${status.className}">
      <div>
        <span>LSTEP / LINE</span>
        <strong>${escapeHtml(status.label)}</strong>
        <p>${escapeHtml(status.detail)}</p>
      </div>
      <dl class="student-lstep-detail-grid">
        <div>
          <dt>表示名</dt>
          <dd>${escapeHtml(account.displayName || "未取得")}</dd>
        </div>
        <div>
          <dt>LINE ID</dt>
          <dd>${escapeHtml(maskExternalId(account.lineUserId))}</dd>
        </div>
        <div>
          <dt>LSTEP ID</dt>
          <dd>${escapeHtml(maskExternalId(account.lstepUserId))}</dd>
        </div>
        <div>
          <dt>最終同期</dt>
          <dd>${escapeHtml(account.lastSyncedAt || "未取得")}</dd>
        </div>
      </dl>
    </div>
  `;
}

function renderStudentTableStatus(student) {
  const statuses = [
    ["LINE", student.lineStatus || "未設定"],
    ["見学", student.salonTourStatus || "未設定"],
    ["面接", student.interviewStatus || "未設定"],
    ["内定", getOfferJoinStatusValue(student)]
  ];

  return `
    <div class="student-table-status">
      ${statuses.map(([label, value]) => `
        <span class="${getStudentTableStatusTone(value)}"><b>${escapeHtml(label)}</b>${escapeHtml(value || "未設定")}</span>
      `).join("")}
    </div>
  `;
}

function getStudentTableStatusTone(value) {
  if (["内定", "承諾", "入社予定", "入社済", "実施済", "登録済"].includes(value)) return "is-good";
  if (["予定", "条件付き合格", "再面接"].includes(value)) return "is-warning";
  if (["不合格", "辞退", "キャンセル"].includes(value)) return "is-danger";
  return "is-muted";
}

function renderStudentNextActionCell(student, primaryAction) {
  const actionTitle = primaryAction?.title || "次アクション未設定";
  const dueDate = primaryAction?.dueDate || "";
  const sourceLabel = primaryAction?.sourceLabel || "学生管理";
  const isUnscheduled = !dueDate && actionTitle !== "次アクション未設定";

  return `
    <div class="student-next-action-cell ${isUnscheduled ? "is-unscheduled" : ""}">
      <div class="student-next-action-top">
        <span>${escapeHtml(dueDate || "日程未設定")}</span>
        ${primaryAction ? renderActionBadge(primaryAction) : `<em class="urgency-badge urgency-unscheduled">未設定</em>`}
      </div>
      <strong>${escapeHtml(actionTitle)}</strong>
      <small>${escapeHtml(sourceLabel)}${isUnscheduled ? " / 日程を入れると対応漏れを防げます" : ""}</small>
      <div class="student-next-action-buttons">
        ${primaryAction ? renderFollowupCompleteButton(primaryAction) : ""}
        <button class="detail-button compact student-card-open-button" type="button" data-open-student-id="${escapeHtml(student.studentId)}">カルテ</button>
      </div>
      ${renderStudentQuickActionButtons(student)}
    </div>
  `;
}

function buildStudentQuickUpdatePayload(student, overrides = {}) {
  const merged = { ...student, ...overrides };
  return {
    sheetName: getActiveSheetName(),
    studentRecordId: String(merged.id || ""),
    studentId: String(merged.studentId || ""),
    name: String(merged.name || "").trim(),
    gender: String(merged.gender || "未回答"),
    school: String(merged.school || "").trim(),
    grade: String(merged.grade || ""),
    source: String(merged.source || "").trim(),
    contactDate: String(merged.contactDate || ""),
    lineStatus: String(merged.lineStatus || "未登録"),
    salonTourStatus: String(merged.salonTourStatus || "未設定"),
    interviewStatus: String(merged.interviewStatus || "未設定"),
    resultStatus: String(merged.resultStatus || "未定"),
    offerStatus: String(merged.offerStatus || "未定"),
    expectedJoinStatus: String(merged.expectedJoinStatus || "未定"),
    owner: String(merged.owner || "総務人事").trim(),
    nextAction: String(merged.nextAction || "").trim(),
    nextActionDate: String(merged.nextActionDate || ""),
    memo: String(merged.memo || "").trim(),
    managementStatus: String(merged.managementStatus || "有効")
  };
}

function getStudentQuickActions(student) {
  const actions = [];
  const offerJoinStatus = getOfferJoinStatusValue(student);

  if (!["予定", "実施済"].includes(student.salonTourStatus || "")) {
    actions.push({ key: "salonTour", label: "見学予定", confirmLabel: "見学予定に更新", overrides: { salonTourStatus: "予定", nextAction: student.nextAction || "見学前リマインド" } });
  }
  if (!["予定", "実施済"].includes(student.interviewStatus || "")) {
    actions.push({ key: "interview", label: "面接予定", confirmLabel: "面接予定に更新", overrides: { interviewStatus: "予定", nextAction: student.nextAction || "面接日程確認" } });
  }
  if (!["内定", "入社予定", "入社済", "辞退"].includes(offerJoinStatus)) {
    actions.push({ key: "offer", label: "内定", confirmLabel: "内定に更新", overrides: { resultStatus: "合格", offerStatus: "内定", expectedJoinStatus: "未定", nextAction: "内定後フォロー" } });
  }
  if (student.managementStatus !== "管理対象外") {
    actions.push({ key: "inactive", label: "対象外", confirmLabel: "管理対象外に更新", className: "is-danger", overrides: { managementStatus: "管理対象外", nextAction: "", nextActionDate: "" } });
  }

  return actions;
}

function renderStudentQuickActionButtons(student) {
  if (!isActiveCohortEditable() || !canWriteActionFromDashboard("edit")) return "";
  const actions = getStudentQuickActions(student).slice(0, 4);
  if (!actions.length) return "";

  return `
    <div class="student-inline-actions" aria-label="学生の簡易更新">
      ${actions.map((action) => `
        <button class="student-inline-action ${action.className || ""}" type="button" data-student-quick-action="${escapeHtml(action.key)}" data-student-id="${escapeHtml(student.studentId || "")}">
          ${escapeHtml(action.label)}
        </button>
      `).join("")}
    </div>
  `;
}

async function handleStudentQuickAction(button) {
  const studentId = button.dataset.studentId || "";
  const actionKey = button.dataset.studentQuickAction || "";
  const student = getActiveStudents().find((item) => item.studentId === studentId);
  if (!student) {
    window.alert("対象の学生が見つかりませんでした。データ更新後に再度お試しください。");
    return;
  }

  const action = getStudentQuickActions(student).find((item) => item.key === actionKey);
  if (!action) return;

  const message = `${student.name || student.studentId} を「${action.confirmLabel}」します。よろしいですか？`;
  if (!window.confirm(message)) return;

  try {
    button.disabled = true;
    button.textContent = "保存中";
    const result = await callGasAction("updateStudent", buildStudentQuickUpdatePayload(student, action.overrides));
    if (!result || result.ok === false || result.error) {
      throw new Error(result?.error || "簡易更新に失敗しました");
    }
    await refreshDashboardData();
  } catch (error) {
    button.disabled = false;
    button.textContent = action.label;
    window.alert(`保存できませんでした：${error.message}`);
  }
}

function setupStudentQuickActionButtons(root = document) {
  root.querySelectorAll("[data-student-quick-action]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      handleStudentQuickAction(button);
    });
  });
}
function setupStudentOpenButtons(root = document) {
  root.querySelectorAll("[data-open-student-id]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      const selectedStudent = getActiveStudents().find((student) => student.studentId === button.dataset.openStudentId);
      openStudentModal(selectedStudent);
    });
  });
}

function getStudentListInsightItems(students) {
  const primaryActions = students.map((student) => getPrimaryStudentAction(student)).filter(Boolean);
  const schoolCount = new Set(students.map((student) => student.school).filter(Boolean)).size;
  const offeredOrJoiners = students.filter((student) => ["内定", "承諾", "入社予定", "入社済"].includes(getOfferJoinStatusValue(student))).length;

  return [
    { label: "表示対象", value: students.length, caption: "現在の絞り込み" },
    { label: "学校数", value: schoolCount, caption: "学校別確認の目安" },
    { label: "要フォロー", value: primaryActions.length, caption: "未完了アクション" },
    { label: "日程未設定", value: primaryActions.filter((action) => !action.dueDate).length, caption: "期日入力が必要" },
    { label: "見学予定", value: students.filter((student) => student.salonTourStatus === "予定").length, caption: "来店前フォロー" },
    { label: "面接予定", value: students.filter((student) => student.interviewStatus === "予定").length, caption: "選考フォロー" },
    { label: "内定・入社", value: offeredOrJoiners, caption: "内定後フォロー" },
    { label: "LSTEP未紐付け", value: students.filter((student) => getStudentLstepStatus(student).className === "is-pending").length, caption: "連携確認" }
  ];
}

function renderStudentListInsightBar(students) {
  if (!Array.isArray(students) || students.length === 0) return "";

  return `
    <div class="student-list-insights" aria-label="学生一覧の現在状況">
      ${getStudentListInsightItems(students).map((item) => `
        <div class="student-list-insight">
          <span>${escapeHtml(item.label)}</span>
          <strong>${displayNumber(item.value)}</strong>
          <small>${escapeHtml(item.caption)}</small>
        </div>
      `).join("")}
    </div>
  `;
}
function renderStudentListTable(students) {
  const visibleStudents = students.slice(0, studentListVisibleCount);
  const hasMore = students.length > visibleStudents.length;

  return `
    ${renderStudentListInsightBar(students)}
    <div class="student-table-wrap">
      <table class="student-table">
        <colgroup>
          <col class="student-col-person">
          <col class="student-col-school">
          <col class="student-col-status">
          <col class="student-col-action">
        </colgroup>
        <thead>
          <tr>
            <th>学生</th>
            <th>学校・接点</th>
            <th>進捗</th>
            <th>次アクション</th>
          </tr>
        </thead>
        <tbody>
          ${visibleStudents.map((student) => {
            const priority = getStudentPriority(student);
            const primaryAction = activeStudentFilter === "completedFollowup" ? (getCompletedFollowupAction(student) || getPrimaryStudentAction(student)) : getPrimaryStudentAction(student);
            return `
              <tr class="student-table-row ${getStudentUrgencyClass(primaryAction)}" data-student-id="${escapeHtml(student.studentId)}">
                <td>
                  <span class="priority-pill ${priority.className}">${escapeHtml(priority.label)}</span>
                  <strong>${escapeHtml(student.name || "氏名未設定")}</strong>
                  <small>${escapeHtml(student.studentId || "ID未取得")} / ${escapeHtml(student.grade || "学年未設定")} / ${escapeHtml(student.gender || "性別未設定")}</small>
                  <div class="student-table-badges">
                    <span class="student-cohort-badge">${escapeHtml(student.cohort || getActiveCohortLabel())}</span>
                    ${renderStudentManagementBadge(student)}
                    ${renderStudentLstepStatusChip(student)}
                  </div>
                </td>
                <td>
                  <strong>${escapeHtml(student.school || "学校未設定")}</strong>
                  <small>${escapeHtml(student.source || "接点未設定")} / 接触：${escapeHtml(student.contactDate || "未設定")} / 担当：${escapeHtml(student.owner || "未設定")}</small>
                </td>
                <td>${renderStudentTableStatus(student)}</td>
                <td>${renderStudentNextActionCell(student, primaryAction)}</td>
              </tr>
            `;
          }).join("")}
        </tbody>
      </table>
    </div>
    ${hasMore ? `
      <div class="student-list-more">
        <span>${displayNumber(visibleStudents.length)} / ${displayNumber(students.length)}名を表示中</span>
        <button class="detail-button compact" type="button" id="studentShowMoreButton">さらに50件表示</button>
      </div>
    ` : `
      <div class="student-list-more">
        <span>${displayNumber(students.length)}名を表示中</span>
      </div>
    `}
  `;
}

function renderStudentListHint(students, activeFilter, activeDueFilter) {
  const query = studentSearchQuery.trim();
  let title = "学生一覧の見方";
  let body = "上のカードで今日対応・期限超過・日程未設定を絞り込み、上から順にカルテを開いて更新します。";
  const tags = ["検索", "絞り込み", "カルテ更新"];

  if (query) {
    title = `検索結果：${query}`;
    body = `氏名・学校・接点・メモ・LSTEP名から ${displayNumber(students.length)}名を表示しています。見つからない場合は、スペースなし・学校名の一部・学生IDでも検索できます。`;
    tags.splice(0, tags.length, "氏名", "学校", "学生ID");
  } else if (activeDueFilter.key === "overdue") {
    title = "期限超過の対応";
    body = "対応日を過ぎている学生です。対応済みにするか、次アクション日を更新してください。";
    tags.splice(0, tags.length, "期限超過", "日程更新", "完了");
  } else if (activeDueFilter.key === "today") {
    title = "今日対応する学生";
    body = "本日対応予定の学生です。見学前リマインド、面接確認、内定後フォローを優先して進めます。";
    tags.splice(0, tags.length, "今日対応", "リマインド", "フォロー");
  } else if (activeDueFilter.key === "unscheduled") {
    title = "日程未設定の整理";
    body = "次アクションはあるが日付が未設定の学生です。対応漏れを防ぐため、まず次アクション日を入れてください。";
    tags.splice(0, tags.length, "日付入力", "対応漏れ防止", "要確認");
  } else if (activeFilter.key === "offered") {
    title = "内定後フォロー";
    body = "内定・入社予定の学生です。入社前不安の解消、配属希望、見学店舗履歴を確認します。";
    tags.splice(0, tags.length, "内定", "入社準備", "配属希望");
  } else if (activeFilter.key === "inactive") {
    title = "管理対象外の確認";
    body = "現在のKPIには含めない学生です。誤って対象外にしていないか、必要な時だけ確認してください。";
    tags.splice(0, tags.length, "対象外", "確認用", "KPI除外");
  }

  return `
    <div class="student-list-hint" aria-live="polite">
      <div>
        <strong>${escapeHtml(title)}</strong>
        <p>${escapeHtml(body)}</p>
      </div>
      <div class="student-list-hint-tags">
        ${tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join("")}
      </div>
    </div>
  `;
}

function resetStudentListConditions() {
  activeStudentFilter = "all";
  activeStudentDueFilter = "all";
  activeStudentSort = "priority";
  studentSearchQuery = "";
  studentListVisibleCount = getInitialStudentListCount();
  renderStudentList();
  document.getElementById("studentSearchInput")?.focus();
}

function setupStudentEmptyResetButton() {
  const button = document.querySelector("[data-student-empty-reset]");
  if (!button) return;
  button.addEventListener("click", resetStudentListConditions);
}

function renderStudentList(activeKey = activeStudentFilter) {
  renderStudentQuickFilters();
  renderStudentFilters(activeStudentFilter);
  renderStudentSearchControls();
  renderStudentDueFilters(activeStudentDueFilter);
  renderStudentListFocusSummary();

  const { activeFilter, activeDueFilter, students } = getFilteredStudentList(activeKey);
  const totalCount = getStudentListTotalCountForActiveScope();

  document.getElementById("studentFilterCount").innerHTML = `
    <strong>表示中：${displayNumber(students.length)}名 <span>/ ${escapeHtml(getActiveCohortLabel())} ${displayNumber(totalCount)}名</span></strong>
    ${renderStudentConditionChips(activeFilter, activeDueFilter)}
  `;
  setupStudentCsvExport(students.length);
  setupLstepUnlinkedCsvExport();
  const listHint = renderStudentListHint(students, activeFilter, activeDueFilter);

  if (students.length === 0) {
    document.getElementById("studentList").innerHTML = `
      ${listHint}
      <div class="student-empty">
        <strong>該当する学生はいません。</strong>
        <p>検索語句や絞り込み条件を少し広げると見つかる場合があります。</p>
        <div class="student-empty-actions">
          <button class="detail-button compact" type="button" data-student-empty-reset>条件をリセット</button>
        </div>
      </div>
    `;
    setupStudentEmptyResetButton();
    return;
  }

  document.getElementById("studentList").innerHTML = `${listHint}${renderStudentListTable(students)}`;

  setupFollowupCompleteButtons(document.getElementById("studentList"));
  setupStudentOpenButtons(document.getElementById("studentList"));
  setupStudentQuickActionButtons(document.getElementById("studentList"));

  const showMoreButton = document.getElementById("studentShowMoreButton");
  if (showMoreButton) {
    showMoreButton.addEventListener("click", () => {
      studentListVisibleCount += 50;
      renderStudentList();
    });
  }

  document.querySelectorAll("[data-student-id]").forEach((card) => {
    card.addEventListener("click", () => {
      const selectedStudent = getActiveStudents().find((student) => student.studentId === card.dataset.studentId);
      openStudentModal(selectedStudent);
    });
  });
}

function renderStudentModalTabButton(key, label, count = "") {
  const countHtml = count ? `<span>${escapeHtml(String(count))}</span>` : "";
  return `<button class="student-card-tab" type="button" data-student-card-tab="${escapeHtml(key)}">${escapeHtml(label)}${countHtml}</button>`;
}

function renderStudentModalTabPanel(key, content) {
  return `
    <section class="student-card-panel" data-student-card-panel="${escapeHtml(key)}">
      ${content}
    </section>
  `;
}

function getStudentOverviewAlerts(student) {
  const alerts = [];
  const primaryAction = getPrimaryStudentAction(student);
  const urgency = getActionUrgency(primaryAction?.dueDate || student.nextActionDate || "");
  const lstepStatus = getStudentLstepStatus(student);
  const hasOffer = ["内定", "承諾"].includes(student.offerStatus || "");

  if (student.managementStatus === "管理対象外") {
    alerts.push({ tone: "muted", title: "管理対象外", body: "通常のKPI集計からは外れています。再開する場合は基本・選考で管理状態を有効にしてください。" });
  }
  if (lstepStatus.className === "is-pending") {
    alerts.push({ tone: "warning", title: "LSTEP未紐付け", body: "LINE/LSTEP連携前のため、配信・反応履歴の確認ができません。" });
  }
  if (!primaryAction && student.managementStatus !== "管理対象外") {
    alerts.push({ tone: "warning", title: "次アクション未設定", body: "次に誰が何をするかをフォロータブまたは基本・選考で設定してください。" });
  } else if (["overdue", "today"].includes(urgency.level)) {
    alerts.push({ tone: urgency.level === "overdue" ? "danger" : "warning", title: urgency.label, body: primaryAction?.title || student.nextAction || "対応内容を確認してください。" });
  }
  if (hasOffer && student.expectedJoinStatus === "未定") {
    alerts.push({ tone: "warning", title: "内定後の入社予定が未定", body: "内定後フォローとして、入社予定・辞退・入社済のどれかへ更新してください。" });
  }

  return alerts;
}

function renderStudentOverviewAlerts(student) {
  const alerts = getStudentOverviewAlerts(student);
  if (!alerts.length) return "";

  return `
    <div class="student-overview-alerts">
      ${alerts.map((alert) => `
        <div class="student-overview-alert is-${escapeHtml(alert.tone)}">
          <strong>${escapeHtml(alert.title)}</strong>
          <span>${escapeHtml(alert.body)}</span>
        </div>
      `).join("")}
    </div>
  `;
}

function renderStudentOverviewPanel(student) {
  const primaryAction = getPrimaryStudentAction(student);
  const lstepStatus = getStudentLstepStatus(student);
  const missingItems = getStudentDailyMissingItems(student);

  return `
    <div class="student-overview-badges">
      ${renderStudentManagementBadge(student)}
      <span class="student-lstep-chip ${lstepStatus.className}">${escapeHtml(lstepStatus.label)}</span>
      <span class="student-overview-badge">${escapeHtml(student.cohort || getActiveCohortLabel())}</span>
    </div>
    ${renderStudentOverviewAlerts(student)}
    <div class="student-overview-focus">
      <div>
        <span>今日やること</span>
        <strong>${escapeHtml(primaryAction?.title || student.nextAction || "次アクション未設定")}</strong>
        <p>${escapeHtml(primaryAction?.dueDate || student.nextActionDate || "日付未設定")} / ${escapeHtml(primaryAction?.sourceLabel || "学生管理")}</p>
      </div>
      <div class="student-overview-actions">
        <button class="detail-button compact" type="button" data-jump-student-tab="edit">次アクション更新</button>
        <button class="detail-button compact" type="button" data-jump-student-tab="followups">フォロー履歴</button>
        <button class="detail-button compact" type="button" data-jump-student-tab="stores">店舗</button>
      </div>
    </div>
    ${missingItems.length ? `
      <div class="student-missing-strip">
        <strong>確認が必要</strong>
        ${missingItems.map((item) => `<span>${escapeHtml(item)}</span>`).join("")}
      </div>
    ` : ""}
    <div class="modal-status-grid is-daily">
      <div><span>学校</span><strong>${escapeHtml(student.school || "未設定")}</strong></div>
      <div><span>卒年/学年</span><strong>${escapeHtml(student.cohort || student.grade || "未設定")}</strong></div>
      <div><span>流入元</span><strong>${escapeHtml(student.source || "未設定")}</strong></div>
      <div><span>担当</span><strong>${escapeHtml(student.owner || "未設定")}</strong></div>
    </div>
    <div class="modal-progress">
      ${[
        ["LINE", student.lineStatus],
        ["見学", student.salonTourStatus],
        ["面接", student.interviewStatus],
        ["結果", student.resultStatus],
        ["内定・入社", getOfferJoinStatusValue(student)]
      ].map(([label, value]) => `
        <div class="progress-chip">
          <span>${escapeHtml(label)}</span>
          <strong>${escapeHtml(value || "未設定")}</strong>
        </div>
      `).join("")}
    </div>
    ${renderStudentLstepDetail(student)}
    <div class="modal-memo">
      <span>メモ</span>
      <p>${escapeHtml(student.memo || "メモはまだありません。")}</p>
    </div>
  `;
}

function getStudentDailyMissingItems(student) {
  const items = [];
  if (!student.nextAction && student.managementStatus !== "管理対象外") items.push("次アクション未設定");
  if (student.nextAction && !student.nextActionDate) items.push("次アクション日未設定");
  if (!student.lineStatus || student.lineStatus === "未登録") items.push("LINE未登録");
  if (!student.salonTourStatus || student.salonTourStatus === "未設定") items.push("見学未設定");
  if (!student.interviewStatus || student.interviewStatus === "未設定") items.push("面接未設定");
  return items.slice(0, 4);
}

function getLocalDateInputValue(date = new Date()) {
  const localDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000));
  return localDate.toISOString().slice(0, 10);
}

function getHubOperatorName() {
  const employee = getHubCurrentEmployee();
  return employee?.fullName || employee?.name || employee?.displayName || "";
}

function renderInterviewOption(value, selectedValue = "") {
  return `<option value="${escapeHtml(value)}" ${value === selectedValue ? "selected" : ""}>${escapeHtml(value)}</option>`;
}

function buildInterviewNotebookPrompt(student) {
  return [
    "以下は新卒採用面接の録音文字起こしです。",
    "NotebookLMに登録されている「新卒面接マニュアル」に沿って、候補者の評価を診断してください。",
    "",
    "【候補者情報】",
    `氏名：${student.name || "未入力"}`,
    `学校：${student.school || "未入力"}`,
    `卒年：${student.cohort || getActiveCohortLabel()}`,
    `流入元：${student.source || "未入力"}`,
    "",
    "【診断してほしい観点】",
    "1. 接客適性、素直さ、成長意欲、協調性、感情制御",
    "2. 美容師としての将来性とリスク",
    "3. 面接者が追加確認すべき質問",
    "4. S/A/B/C/要再確認の暫定ランク",
    "5. 合格・条件付き合格・再面接・不合格の判断材料",
    "",
    "【録音文字起こし】",
    "ここに文字起こしを貼り付け"
  ].join("\n");
}

function renderStudentInterviewPanel(student) {
  const interviewerName = getHubOperatorName() || student.owner || "総務人事";
  const disabled = getWriteDisabledAttribute(!isActiveCohortEditable(), "updateStudent");
  const notebookPrompt = buildInterviewNotebookPrompt(student);

  return `
    <section class="student-interview-panel">
      <div class="interview-panel-heading">
        <div>
          <p class="section-kicker">Interview Execution</p>
          <h3>面接実施・AI診断記録</h3>
          <p class="section-note">録音同意、NotebookLM診断、面接実施者の所感、最終判断を一緒に残します。</p>
        </div>
        <a class="interview-manual-link" href="${INTERVIEW_MANUAL_URL}" target="_blank" rel="noopener">新卒面接マニュアルを開く</a>
      </div>
      <div class="interview-day-guide">
        <div>
          <span>1</span>
          <strong>面接前に確認</strong>
          <p>${escapeHtml(student.name || "氏名未設定")} / ${escapeHtml(student.school || "学校未設定")} / ${escapeHtml(student.cohort || getActiveCohortLabel())}</p>
        </div>
        <div>
          <span>2</span>
          <strong>診断を貼り付け</strong>
          <p>NotebookLMの要約と、面接者の所感を分けて記録します。</p>
        </div>
        <div>
          <span>3</span>
          <strong>最終判断を保存</strong>
          <p>保存すると学生カードのメモへ追記し、総務人事への通達状態も残します。</p>
        </div>
      </div>
      <div class="interview-precheck-grid" aria-label="面接前チェック">
        <div><strong>面接前</strong><p>候補者名・学校・卒年・担当者を確認。</p></div>
        <div><strong>録音前</strong><p>録音同意トークを読み上げ、同意状況を選択。</p></div>
        <div><strong>診断前</strong><p>録音文字起こしをNotebookLMに投入。</p></div>
        <div><strong>決定前</strong><p>AI診断と面接者所感の差分を話し合う。</p></div>
      </div>
      <div class="interview-workflow-grid" aria-label="面接運用フロー">
        <div><span>1</span><strong>録音同意</strong><p>録音目的と利用範囲を伝えて同意を取得。</p></div>
        <div><span>2</span><strong>NotebookLM診断</strong><p>録音内容を新卒面接マニュアルに沿って診断。</p></div>
        <div><span>3</span><strong>現場評価</strong><p>表情、声色、受け答え、違和感を面接者が記録。</p></div>
        <div><span>4</span><strong>最終判断</strong><p>AI診断と現場所感の差分を確認し、総務人事へ通達。</p></div>
      </div>
      <div class="interview-consent-box">
        <strong>録音同意トーク</strong>
        <p>本日はお越しいただきありがとうございます。弊社では、選考の公平性を保ち、後ほど内容を正確に振り返るために、面接内容を録音させていただいております。この音声データは採用選考の分析のみに使用し、終了後は速やかに破棄いたします。ご了承いただけますでしょうか？</p>
      </div>
      <div class="interview-prompt-box">
        <div>
          <strong>NotebookLM投入用プロンプト</strong>
          <p>録音文字起こしと一緒に貼り付ける診断依頼文です。複数名面接の場合は、候補者ごとに文字起こしを分けて使ってください。</p>
        </div>
        <button class="detail-button compact" type="button" data-copy-interview-prompt>コピー</button>
        <textarea data-interview-prompt rows="8" readonly>${escapeHtml(notebookPrompt)}</textarea>
      </div>
      <form class="interview-form" data-interview-form data-student-id="${escapeHtml(student.id || "")}">
        <div class="interview-form-grid">
          <label>
            <span>面接日</span>
            <input name="interviewDate" type="date" value="${escapeHtml(getLocalDateInputValue())}" ${disabled}>
          </label>
          <label>
            <span>面接実施者</span>
            <input name="interviewerName" value="${escapeHtml(interviewerName)}" placeholder="例：店長・教育担当" ${disabled}>
          </label>
          <label>
            <span>録音同意</span>
            <select name="recordingConsent" ${disabled}>
              ${["取得済", "未取得", "不要"].map((value) => renderInterviewOption(value, "取得済")).join("")}
            </select>
          </label>
          <label>
            <span>現場評価</span>
            <select name="fieldRating" ${disabled}>
              ${["高評価", "保留", "低評価"].map((value) => renderInterviewOption(value, "保留")).join("")}
            </select>
          </label>
          <label>
            <span>AI診断ランク</span>
            <select name="aiRating" ${disabled}>
              ${["S層", "A層", "B層", "C層", "要再確認"].map((value) => renderInterviewOption(value, "要再確認")).join("")}
            </select>
          </label>
          <label>
            <span>統合判断パターン</span>
            <select name="integratedPattern" ${disabled}>
              ${["未選択", "A：現場高評価 × AI高評価", "B：現場低評価 × AI高評価", "C：現場高評価 × AI低評価", "D：現場低評価 × AI低評価"].map((value) => renderInterviewOption(value, "未選択")).join("")}
            </select>
          </label>
          <label>
            <span>最終判断</span>
            <select name="finalDecision" ${disabled}>
              ${["保留", "合格", "条件付き合格", "再面接", "不合格"].map((value) => renderInterviewOption(value, "保留")).join("")}
            </select>
          </label>
          <label>
            <span>総務人事への通達</span>
            <select name="notifyHr" ${disabled}>
              ${["未通達", "通達済"].map((value) => renderInterviewOption(value, "未通達")).join("")}
            </select>
          </label>
          <label class="interview-form-full">
            <span>現場所感</span>
            <textarea name="fieldMemo" rows="3" placeholder="声色・表情・聞く姿勢・違和感・良かった点" ${disabled}></textarea>
          </label>
          <label class="interview-form-full">
            <span>NotebookLM診断要約</span>
            <textarea name="aiDiagnosisSummary" rows="4" placeholder="観察力、柔軟性、客観性、向上心、感情制御、社会人基礎力の診断結果" ${disabled}></textarea>
          </label>
          <label class="interview-form-full">
            <span>話し合いメモ</span>
            <textarea name="discussionMemo" rows="3" placeholder="AI診断と面接実施者の評価が分かれた点、最終判断理由" ${disabled}></textarea>
          </label>
        </div>
        <div class="student-form-actions">
          <p class="student-form-status" aria-live="polite"></p>
          <button class="refresh-button" type="submit" ${disabled}>面接結果を保存</button>
        </div>
      </form>
    </section>
  `;
}

function buildInterviewMemo(formData) {
  return [
    `【面接実施記録 ${String(formData.get("interviewDate") || getLocalDateInputValue())}】`,
    `面接実施者：${String(formData.get("interviewerName") || "").trim() || "未入力"}`,
    `録音同意：${String(formData.get("recordingConsent") || "未取得")}`,
    `現場評価：${String(formData.get("fieldRating") || "保留")}`,
    `AI診断ランク：${String(formData.get("aiRating") || "要再確認")}`,
    `統合判断：${String(formData.get("integratedPattern") || "未選択")}`,
    `最終判断：${String(formData.get("finalDecision") || "保留")}`,
    `総務人事への通達：${String(formData.get("notifyHr") || "未通達")}`,
    "",
    "現場所感：",
    String(formData.get("fieldMemo") || "").trim() || "未入力",
    "",
    "NotebookLM診断要約：",
    String(formData.get("aiDiagnosisSummary") || "").trim() || "未入力",
    "",
    "話し合いメモ：",
    String(formData.get("discussionMemo") || "").trim() || "未入力"
  ].join("\n");
}

function getInterviewNextAction(finalDecision, notifyHr) {
  if (notifyHr !== "通達済") return "総務人事へ合否通達";
  if (finalDecision === "再面接") return "再面接日程調整";
  if (finalDecision === "不合格") return "不合格連絡準備";
  if (finalDecision === "合格" || finalDecision === "条件付き合格") return "内定可否確認";
  return "面接結果確認";
}

function bindInterviewForm(form, student, options = {}) {
  if (!form || !student) return;
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const status = form.querySelector(".student-form-status");
    const submitButton = form.querySelector("button[type='submit']");
    const formData = new FormData(form);
    const finalDecision = String(formData.get("finalDecision") || "保留");
    const notifyHr = String(formData.get("notifyHr") || "未通達");
    const interviewMemo = buildInterviewMemo(formData);
    const nextMemo = [student.memo, interviewMemo].filter(Boolean).join("\n\n");
    const resultStatus = ["合格", "条件付き合格", "再面接", "不合格"].includes(finalDecision)
      ? finalDecision
      : (student.resultStatus || "未定");
    const payload = buildStudentQuickUpdatePayload(student, {
      interviewStatus: "実施済",
      resultStatus,
      nextAction: getInterviewNextAction(finalDecision, notifyHr),
      nextActionDate: "",
      memo: nextMemo
    });

    try {
      if (status) {
        status.textContent = "面接結果を保存しています...";
        status.classList.remove("is-error", "is-success");
      }
      if (submitButton) submitButton.disabled = true;
      await callGasAction("updateStudent", payload);
      if (status) {
        status.textContent = "保存しました。データ更新後、学生カルテに反映されます。";
        status.classList.add("is-success");
      }
      await refreshDashboardData();
      if (options.reopenStudentModal) {
        const updatedStudent = findStudentById(student.id);
        if (updatedStudent) openStudentModal(updatedStudent);
      }
    } catch (error) {
      if (status) {
        status.textContent = error.message;
        status.classList.add("is-error");
      }
    } finally {
      if (submitButton) submitButton.disabled = false;
    }
  });
}

function setupRenderedInterviewForm(student) {
  const form = document.querySelector("[data-interview-form]");
  bindInterviewForm(form, student, { reopenStudentModal: true });
}

function setupRenderedInterviewForms(root = document) {
  root.querySelectorAll("[data-interview-form]").forEach((form) => {
    const student = findStudentById(form.dataset.studentId);
    bindInterviewForm(form, student);
  });
  setupInterviewPromptCopyButtons(root);
}

function setupInterviewPromptCopyButtons(root = document) {
  root.querySelectorAll("[data-copy-interview-prompt]").forEach((button) => {
    button.onclick = async () => {
      const box = button.closest(".interview-prompt-box");
      const prompt = box?.querySelector("[data-interview-prompt]");
      if (!prompt) return;
      try {
        await navigator.clipboard.writeText(prompt.value || "");
        button.textContent = "コピー済み";
        setTimeout(() => {
          button.textContent = "コピー";
        }, 1800);
      } catch (error) {
        prompt.select();
        button.textContent = "選択しました";
        setTimeout(() => {
          button.textContent = "コピー";
        }, 1800);
      }
    };
  });
}

function getInterviewManagementStudents() {
  const query = normalizeStudentSearchText(interviewSearchQuery);
  return getManagedStudents()
    .filter((student) => {
      const actionText = normalizeStudentSearchText(student.nextAction || "");
      return student.interviewStatus === "予定"
        || student.interviewStatus === "実施済"
        || ["再面接", "条件付き合格"].includes(student.resultStatus)
        || actionText.includes("面接")
        || actionText.includes("合否通達");
    })
    .filter((student) => {
      if (!query) return true;
      return [
        student.name,
        student.school,
        student.source,
        student.studentId,
        student.nextAction,
        student.interviewStatus,
        student.resultStatus
      ].some((value) => normalizeStudentSearchText(value || "").includes(query));
    })
    .filter((student) => {
      if (activeInterviewStatusFilter === "scheduled") return student.interviewStatus === "予定";
      if (activeInterviewStatusFilter === "retry") return student.resultStatus === "再面接";
      if (activeInterviewStatusFilter === "notify") return normalizeStudentSearchText(student.nextAction || "").includes("合否通達");
      if (activeInterviewStatusFilter === "unscheduled") return !student.nextActionDate && student.interviewStatus !== "実施済";
      if (activeInterviewStatusFilter === "completed") return student.interviewStatus === "実施済";
      return true;
    })
    .filter((student) => {
      if (!activeInterviewDateFilter) return true;
      return student.nextActionDate === activeInterviewDateFilter;
    })
    .sort((a, b) => {
      const aPending = a.interviewStatus === "予定" || a.resultStatus === "再面接" ? 0 : 1;
      const bPending = b.interviewStatus === "予定" || b.resultStatus === "再面接" ? 0 : 1;
      if (aPending !== bPending) return aPending - bPending;
      return String(a.nextActionDate || "9999-12-31").localeCompare(String(b.nextActionDate || "9999-12-31"));
    });
}

function renderInterviewSummaryCard(label, value, sub, className = "") {
  return `
    <div class="operation-log-summary-card ${className}">
      <span>${escapeHtml(label)}</span>
      <strong>${displayNumber(value)}</strong>
      <small>${escapeHtml(sub)}</small>
    </div>
  `;
}

function renderInterviewManagementHint(students) {
  const statusLabel = getInterviewStatusFilterLabel();
  const query = interviewSearchQuery.trim();
  const dateLabel = activeInterviewDateFilter ? ` / ${activeInterviewDateFilter}` : "";
  const filterLabel = query ? `検索「${query}」` : `${statusLabel}${dateLabel}`;
  return `
    <div class="interview-management-hint">
      <div>
        <strong>面接対象 ${displayNumber(students.length)}名</strong>
        <p>${escapeHtml(filterLabel)}で表示しています。複数名面接の場合は、同じグループ内の学生を確認し、候補者ごとに診断結果を保存してください。</p>
      </div>
      <div class="interview-management-hint-tags">
        <span>録音同意</span>
        <span>NotebookLM</span>
        <span>合否通達</span>
      </div>
    </div>
  `;
}

function getInterviewGroupKey(student) {
  if (normalizeStudentSearchText(student.nextAction || "").includes("合否通達")) return "notify";
  if (student.resultStatus === "再面接") return "retry";
  if (student.interviewStatus === "実施済") return "completed";
  if (student.nextActionDate) return `date:${student.nextActionDate}`;
  return "unscheduled";
}

function getInterviewGroupLabel(groupKey) {
  if (groupKey === "notify") return "合否通達待ち";
  if (groupKey === "completed") return "実施済み";
  if (groupKey === "retry") return "再面接調整";
  if (groupKey === "unscheduled") return "日程未設定";
  if (groupKey.startsWith("date:")) return groupKey.replace("date:", "");
  return "面接対象";
}

function getInterviewGroupNote(groupKey, students) {
  const count = formatNumber.format(students.length);
  if (groupKey === "notify") return `${count}名の合否通達・総務人事共有が必要です。`;
  if (groupKey === "completed") return `${count}名の実施記録を確認できます。`;
  if (groupKey === "retry") return `${count}名の再面接調整が必要です。`;
  if (groupKey === "unscheduled") return `${count}名の日程設定・候補者確認が必要です。`;
  return `${count}名を同じ面接回として確認できます。`;
}

function getInterviewGroups(students) {
  const groups = students.reduce((map, student) => {
    const key = getInterviewGroupKey(student);
    map.set(key, [...(map.get(key) || []), student]);
    return map;
  }, new Map());

  const sortRank = (key) => {
    if (key === "notify") return "0";
    if (key === "retry") return "1";
    if (key.startsWith("date:")) return `2-${key}`;
    if (key === "unscheduled") return "3";
    if (key === "completed") return "4";
    return "9";
  };

  return Array.from(groups.entries())
    .sort(([a], [b]) => sortRank(a).localeCompare(sortRank(b)))
    .map(([key, groupStudents]) => ({ key, label: getInterviewGroupLabel(key), students: groupStudents }));
}

function renderInterviewStudentCard(student, forceOpen = false) {
  const shouldOpen = forceOpen || student.interviewStatus === "予定" || student.resultStatus === "再面接";
  const actionText = normalizeStudentSearchText(student.nextAction || "");
  const needsNotify = actionText.includes("合否通達");
  const cardClass = needsNotify ? "needs-notify" : (student.resultStatus === "再面接" ? "needs-retry" : "");
  return `
    <details class="interview-student-card ${cardClass}" ${shouldOpen || needsNotify ? "open" : ""}>
      <summary>
        <div>
          <p class="section-kicker">${escapeHtml(student.studentId || "ID未設定")} / ${escapeHtml(student.cohort || getActiveCohortLabel())}</p>
          <h3>${escapeHtml(student.name || "氏名未入力")}</h3>
          <p>${escapeHtml(student.school || "学校未入力")}</p>
        </div>
        <div class="interview-card-meta">
          <span>${escapeHtml(student.interviewStatus || "面接未設定")}</span>
          <strong>${escapeHtml(student.resultStatus || "結果未定")}</strong>
          <small>${escapeHtml(student.nextAction || "次アクション未設定")}</small>
          ${needsNotify ? `<em class="interview-alert-chip is-danger">合否通達待ち</em>` : ""}
          ${student.resultStatus === "再面接" ? `<em class="interview-alert-chip is-warning">再面接</em>` : ""}
          <button class="detail-button compact" type="button" data-interview-open-student-id="${escapeHtml(student.studentId)}">学生カルテ</button>
        </div>
      </summary>
      ${renderStudentInterviewPanel(student)}
    </details>
  `;
}

function bindInterviewManagementFilters() {
  const searchInput = document.getElementById("interviewSearchInput");
  const statusSelect = document.getElementById("interviewStatusFilter");
  const dateInput = document.getElementById("interviewDateFilter");
  const resetButton = document.getElementById("interviewFilterReset");

  if (searchInput) {
    searchInput.value = interviewSearchQuery;
    searchInput.oninput = () => {
      interviewSearchQuery = searchInput.value;
      renderInterviewManagement();
    };
  }

  if (statusSelect) {
    statusSelect.value = activeInterviewStatusFilter;
    statusSelect.onchange = () => {
      activeInterviewStatusFilter = statusSelect.value || "all";
      renderInterviewManagement();
    };
  }

  if (dateInput) {
    dateInput.value = activeInterviewDateFilter;
    dateInput.onchange = () => {
      activeInterviewDateFilter = dateInput.value || "";
      renderInterviewManagement();
    };
  }

  if (resetButton) {
    const hasFilter = Boolean(interviewSearchQuery.trim()) || activeInterviewStatusFilter !== "all" || Boolean(activeInterviewDateFilter);
    resetButton.disabled = !hasFilter;
    resetButton.onclick = () => {
      interviewSearchQuery = "";
      activeInterviewStatusFilter = "all";
      activeInterviewDateFilter = "";
      renderInterviewManagement();
    };
  }
}

function getInterviewStatusFilterLabel() {
  const labels = {
    all: "すべて",
    scheduled: "面接予定",
    retry: "再面接",
    notify: "合否通達待ち",
    unscheduled: "日程未設定",
    completed: "実施済み"
  };
  return labels[activeInterviewStatusFilter] || labels.all;
}

function downloadInterviewCsv() {
  const students = getInterviewManagementStudents();
  const headers = [
    "面接グループ",
    "学生ID",
    "氏名",
    "学校",
    "卒年",
    "流入元",
    "面接ステータス",
    "選考結果",
    "内定・入社ステータス",
    "次アクション日",
    "次アクション",
    "担当者",
    "メモ"
  ];
  const rows = students.map((student) => [
    getInterviewGroupLabel(getInterviewGroupKey(student)),
    student.studentId || "",
    student.name || "",
    student.school || "",
    student.cohort || getActiveCohortLabel(),
    student.source || "",
    student.interviewStatus || "",
    student.resultStatus || "",
    student.offerStatus || "",
    student.nextActionDate || "",
    student.nextAction || "",
    student.owner || "",
    student.memo || ""
  ]);
  const filterLabel = getInterviewStatusFilterLabel().replace(/[\\/:*?"<>|]/g, "");
  downloadCsvFile(
    `nov-talent-interviews-${getActiveCohortLabel()}-${filterLabel}-${new Date().toISOString().slice(0, 10)}.csv`,
    headers,
    rows
  );
}

function setupInterviewCsvExport(count) {
  const button = document.getElementById("interviewCsvExportButton");
  if (!button) return;
  button.disabled = count === 0;
  const countLabel = button.querySelector("span");
  if (countLabel) countLabel.textContent = formatNumber.format(count);
  button.onclick = downloadInterviewCsv;
}

function renderInterviewManagement() {
  const summaryGrid = document.getElementById("interviewSummaryGrid");
  const list = document.getElementById("interviewScheduleList");
  const tabBadge = document.getElementById("interviewTabBadge");
  if (!summaryGrid || !list) return;
  bindInterviewManagementFilters();

  const students = getInterviewManagementStudents();
  setupInterviewCsvExport(students.length);
  const scheduled = students.filter((student) => student.interviewStatus === "予定").length;
  const completed = students.filter((student) => student.interviewStatus === "実施済").length;
  const retry = students.filter((student) => student.resultStatus === "再面接").length;
  const notifyPending = students.filter((student) => normalizeStudentSearchText(student.nextAction || "").includes("合否通達")).length;
  const badgeCount = scheduled + retry + notifyPending;

  if (tabBadge) {
    tabBadge.hidden = badgeCount === 0;
    tabBadge.textContent = formatNumber.format(badgeCount);
  }

  summaryGrid.innerHTML = [
    renderInterviewSummaryCard("面接予定", scheduled, "これから実施する面接", scheduled ? "is-warning" : "is-linked"),
    renderInterviewSummaryCard("実施済み", completed, "診断・判断の記録あり"),
    renderInterviewSummaryCard("再面接", retry, "再調整が必要な学生", retry ? "is-warning" : "is-linked"),
    renderInterviewSummaryCard("合否通達待ち", notifyPending, "総務人事への共有待ち", notifyPending ? "is-danger" : "is-linked")
  ].join("");

  if (!students.length) {
    list.innerHTML = `
      <div class="student-empty">
        条件に合う面接対象者はありません。絞り込みを解除するか、学生フォローで面接予定・再面接・合否通達の学生を確認してください。
      </div>
    `;
    return;
  }

  list.innerHTML = `
    ${renderInterviewManagementHint(students)}
    ${getInterviewGroups(students).map((group, groupIndex) => `
    <section class="interview-session-group">
      <div class="interview-session-heading">
        <div>
          <p class="section-kicker">Interview Session</p>
          <h3>${escapeHtml(group.label)}</h3>
          <p>${escapeHtml(getInterviewGroupNote(group.key, group.students))}</p>
        </div>
        <div class="interview-session-count">
          <strong>${formatNumber.format(group.students.length)}</strong>
          <span>名</span>
        </div>
      </div>
      <div class="interview-session-people" aria-label="${escapeHtml(group.label)}の面接対象者">
        ${group.students.map((student, studentIndex) => renderInterviewStudentCard(student, groupIndex === 0 && studentIndex === 0)).join("")}
      </div>
    </section>
  `).join("")}
  `;

  setupRenderedInterviewForms(list);
  list.querySelectorAll("[data-interview-open-student-id]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      const selectedStudent = getActiveStudents().find((student) => student.studentId === button.dataset.interviewOpenStudentId);
      openStudentModal(selectedStudent);
    });
  });
}

function renderStudentModalTabs(student) {
  const followupCount = Array.isArray(student.followups) ? student.followups.length : 0;
  const storeHistoryCount = Array.isArray(student.storeTourHistories) ? student.storeTourHistories.length : 0;
  const operationLogCount = Array.isArray(student.operationLogs) ? student.operationLogs.length : 0;

  return `
    <div class="student-card-tabs" role="tablist" aria-label="学生カルテ内メニュー">
      ${renderStudentModalTabButton("overview", "今日やること")}
      ${renderStudentModalTabButton("edit", "進捗・基本")}
      ${renderStudentModalTabButton("stores", "見学・店舗", storeHistoryCount)}
      ${renderStudentModalTabButton("followups", "メモ・履歴", followupCount)}
      ${renderStudentModalTabButton("logs", "管理", operationLogCount)}
    </div>
    <div class="student-card-panels">
      ${renderStudentModalTabPanel("overview", renderStudentOverviewPanel(student))}
      ${renderStudentModalTabPanel("edit", renderStudentForm(student, "update"))}
      ${renderStudentModalTabPanel("followups", renderStudentFollowupSection(student))}
      ${renderStudentModalTabPanel("stores", renderStudentStoreSection(student))}
      ${renderStudentModalTabPanel("logs", renderStudentOperationLogSection(student))}
    </div>
  `;
}

function setupStudentModalTabs() {
  const modal = document.getElementById("studentModal");
  const tabs = Array.from(modal.querySelectorAll("[data-student-card-tab]"));
  const panels = Array.from(modal.querySelectorAll("[data-student-card-panel]"));
  if (!tabs.length || !panels.length) return;

  const activateTab = (targetKey) => {
    tabs.forEach((tab) => {
      const isActive = tab.dataset.studentCardTab === targetKey;
      tab.classList.toggle("active", isActive);
      tab.setAttribute("aria-selected", String(isActive));
    });
    panels.forEach((panel) => {
      panel.classList.toggle("is-active", panel.dataset.studentCardPanel === targetKey);
    });
  };

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => activateTab(tab.dataset.studentCardTab));
  });

  modal.querySelectorAll("[data-jump-student-tab]").forEach((button) => {
    button.addEventListener("click", () => activateTab(button.dataset.jumpStudentTab));
  });

  activateTab("overview");
}

function renderStudentModalHeaderProgress(student) {
  return [
    ["LINE", student.lineStatus || "未設定"],
    ["見学", student.salonTourStatus || "未設定"],
    ["面接", student.interviewStatus || "未設定"],
    ["内定・入社", getOfferJoinStatusValue(student)]
  ].map(([label, value]) => `
    <span class="student-modal-progress-chip ${getStudentTableStatusTone(value)}">
      <b>${escapeHtml(label)}</b>${escapeHtml(value || "未設定")}
    </span>
  `).join("");
}

function openStudentModal(student) {
  if (!student) return;

  const modal = document.getElementById("studentModal");
  const content = document.getElementById("studentModalContent");
  const priority = getStudentPriority(student);

  content.innerHTML = `
    <div class="modal-header">
      <div>
        <p class="section-kicker">Student Detail</p>
        <h2 id="studentModalTitle">${escapeHtml(student.name || "氏名未設定")}</h2>
        <p>${escapeHtml(student.school || "学校未設定")} / ${escapeHtml(student.grade || "学年未設定")}</p>
      </div>
      <div class="student-modal-header-status">
        <span class="priority-pill ${priority.className}">${escapeHtml(priority.label)}</span>
        <div class="student-modal-progress-summary">
          ${renderStudentModalHeaderProgress(student)}
        </div>
      </div>
    </div>
    ${renderStudentModalTabs(student)}
  `;

  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  setupStudentModalTabs();
  setupRenderedStudentForm();
  setupRenderedStorePreferenceForm();
  setupRenderedStoreTourHistoryForm();
  setupRenderedFollowupForm();
  setupRenderedFollowupStatusForms();
}

function openAddStudentModal() {
  const modal = document.getElementById("studentModal");
  const content = document.getElementById("studentModalContent");

  content.innerHTML = `
    <div class="modal-header">
      <div>
        <p class="section-kicker">Student Entry</p>
        <h2 id="studentModalTitle">学生追加</h2>
        <p>${escapeHtml(getActiveCohortLabel())}に新しい学生を登録します。</p>
      </div>
    </div>
    ${renderStudentForm({
      gender: "未回答",
      grade: "2年",
      lineStatus: "登録済",
      salonTourStatus: "未設定",
      interviewStatus: "未設定",
      resultStatus: "未定",
      offerStatus: "未定",
      expectedJoinStatus: "未定",
      managementStatus: "有効",
      owner: "総務人事"
    }, "add")}
  `;

  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  setupRenderedStudentForm();
}

function closeStudentModal() {
  const modal = document.getElementById("studentModal");
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}

function setupStudentModal() {
  const modal = document.getElementById("studentModal");
  const closeButton = modal.querySelector(".modal-close");
  const addButton = document.getElementById("addStudentButton");

  closeButton.addEventListener("click", closeStudentModal);
  if (addButton) {
    addButton.addEventListener("click", openAddStudentModal);
  }
  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeStudentModal();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.classList.contains("is-open")) {
      closeStudentModal();
    }
  });
}

function getOperationLogTableLabel(tableName) {
  const labels = {
    talent_students: "学生管理",
    talent_student_followups: "フォロー履歴",
    talent_fairs: "フェア",
    talent_schools: "学校",
    talent_investment_settings: "年度設定"
  };
  return labels[tableName] || tableName || "対象未設定";
}

function getOperationLogTableClass(tableName) {
  const classes = {
    talent_students: "is-student",
    talent_student_followups: "is-followup",
    talent_fairs: "is-fair",
    talent_schools: "is-school",
    talent_investment_settings: "is-setting"
  };
  return classes[tableName] || "is-default";
}

function getOperationLogActionClass(action) {
  const text = String(action || "");
  if (text.includes("追加")) return "is-create";
  if (text.includes("更新")) return "is-update";
  if (text.includes("完了")) return "is-complete";
  return "is-default";
}

function formatOperationLogDate(value) {
  if (!value) return "日時未記録";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  }).format(date);
}

function maskEmployeeId(value) {
  if (!value) return "HUB社員IDなし";
  return `HUB社員IDあり ...${value.slice(-8)}`;
}

function renderHubDiagnostics() {
  const panel = document.getElementById("hubDiagnostics");
  if (!panel) return;

  const employee = getHubCurrentEmployee();
  const operatorParams = getHubOperatorParams();
  const hasHubContext = Boolean(employee);
  const hasCoreEmployeeId = Boolean(operatorParams.operatorEmployeeId);
  const permission = getTalentPermissionState();
  const displayName = employee?.displayName || employee?.name || employee?.fullName || employee?.employeeName || "未取得";
  const employeeNumber = operatorParams.operatorEmployeeCode || "未取得";
  const employeeId = operatorParams.operatorEmployeeId || (hasHubContext ? "保存時にGASで照合" : "未取得");
  const department = operatorParams.operatorDepartmentName || operatorParams.operatorPositionName || "未取得";
  const roleKeysText = permission.roleKeys.length ? permission.roleKeys.join(", ") : "未取得";
  const heading = !hasHubContext
    ? "HUB未連携：保存できません"
    : hasCoreEmployeeId
      ? `HUB連携済み：${permission.label}`
      : `HUB連携済み：${permission.label} / Core社員ID照合待ち`;

  panel.className = `hub-diagnostics ${permission.className}`;
  panel.innerHTML = `
    <div>
      <p class="section-kicker">HUB Context Check</p>
      <h3>${escapeHtml(heading)}</h3>
      <p>${escapeHtml(permission.description)}</p>
    </div>
    <dl>
      <div><dt>氏名</dt><dd>${escapeHtml(displayName)}</dd></div>
      <div><dt>社員番号</dt><dd>${escapeHtml(employeeNumber)}</dd></div>
      <div><dt>所属/役職</dt><dd>${escapeHtml(department)}</dd></div>
      <div><dt>Core社員UUID</dt><dd>${escapeHtml(employeeId)}</dd></div>
      <div><dt>NOV Talent権限</dt><dd>${escapeHtml(permission.label)}</dd></div>
      <div><dt>Role Keys</dt><dd>${escapeHtml(roleKeysText)}</dd></div>
    </dl>
  `;
}

function renderOperationLogSummary() {
  const summary = document.getElementById("operationLogSummary");
  if (!summary) return;

  const linkedCount = operationLogs.filter((log) => log.actorEmployeeId).length;
  const missingCount = operationLogs.length - linkedCount;
  const inactiveCount = operationLogs.filter(isManagementExcludedOperationLog).length;
  const deniedCount = operationLogs.filter((log) => log.result === "denied").length;
  updateOperationLogTabBadge(missingCount);
  summary.innerHTML = `
    <div class="operation-log-summary-card">
      <span>直近履歴</span>
      <strong>${displayNumber(operationLogs.length)}</strong>
      <small>最大30件を表示</small>
    </div>
    <div class="operation-log-summary-card ${inactiveCount ? "is-warning" : "is-linked"}">
      <span>管理対象外化</span>
      <strong>${displayNumber(inactiveCount)}</strong>
      <small>重複整理・対象外処理</small>
    </div>
    <div class="operation-log-summary-card ${deniedCount ? "is-danger" : "is-linked"}">
      <span>拒否ログ</span>
      <strong>${displayNumber(deniedCount)}</strong>
      <small>${deniedCount ? "権限・入力エラーを確認" : "拒否なし"}</small>
    </div>
    <div class="operation-log-summary-card ${missingCount ? "is-warning" : "is-linked"}">
      <span>HUB社員IDなし</span>
      <strong>${displayNumber(missingCount)}</strong>
      <small>${missingCount ? "直開き・検証保存の可能性" : "問題なし"}</small>
    </div>
  `;
}

function updateOperationLogTabBadge(missingCount) {
  const badge = document.getElementById("operationLogTabBadge");
  if (!badge) return;
  if (shouldMaskDashboardNumbers()) {
    badge.hidden = true;
    badge.textContent = "";
    return;
  }
  badge.hidden = missingCount === 0;
  badge.textContent = formatNumber.format(missingCount);
  badge.setAttribute("aria-label", `HUB社員IDなし ${missingCount}件`);
}

function getOperationLogFilters() {
  return [
    { key: "all", label: "すべて", predicate: () => true },
    { key: "inactive", label: "管理対象外化", predicate: isManagementExcludedOperationLog },
    { key: "denied", label: "拒否", predicate: (log) => log.result === "denied" },
    { key: "linked", label: "HUB社員IDあり", predicate: (log) => Boolean(log.actorEmployeeId) },
    { key: "missing", label: "HUB社員IDなし", predicate: (log) => !log.actorEmployeeId }
  ];
}

function renderOperationLogFilters() {
  const filters = getOperationLogFilters();
  return `
    <div class="operation-log-filters" aria-label="操作履歴フィルター">
      ${filters.map((filter) => {
        const count = operationLogs.filter(filter.predicate).length;
        return `
          <button class="operation-log-filter ${activeOperationLogFilter === filter.key ? "active" : ""}" type="button" data-operation-log-filter="${filter.key}">
            ${escapeHtml(filter.label)}<span>${formatNumber.format(count)}</span>
          </button>
        `;
      }).join("")}
    </div>
  `;
}

function setupOperationLogFilters() {
  document.querySelectorAll("[data-operation-log-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      activeOperationLogFilter = button.dataset.operationLogFilter || "all";
      renderOperationLogs();
    });
  });
}

function normalizeOperationLogSearchText(value) {
  return String(value || "").normalize("NFKC").toLowerCase().replace(/[\s\u3000\u200B-\u200D\uFEFF]+/g, "");
}

function isManagementExcludedOperationLog(log) {
  const haystack = normalizeOperationLogSearchText([
    log.action,
    log.detail,
    log.reason,
    log.result
  ].join(" "));
  return haystack.includes(normalizeOperationLogSearchText("管理対象外"));
}

function getOperationLogSearchText(log) {
  return normalizeOperationLogSearchText([
    log.action,
    log.result,
    log.reason,
    log.tableName,
    getOperationLogTableLabel(log.tableName),
    log.targetType,
    log.targetId,
    log.recordId,
    log.studentId,
    log.studentCode,
    log.studentName,
    log.actorEmployeeId,
    log.actorEmail,
    log.actorName,
    log.detail,
    log.createdAt,
    formatOperationLogDate(log.createdAt)
  ].join(" "));
}

function matchesOperationLogSearch(log) {
  const query = normalizeOperationLogSearchText(operationLogSearchQuery);
  if (!query) return true;
  return getOperationLogSearchText(log).includes(query);
}

function renderOperationLogSearch() {
  return `
    <div class="operation-log-search">
      <label for="operationLogSearchInput">操作履歴を検索</label>
      <input id="operationLogSearchInput" type="search" value="${escapeHtml(operationLogSearchQuery)}" placeholder="学生名・操作・担当者名・詳細で検索">
      <button class="detail-button compact" type="button" data-operation-log-search-reset ${operationLogSearchQuery.trim() ? "" : "disabled"}>クリア</button>
    </div>
  `;
}

function setupOperationLogSearch() {
  const input = document.getElementById("operationLogSearchInput");
  const resetButton = document.querySelector("[data-operation-log-search-reset]");
  if (input) {
    input.addEventListener("input", () => {
      operationLogSearchQuery = input.value;
      renderOperationLogs();
      const nextInput = document.getElementById("operationLogSearchInput");
      if (nextInput) {
        nextInput.focus();
        nextInput.setSelectionRange(nextInput.value.length, nextInput.value.length);
      }
    });
  }

  if (resetButton) {
    resetButton.addEventListener("click", () => {
      operationLogSearchQuery = "";
      renderOperationLogs();
      document.getElementById("operationLogSearchInput")?.focus();
    });
  }
}

function escapeCsvCell(value) {
  const text = String(value ?? "");
  return `"${text.replace(/"/g, "\"\"")}"`;
}

function downloadCsvFile(filename, headers, rows) {
  const csvRows = [
    headers.map(escapeCsvCell).join(","),
    ...rows.map((row) => row.map(escapeCsvCell).join(","))
  ];

  const blob = new Blob([`\ufeff${csvRows.join("\r\n")}`], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function downloadOperationLogCsv() {
  const rows = getFilteredOperationLogs();
  if (!rows.length) return;

  const headers = ["日時", "操作", "結果", "対象種別", "対象", "詳細", "拒否理由", "操作社員名", "操作社員メール", "Core社員UUID", "学生ID", "対象ID"];
  const csvRows = [
    headers.map(escapeCsvCell).join(","),
    ...rows.map((log) => [
      formatOperationLogDate(log.createdAt),
      log.action || "",
      log.result || "",
      getOperationLogTableLabel(log.tableName),
      log.studentName || log.studentCode || log.recordId || "",
      log.detail || "",
      log.reason || "",
      log.actorName || "",
      log.actorEmail || "",
      log.actorEmployeeId || "",
      log.studentCode || "",
      log.targetId || log.recordId || ""
    ].map(escapeCsvCell).join(","))
  ];

  const blob = new Blob([`\ufeff${csvRows.join("\r\n")}`], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `nov-talent-operation-logs-${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function renderOperationLogExportButton() {
  const count = getFilteredOperationLogs().length;
  return `
    <button class="operation-log-export" type="button" data-operation-log-export ${count ? "" : "disabled"}>
      CSV出力<span>${formatNumber.format(count)}</span>
    </button>
  `;
}

function setupOperationLogExport() {
  const button = document.querySelector("[data-operation-log-export]");
  if (!button) return;
  button.addEventListener("click", downloadOperationLogCsv);
}

function setupOperationLogStudentLinks() {
  document.querySelectorAll("[data-operation-log-student-id]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      const studentKey = button.dataset.operationLogStudentId;
      const selectedStudent = getAllStudentsForLookup().find((student) => {
        return String(student.id || "") === studentKey || String(student.studentId || "") === studentKey;
      });
      if (selectedStudent) openStudentModal(selectedStudent);
    });
  });
}

function renderLatestOperationLogCard() {
  const latest = operationLogs[0];
  if (!latest) return "";

  const isDenied = latest.result === "denied";
  const isInactiveChange = isManagementExcludedOperationLog(latest);
  const actorLabel = latest.actorName || latest.actorEmail || maskEmployeeId(latest.actorEmployeeId);
  const targetName = latest.studentName || latest.studentCode || getOperationLogTableLabel(latest.tableName);
  const actionLabel = isDenied ? "保存拒否" : (isInactiveChange ? "管理対象外化" : (latest.action || "操作"));

  return `
    <section class="operation-log-latest ${isDenied ? "is-denied" : ""}">
      <div>
        <p class="section-kicker">Latest Operation</p>
        <h3>${escapeHtml(actionLabel)} / ${escapeHtml(targetName)}</h3>
        <p>${escapeHtml(latest.detail || "詳細未記録")}</p>
        ${isDenied && latest.reason ? `<strong>理由：${escapeHtml(latest.reason)}</strong>` : ""}
      </div>
      <dl>
        <div><dt>日時</dt><dd>${escapeHtml(formatOperationLogDate(latest.createdAt))}</dd></div>
        <div><dt>操作社員</dt><dd>${escapeHtml(actorLabel)}</dd></div>
        <div><dt>HUB社員ID</dt><dd>${escapeHtml(maskEmployeeId(latest.actorEmployeeId))}</dd></div>
      </dl>
    </section>
  `;
}

function getFilteredOperationLogs() {
  const filter = getOperationLogFilters().find((item) => item.key === activeOperationLogFilter) || getOperationLogFilters()[0];
  return operationLogs.filter(filter.predicate).filter(matchesOperationLogSearch);
}

function renderOperationLogs() {
  const list = document.getElementById("operationLogList");
  if (!list) return;
  renderOperationLogSummary();

  if (!operationLogs.length) {
    list.innerHTML = `
      <div class="student-empty">操作履歴はまだ取得できていません。データ更新後に再確認してください。</div>
    `;
    return;
  }

  const filteredLogs = getFilteredOperationLogs();
  if (!filteredLogs.length) {
    list.innerHTML = `
      ${renderOperationLogFilters()}
      <div class="operation-log-tools">
        ${renderOperationLogSearch()}
        ${renderOperationLogExportButton()}
      </div>
      <div class="student-empty">この条件に該当する操作履歴はありません。</div>
    `;
    setupOperationLogFilters();
    setupOperationLogSearch();
    setupOperationLogExport();
    return;
  }

  list.innerHTML = `
    ${renderLatestOperationLogCard()}
    ${renderOperationLogFilters()}
    <div class="operation-log-tools">
      ${renderOperationLogSearch()}
      ${renderOperationLogExportButton()}
    </div>
    ${filteredLogs.map((log) => {
    const hasActor = Boolean(log.actorEmployeeId);
    const actorLabel = log.actorName || maskEmployeeId(log.actorEmployeeId);
    const targetName = log.studentName || log.studentCode || getOperationLogTableLabel(log.tableName);
    const tableLabel = getOperationLogTableLabel(log.tableName);
    const tableClass = getOperationLogTableClass(log.tableName);
    const isDenied = log.result === "denied";
    const isInactiveChange = isManagementExcludedOperationLog(log);
    const relatedStudent = findStudentByOperationLog(log);
    const actionClass = isDenied ? "is-danger" : (isInactiveChange ? "is-inactive" : getOperationLogActionClass(log.action));
    const actionLabel = isDenied ? "拒否" : (isInactiveChange ? "対象外" : (log.action || "操作"));
    return `
      <article class="operation-log-card ${isDenied ? "is-denied" : ""} ${isInactiveChange ? "is-inactive" : ""}">
        <div class="operation-log-main">
          <span class="operation-log-action ${actionClass}">${escapeHtml(actionLabel)}</span>
          <div>
            <div class="operation-log-title-row">
              <h3>${escapeHtml(targetName)}</h3>
              <span class="operation-log-target ${tableClass}">${escapeHtml(tableLabel)}</span>
              ${isInactiveChange ? `<span class="operation-log-target is-inactive">管理対象外化</span>` : ""}
              ${isDenied ? `<span class="operation-log-target is-denied">保存拒否</span>` : ""}
            </div>
            <p>${escapeHtml(log.detail || "詳細未記録")}</p>
            ${isDenied && log.reason ? `<p class="operation-log-reason">理由：${escapeHtml(log.reason)}</p>` : ""}
            ${relatedStudent ? `<button class="operation-log-student-link" type="button" data-operation-log-student-id="${escapeHtml(relatedStudent.id || relatedStudent.studentId)}">学生詳細を開く</button>` : ""}
          </div>
        </div>
        <div class="operation-log-meta">
          <span>${escapeHtml(formatOperationLogDate(log.createdAt))}</span>
          <span>${escapeHtml(tableLabel)}</span>
          <strong class="${hasActor ? "is-linked" : "is-missing"}">${escapeHtml(actorLabel)}</strong>
          ${log.actorName && log.actorEmployeeId ? `<small>${escapeHtml(maskEmployeeId(log.actorEmployeeId))}</small>` : ""}
        </div>
      </article>
    `;
  }).join("")}
  `;
  setupOperationLogFilters();
  setupOperationLogSearch();
  setupOperationLogExport();
  setupOperationLogStudentLinks();
}

function getActiveDashboardView() {
  return activeDashboardView
    || document.querySelector(".dashboard-tab.active")?.dataset.view
    || "overview";
}

function updateInterviewTabBadgeOnly() {
  const badge = document.getElementById("interviewTabBadge");
  if (!badge) return;
  if (shouldMaskDashboardNumbers()) {
    badge.hidden = true;
    badge.textContent = "";
    return;
  }
  const students = getInterviewManagementStudents();
  const scheduled = students.filter((student) => student.interviewStatus === "予定").length;
  const retry = students.filter((student) => student.resultStatus === "再面接").length;
  const notifyPending = students.filter((student) => normalizeStudentSearchText(student.nextAction || "").includes("合否通達")).length;
  const badgeCount = scheduled + retry + notifyPending;
  badge.hidden = badgeCount === 0;
  badge.textContent = formatNumber.format(badgeCount);
}

function updateLightweightTabBadges() {
  updateStudentUrgentTabBadge(studentSummary);
  updateInterviewTabBadgeOnly();
  updateDataQualityTabBadge(getDataQualitySummary(getStudentQualityIssues()));
  updateOperationLogTabBadge(operationLogs.filter((log) => !log.actorEmployeeId).length);
}

function renderStudentView() {
  renderStudentCohortTabs();
  renderStudentEditControls();
  renderStudentSummary();
  renderStudentQualityNotice();
  renderLstepIntegrationStatus();
  renderStudentActions();
  renderStudentList();
}

function renderActiveDashboardView(targetView = getActiveDashboardView()) {
  if (targetView === "student") {
    renderStudentView();
    return;
  }
  if (targetView === "interview") {
    renderInterviewManagement();
    return;
  }
  if (targetView === "quality") {
    renderDataQuality();
    return;
  }
  if (targetView === "logs") {
    renderOperationLogs();
  }
}

function renderDashboard(isConnected) {
  updateDataSourceStatus(isConnected);
  renderHubContextBadge();
  renderHubDiagnostics();
  document.getElementById("appTitle").textContent = HUB_DISPLAY_APP_NAME;
  document.title = HUB_DISPLAY_APP_NAME;

  const metrics = buildMetrics();
  renderKpis(metrics);
  renderDecisionSummary(metrics);
  renderFunnel(metrics);
  renderFairTable();
  renderSchools();
  generateActionCards();
  updateLightweightTabBadges();
  renderActiveDashboardView();
}

async function refreshDashboardData() {
  const refreshButton = document.getElementById("dataRefreshButton");

  if (refreshButton) {
    refreshButton.disabled = true;
    refreshButton.textContent = "更新中...";
  }

  const isConnected = await fetchDashboardData();
  hasAttemptedDataLoad = true;
  lastDataRefreshAt = new Date();
  renderDashboard(isConnected);

  if (refreshButton) {
    refreshButton.disabled = false;
    refreshButton.textContent = "データ更新";
  }
}

function setupTabs() {
  const tabs = Array.from(document.querySelectorAll(".dashboard-tab"));

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      activateDashboardView(tab.dataset.view);
    });
  });
}

function activateDashboardView(targetView) {
  activeDashboardView = targetView || "overview";
  const tabs = Array.from(document.querySelectorAll(".dashboard-tab"));
  const views = Array.from(document.querySelectorAll(".dashboard-view"));

  tabs.forEach((item) => {
    item.classList.toggle("active", item.dataset.view === activeDashboardView);
  });

  views.forEach((view) => {
    view.classList.toggle("view-hidden", view.dataset.view !== activeDashboardView);
  });

  renderActiveDashboardView(activeDashboardView);
}

function setupDataRefresh() {
  const refreshButton = document.getElementById("dataRefreshButton");

  if (refreshButton) {
    refreshButton.addEventListener("click", refreshDashboardData);
  }

  window.setInterval(refreshDashboardData, 24 * 60 * 60 * 1000);
}

function readStoredHubContext(storage) {
  try {
    const raw = storage.getItem(HUB_CONTEXT_KEY);
    if (!raw) return null;
    const context = JSON.parse(raw);
    const storedAt = Date.parse(context.storedAt || "");
    if (storedAt && Date.now() - storedAt > HUB_CONTEXT_MAX_AGE_MS) {
      storage.removeItem(HUB_CONTEXT_KEY);
      return null;
    }
    return context;
  } catch (error) {
    try {
      storage.removeItem(HUB_CONTEXT_KEY);
    } catch (_) {
      // Ignore storage cleanup errors.
    }
    return null;
  }
}

function readHubContextFromUrl() {
  try {
    const url = new URL(window.location.href);
    const encoded = url.searchParams.get("hub_context");
    if (!encoded) return null;
    const base64 = encoded.replace(/-/g, "+").replace(/_/g, "/").padEnd(Math.ceil(encoded.length / 4) * 4, "=");
    const binary = atob(base64);
    const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
    const context = JSON.parse(new TextDecoder().decode(bytes));
    if (!context || typeof context !== "object") return null;
    const storedContext = {
      ...context,
      storedAt: context.storedAt || new Date().toISOString()
    };
    const serialized = JSON.stringify(storedContext);
    try {
      window.sessionStorage.setItem(HUB_CONTEXT_KEY, serialized);
    } catch (_) {
      // Ignore storage write errors.
    }
    try {
      window.localStorage.setItem(HUB_CONTEXT_KEY, serialized);
    } catch (_) {
      // Ignore storage write errors.
    }
    url.searchParams.delete("hub_context");
    window.history.replaceState(window.history.state, document.title, `${url.pathname}${url.search}${url.hash}`);
    return storedContext;
  } catch (error) {
    console.warn("Failed to read HUB context from URL", error);
    return null;
  }
}

function getHubCurrentEmployee() {
  try {
    const helperContext = window.NovHubContext?.read?.();
    if (helperContext) return helperContext;
  } catch (_) {
    // Fall back to direct globals, URL context, and storage.
  }

  return window.novHub?.currentEmployee
    || window.NOV_HUB_CURRENT_EMPLOYEE
    || readHubContextFromUrl()
    || readStoredHubContext(window.sessionStorage)
    || readStoredHubContext(window.localStorage)
    || null;
}

function getHubOperatorParams() {
  const employee = getHubCurrentEmployee();
  if (!employee || typeof employee !== "object") return {};

  const displayName = employee.displayName || employee.name || employee.fullName || employee.employeeName || "";
  const coreEmployeeId = employee.coreEmployeeId || employee.supabaseEmployeeId || employee.staffId || employee.id || employee.employeeId || "";
  const employeeNumber = employee.employeeNumber || employee.employee_no || employee.employeeNo || employee.employee_id || employee.employeeCode || employee.staffCode || "";
  const departmentName = employee.departmentName || employee.department?.name || "";
  const positionName = employee.positionName || employee.position?.name || "";
  return {
    actorEmployeeId: coreEmployeeId,
    actorEmployeeNumber: employeeNumber,
    actorEmail: employee.email || "",
    actorName: displayName,
    actorRoleKeys: Array.isArray(employee.roleKeys) ? employee.roleKeys.join(",") : "",
    operatorEmployeeId: coreEmployeeId,
    operatorEmployeeCode: employeeNumber,
    operatorName: displayName,
    operatorDepartmentName: departmentName,
    operatorPositionName: positionName
  };
}
function renderOperatorNotice() {
  const employee = getHubCurrentEmployee();
  if (!employee || typeof employee !== "object") {
    return `
      <div class="operator-notice is-missing">
        <span>操作ユーザー</span>
        <strong>HUB未連携</strong>
        <small>保存するにはNOV HUBから開き直してください。操作履歴に社員IDを記録します。</small>
      </div>
    `;
  }

  const displayName = employee.displayName || employee.name || employee.fullName || employee.employeeName || "ログイン中";
  const employeeCode = employee.employeeNumber || employee.employee_no || employee.employeeNo || employee.employee_id || employee.employeeCode || employee.staffCode || "社員番号未取得";
  const roleText = employee.departmentName || employee.department?.name || employee.positionName || employee.position?.name || employee.roleName || "HUBログイン";
  return `
    <div class="operator-notice">
      <span>操作ユーザー</span>
      <strong>${escapeHtml(displayName)}</strong>
      <small>${escapeHtml(employeeCode)} / ${escapeHtml(roleText)}</small>
    </div>
  `;
}

function renderHubContextBadge() {
  const badge = document.getElementById("hubContextBadge");
  if (!badge) return;
  const employee = getHubCurrentEmployee();
  const permission = getTalentPermissionState();
  if (!employee) {
    badge.hidden = false;
    badge.className = "hub-context-badge is-missing";
    badge.innerHTML = `<span>HUB</span><strong>未連携</strong><small>HUBから開くと操作履歴に社員IDを記録</small>`;
    return;
  }

  const displayName = employee.displayName || employee.name || employee.fullName || employee.employeeName || "ログイン中";
  const roleName = employee.roleName || employee.positionName || employee.position?.name || employee.departmentName || employee.department?.name || "HUB";
  badge.hidden = false;
  badge.className = `hub-context-badge ${permission.className}`;
  badge.innerHTML = `<span>HUB / ${escapeHtml(permission.label)}</span><strong>${escapeHtml(displayName)}</strong><small>${escapeHtml(roleName)}</small>`;
}

function formatRefreshTimestamp(date) {
  if (!(date instanceof Date) || Number.isNaN(date.getTime())) return "未取得";
  return new Intl.DateTimeFormat("ja-JP", {
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  }).format(date);
}

function updateDataRefreshMeta(isConnected) {
  const meta = document.getElementById("dataRefreshMeta");
  if (!meta) return;
  const sourceLabel = isConnected ? "GAS" : "サンプル";
  meta.textContent = `最終取得: ${formatRefreshTimestamp(lastDataRefreshAt)} / ${sourceLabel}`;
  meta.classList.toggle("is-connected", Boolean(isConnected));
  meta.classList.toggle("is-sample", !isConnected);
}

function updateDataSourceStatus(isConnected) {
  const badge = document.querySelector(".header-badge");
  const footerStatus = document.getElementById("footerStatus");
  updateDataRefreshMeta(isConnected);
  const status = !hasAttemptedDataLoad
    ? {
      label: "Loading Data",
      version: "...",
      footer: "Loading Data ...",
      color: "#64748b"
    }
    : isConnected
    ? {
      label: "● GAS Connected",
      version: "v0.2",
      footer: "GAS Connected v0.2",
      color: "#047857"
    }
    : {
      label: "Sample Data",
      version: "v0.1",
      footer: "Sample Data v0.1",
      color: ""
    };

  if (badge) {
    badge.innerHTML = status.color
      ? `<span style="color:${status.color};">${status.label}</span><strong>${status.version}</strong>`
      : `<span>${status.label}</span><strong>${status.version}</strong>`;
  }

  if (footerStatus) {
    footerStatus.textContent = status.footer;
  }
}

async function initDashboard() {
  setupTabs();
  setupStudentModal();
  setupSettingsModal();
  setupFairModal();
  setupSchoolModal();
  setupMonthlyReportExport();
  setupDataRefresh();
  renderDashboard(false);
  refreshDashboardData();
}

document.addEventListener("DOMContentLoaded", initDashboard);


