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

  return loadJsonp(GAS_API_URL, { action, ...params });
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
      expectedJoiners: Number(data.config.expectedJoiners) || 0
    };
  }

  if (Array.isArray(data.fairs)) {
    fairData = data.fairs.map((fair) => ({
      name: String(fair.name || ""),
      date: String(fair.date || ""),
      cost: Number(fair.cost) || 0,
      contacts: Number(fair.contacts) || 0,
      lineRegistrations: Number(fair.lineRegistrations) || 0,
      salonTours: Number(fair.salonTours) || 0
    }));
  }

  if (Array.isArray(data.schools)) {
    schoolData = data.schools.map((school) => ({
      name: String(school.name || ""),
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
    updatedBy: String(student.updatedBy || "")
  };
}

function getActiveStudents() {
  const activeCohort = studentCohorts.find((cohort) => cohort.key === activeStudentCohort) || studentCohorts[0];
  return activeCohort ? activeCohort.students : studentData;
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
  return getActiveSheetName() !== "学生管理_全件参考";
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

function renderFairTable() {
  const rankedFairs = getRankedFairs();

  document.getElementById("fairTableBody").innerHTML = rankedFairs.map((fair) => `
    <tr>
      <td><span class="rank-pill ${fair.rank.className}">${fair.rank.rank}</span> ${fair.rank.label}</td>
      <td><button class="detail-link" type="button" data-fair-name="${fair.name}">${fair.name}</button></td>
      <td>${fair.date}</td>
      <td>${formatCurrency.format(fair.cost)}</td>
      <td>${formatNumber.format(fair.contacts)}</td>
      <td>${formatNumber.format(fair.lineRegistrations)} <span class="muted">(${percent(fair.lineRate)})</span></td>
      <td>${formatNumber.format(fair.salonTours)}</td>
      <td>${percent(fair.tourRate)}</td>
      <td>${formatCurrency.format(fair.contactCost)}</td>
      <td>${fair.salonTours ? formatCurrency.format(fair.tourCost) : "未取得"}</td>
    </tr>
  `).join("");

  document.querySelectorAll("[data-fair-name]").forEach((button) => {
    button.addEventListener("click", () => {
      const selectedFair = rankedFairs.find((fair) => fair.name === button.dataset.fairName);
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
    <div>
      <p class="section-kicker">Fair Drilldown</p>
      <h3>${fair.name}</h3>
      <p class="detail-lead">${investmentDecision}</p>
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
        <p>${student.name} / ${student.school} / ${student.nextAction || "次アクション未設定"}</p>
      `).join("") : "<p>このフェアに紐づく学生データはまだありません。</p>"}
    </div>
  `;
}

function renderSchools() {
  document.getElementById("schoolGrid").innerHTML = schoolData.map((school) => {
    const promise = getSchoolPromise(school);

    return `
      <article class="school-card">
        <h3>${school.name}</h3>
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
        <button class="detail-button" type="button" data-school-name="${school.name}">詳細を見る</button>
      </article>
    `;
  }).join("");

  document.querySelectorAll("[data-school-name]").forEach((button) => {
    button.addEventListener("click", () => {
      const selectedSchool = schoolData.find((school) => school.name === button.dataset.schoolName);
      renderSchoolDetail(selectedSchool);
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
    <div>
      <p class="section-kicker">School Drilldown</p>
      <h3>${school.name}</h3>
      <p class="detail-lead">有望度は「${promise.label}」です。見学・面接・内定につながる接点を優先して、学校訪問や先生との関係づくりを判断します。</p>
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
        <p>${student.name} / ${student.grade} / ${student.nextAction || "次アクション未設定"}</p>
      `).join("") : "<p>この学校に紐づく学生データはまだありません。</p>"}
    </div>
  `;
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
  studentSummary = buildStudentSummary(getActiveStudents());
  const summaryItems = [
    { label: "要フォロー", value: studentSummary.needsFollowUp || 0, sub: "次アクション日未設定" },
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
    memo: String(formData.get("memo") || "").trim()
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
      <div class="student-form-grid">
        <label>
          <span>氏名</span>
          <input name="name" value="${escapeHtml(student.name || "")}" placeholder="例：山田 花" ${isAdd ? "required" : ""} ${disabled}>
        </label>
        ${renderSelectField("gender", "性別", studentSelectOptions.gender, student.gender || "未回答", disabled)}
        <label>
          <span>学校名</span>
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
  const actionStudents = getActiveStudents()
    .filter((student) => student.nextAction)
    .sort((a, b) => {
      if (!a.nextActionDate) return 1;
      if (!b.nextActionDate) return -1;
      return a.nextActionDate.localeCompare(b.nextActionDate);
    })
    .slice(0, 8);

  if (actionStudents.length === 0) {
    document.getElementById("studentActionList").innerHTML = `
      <div class="student-empty">次アクションが登録されている学生はいません。</div>
    `;
    return;
  }

  document.getElementById("studentActionList").innerHTML = actionStudents.map((student) => `
    <article class="student-action-item">
      <div>
        <strong>${student.name}</strong>
        <p>${student.school} / ${student.source}</p>
      </div>
      <div class="student-action-meta">
        <span>${student.nextActionDate || "日付未設定"}</span>
        <b>${student.nextAction}</b>
      </div>
    </article>
  `).join("");
}

function getStudentFilters() {
  return [
    { key: "all", label: "すべて", predicate: () => true },
    { key: "needsFollowUp", label: "要フォロー", predicate: (student) => student.nextAction && !student.nextActionDate },
    { key: "salonTour", label: "見学予定", predicate: (student) => student.salonTourStatus === "予定" },
    { key: "interview", label: "面接予定", predicate: (student) => student.interviewStatus === "予定" },
    { key: "offered", label: "内定", predicate: (student) => student.offerStatus === "内定" },
    { key: "expectedJoin", label: "入社予定", predicate: (student) => student.expectedJoinStatus === "入社予定" },
    { key: "male", label: "男性", predicate: (student) => student.gender === "男性" },
    { key: "female", label: "女性", predicate: (student) => student.gender === "女性" }
  ];
}

function renderStudentFilters(activeKey = "all") {
  const filters = getStudentFilters();
  const filterWrap = document.getElementById("studentFilters");

  filterWrap.innerHTML = filters.map((filter) => {
    const count = getActiveStudents().filter(filter.predicate).length;
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
  if (student.nextAction && !student.nextActionDate) return { label: "要日程設定", className: "priority-high" };
  if (student.salonTourStatus === "予定" || student.interviewStatus === "予定") return { label: "予定フォロー", className: "priority-middle" };
  if (student.offerStatus === "内定" || student.expectedJoinStatus === "入社予定") return { label: "内定後フォロー", className: "priority-good" };
  return { label: "通常フォロー", className: "priority-low" };
}

function renderStudentList(activeKey = "all") {
  renderStudentFilters(activeKey);

  const filters = getStudentFilters();
  const activeFilter = filters.find((filter) => filter.key === activeKey) || filters[0];
  const students = getActiveStudents()
    .filter(activeFilter.predicate)
    .sort((a, b) => {
      if (!a.nextActionDate && b.nextActionDate) return 1;
      if (a.nextActionDate && !b.nextActionDate) return -1;
      return (a.nextActionDate || "9999-12-31").localeCompare(b.nextActionDate || "9999-12-31");
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
          </div>
        </div>
        <div class="student-next-action">
          <span>${student.nextActionDate || "日付未設定"}</span>
          <strong>${student.nextAction || "次アクション未設定"}</strong>
          <small>${student.source || "接点未設定"} / 担当：${student.owner || "未設定"}</small>
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
    ${renderStudentForm(student, "update")}
  `;

  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  setupRenderedStudentForm();
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
  setupDataRefresh();
  await refreshDashboardData();
}

document.addEventListener("DOMContentLoaded", initDashboard);
