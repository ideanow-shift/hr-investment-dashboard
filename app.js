const GAS_API_URL = "https://script.google.com/macros/s/AKfycbx0X9DvO6zydd8txe_Mgme1COTfltp7ZxueJyrIPQsJSwWCvbVrM2otmlgarPTDmU5iWg/exec";

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
let studentSummary = buildStudentSummary(studentData);

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

  return loadJsonp(GAS_API_URL, { action, ...getHubOperatorParams(), ...params });
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

  studentSummary = buildStudentSummary(getActiveStudents());
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
    followups: Array.isArray(student.followups) ? student.followups.map(normalizeFollowup) : []
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
    updatedAt: String(followup.updatedAt || "")
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
  if (!target) return { label: "日程未設定", className: "urgency-unscheduled" };
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  target.setHours(0, 0, 0, 0);
  const diffDays = Math.round((target - today) / 86400000);
  if (diffDays < 0) return { label: `${Math.abs(diffDays)}日超過`, className: "urgency-overdue" };
  if (diffDays === 0) return { label: "今日対応", className: "urgency-today" };
  if (diffDays <= 3) return { label: `${diffDays}日以内`, className: "urgency-soon" };
  return { label: "予定", className: "urgency-normal" };
}

function renderUrgencyBadge(dueDate) {
  const urgency = getActionUrgency(dueDate);
  return `<em class="urgency-badge ${urgency.className}">${escapeHtml(urgency.label)}</em>`;
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
      isFollowup: true
    });
  });

  return items;
}

function getPrimaryStudentAction(student) {
  const items = getStudentActionItems(student).sort((a, b) => {
    const dateCompare = getActionSortDate(a.dueDate).localeCompare(getActionSortDate(b.dueDate));
    if (dateCompare !== 0) return dateCompare;
    return Number(b.isFollowup) - Number(a.isFollowup);
  });
  return items[0] || null;
}

function buildStudentSummary(students) {
  return students.reduce((summary, student) => {
    if ((student.nextAction && !student.nextActionDate) || hasOpenFollowup(student)) summary.needsFollowUp += 1;
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
        <button class="refresh-button" type="submit">${isAdd ? "フェアを追加" : "更新を保存"}</button>
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
  document.getElementById("schoolGrid").innerHTML = schoolData.map((school) => {
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

  renderSchoolDetail([...schoolData].sort((a, b) => getSchoolPromise(b).score - getSchoolPromise(a).score)[0]);
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
  const normalizedName = payload.name.replace(/\s+/g, "");
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
        <button class="refresh-button" type="submit">${isAdd ? "学校を追加" : "更新を保存"}</button>
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

function generateActionCards() {
  const fairInsights = fairData.map((fair) => {
    const tourRate = safeDivide(fair.salonTours, fair.contacts);
    const lineRate = safeDivide(fair.lineRegistrations, fair.contacts);
    return { ...fair, tourRate, lineRate, rank: getFairRank(tourRate) };
  });

  const highLineLowTour = fairInsights.find((fair) => fair.lineRate >= 0.8 && fair.tourRate < 0.15);
  const bestFair = [...fairInsights].sort((a, b) => b.tourRate - a.tourRate)[0];
  const costlyLowResult = [...fairInsights].sort((a, b) => b.cost - a.cost).find((fair) => fair.salonTours === 0 || fair.rank.rank === "C" || fair.rank.rank === "D");
  const topSchool = [...schoolData].sort((a, b) => getSchoolPromise(b).score - getSchoolPromise(a).score)[0];

  const actions = [
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

  document.getElementById("actionCards").innerHTML = actions.map((action, index) => `
    <article class="action-card">
      <strong>${index + 1}. ${action.title}</strong>
      <p>${action.body}</p>
    </article>
  `).join("");
}

function renderStudentSummary() {
  studentSummary = buildStudentSummary(getManagedStudents());
  const summaryItems = [
    { label: "要フォロー", value: studentSummary.needsFollowUp || 0, sub: "未対応・対応中フォロー" },
    { label: "見学予定者", value: studentSummary.salonTourScheduled || 0, sub: "サロン見学につなげる学生" },
    { label: "面接予定者", value: studentSummary.interviewScheduled || 0, sub: "選考フォロー対象" },
    { label: "内定者", value: studentSummary.offered || 0, sub: "内定後フォロー対象" },
    { label: "入社予定者", value: studentSummary.expectedJoiners || 0, sub: "入社準備フォロー対象" },
    { label: "男性", value: studentSummary.male || 0, sub: "学生管理の性別区分" },
    { label: "女性", value: studentSummary.female || 0, sub: "学生管理の性別区分" }
  ];

  document.getElementById("studentSummaryGrid").innerHTML = summaryItems.map((item) => `
    <article class="student-summary-card">
      <p>${item.label}</p>
      <strong>${formatNumber.format(item.value)}<span>名</span></strong>
      <small>${item.sub}</small>
    </article>
  `).join("");
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
      renderStudentSummary();
      renderStudentActions();
      renderStudentList();
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
  const sheetName = getActiveSheetName();

  if (addButton) {
    addButton.disabled = !editable;
    addButton.textContent = editable ? "学生追加" : "全件参考は編集不可";
  }

  if (editNote) {
    editNote.textContent = editable
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
        <button class="refresh-button" type="submit">目標を保存</button>
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

function getStudentValidationErrors(payload, mode) {
  const errors = [];
  const students = getActiveStudents();
  const normalizedName = payload.name.replace(/\s+/g, "");
  const normalizedSchool = payload.school.replace(/\s+/g, "");
  const duplicate = students.find((student) => {
    if (mode !== "add" && student.studentId === payload.studentId) return false;
    return student.name.replace(/\s+/g, "") === normalizedName
      && student.school.replace(/\s+/g, "") === normalizedSchool;
  });

  if (!payload.name) errors.push("氏名を入力してください。");
  if (!payload.school) errors.push("学校名を入力してください。");
  if (mode === "add" && duplicate) {
    errors.push(`同じ氏名・学校名の学生が既にいます：${duplicate.studentId}`);
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
            ${followup.id ? `
              <form class="followup-status-form" data-followup-status-form>
                <input type="hidden" name="followupId" value="${escapeHtml(followup.id)}">
                <select name="status" ${isActiveCohortEditable() ? "" : "disabled"}>
                  ${["未対応", "対応中", "完了", "不要"].map((status) => `<option value="${status}" ${status === followup.status ? "selected" : ""}>${status}</option>`).join("")}
                </select>
                <button class="detail-button compact" type="submit" ${isActiveCohortEditable() ? "" : "disabled"}>状態更新</button>
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
        <button class="refresh-button" type="submit" ${disabled}>履歴を追加</button>
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
        <button class="refresh-button" type="submit" ${disabled}>${submitText}</button>
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
        ${renderUrgencyBadge(item.dueDate)}
        <b>${escapeHtml(item.title)}</b>
        <small>${escapeHtml(item.status)}</small>
      </div>
    </article>
  `).join("");
}

function getStudentFilters() {
  return [
    { key: "all", label: "すべて", predicate: () => true },
    { key: "needsFollowUp", label: "要フォロー", predicate: (student) => (student.nextAction && !student.nextActionDate) || hasOpenFollowup(student) },
    { key: "salonTour", label: "見学予定", predicate: (student) => student.salonTourStatus === "予定" },
    { key: "interview", label: "面接予定", predicate: (student) => student.interviewStatus === "予定" },
    { key: "offered", label: "内定", predicate: (student) => student.offerStatus === "内定" },
    { key: "expectedJoin", label: "入社予定", predicate: (student) => student.expectedJoinStatus === "入社予定" },
    { key: "inactive", label: "管理対象外", predicate: (student) => student.managementStatus === "管理対象外" },
    { key: "male", label: "男性", predicate: (student) => student.gender === "男性" },
    { key: "female", label: "女性", predicate: (student) => student.gender === "女性" }
  ];
}

function renderStudentFilters(activeKey = "all") {
  const filters = getStudentFilters();
  const filterWrap = document.getElementById("studentFilters");

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
      renderStudentList(button.dataset.studentFilter);
    });
  });
}

function getStudentPriority(student) {
  if ((student.nextAction && !student.nextActionDate) || hasOpenFollowup(student)) return { label: "要フォロー", className: "priority-high" };
  if (student.salonTourStatus === "予定" || student.interviewStatus === "予定") return { label: "予定フォロー", className: "priority-middle" };
  if (student.offerStatus === "内定" || student.expectedJoinStatus === "入社予定") return { label: "内定後フォロー", className: "priority-good" };
  return { label: "通常フォロー", className: "priority-low" };
}

function renderStudentList(activeKey = "all") {
  renderStudentFilters(activeKey);

  const filters = getStudentFilters();
  const activeFilter = filters.find((filter) => filter.key === activeKey) || filters[0];
  const sourceStudents = activeKey === "inactive" ? getActiveStudents() : getManagedStudents();
  const students = sourceStudents
    .filter(activeFilter.predicate)
    .sort((a, b) => {
      const aAction = getPrimaryStudentAction(a);
      const bAction = getPrimaryStudentAction(b);
      return getActionSortDate(aAction?.dueDate).localeCompare(getActionSortDate(bAction?.dueDate));
    });

  document.getElementById("studentFilterCount").textContent = `${getActiveCohortLabel()} / ${activeFilter.label}：${students.length}名`;

  if (students.length === 0) {
    document.getElementById("studentList").innerHTML = `
      <div class="student-empty">該当する学生はいません。</div>
    `;
    return;
  }

  document.getElementById("studentList").innerHTML = students.map((student) => {
    const priority = getStudentPriority(student);
    const primaryAction = getPrimaryStudentAction(student);

    return `
      <article class="student-card" data-student-id="${student.studentId}">
        <div class="student-card-main">
          <div>
            <span class="priority-pill ${priority.className}">${priority.label}</span>
            <h3>${student.name || "氏名未設定"}</h3>
            <p>${student.school || "学校未設定"} / ${student.grade || "学年未設定"} / ${student.gender || "性別未設定"}</p>
          </div>
          <div class="student-card-status">
            <span>LINE：${student.lineStatus || "未設定"}</span>
            <span>見学：${student.salonTourStatus || "未設定"}</span>
            <span>面接：${student.interviewStatus || "未設定"}</span>
            <span>内定：${student.offerStatus || "未定"}</span>
            <span>管理：${student.managementStatus || "有効"}</span>
          </div>
        </div>
        <div class="student-next-action">
          <span>${escapeHtml(primaryAction?.dueDate || "日付未設定")}</span>
          ${primaryAction ? renderUrgencyBadge(primaryAction.dueDate) : ""}
          <strong>${escapeHtml(primaryAction?.title || "次アクション未設定")}</strong>
          <small>${escapeHtml(primaryAction?.sourceLabel || student.source || "接点未設定")} / 担当：${escapeHtml(student.owner || "未設定")}</small>
        </div>
      </article>
    `;
  }).join("");

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
    <div class="modal-next-action">
      <span>次アクション</span>
      <strong>${escapeHtml(student.nextAction || "次アクション未設定")}</strong>
      <p>${escapeHtml(student.nextActionDate || "日付未設定")}</p>
    </div>
    <div class="modal-memo">
      <span>メモ</span>
      <p>${escapeHtml(student.memo || "メモはまだありません。")}</p>
    </div>
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

function renderDashboard(isConnected) {
  updateDataSourceStatus(isConnected);
  renderHubContextBadge();
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
  renderStudentActions();
  renderStudentList();
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

function getHubCurrentEmployee() {
  return window.novHub?.currentEmployee || window.NOV_HUB_CURRENT_EMPLOYEE || null;
}

function getHubOperatorParams() {
  const employee = getHubCurrentEmployee();
  if (!employee || typeof employee !== "object") return {};

  const displayName = employee.displayName || employee.name || employee.fullName || employee.employeeName || "";
  return {
    operatorEmployeeId: employee.id || "",
    operatorEmployeeCode: employee.employee_id || employee.employeeId || employee.employeeCode || employee.staffCode || "",
    operatorName: displayName,
    operatorDepartmentName: employee.departmentName || "",
    operatorPositionName: employee.positionName || ""
  };
}

function renderHubContextBadge() {
  const badge = document.getElementById("hubContextBadge");
  if (!badge) return;
  const employee = getHubCurrentEmployee();
  if (!employee) {
    badge.hidden = true;
    badge.textContent = "";
    return;
  }

  const displayName = employee.displayName || employee.name || employee.fullName || employee.employeeName || "ログイン中";
  const roleName = employee.roleName || employee.positionName || employee.departmentName || "HUB";
  badge.hidden = false;
  badge.innerHTML = `<span>HUB</span><strong>${escapeHtml(displayName)}</strong><small>${escapeHtml(roleName)}</small>`;
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
  setupDataRefresh();
  await refreshDashboardData();
}

document.addEventListener("DOMContentLoaded", initDashboard);









