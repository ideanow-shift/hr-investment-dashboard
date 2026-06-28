const GAS_API_URL = "https://script.google.com/macros/s/AKfycbx0X9DvO6zydd8txe_Mgme1COTfltp7ZxueJyrIPQsJSwWCvbVrM2otmlgarPTDmU5iWg/exec";

const HUB_CONTEXT_KEY = "novHub.currentEmployee";
const HUB_CONTEXT_MAX_AGE_MS = 12 * 60 * 60 * 1000;

let dashboardConfig = {
  appName: "NOV Talent",
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
let studentListVisibleCount = 50;
let studentSummary = buildStudentSummary(studentData);
let activeDataQualityFilter = "all";
let operationLogs = [];
let activeOperationLogFilter = "all";
let operationLogSearchQuery = "";
let lstepSummary = buildDefaultLstepSummary();

async function fetchDashboardData() {
  if (!GAS_API_URL) {
    return false;
  }

  try {
    const data = await loadJsonp(GAS_API_URL);
    applyDashboardData(data);
    return true;
  } catch (error) {
    console.warn("[WARN] GAS APIからの取得に失敗しました。サンプルデータで表示します。", error.message);
    return false;
  }
}

function loadJsonp(apiUrl, params = {}) {
  return new Promise((resolve, reject) => {
    const callbackName = `talentInvestmentDashboard_${Date.now()}_${Math.random().toString(36).slice(2)}`;
    const script = document.createElement("script");
    const timeoutId = window.setTimeout(() => {
      cleanup();
      reject(new Error("GAS APIの読み込みがタイムアウトしました"));
    }, 30000);

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
    note: "LSTEP連携は準備中です。"
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
    followups: Array.isArray(student.followups) ? student.followups.map(normalizeFollowup) : [],
    lineAccount: normalizeLineAccount(student.lineAccount)
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
const escapeHtml = (value) => String(value ?? "").replace(/[&<>"']/g, (char) => ({
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  "\"": "&quot;",
  "'": "&#39;"
})[char]);
const normalizeAppName = (name) => {
  if (!name || name === "Talent Investment Dashboard") return "NOV Talent";
  return String(name);
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
        <span>${typeof kpi.value === "number" ? formatNumber.format(kpi.value) : kpi.value}</span>
        ${kpi.unit ? `<span class="kpi-unit">${kpi.unit}</span>` : ""}
      </div>
      <p class="kpi-sub">${kpi.sub}</p>
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
      value: `${percent(bestFair.tourRate)} 見学率`,
      body: "次年度も参加候補です。見学予約導線を残し、同じ勝ち筋を再現します。",
      className: "decision-good"
    },
    reviewFair && {
      type: "見直し候補",
      title: reviewFair.name,
      value: reviewFair.salonTours ? `${formatCurrency.format(reviewFair.tourCost)} / 見学` : "見学取得 0",
      body: "出展内容、声かけ、参加可否を見直す対象です。代替フェアや学校訪問への振替も検討します。",
      className: "decision-risk"
    },
    topSchool && {
      type: "優先学校",
      title: topSchool.name,
      value: `${getSchoolPromise(topSchool).score} 有望度`,
      body: "学校訪問や先生連携を優先し、将来の活躍人材との接点を増やします。",
      className: "decision-blue"
    },
    {
      type: "運用注意",
      title: "学生フォロー",
      value: `${formatNumber.format(followUpCount)}名 要確認`,
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
    const width = Math.max(safeDivide(step.value, firstValue) * 100, step.value > 0 ? 4 : 0);

    return `
      <div class="funnel-step">
        <div class="funnel-label">${step.label}</div>
        <div class="funnel-bar" aria-hidden="true">
          <div class="funnel-fill" style="width: ${width}%"></div>
        </div>
        <div class="funnel-meta">
          <strong>${formatNumber.format(step.value)}名</strong><br>
          ${index === 0 ? "起点" : `転換率 ${percent(conversionRate)}`}
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
      <td>${formatCurrency.format(fair.cost)}</td>
      <td>${formatNumber.format(fair.contacts)}</td>
      <td>${formatNumber.format(fair.lineRegistrations)} <span class="muted">(${percent(fair.lineRate)})</span></td>
      <td>${formatNumber.format(fair.salonTours)}</td>
      <td>${percent(fair.tourRate)}</td>
      <td>${formatCurrency.format(fair.contactCost)}</td>
      <td>${fair.salonTours ? formatCurrency.format(fair.tourCost) : "未取得"}</td>
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
  if (countLabel) countLabel.textContent = formatNumber.format(count);
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
      <div class="detail-metric"><span>見学率</span><strong>${percent(fair.tourRate)}</strong><small>見学取得 / 接触</small></div>
      <div class="detail-metric"><span>接触単価</span><strong>${formatCurrency.format(fair.contactCost)}</strong><small>費用 / 接触数</small></div>
      <div class="detail-metric"><span>関連学生</span><strong>${relatedStudents.length}</strong><small>個別管理シート連携</small></div>
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

  document.getElementById("schoolGrid").innerHTML = rankedSchools.map((school) => {
    const promise = getSchoolPromise(school);

    return `
      <article class="school-card">
        <h3>${escapeHtml(school.displayName || school.name)}</h3>
        <p class="score-text">${escapeHtml(school.area || "エリア未設定")}</p>
        <div class="school-stats">
          <div class="school-stat"><span>接触</span><strong>${school.contacts}</strong></div>
          <div class="school-stat"><span>LINE</span><strong>${school.lineRegistrations}</strong></div>
          <div class="school-stat"><span>見学</span><strong>${school.salonTours}</strong></div>
          <div class="school-stat"><span>面接</span><strong>${school.interviews}</strong></div>
          <div class="school-stat"><span>合格</span><strong>${school.passed}</strong></div>
          <div class="school-stat"><span>内定</span><strong>${school.offers}</strong></div>
        </div>
        <div class="school-card-footer">
          <span class="promise-pill ${promise.className}">${promise.label}</span>
          <span class="score-text">有望度スコア ${promise.score}</span>
        </div>
        <button class="detail-button" type="button" data-school-key="${escapeHtml(getSchoolKey(school))}">詳細を見る</button>
      </article>
    `;
  }).join("");

  document.querySelectorAll("[data-school-key]").forEach((button) => {
    button.addEventListener("click", () => {
      renderSchoolDetail(findSchoolByKey(button.dataset.schoolKey));
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
  if (countLabel) countLabel.textContent = formatNumber.format(count);
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
      <div class="detail-metric"><span>有望度</span><strong>${promise.score}</strong><small>${promise.label}</small></div>
      <div class="detail-metric"><span>見学率</span><strong>${percent(tourRate)}</strong><small>見学 / 接触</small></div>
      <div class="detail-metric"><span>内定率</span><strong>${percent(offerRate)}</strong><small>内定 / 接触</small></div>
      <div class="detail-metric"><span>関連学生</span><strong>${relatedStudents.length}</strong><small>個別管理シート連携</small></div>
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
      <strong>${formatNumber.format(item.value)}<span>${escapeHtml(item.unit || "名")}</span></strong>
      <small>${item.sub}</small>
    </button>
  `).join("");

  summaryGrid.querySelectorAll("[data-summary-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      activeStudentFilter = button.dataset.summaryFilter || "all";
      activeStudentDueFilter = button.dataset.summaryDue || "all";
      studentSearchQuery = "";
      studentListVisibleCount = 50;
      renderStudentList();
      document.getElementById("studentList")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
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

  const metrics = [
    { label: "有効な紐付け", value: lstepSummary.activeAccounts, unit: "件" },
    { label: "友だち", value: lstepSummary.friendAccounts, unit: "件" },
    { label: "未紐付けイベント", value: lstepSummary.unlinkedEvents, unit: "件" },
    { label: "未処理イベント", value: lstepSummary.unprocessedEvents, unit: "件" },
    { label: "直近メッセージ", value: lstepSummary.recentMessages, unit: "件" },
    { label: "最終同期", value: lastSyncedText, unit: "" }
  ];

  container.innerHTML = `
    <div class="lstep-status-header">
      <div>
        <p class="section-kicker">LSTEP Integration</p>
        <h3>LSTEP連携状況</h3>
        <p>${escapeHtml(lstepSummary.note || "LSTEP連携の準備状況を確認します。")}</p>
      </div>
      <span class="lstep-status-pill ${statusClass}">${escapeHtml(statusLabel)}</span>
    </div>
    <div class="lstep-status-grid">
      ${metrics.map((item) => `
        <article class="lstep-status-card">
          <span>${escapeHtml(item.label)}</span>
          <strong>${typeof item.value === "number" ? formatNumber.format(item.value) : escapeHtml(item.value)}${item.unit ? `<small>${escapeHtml(item.unit)}</small>` : ""}</strong>
        </article>
      `).join("")}
    </div>
  `;
}

function updateStudentUrgentTabBadge(summary) {
  const badge = document.getElementById("studentUrgentTabBadge");
  if (!badge) return;
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
      ${cohort.label}<span>${formatNumber.format(cohort.students.length)}</span>
    </button>
  `).join("");

  tabs.querySelectorAll("[data-student-cohort]").forEach((button) => {
    button.addEventListener("click", () => {
      activeStudentCohort = button.dataset.studentCohort;
      studentData = getActiveStudents();
      studentListVisibleCount = 50;
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
  resultStatus: ["未定", "合格", "不合格", "辞退"],
  offerStatus: ["未定", "内定", "承諾", "辞退"],
  expectedJoinStatus: ["未定", "入社予定", "入社済", "辞退"]
  ,
  managementStatus: ["有効", "管理対象外"]
};

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
  }).map((role) => String(role).trim()).filter(Boolean);
}

function canWriteActionFromDashboard(action = "edit") {
  if (!canWriteFromDashboard()) return false;
  const roleKeys = getHubRoleKeys();
  if (!roleKeys.length) return true;

  const adminRoles = ["super_admin", "talent_admin"];
  const editorRoles = ["super_admin", "talent_admin", "talent_editor"];
  const requiredRoles = action === "updateSettings" ? adminRoles : editorRoles;
  return roleKeys.some((roleKey) => requiredRoles.includes(roleKey));
}

function getTalentPermissionState() {
  const employee = getHubCurrentEmployee();
  const roleKeys = getHubRoleKeys().map((roleKey) => String(roleKey).trim()).filter(Boolean);

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
  return [
    `学生データを${action}します。`,
    "",
    `氏名：${payload.name || "未入力"}`,
    `学校：${payload.school || "未入力"}`,
    `区分：${getActiveCohortLabel()}`,
    `管理状態：${payload.managementStatus}`,
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
          <input name="appName" value="${escapeHtml(dashboardConfig.appName || "NOV Talent")}" placeholder="NOV Talent">
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
  return {
    sheetName: getActiveSheetName(),
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
    offerStatus: String(formData.get("offerStatus") || "未定"),
    expectedJoinStatus: String(formData.get("expectedJoinStatus") || "未定"),
    owner: String(formData.get("owner") || "総務人事").trim(),
    nextAction: String(formData.get("nextAction") || "").trim(),
    nextActionDate: String(formData.get("nextActionDate") || ""),
    memo: String(formData.get("memo") || "").trim(),
    managementStatus: String(formData.get("managementStatus") || "有効")
  };
}

function normalizeForDuplicateCheck(value) {
  return String(value || "")
    .normalize("NFKC")
    .replace(/[\s\u3000\u200B-\u200D\uFEFF]+/g, "")
    .toLowerCase()
    .trim();
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
  if ((payload.offerStatus === "内定" || payload.offerStatus === "承諾") && payload.interviewStatus !== "実施済") {
    errors.push("内定・承諾にする場合は、面接ステータスを「実施済」にしてください。");
  }
  if ((payload.expectedJoinStatus === "入社予定" || payload.expectedJoinStatus === "入社済") && !["内定", "承諾"].includes(payload.offerStatus)) {
    errors.push("入社予定・入社済にする場合は、内定ステータスを「内定」または「承諾」にしてください。");
  }
  if (payload.resultStatus === "不合格" && ["内定", "承諾"].includes(payload.offerStatus)) {
    errors.push("選考結果が不合格の場合、内定ステータスは「未定」または「辞退」にしてください。");
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

function renderStudentForm(student = {}, mode = "update") {
  const isAdd = mode === "add";
  const disabled = isActiveCohortEditable() ? "" : "disabled";
  const submitText = isAdd ? "学生を追加" : "更新を保存";

  return `
    <form class="student-edit-form" data-student-form="${mode}">
      <input type="hidden" name="studentId" value="${escapeHtml(student.studentId || "")}">
      <div class="student-form-heading">
        <div>
          <h3>${isAdd ? "学生を追加" : "ステータスを更新"}</h3>
          <p>${escapeHtml(getActiveCohortLabel())} / ${escapeHtml(getActiveSheetName())}</p>
        </div>
      </div>
      <div class="student-form-guide">
        <strong>入力のポイント</strong>
        <ul>
          <li>氏名と学校名は重複チェックに使います。正式名称で入力してください。</li>
          <li>見学予定・面接予定にする場合は、次アクション日も入力してください。</li>
          <li>誤登録や対象外は削除せず、管理状態を「管理対象外」にします。</li>
        </ul>
      </div>
      ${renderOperatorNotice()}
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
        ${renderSelectField("lineStatus", "LINE登録", studentSelectOptions.lineStatus, student.lineStatus || "未登録", disabled)}
        ${renderSelectField("salonTourStatus", "見学ステータス", studentSelectOptions.salonTourStatus, student.salonTourStatus || "未設定", disabled)}
        ${renderSelectField("interviewStatus", "面接ステータス", studentSelectOptions.interviewStatus, student.interviewStatus || "未設定", disabled)}
        ${renderSelectField("resultStatus", "選考結果", studentSelectOptions.resultStatus, student.resultStatus || "未定", disabled)}
        ${renderSelectField("offerStatus", "内定ステータス", studentSelectOptions.offerStatus, student.offerStatus || "未定", disabled)}
        ${renderSelectField("expectedJoinStatus", "入社予定", studentSelectOptions.expectedJoinStatus, student.expectedJoinStatus || "未定", disabled)}
        ${renderSelectField("managementStatus", "管理状態", studentSelectOptions.managementStatus, student.managementStatus || "有効", disabled)}
        <label>
          <span>担当者</span>
          <input name="owner" value="${escapeHtml(student.owner || "総務人事")}" ${disabled}>
        </label>
        <label>
          <span>次アクション日</span>
          <input name="nextActionDate" type="date" value="${escapeHtml(student.nextActionDate || "")}" ${disabled}>
        </label>
      </div>
      <label class="student-form-full">
        <span>次アクション</span>
        <input name="nextAction" value="${escapeHtml(student.nextAction || "")}" placeholder="例：見学前リマインド" ${disabled}>
      </label>
      <label class="student-form-full">
        <span>メモ</span>
        <textarea name="memo" rows="3" ${disabled}>${escapeHtml(student.memo || "")}</textarea>
      </label>
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
        ${renderFollowupCompleteButton(item)}
      </div>
    </article>
  `).join("");

  setupFollowupCompleteButtons(document.getElementById("studentActionList"));
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
        ${filter.label}<span>${count}</span>
      </button>
    `;
  }).join("");

  filterWrap.querySelectorAll("[data-student-due-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      activeStudentDueFilter = button.dataset.studentDueFilter;
      studentListVisibleCount = 50;
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
        ${filter.label}<span>${count}</span>
      </button>
    `;
  }).join("");

  filterWrap.querySelectorAll("[data-student-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      activeStudentFilter = button.dataset.studentFilter;
      studentListVisibleCount = 50;
      renderStudentList();
    });
  });
}

function getStudentSortOptions() {
  return [
    { key: "priority", label: "対応優先順" },
    { key: "updated", label: "更新が新しい順" },
    { key: "name", label: "氏名順" },
    { key: "school", label: "学校名順" },
    { key: "offer", label: "内定・入社予定順" }
  ];
}

function normalizeStudentSearchText(value) {
  return String(value || "").toLowerCase().replace(/\\s+/g, "");
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
    studentListVisibleCount = 50;
    renderStudentList();
  };

  if (sortSelect) {
    sortSelect.innerHTML = getStudentSortOptions().map((option) => `
      <option value="${escapeHtml(option.key)}" ${option.key === activeStudentSort ? "selected" : ""}>${escapeHtml(option.label)}</option>
    `).join("");
    sortSelect.onchange = () => {
      activeStudentSort = sortSelect.value;
      studentListVisibleCount = 50;
      renderStudentList();
    };
  }

  if (resetButton) {
    const hasCondition = activeStudentFilter !== "all" || activeStudentDueFilter !== "all" || activeStudentSort !== "priority" || Boolean(studentSearchQuery.trim());
    resetButton.disabled = !hasCondition;
    resetButton.onclick = () => {
      activeStudentFilter = "all";
      activeStudentDueFilter = "all";
      activeStudentSort = "priority";
      studentSearchQuery = "";
      studentListVisibleCount = 50;
      renderStudentList();
      input.focus();
    };
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
  return `
    <div class="quality-related-list" aria-label="関連する学生ID">
      <strong>関連する学生</strong>
      ${sortedStudents.map((student) => {
        const audit = getDuplicateStudentAuditLabel(student, bestScore);
        const showExcludeButton = canQuickExcludeDuplicateStudent(student, audit);
        return `
        <div class="quality-related-student ${audit.className}">
          <button class="quality-related-open" type="button" data-quality-related-student-id="${escapeHtml(student.studentId)}">
            <b>${escapeHtml(student.studentId)}</b>
            <em>${escapeHtml(student.cohort)}</em>
            <span class="quality-related-audit-label">${escapeHtml(audit.label)}</span>
            <small>内定:${escapeHtml(student.offerStatus)} / 入社:${escapeHtml(student.expectedJoinStatus)} / ${escapeHtml(student.managementStatus)}</small>
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
    if (countLabel) countLabel.textContent = formatNumber.format(filteredIssues.length);
    exportButton.onclick = downloadDataQualityCsv;
  }

  const duplicateRows = getDataQualityDuplicateCandidateRows(filteredIssues);
  if (duplicateExportButton) {
    duplicateExportButton.disabled = duplicateRows.length === 0;
    const countLabel = duplicateExportButton.querySelector("span");
    if (countLabel) countLabel.textContent = formatNumber.format(duplicateRows.length);
    duplicateExportButton.onclick = downloadDataQualityDuplicateCandidateCsv;
  }

  if (removeCandidateExportButton) {
    removeCandidateExportButton.disabled = removeCandidateRows.length === 0;
    const countLabel = removeCandidateExportButton.querySelector("span");
    if (countLabel) countLabel.textContent = formatNumber.format(removeCandidateRows.length);
    removeCandidateExportButton.onclick = downloadDataQualityRemoveCandidateCsv;
  }

  if (summaryContainer) {
    const duplicateIssueCount = issues.filter((issue) => issue.type === "重複候補").length;
    const removeCandidateTotal = getDataQualityRemoveCandidateRows(issues).length;
    summaryContainer.innerHTML = `
      <div class="operation-log-summary-card ${issues.length ? "is-warning" : "is-linked"}">
        <span>品質チェック件数</span>
        <strong>${formatNumber.format(issues.length)}</strong>
        <small>${escapeHtml(getActiveCohortLabel())} の確認対象</small>
      </div>
      <div class="operation-log-summary-card ${summary["要修正"] ? "is-warning" : "is-linked"}">
        <span>要修正</span>
        <strong>${formatNumber.format(summary["要修正"] || 0)}</strong>
        <small>保存前に直したい項目</small>
      </div>
      <div class="operation-log-summary-card">
        <span>注意</span>
        <strong>${formatNumber.format(summary["注意"] || 0)}</strong>
        <small>運用確認が必要</small>
      </div>
      <div class="operation-log-summary-card">
        <span>確認</span>
        <strong>${formatNumber.format(summary["確認"] || 0)}</strong>
        <small>精度向上の補足項目</small>
      </div>
      <div class="operation-log-summary-card ${duplicateIssueCount ? "is-warning" : "is-linked"}">
        <span>重複候補</span>
        <strong>${formatNumber.format(duplicateIssueCount)}</strong>
        <small>同姓同校の確認対象</small>
      </div>
      <div class="operation-log-summary-card ${removeCandidateTotal ? "is-warning" : "is-linked"}">
        <span>対象外候補</span>
        <strong>${formatNumber.format(removeCandidateTotal)}</strong>
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
        <span class="priority-pill ${issue.severity === "要修正" ? "priority-high" : issue.severity === "注意" ? "priority-middle" : "priority-low"}">${escapeHtml(issue.severity)}</span>
        <h3>${escapeHtml(issue.type)}</h3>
        <p>${escapeHtml(issue.detail)}</p>
        <small>${escapeHtml(issue.action)}</small>
        ${renderQualityIssueExtra(issue)}
        <small class="quality-edit-hint">クリックして学生詳細を編集</small>
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
  return `
    <div class="student-table-status">
      <span>LINE ${escapeHtml(student.lineStatus || "未設定")}</span>
      <span>見学 ${escapeHtml(student.salonTourStatus || "未設定")}</span>
      <span>面接 ${escapeHtml(student.interviewStatus || "未設定")}</span>
      <span>内定 ${escapeHtml(student.offerStatus || "未定")}</span>
      ${renderStudentLstepStatusChip(student)}
    </div>
  `;
}

function renderStudentListTable(students) {
  const visibleStudents = students.slice(0, studentListVisibleCount);
  const hasMore = students.length > visibleStudents.length;

  return `
    <div class="student-table-wrap">
      <table class="student-table">
        <thead>
          <tr>
            <th>学生</th>
            <th>学校・接点</th>
            <th>進捗</th>
            <th>次アクション</th>
            <th>担当</th>
            <th>管理</th>
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
                </td>
                <td>
                  <strong>${escapeHtml(student.school || "学校未設定")}</strong>
                  <small>${escapeHtml(student.source || "接点未設定")}</small>
                </td>
                <td>${renderStudentTableStatus(student)}</td>
                <td>
                  <span>${escapeHtml(primaryAction?.dueDate || "日程未設定")}</span>
                  ${primaryAction ? renderActionBadge(primaryAction) : ""}
                  <strong>${escapeHtml(primaryAction?.title || "次アクション未設定")}</strong>
                  <small>${escapeHtml(primaryAction?.sourceLabel || "学生管理")}</small>
                  ${primaryAction ? renderFollowupCompleteButton(primaryAction) : ""}
                </td>
                <td>${escapeHtml(student.owner || "未設定")}</td>
                <td>${escapeHtml(student.managementStatus || "有効")}</td>
              </tr>
            `;
          }).join("")}
        </tbody>
      </table>
    </div>
    ${hasMore ? `
      <div class="student-list-more">
        <span>${formatNumber.format(visibleStudents.length)} / ${formatNumber.format(students.length)}名を表示中</span>
        <button class="detail-button compact" type="button" id="studentShowMoreButton">さらに50件表示</button>
      </div>
    ` : `
      <div class="student-list-more">
        <span>${formatNumber.format(students.length)}名を表示中</span>
      </div>
    `}
  `;
}

function renderStudentList(activeKey = activeStudentFilter) {
  renderStudentFilters(activeStudentFilter);
  renderStudentSearchControls();
  renderStudentDueFilters(activeStudentDueFilter);

  const { activeFilter, activeDueFilter, students } = getFilteredStudentList(activeKey);

  document.getElementById("studentFilterCount").innerHTML = `
    <strong>${escapeHtml(getActiveCohortLabel())}：${formatNumber.format(students.length)}名</strong>
    ${renderStudentConditionChips(activeFilter, activeDueFilter)}
  `;
  setupStudentCsvExport(students.length);
  setupLstepUnlinkedCsvExport();

  if (students.length === 0) {
    document.getElementById("studentList").innerHTML = `
      <div class="student-empty">該当する学生はいません。</div>
    `;
    return;
  }

  document.getElementById("studentList").innerHTML = renderStudentListTable(students);

  setupFollowupCompleteButtons(document.getElementById("studentList"));

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
      <span class="priority-pill ${priority.className}">${escapeHtml(priority.label)}</span>
    </div>
    <div class="modal-status-grid">
      <div><span>接点</span><strong>${escapeHtml(student.source || "未設定")}</strong></div>
      <div><span>接触日</span><strong>${escapeHtml(student.contactDate || "未設定")}</strong></div>
      <div><span>性別</span><strong>${escapeHtml(student.gender || "未設定")}</strong></div>
      <div><span>担当</span><strong>${escapeHtml(student.owner || "未設定")}</strong></div>
      <div><span>学生ID</span><strong>${escapeHtml(student.studentId || "未設定")}</strong></div>
      <div><span>管理状態</span><strong>${escapeHtml(student.managementStatus || "有効")}</strong></div>
      <div><span>最終更新</span><strong>${escapeHtml(student.updatedAt || "未記録")}</strong></div>
      <div><span>更新者</span><strong>${escapeHtml(student.updatedBy || "未記録")}</strong></div>
    </div>
    <div class="modal-progress">
      ${[
        ["LINE", student.lineStatus],
        ["見学", student.salonTourStatus],
        ["面接", student.interviewStatus],
        ["結果", student.resultStatus],
        ["内定", student.offerStatus],
        ["入社予定", student.expectedJoinStatus]
      ].map(([label, value]) => `
        <div class="progress-chip">
          <span>${escapeHtml(label)}</span>
          <strong>${escapeHtml(value || "未設定")}</strong>
        </div>
      `).join("")}
    </div>
    ${renderStudentLstepDetail(student)}
    <div class="modal-next-action">
      <span>次アクション</span>
      <strong>${escapeHtml(student.nextAction || "次アクション未設定")}</strong>
      <p>${escapeHtml(student.nextActionDate || "日付未設定")}</p>
    </div>
    <div class="modal-memo">
      <span>メモ</span>
      <p>${escapeHtml(student.memo || "メモはまだありません。")}</p>
    </div>
    ${renderStudentOperationLogSection(student)}
    ${renderStudentFollowupSection(student)}
    ${renderStudentForm(student, "update")}
  `;

  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  setupRenderedStudentForm();
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
      <strong>${formatNumber.format(operationLogs.length)}</strong>
      <small>最大30件を表示</small>
    </div>
    <div class="operation-log-summary-card ${inactiveCount ? "is-warning" : "is-linked"}">
      <span>管理対象外化</span>
      <strong>${formatNumber.format(inactiveCount)}</strong>
      <small>重複整理・対象外処理</small>
    </div>
    <div class="operation-log-summary-card ${deniedCount ? "is-danger" : "is-linked"}">
      <span>拒否ログ</span>
      <strong>${formatNumber.format(deniedCount)}</strong>
      <small>${deniedCount ? "権限・入力エラーを確認" : "拒否なし"}</small>
    </div>
    <div class="operation-log-summary-card ${missingCount ? "is-warning" : "is-linked"}">
      <span>HUB社員IDなし</span>
      <strong>${formatNumber.format(missingCount)}</strong>
      <small>${missingCount ? "直開き・検証保存の可能性" : "問題なし"}</small>
    </div>
  `;
}

function updateOperationLogTabBadge(missingCount) {
  const badge = document.getElementById("operationLogTabBadge");
  if (!badge) return;
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

function renderDashboard(isConnected) {
  updateDataSourceStatus(isConnected);
  renderHubContextBadge();
  renderHubDiagnostics();
  document.getElementById("appTitle").textContent = dashboardConfig.appName;
  document.title = dashboardConfig.appName;

  const metrics = buildMetrics();
  renderKpis(metrics);
  renderDecisionSummary(metrics);
  renderFunnel(metrics);
  renderFairTable();
  renderSchools();
  generateActionCards();
  renderStudentCohortTabs();
  renderStudentEditControls();
  renderStudentSummary();
  renderLstepIntegrationStatus();
  renderStudentActions();
  renderStudentList();
  renderDataQuality();
  renderOperationLogs();
}

async function refreshDashboardData() {
  const refreshButton = document.getElementById("dataRefreshButton");

  if (refreshButton) {
    refreshButton.disabled = true;
    refreshButton.textContent = "更新中...";
  }

  const isConnected = await fetchDashboardData();
  renderDashboard(isConnected);

  if (refreshButton) {
    refreshButton.disabled = false;
    refreshButton.textContent = "データ更新";
  }
}

function setupTabs() {
  const tabs = Array.from(document.querySelectorAll(".dashboard-tab"));
  const views = Array.from(document.querySelectorAll(".dashboard-view"));

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const targetView = tab.dataset.view;

      tabs.forEach((item) => {
        item.classList.toggle("active", item === tab);
      });

      views.forEach((view) => {
        view.classList.toggle("view-hidden", view.dataset.view !== targetView);
      });
    });
  });
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

function updateDataSourceStatus(isConnected) {
  const badge = document.querySelector(".header-badge");
  const footerStatus = document.getElementById("footerStatus");
  const status = isConnected
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
  await refreshDashboardData();
}

document.addEventListener("DOMContentLoaded", initDashboard);

