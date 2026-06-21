const GAS_API_URL = "https://script.google.com/macros/s/AKfycbx0X9DvO6zydd8txe_Mgme1COTfltp7ZxueJyrIPQsJSwWCvbVrM2otmlgarPTDmU5iWg/exec";

let dashboardConfig = {
  appName: "Talent Investment Dashboard",
  targetHires: 18,
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

function loadJsonp(apiUrl) {
  return new Promise((resolve, reject) => {
    const callbackName = `talentInvestmentDashboard_${Date.now()}_${Math.random().toString(36).slice(2)}`;
    const script = document.createElement("script");
    const timeoutId = window.setTimeout(() => {
      cleanup();
      reject(new Error("GAS APIの読み込みがタイムアウトしました"));
    }, 10000);

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
    url.searchParams.set("callback", callbackName);
    url.searchParams.set("_", String(Date.now()));
    script.src = url.toString();
    document.head.appendChild(script);
  });
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
      appName: data.config.appName || "Talent Investment Dashboard",
      targetHires: Number(data.config.targetHires) || 0,
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

  if (Array.isArray(data.students)) {
    studentData = data.students.map((student) => ({
      studentId: String(student.studentId || ""),
      name: String(student.name || ""),
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
      memo: String(student.memo || "")
    }));
  }

  studentSummary = data.studentSummary || buildStudentSummary(studentData);
}

const formatNumber = new Intl.NumberFormat("ja-JP");
const formatCurrency = new Intl.NumberFormat("ja-JP", {
  style: "currency",
  currency: "JPY",
  maximumFractionDigits: 0
});

const percent = (value) => `${Math.round(value * 100)}%`;
const safeDivide = (numerator, denominator) => denominator ? numerator / denominator : 0;

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
    currentOffers: schoolTotals.offers,
    achievementRate: safeDivide(schoolTotals.offers, dashboardConfig.targetHires),
    contacts: fairTotals.contacts,
    lineRegistrations: fairTotals.lineRegistrations,
    salonTours: fairTotals.salonTours,
    interviews: schoolTotals.interviews,
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
    return summary;
  }, {
    needsFollowUp: 0,
    salonTourScheduled: 0,
    interviewScheduled: 0,
    offered: 0,
    expectedJoiners: 0
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
    { label: "接触学生数", value: metrics.contacts, unit: "名", sub: "フェア接点の合計" },
    { label: "LINE登録数", value: metrics.lineRegistrations, unit: "名", sub: `登録率 ${percent(safeDivide(metrics.lineRegistrations, metrics.contacts))}` },
    { label: "サロン見学数", value: metrics.salonTours, unit: "名", sub: `見学率 ${percent(safeDivide(metrics.salonTours, metrics.contacts))}` },
    { label: "面接数", value: metrics.interviews, unit: "件", sub: "学校別分析の合計" },
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

  const relatedStudents = studentData.filter((student) => student.source === fair.name);
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
  const relatedStudents = studentData.filter((student) => student.school === school.name);
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
  const summaryItems = [
    { label: "要フォロー", value: studentSummary.needsFollowUp || 0, sub: "次アクション日未設定" },
    { label: "見学予定者", value: studentSummary.salonTourScheduled || 0, sub: "サロン見学につなげる学生" },
    { label: "面接予定者", value: studentSummary.interviewScheduled || 0, sub: "選考フォロー対象" },
    { label: "内定者", value: studentSummary.offered || 0, sub: "内定後フォロー対象" },
    { label: "入社予定者", value: studentSummary.expectedJoiners || 0, sub: "入社準備フォロー対象" }
  ];

  document.getElementById("studentSummaryGrid").innerHTML = summaryItems.map((item) => `
    <article class="student-summary-card">
      <p>${item.label}</p>
      <strong>${formatNumber.format(item.value)}<span>名</span></strong>
      <small>${item.sub}</small>
    </article>
  `).join("");
}

function renderStudentActions() {
  const actionStudents = studentData
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
  const isConnected = await fetchDashboardData();
  updateDataSourceStatus(isConnected);
  document.getElementById("appTitle").textContent = dashboardConfig.appName;

  const metrics = buildMetrics();
  renderKpis(metrics);
  renderFunnel(metrics);
  renderFairTable();
  renderSchools();
  generateActionCards();
  renderStudentSummary();
  renderStudentActions();
}

document.addEventListener("DOMContentLoaded", initDashboard);
