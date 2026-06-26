/**
 * 人材投資管理システム - GAS WebアプリAPI
 *
 * このCode.gsは、必ず対象のGoogleスプレッドシートから
 * 「拡張機能 > Apps Script」で開いたプロジェクトに貼り付けて使います。
 */

const APP_NAME = "NOV Talent";
const STUDENT_HEADERS = [
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
  "メモ",
  "管理状態",
  "更新日時",
  "更新者"
];

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
  try {
    return getSupabaseDashboardData();
  } catch (error) {
    console.warn(`Supabase読み取りに失敗したため、スプレッドシートへフォールバックします: ${error.message}`);
  }

  return getSpreadsheetDashboardData();
}

function getSpreadsheetDashboardData() {
  const students = getStudentData();
  const studentCohorts = getStudentCohorts();
  return {
    config: getConfig(),
    fairs: getFairData(),
    schools: getSchoolData(),
    students: students,
    studentCohorts: studentCohorts,
    operationLogs: [],
    studentSummary: buildStudentSummary(students)
  };
}

function getSupabaseDashboardData() {
  const settings = getSupabaseRows_("talent_investment_settings", "is_active=eq.true&corporation_id=is.null&order=fiscal_year.desc&limit=1");
  const schools = getSupabaseRows_("talent_schools", "is_active=eq.true&order=name.asc");
  const fairs = getSupabaseRows_("talent_fairs", "is_active=eq.true&order=held_date.asc");
  const students = getSupabaseRows_("talent_students", "order=cohort.asc,student_code.asc");
  const followups = getSupabaseRows_("talent_student_followups", "order=due_date.asc,created_at.desc");
  const operationLogs = getSupabaseOperationLogRows_();
  const employeeMap = getSupabaseEmployeeMap_(collectSupabaseEmployeeIds_(students, followups, operationLogs));

  const convertedStudents = attachSupabaseFollowups_(
    students.map((student) => convertSupabaseStudent_(student, employeeMap)),
    followups,
    employeeMap
  );
  const studentCohorts = buildSupabaseStudentCohorts_(convertedStudents);

  return {
    config: convertSupabaseConfig_(settings[0]),
    fairs: fairs.map(convertSupabaseFair_),
    schools: buildSupabaseSchoolAnalysis_(schools, convertedStudents),
    students: convertedStudents.filter((student) => student.cohort === "27卒"),
    studentCohorts: studentCohorts,
    operationLogs: operationLogs.map((log) => convertSupabaseOperationLog_(log, employeeMap)),
    studentSummary: buildStudentSummary(convertedStudents),
    dataSource: "supabase"
  };
}

function getSupabaseOperationLogs_() {
  return getSupabaseOperationLogRows_().map(convertSupabaseOperationLog_);
}

function getSupabaseOperationLogRows_() {
  try {
    return getSupabaseRows_("talent_operation_logs", "order=created_at.desc&limit=30");
  } catch (error) {
    console.warn(`操作履歴の読み取りに失敗しました: ${error.message}`);
    return [];
  }
}

function convertSupabaseOperationLog_(row, employeeMap) {
  return {
    id: String(row.id || ""),
    action: String(row.action || ""),
    tableName: String(row.table_name || ""),
    recordId: String(row.record_id || ""),
    studentId: String(row.student_id || ""),
    studentCode: String(row.student_code || ""),
    studentName: String(row.student_name_snapshot || ""),
    actorEmployeeId: String(row.actor_employee_id || ""),
    actorEmail: String(row.actor_email || ""),
    actorName: getEmployeeDisplayName_(employeeMap, row.actor_employee_id),
    result: String(row.result || "success"),
    reason: String(row.reason || ""),
    targetType: String(row.target_type || ""),
    targetId: String(row.target_id || ""),
    detail: String(row.detail || ""),
    createdAt: row.occurred_at ? String(row.occurred_at) : (row.created_at ? String(row.created_at) : "")
  };
}

function getSupabaseRows_(tableName, queryString) {
  const props = PropertiesService.getScriptProperties();
  const baseUrl = String(props.getProperty("SUPABASE_URL") || "").replace(/\/$/, "");
  const serviceRoleKey = props.getProperty("SUPABASE_SERVICE_ROLE_KEY");

  if (!baseUrl || !serviceRoleKey) {
    throw new Error("SUPABASE_URL または SUPABASE_SERVICE_ROLE_KEY が未設定です。");
  }

  const url = `${baseUrl}/rest/v1/${tableName}?select=*&${queryString || ""}`;
  const response = UrlFetchApp.fetch(url, {
    method: "get",
    muteHttpExceptions: true,
    headers: {
      apikey: serviceRoleKey,
      Authorization: `Bearer ${serviceRoleKey}`,
      Prefer: "return=representation"
    }
  });

  const status = response.getResponseCode();
  const body = response.getContentText();
  if (status < 200 || status >= 300) {
    throw new Error(`Supabase ${tableName} 読み取り失敗: ${status} ${body}`);
  }

  return JSON.parse(body);
}

function isSupabaseConfigured_() {
  const props = PropertiesService.getScriptProperties();
  return Boolean(props.getProperty("SUPABASE_URL") && props.getProperty("SUPABASE_SERVICE_ROLE_KEY"));
}

function getSupabaseConfig_() {
  const props = PropertiesService.getScriptProperties();
  const baseUrl = String(props.getProperty("SUPABASE_URL") || "").replace(/\/$/, "");
  const serviceRoleKey = props.getProperty("SUPABASE_SERVICE_ROLE_KEY");

  if (!baseUrl || !serviceRoleKey) {
    throw new Error("SUPABASE_URL または SUPABASE_SERVICE_ROLE_KEY が未設定です。");
  }

  return { baseUrl, serviceRoleKey };
}

function requestSupabase_(method, tableName, queryString, payload) {
  const config = getSupabaseConfig_();
  const query = queryString ? `?${queryString}` : "";
  const response = UrlFetchApp.fetch(`${config.baseUrl}/rest/v1/${tableName}${query}`, {
    method: method,
    muteHttpExceptions: true,
    payload: payload === undefined ? undefined : JSON.stringify(payload),
    headers: {
      apikey: config.serviceRoleKey,
      Authorization: `Bearer ${config.serviceRoleKey}`,
      "Content-Type": "application/json",
      Prefer: "return=representation"
    }
  });

  const status = response.getResponseCode();
  const body = response.getContentText();
  if (status < 200 || status >= 300) {
    throw new Error(`Supabase ${tableName} ${method}失敗: ${status} ${body}`);
  }

  if (!body) return [];
  return JSON.parse(body);
}

function getSupabaseCohortFromSheetName_(sheetName) {
  const targetSheetName = sanitizeText(sheetName) || "Supabase_27卒";
  if (targetSheetName === "Supabase_全件参考" || targetSheetName === "学生管理_全件参考") {
    throw new Error("全件参考タブは編集できません。27卒、28卒、サロン実習の各タブで編集してください。");
  }

  if (targetSheetName.indexOf("28") !== -1) return "28卒";
  if (targetSheetName.indexOf("サロン実習") !== -1) return "サロン実習";
  return "27卒";
}

function getSupabaseSheetNameFromCohort_(cohort) {
  if (cohort === "28卒") return "Supabase_28卒";
  if (cohort === "サロン実習") return "Supabase_サロン実習";
  return "Supabase_27卒";
}

function buildSupabaseStudentPayload_(params, baseValues) {
  const schoolName = sanitizeText(params.school);
  const sourceName = sanitizeText(params.source);
  const schoolId = resolveSupabaseSchoolId_(schoolName);
  const fair = resolveSupabaseFair_(sourceName);
  const sourceType = fair ? "フェア" : (baseValues.cohort === "サロン実習" ? "サロン実習" : "その他");

  return Object.assign({}, baseValues, {
    full_name: sanitizeText(params.name),
    gender: sanitizeText(params.gender) || "未回答",
    school_id: schoolId,
    school_name_snapshot: schoolName,
    grade: sanitizeText(params.grade),
    source_type: sourceType,
    source_name_snapshot: sourceName,
    fair_id: fair ? fair.id : null,
    contact_date: normalizeSupabaseDate_(params.contactDate),
    line_status: sanitizeText(params.lineStatus) || "未登録",
    salon_tour_status: sanitizeText(params.salonTourStatus) || "未設定",
    interview_status: sanitizeText(params.interviewStatus) || "未設定",
    result_status: sanitizeText(params.resultStatus) || "未定",
    offer_status: sanitizeText(params.offerStatus) || "未定",
    expected_join_status: sanitizeText(params.expectedJoinStatus) || "未定",
    next_action: sanitizeText(params.nextAction),
    next_action_date: normalizeSupabaseDate_(params.nextActionDate),
    memo: sanitizeText(params.memo),
    management_status: sanitizeText(params.managementStatus) || "有効"
  });
}

function normalizeSupabaseDate_(value) {
  const text = sanitizeText(value);
  if (!text) return null;

  const match = text.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) return null;
  return text;
}

function resolveSupabaseSchoolId_(schoolName) {
  if (!schoolName) return null;

  const rows = getSupabaseRows_("talent_schools", `name=eq.${encodeURIComponent(schoolName)}&limit=1`);
  if (rows.length) return rows[0].id;

  const createdRows = requestSupabase_("post", "talent_schools", "", {
    name: schoolName,
    display_name: schoolName,
    memo: "ダッシュボードから学生登録時に自動作成",
    is_active: true
  });
  return createdRows[0] ? createdRows[0].id : null;
}

function resolveSupabaseFair_(fairName) {
  if (!fairName) return null;

  const rows = getSupabaseRows_("talent_fairs", `name=eq.${encodeURIComponent(fairName)}&limit=1`);
  return rows[0] || null;
}

function getSupabaseStudentByCode_(studentId) {
  const rows = getSupabaseRows_("talent_students", `student_code=eq.${encodeURIComponent(studentId)}&limit=1`);
  return rows[0] || null;
}

function generateNextSupabaseStudentId_() {
  const rows = getSupabaseRows_("talent_students", "student_code=not.is.null");
  const maxNumber = rows.reduce((max, row) => {
    const match = String(row.student_code || "").match(/^S-(\d+)$/);
    return match ? Math.max(max, Number(match[1])) : max;
  }, 0);
  return `S-${String(maxNumber + 1).padStart(4, "0")}`;
}

function validateSupabaseStudentPayload_(params, currentStudentId, cohort) {
  validateStudentStatusRules_(params);

  const duplicateId = findDuplicateSupabaseStudentId_(
    sanitizeText(params.name),
    sanitizeText(params.school),
    currentStudentId
  );
  if (duplicateId) {
    throw new Error(`同じ氏名・学校名の学生が既にいます: ${duplicateId}`);
  }
}

function findDuplicateSupabaseStudentId_(name, school, currentStudentId) {
  const rows = getSupabaseRows_("talent_students", `management_status=eq.${encodeURIComponent("有効")}`);
  const normalizedName = normalizeForDuplicateCheck(name);
  const normalizedSchool = normalizeForDuplicateCheck(school);

  for (let index = 0; index < rows.length; index += 1) {
    const row = rows[index];
    const studentId = String(row.student_code || "").trim();
    if (currentStudentId && studentId === currentStudentId) continue;

    const rowName = normalizeForDuplicateCheck(row.full_name);
    const rowSchool = normalizeForDuplicateCheck(row.school_name_snapshot);
    if (rowName === normalizedName && rowSchool === normalizedSchool) {
      return studentId + (row.cohort ? `（${row.cohort}）` : "");
    }
  }

  return "";
}

function appendSupabaseOperationLog_(action, recordId, studentId, studentCode, studentName, detail, beforeData, afterData, actorEmployeeId) {
  const payload = {
    action: action,
    table_name: "talent_students",
    record_id: recordId || null,
    student_id: studentId || null,
    student_code: studentCode || "",
    student_name_snapshot: studentName || "",
    result: "success",
    target_type: "student",
    target_id: studentCode || recordId || "",
    occurred_at: new Date().toISOString(),
    detail: detail,
    before_data: beforeData || null,
    after_data: afterData || null
  };
  const validActorEmployeeId = normalizeUuid_(actorEmployeeId);
  if (validActorEmployeeId) payload.actor_employee_id = validActorEmployeeId;
  try {
    requestSupabase_("post", "talent_operation_logs", "", payload);
  } catch (error) {
    console.warn("操作履歴の詳細形式保存に失敗しました。旧形式で再試行します: " + error.message);
    const fallbackPayload = {
      action: action,
      table_name: "talent_students",
      record_id: recordId || null,
      student_id: studentId || null,
      student_code: studentCode || "",
      student_name_snapshot: studentName || "",
      detail: detail,
      before_data: beforeData || null,
      after_data: afterData || null
    };
    if (validActorEmployeeId) fallbackPayload.actor_employee_id = validActorEmployeeId;
    requestSupabase_("post", "talent_operation_logs", "", fallbackPayload);
  }
}

function normalizeUuid_(value) {
  const text = sanitizeText(value);
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(text) ? text : "";
}

function requireDashboardOperator_(params) {
  const operator = getDashboardOperator_(params);
  if (!operator.employeeId) {
    throw new Error("保存できませんでした：HUBログイン情報からCore社員IDを特定できません。NOV HUBから開き直すか、社員マスタの氏名・メール・社員番号を確認してください。");
  }
  return operator;
}

function getTalentRequiredRoleKeys_(action) {
  const adminOnly = ["super_admin", "talent_admin"];
  const editor = ["super_admin", "talent_admin", "talent_editor"];

  if (action === "updateSettings") return adminOnly;
  if ([
    "addStudent",
    "updateStudent",
    "addFair",
    "updateFair",
    "addSchool",
    "updateSchool",
    "addFollowup",
    "updateFollowup"
  ].indexOf(action) !== -1) {
    return editor;
  }

  return adminOnly;
}

function requireTalentActionPermission_(params, action) {
  const operator = requireDashboardOperator_(params);
  const requiredRoles = getTalentRequiredRoleKeys_(action);
  const roleKeys = getCoreRoleKeysByEmployeeId_(operator.employeeId);
  const allowed = roleKeys.some(function(roleKey) {
    return requiredRoles.indexOf(roleKey) !== -1;
  });

  if (!allowed) {
    const reason = "必要なNOV Talent権限がありません。必要role: " + requiredRoles.join(", ");
    appendTalentDeniedOperationLog_(action, params, operator, roleKeys, reason);
    throw new Error("保存できませんでした：" + reason);
  }

  operator.roleKeys = roleKeys;
  return operator;
}

function getCoreRoleKeysByEmployeeId_(employeeId) {
  const validEmployeeId = normalizeUuid_(employeeId);
  if (!validEmployeeId) return [];

  const employeeRoleRows = getSupabaseRows_(
    "employee_roles",
    "employee_id=eq." + encodeURIComponent(validEmployeeId) + "&is_active=eq.true&limit=50"
  );
  const roleIds = employeeRoleRows
    .map(function(row) { return normalizeUuid_(row.role_id); })
    .filter(function(roleId, index, array) { return roleId && array.indexOf(roleId) === index; });

  if (!roleIds.length) return [];

  const roleRows = getSupabaseRows_(
    "roles",
    "id=in.(" + roleIds.map(encodeURIComponent).join(",") + ")&is_active=eq.true"
  );

  return roleRows
    .map(function(role) { return sanitizeText(role.role_key); })
    .filter(function(roleKey, index, array) { return roleKey && array.indexOf(roleKey) === index; });
}

function appendTalentDeniedOperationLog_(action, params, operator, roleKeys, reason) {
  const targetInfo = getTalentActionTargetInfo_(action, params);
  const payload = {
    action: action,
    table_name: targetInfo.tableName,
    record_id: normalizeUuid_(targetInfo.recordId) || null,
    student_id: normalizeUuid_(targetInfo.studentUuid) || null,
    student_code: targetInfo.studentCode || "",
    student_name_snapshot: targetInfo.studentName || "",
    actor_employee_id: normalizeUuid_(operator.employeeId) || null,
    actor_email: sanitizeText(params && params.actorEmail),
    result: "denied",
    reason: reason,
    target_type: targetInfo.targetType,
    target_id: targetInfo.targetId,
    detail: "操作拒否: " + action + " / roles=" + (roleKeys && roleKeys.length ? roleKeys.join(",") : "none"),
    before_data: null,
    after_data: {
      action: action,
      roleKeys: roleKeys || [],
      requiredRoleKeys: getTalentRequiredRoleKeys_(action)
    },
    occurred_at: new Date().toISOString()
  };

  try {
    requestSupabase_("post", "talent_operation_logs", "", payload);
  } catch (error) {
    console.warn("操作拒否ログの詳細形式保存に失敗しました。旧形式で再試行します: " + error.message);
    requestSupabase_("post", "talent_operation_logs", "", {
      action: action,
      table_name: targetInfo.tableName,
      record_id: normalizeUuid_(targetInfo.recordId) || null,
      student_id: normalizeUuid_(targetInfo.studentUuid) || null,
      student_code: targetInfo.studentCode || "",
      student_name_snapshot: targetInfo.studentName || "",
      actor_employee_id: normalizeUuid_(operator.employeeId) || null,
      detail: "操作拒否: " + reason,
      before_data: null,
      after_data: {
        action: action,
        result: "denied",
        reason: reason,
        actorEmail: sanitizeText(params && params.actorEmail),
        targetType: targetInfo.targetType,
        targetId: targetInfo.targetId,
        roleKeys: roleKeys || []
      }
    });
  }
}

function getTalentActionTargetInfo_(action, params) {
  const studentCode = sanitizeText(params && params.studentId);
  const studentName = sanitizeText(params && params.name);
  const fairId = sanitizeText(params && params.fairId);
  const fairName = sanitizeText((params && params.name) || (params && params.originalName));
  const schoolId = sanitizeText(params && params.schoolId);
  const schoolName = sanitizeText((params && params.name) || (params && params.originalName));
  const followupId = sanitizeText(params && params.followupId);
  const fiscalYear = sanitizeText(params && params.fiscalYear);

  if (action === "updateSettings") {
    return {
      tableName: "talent_investment_settings",
      targetType: "settings",
      targetId: fiscalYear,
      recordId: "",
      studentUuid: "",
      studentCode: "",
      studentName: ""
    };
  }
  if (action === "addFair" || action === "updateFair") {
    return {
      tableName: "talent_fairs",
      targetType: "fair",
      targetId: fairId || fairName,
      recordId: fairId,
      studentUuid: "",
      studentCode: "",
      studentName: ""
    };
  }
  if (action === "addSchool" || action === "updateSchool") {
    return {
      tableName: "talent_schools",
      targetType: "school",
      targetId: schoolId || schoolName,
      recordId: schoolId,
      studentUuid: "",
      studentCode: "",
      studentName: ""
    };
  }
  if (action === "addFollowup" || action === "updateFollowup") {
    return {
      tableName: "talent_student_followups",
      targetType: "followup",
      targetId: followupId || studentCode,
      recordId: followupId,
      studentUuid: "",
      studentCode: studentCode,
      studentName: studentName
    };
  }

  return {
    tableName: "talent_students",
    targetType: "student",
    targetId: studentCode || studentName,
    recordId: "",
    studentUuid: "",
    studentCode: studentCode,
    studentName: studentName
  };
}

function getDashboardOperator_(params) {
  const actorEmployeeId = (params && params.actorEmployeeId) || (params && params.operatorEmployeeId);
  const actorEmail = sanitizeText(params && params.actorEmail);
  const actorName = sanitizeText((params && params.actorName) || (params && params.operatorName));
  const actorEmployeeCode = sanitizeText((params && params.actorEmployeeNumber) || (params && params.operatorEmployeeCode));
  const displayName = actorEmail || (actorName && actorEmployeeCode ? `${actorName} (${actorEmployeeCode})` : actorName);
  const resolvedEmployeeId = normalizeUuid_(actorEmployeeId) || resolveDashboardOperatorEmployeeId_(actorEmail, actorEmployeeCode, actorName);

  return {
    employeeId: resolvedEmployeeId,
    name: displayName || getOperatorName(),
    employeeCode: actorEmployeeCode
  };
}

function resolveDashboardOperatorEmployeeId_(email, employeeCode, actorName) {
  const searchPlan = [
    { label: "メールアドレス", column: "email", value: sanitizeText(email) },
    { label: "社員番号", column: "employee_id", value: sanitizeText(employeeCode) },
    { label: "氏名", column: "full_name", value: sanitizeText(actorName) }
  ].filter(function(item) { return item.value; });

  for (var index = 0; index < searchPlan.length; index += 1) {
    var item = searchPlan[index];
    var rows = getSupabaseRows_("employees", item.column + "=eq." + encodeURIComponent(item.value) + "&limit=2");
    if (rows.length === 1 && normalizeUuid_(rows[0].id)) return rows[0].id;
    if (rows.length > 1) {
      throw new Error("HUBログイン情報の" + item.label + "が社員マスタで重複しています: " + item.value);
    }
  }

  return "";
}

function collectSupabaseEmployeeIds_(students, followups, operationLogs) {
  const ids = new Set();
  const collect = function(row, columns) {
    columns.forEach(function(column) {
      const id = normalizeUuid_(row && row[column]);
      if (id) ids.add(id);
    });
  };

  students.forEach(function(student) {
    collect(student, ["owner_employee_id", "created_by_employee_id", "updated_by_employee_id"]);
  });
  followups.forEach(function(followup) {
    collect(followup, ["owner_employee_id", "created_by_employee_id", "updated_by_employee_id"]);
  });
  (operationLogs || []).forEach(function(log) {
    collect(log, ["actor_employee_id"]);
  });

  return Array.from(ids);
}

function getSupabaseEmployeeMap_(employeeIds) {
  if (!employeeIds.length) return {};

  try {
    const rows = getSupabaseRows_("employees", `id=in.(${employeeIds.map(encodeURIComponent).join(",")})`);
    return rows.reduce(function(map, row) {
      const id = String(row.id || "");
      if (id) map[id] = row;
      return map;
    }, {});
  } catch (error) {
    console.warn(`社員マスタの読み取りに失敗しました: ${error.message}`);
    return {};
  }
}

function getEmployeeDisplayName_(employeeMap, employeeId) {
  const id = normalizeUuid_(employeeId);
  const employee = id && employeeMap ? employeeMap[id] : null;
  if (!employee) return "";

  return String(
    employee.full_name ||
    employee.name ||
    employee.display_name ||
    employee.employee_name ||
    employee.email ||
    employee.employee_id ||
    ""
  );
}

function convertSupabaseConfig_(row) {
  if (!row) {
    return {
      appName: APP_NAME,
      targetHires: 0,
      targetContacts: 0,
      targetInterviews: 0,
      hiringBudget: 0,
      expectedJoiners: 0,
      fiscalYear: String(new Date().getFullYear())
    };
  }

  return {
    appName: row.app_name || APP_NAME,
    targetHires: Number(row.target_hires) || 0,
    targetContacts: Number(row.target_contacts) || 0,
    targetInterviews: Number(row.target_interviews) || 0,
    hiringBudget: Number(row.hiring_budget) || 0,
    expectedJoiners: Number(row.expected_joiners) || 0,
    fiscalYear: String(row.fiscal_year || new Date().getFullYear())
  };
}

function convertSupabaseFair_(row) {
  return {
    id: String(row.id || ""),
    name: String(row.name || ""),
    date: String(row.held_date || ""),
    cost: Number(row.cost) || 0,
    contacts: Number(row.contacts) || 0,
    lineRegistrations: Number(row.line_registrations) || 0,
    salonTours: Number(row.salon_tours) || 0,
    memo: String(row.memo || "")
  };
}

function convertSupabaseStudent_(row, employeeMap) {
  return {
    id: String(row.id || ""),
    studentId: String(row.student_code || row.id || ""),
    cohort: String(row.cohort || ""),
    name: String(row.full_name || ""),
    gender: String(row.gender || "未回答"),
    school: String(row.school_name_snapshot || ""),
    grade: String(row.grade || ""),
    source: String(row.source_name_snapshot || ""),
    contactDate: String(row.contact_date || ""),
    lineStatus: String(row.line_status || "未登録"),
    salonTourStatus: String(row.salon_tour_status || "未設定"),
    interviewStatus: String(row.interview_status || "未設定"),
    resultStatus: String(row.result_status || "未定"),
    offerStatus: String(row.offer_status || "未定"),
    expectedJoinStatus: String(row.expected_join_status || "未定"),
    owner: getEmployeeDisplayName_(employeeMap, row.owner_employee_id),
    nextAction: String(row.next_action || ""),
    nextActionDate: String(row.next_action_date || ""),
    memo: String(row.memo || ""),
    managementStatus: String(row.management_status || "有効"),
    updatedAt: formatDateTimeValue(row.updated_at),
    updatedBy: getEmployeeDisplayName_(employeeMap, row.updated_by_employee_id)
  };
}

function convertSupabaseFollowup_(row, employeeMap) {
  return {
    id: String(row.id || ""),
    studentRecordId: String(row.student_id || ""),
    actionTitle: String(row.action_title || ""),
    dueDate: String(row.due_date || ""),
    status: String(row.status || "未対応"),
    memo: String(row.memo || ""),
    createdAt: formatDateTimeValue(row.created_at),
    updatedAt: formatDateTimeValue(row.updated_at),
    updatedBy: getEmployeeDisplayName_(employeeMap, row.updated_by_employee_id),
    updatedByEmployeeId: String(row.updated_by_employee_id || "")
  };
}

function attachSupabaseFollowups_(students, followupRows, employeeMap) {
  const followupsByStudentId = followupRows.reduce((map, row) => {
    const followup = convertSupabaseFollowup_(row, employeeMap);
    if (!map[followup.studentRecordId]) map[followup.studentRecordId] = [];
    map[followup.studentRecordId].push(followup);
    return map;
  }, {});

  return students.map((student) => Object.assign({}, student, {
    followups: followupsByStudentId[student.id] || []
  }));
}
function buildSupabaseStudentCohorts_(students) {
  const definitions = [
    { key: "27", label: "27卒", sheetName: "Supabase_27卒" },
    { key: "28", label: "28卒", sheetName: "Supabase_28卒" },
    { key: "intern", label: "サロン実習", sheetName: "Supabase_サロン実習" },
    { key: "all", label: "全件参考", sheetName: "Supabase_全件参考" }
  ];

  return definitions.map((definition) => {
    const cohortStudents = definition.key === "all"
      ? students
      : students.filter((student) => student.cohort === definition.label);
    return {
      key: definition.key,
      label: definition.label,
      sheetName: definition.sheetName,
      students: cohortStudents
    };
  });
}

function buildSupabaseSchoolAnalysis_(schools, students) {
  const summaryBySchool = students.reduce((map, student) => {
    const schoolName = student.school || "学校未設定";
    if (!map[schoolName]) {
      map[schoolName] = {
        name: schoolName,
        contacts: 0,
        lineRegistrations: 0,
        salonTours: 0,
        interviews: 0,
        passed: 0,
        offers: 0,
        id: "",
        displayName: schoolName,
        area: "",
        memo: ""
      };
    }

    const summary = map[schoolName];
    if (student.managementStatus === "管理対象外") return map;

    summary.contacts += 1;
    if (student.lineStatus === "登録済") summary.lineRegistrations += 1;
    if (student.salonTourStatus === "実施済" || student.salonTourStatus === "予定") summary.salonTours += 1;
    if (student.interviewStatus === "実施済" || student.interviewStatus === "予定") summary.interviews += 1;
    if (student.resultStatus === "合格") summary.passed += 1;
    if (student.offerStatus === "内定" || student.offerStatus === "承諾") summary.offers += 1;
    return map;
  }, {});

  schools.forEach((school) => {
    const schoolName = school.display_name || school.name;
    if (!summaryBySchool[schoolName]) {
      summaryBySchool[schoolName] = {
        name: String(school.name || schoolName),
        contacts: 0,
        lineRegistrations: 0,
        salonTours: 0,
        interviews: 0,
        passed: 0,
        offers: 0,
        id: String(school.id || ""),
        displayName: schoolName,
        area: String(school.area || ""),
        memo: String(school.memo || "")
      };
    } else {
      summaryBySchool[schoolName].id = String(school.id || "");
      summaryBySchool[schoolName].name = String(school.name || schoolName);
      summaryBySchool[schoolName].displayName = schoolName;
      summaryBySchool[schoolName].area = String(school.area || "");
      summaryBySchool[schoolName].memo = String(school.memo || "");
    }
  });

  return Object.values(summaryBySchool).sort((a, b) => b.offers - a.offers || b.interviews - a.interviews || b.contacts - a.contacts);
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
      expectedJoiners: 0,
      fiscalYear: String(new Date().getFullYear())
    };
  }

  const row = values[values.length - 1];
  return {
    appName: APP_NAME,
    targetHires: Number(row[1]) || 0,
    targetContacts: Number(row[2]) || 0,
    targetInterviews: Number(row[3]) || 0,
    hiringBudget: Number(row[4]) || 0,
    expectedJoiners: Number(row[5]) || 0,
    fiscalYear: String(row[0] || new Date().getFullYear())
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
  const columnMap = getStudentColumnMap(sheet);
  const rows = values.slice(1).filter((row) => row[0]);

  return rows.map((row) => ({
    studentId: String(getRowValue(row, columnMap, "学生ID") || ""),
    cohort: String(cohortLabel || ""),
    name: String(getRowValue(row, columnMap, "氏名") || ""),
    gender: String(getRowValue(row, columnMap, "性別") || ""),
    school: String(getRowValue(row, columnMap, "学校名") || ""),
    grade: String(getRowValue(row, columnMap, "学年") || ""),
    source: String(getRowValue(row, columnMap, "流入元") || ""),
    contactDate: formatDateValue(getRowValue(row, columnMap, "接触日")),
    lineStatus: String(getRowValue(row, columnMap, "LINE登録") || ""),
    salonTourStatus: String(getRowValue(row, columnMap, "見学ステータス") || ""),
    interviewStatus: String(getRowValue(row, columnMap, "面接ステータス") || ""),
    resultStatus: String(getRowValue(row, columnMap, "選考結果") || ""),
    offerStatus: String(getRowValue(row, columnMap, "内定ステータス") || ""),
    expectedJoinStatus: String(getRowValue(row, columnMap, "入社予定") || ""),
    owner: String(getRowValue(row, columnMap, "担当者") || ""),
    nextAction: String(getRowValue(row, columnMap, "次アクション") || ""),
    nextActionDate: formatDateValue(getRowValue(row, columnMap, "次アクション日")),
    memo: String(getRowValue(row, columnMap, "メモ") || ""),
    managementStatus: String(getRowValue(row, columnMap, "管理状態") || "有効"),
    updatedAt: formatDateTimeValue(getRowValue(row, columnMap, "更新日時")),
    updatedBy: String(getRowValue(row, columnMap, "更新者") || "")
  }));
}

function handleWriteAction(params) {
  const action = String(params.action || "");

  if (isSupabaseConfigured_()) {
    requireTalentActionPermission_(params, action);
  }

  if (action === "addStudent") {
    return addStudentFromDashboard(params);
  }

  if (action === "updateStudent") {
    return updateStudentFromDashboard(params);
  }

  if (action === "updateSettings") {
    return updateSettingsFromDashboard(params);
  }

  if (action === "addFair") {
    return addFairFromDashboard(params);
  }

  if (action === "updateFair") {
    return updateFairFromDashboard(params);
  }

  if (action === "addSchool") {
    return addSchoolFromDashboard(params);
  }

  if (action === "updateSchool") {
    return updateSchoolFromDashboard(params);
  }

  if (action === "addFollowup") {
    return addFollowupFromDashboard(params);
  }

  if (action === "updateFollowup") {
    return updateFollowupFromDashboard(params);
  }

  throw new Error(`未対応の操作です: ${action}`);
}

function addStudentFromDashboard(params) {
  if (isSupabaseConfigured_()) {
    return addSupabaseStudentFromDashboard_(params);
  }

  return addSpreadsheetStudentFromDashboard_(params);
}

function updateStudentFromDashboard(params) {
  if (isSupabaseConfigured_()) {
    return updateSupabaseStudentFromDashboard_(params);
  }

  return updateSpreadsheetStudentFromDashboard_(params);
}

function updateSettingsFromDashboard(params) {
  if (isSupabaseConfigured_()) {
    return updateSupabaseSettingsFromDashboard_(params);
  }

  return updateSpreadsheetSettingsFromDashboard_(params);
}

function buildSettingsPayload_(params) {
  const fiscalYear = sanitizeText(params.fiscalYear) || String(new Date().getFullYear());
  const appName = sanitizeText(params.appName) || APP_NAME;
  const payload = {
    fiscal_year: fiscalYear,
    app_name: appName,
    target_hires: parseNonNegativeInteger_(params.targetHires),
    target_contacts: parseNonNegativeInteger_(params.targetContacts),
    target_interviews: parseNonNegativeInteger_(params.targetInterviews),
    hiring_budget: parseNonNegativeInteger_(params.hiringBudget),
    expected_joiners: parseNonNegativeInteger_(params.expectedJoiners),
    is_active: true
  };

  if (!payload.fiscal_year) throw new Error("年度を入力してください。");
  if (!payload.app_name) throw new Error("アプリ名を入力してください。");
  return payload;
}

function parseNonNegativeInteger_(value) {
  const number = Number(String(value || "0").replace(/,/g, ""));
  if (!Number.isFinite(number) || number < 0) {
    throw new Error("目標値は0以上の数値で入力してください。");
  }
  return Math.round(number);
}

function updateSupabaseSettingsFromDashboard_(params) {
  const payload = buildSettingsPayload_(params);
  const operator = getDashboardOperator_(params);
  const existingRows = getSupabaseRows_(
    "talent_investment_settings",
    `fiscal_year=eq.${encodeURIComponent(payload.fiscal_year)}&corporation_id=is.null&limit=1`
  );
  const existing = existingRows[0] || null;
  if (operator.employeeId) {
    payload.updated_by_employee_id = operator.employeeId;
    if (!existing) payload.created_by_employee_id = operator.employeeId;
  }
  const savedRows = existing
    ? requestSupabase_("patch", "talent_investment_settings", `id=eq.${existing.id}`, payload)
    : requestSupabase_("post", "talent_investment_settings", "", payload);
  const saved = savedRows[0] || existing || payload;

  requestSupabase_("post", "talent_operation_logs", "", {
    action: "更新",
    table_name: "talent_investment_settings",
    record_id: saved.id || null,
    student_id: null,
    student_code: "",
    student_name_snapshot: "",
    actor_employee_id: operator.employeeId || null,
    detail: `ダッシュボードから年度目標を更新: ${payload.fiscal_year}`,
    before_data: existing,
    after_data: saved
  });

  return {
    ok: true,
    action: "updateSettings",
    fiscalYear: payload.fiscal_year,
    settingId: saved.id || ""
  };
}
function updateSpreadsheetSettingsFromDashboard_(params) {
  const payload = buildSettingsPayload_(params);
  const sheet = getRequiredSheet("年度設定");
  const values = sheet.getDataRange().getValues();
  const rowIndex = Math.max(values.findIndex((row, index) => index > 0 && String(row[0] || "") === payload.fiscal_year) + 1, 0);
  const targetRow = rowIndex || Math.max(sheet.getLastRow() + 1, 2);
  const operator = getDashboardOperator_(params).name;

  sheet.getRange(targetRow, 1, 1, 6).setValues([[
    payload.fiscal_year,
    payload.target_hires,
    payload.target_contacts,
    payload.target_interviews,
    payload.hiring_budget,
    payload.expected_joiners
  ]]);
  appendOperationLog("更新", "年度設定", payload.fiscal_year, payload.app_name, operator, "ダッシュボードから年度目標を更新");

  return {
    ok: true,
    action: "updateSettings",
    fiscalYear: payload.fiscal_year
  };
}
function addFairFromDashboard(params) {
  if (isSupabaseConfigured_()) {
    return addSupabaseFairFromDashboard_(params);
  }

  return addSpreadsheetFairFromDashboard_(params);
}

function updateFairFromDashboard(params) {
  if (isSupabaseConfigured_()) {
    return updateSupabaseFairFromDashboard_(params);
  }

  return updateSpreadsheetFairFromDashboard_(params);
}

function buildFairPayload_(params) {
  const payload = {
    name: sanitizeText(params.name),
    held_date: sanitizeText(params.date) || null,
    cost: parseNonNegativeInteger_(params.cost),
    contacts: parseNonNegativeInteger_(params.contacts),
    line_registrations: parseNonNegativeInteger_(params.lineRegistrations),
    salon_tours: parseNonNegativeInteger_(params.salonTours),
    memo: sanitizeText(params.memo),
    is_active: true
  };

  if (!payload.name) throw new Error("フェア名を入力してください。");
  if (payload.line_registrations > payload.contacts) throw new Error("LINE登録数は接触数以下にしてください。");
  if (payload.salon_tours > payload.contacts) throw new Error("見学取得数は接触数以下にしてください。");
  return payload;
}

function getSupabaseFairByIdOrName_(fairId, fairName) {
  if (fairId) {
    const rowsById = getSupabaseRows_("talent_fairs", `id=eq.${encodeURIComponent(fairId)}&limit=1`);
    if (rowsById[0]) return rowsById[0];
  }

  if (fairName) {
    const rowsByName = getSupabaseRows_("talent_fairs", `name=eq.${encodeURIComponent(fairName)}&limit=1`);
    if (rowsByName[0]) return rowsByName[0];
  }

  return null;
}

function validateSupabaseFairDuplicate_(name, currentId) {
  const rows = getSupabaseRows_("talent_fairs", `name=eq.${encodeURIComponent(name)}&is_active=eq.true&limit=2`);
  const duplicate = rows.find((row) => !currentId || String(row.id) !== String(currentId));
  if (duplicate) {
    throw new Error(`同じフェア名が既にあります: ${name}`);
  }
}

function addSupabaseFairFromDashboard_(params) {
  const operator = getDashboardOperator_(params);
  const payload = buildFairPayload_(params);
  validateSupabaseFairDuplicate_(payload.name, "");
  const insertedRows = requestSupabase_("post", "talent_fairs", "", payload);
  const inserted = insertedRows[0] || {};

  requestSupabase_("post", "talent_operation_logs", "", {
    action: "追加",
    table_name: "talent_fairs",
    record_id: inserted.id || null,
    student_id: null,
    student_code: "",
    student_name_snapshot: "",
    detail: `ダッシュボードからフェアを追加: ${payload.name}`,
    before_data: null,
    after_data: inserted,
    actor_employee_id: operator.employeeId || null
  });

  return {
    ok: true,
    action: "addFair",
    fairId: inserted.id || "",
    fairName: payload.name
  };
}

function updateSupabaseFairFromDashboard_(params) {
  const operator = getDashboardOperator_(params);
  const fairId = sanitizeText(params.fairId);
  const originalName = sanitizeText(params.originalName);
  const payload = buildFairPayload_(params);
  const existing = getSupabaseFairByIdOrName_(fairId, originalName);
  if (!existing) {
    throw new Error("更新対象のフェアが見つかりません。");
  }

  validateSupabaseFairDuplicate_(payload.name, existing.id);
  const updatedRows = requestSupabase_("patch", "talent_fairs", `id=eq.${encodeURIComponent(existing.id)}`, payload);
  const updated = updatedRows[0] || existing;

  requestSupabase_("post", "talent_operation_logs", "", {
    action: "更新",
    table_name: "talent_fairs",
    record_id: updated.id || existing.id,
    student_id: null,
    student_code: "",
    student_name_snapshot: "",
    detail: `ダッシュボードからフェアを更新: ${payload.name}`,
    before_data: existing,
    after_data: updated,
    actor_employee_id: operator.employeeId || null
  });

  return {
    ok: true,
    action: "updateFair",
    fairId: updated.id || existing.id,
    fairName: payload.name
  };
}

function getFairSheet_() {
  return getRequiredSheet("フェア実績");
}

function getFairColumnMap_(sheet) {
  const headers = sheet.getRange(1, 1, 1, Math.max(sheet.getLastColumn(), 6)).getValues()[0];
  return headers.reduce((map, header, index) => {
    const key = String(header || "").trim();
    if (key) map[key] = index + 1;
    return map;
  }, {});
}

function findFairRow_(sheet, fairName) {
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return 0;
  const columnMap = getFairColumnMap_(sheet);
  const nameColumn = columnMap["フェア名"] || 1;
  const values = sheet.getRange(2, nameColumn, lastRow - 1, 1).getValues();
  for (let index = 0; index < values.length; index += 1) {
    if (String(values[index][0] || "").trim() === fairName) return index + 2;
  }
  return 0;
}

function setFairSheetRow_(sheet, rowNumber, payload) {
  const columnMap = getFairColumnMap_(sheet);
  const values = {
    "フェア名": payload.name,
    "開催日": parseDateOrText(payload.held_date),
    "費用": payload.cost,
    "接触数": payload.contacts,
    "LINE登録数": payload.line_registrations,
    "見学取得数": payload.salon_tours
  };
  Object.entries(values).forEach(([header, value]) => {
    const column = columnMap[header];
    if (column) sheet.getRange(rowNumber, column).setValue(value);
  });
}

function addSpreadsheetFairFromDashboard_(params) {
  const payload = buildFairPayload_(params);
  const operator = getDashboardOperator_(params).name;
  const sheet = getFairSheet_();
  if (findFairRow_(sheet, payload.name)) throw new Error(`同じフェア名が既にあります: ${payload.name}`);
  const rowNumber = Math.max(sheet.getLastRow() + 1, 2);
  setFairSheetRow_(sheet, rowNumber, payload);
  appendOperationLog("追加", "フェア実績", payload.name, payload.name, operator, "ダッシュボードからフェアを追加");
  return { ok: true, action: "addFair", fairName: payload.name };
}

function updateSpreadsheetFairFromDashboard_(params) {
  const payload = buildFairPayload_(params);
  const operator = getDashboardOperator_(params).name;
  const sheet = getFairSheet_();
  const originalName = sanitizeText(params.originalName) || payload.name;
  const rowNumber = findFairRow_(sheet, originalName);
  if (!rowNumber) throw new Error("更新対象のフェアが見つかりません。");
  const duplicateRow = findFairRow_(sheet, payload.name);
  if (duplicateRow && duplicateRow !== rowNumber) throw new Error(`同じフェア名が既にあります: ${payload.name}`);
  setFairSheetRow_(sheet, rowNumber, payload);
  appendOperationLog("更新", "フェア実績", payload.name, payload.name, operator, "ダッシュボードからフェアを更新");
  return { ok: true, action: "updateFair", fairName: payload.name };
}
function addSchoolFromDashboard(params) {
  if (isSupabaseConfigured_()) {
    return addSupabaseSchoolFromDashboard_(params);
  }

  return addSpreadsheetSchoolFromDashboard_(params);
}

function updateSchoolFromDashboard(params) {
  if (isSupabaseConfigured_()) {
    return updateSupabaseSchoolFromDashboard_(params);
  }

  return updateSpreadsheetSchoolFromDashboard_(params);
}

function buildSchoolPayload_(params) {
  const name = sanitizeText(params.name);
  const payload = {
    name: name,
    display_name: sanitizeText(params.displayName) || name,
    area: sanitizeText(params.area),
    memo: sanitizeText(params.memo),
    is_active: true
  };
  if (!payload.name) throw new Error("学校名を入力してください。");
  return payload;
}

function getSupabaseSchoolByIdOrName_(schoolId, schoolName) {
  if (schoolId) {
    const rowsById = getSupabaseRows_("talent_schools", `id=eq.${encodeURIComponent(schoolId)}&limit=1`);
    if (rowsById[0]) return rowsById[0];
  }
  if (schoolName) {
    const rowsByName = getSupabaseRows_("talent_schools", `name=eq.${encodeURIComponent(schoolName)}&limit=1`);
    if (rowsByName[0]) return rowsByName[0];
  }
  return null;
}

function validateSupabaseSchoolDuplicate_(name, currentId) {
  const rows = getSupabaseRows_("talent_schools", `name=eq.${encodeURIComponent(name)}&is_active=eq.true&limit=2`);
  const duplicate = rows.find((row) => !currentId || String(row.id) !== String(currentId));
  if (duplicate) throw new Error(`同じ学校名が既にあります: ${name}`);
}

function addSupabaseSchoolFromDashboard_(params) {
  const operator = getDashboardOperator_(params);
  const payload = buildSchoolPayload_(params);
  validateSupabaseSchoolDuplicate_(payload.name, "");
  const insertedRows = requestSupabase_("post", "talent_schools", "", payload);
  const inserted = insertedRows[0] || {};
  requestSupabase_("post", "talent_operation_logs", "", {
    action: "追加",
    table_name: "talent_schools",
    record_id: inserted.id || null,
    student_id: null,
    student_code: "",
    student_name_snapshot: "",
    detail: `ダッシュボードから学校を追加: ${payload.name}`,
    before_data: null,
    after_data: inserted,
    actor_employee_id: operator.employeeId || null
  });
  return { ok: true, action: "addSchool", schoolId: inserted.id || "", schoolName: payload.name };
}

function updateSupabaseSchoolFromDashboard_(params) {
  const operator = getDashboardOperator_(params);
  const schoolId = sanitizeText(params.schoolId);
  const originalName = sanitizeText(params.originalName);
  const payload = buildSchoolPayload_(params);
  const existing = getSupabaseSchoolByIdOrName_(schoolId, originalName);
  if (!existing) throw new Error("更新対象の学校が見つかりません。");
  validateSupabaseSchoolDuplicate_(payload.name, existing.id);
  const updatedRows = requestSupabase_("patch", "talent_schools", `id=eq.${encodeURIComponent(existing.id)}`, payload);
  const updated = updatedRows[0] || existing;
  requestSupabase_("post", "talent_operation_logs", "", {
    action: "更新",
    table_name: "talent_schools",
    record_id: updated.id || existing.id,
    student_id: null,
    student_code: "",
    student_name_snapshot: "",
    detail: `ダッシュボードから学校を更新: ${payload.name}`,
    before_data: existing,
    after_data: updated,
    actor_employee_id: operator.employeeId || null
  });
  return { ok: true, action: "updateSchool", schoolId: updated.id || existing.id, schoolName: payload.name };
}

function getSchoolSheet_() {
  return getRequiredSheet("学校別分析");
}

function findSchoolRow_(sheet, schoolName) {
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return 0;
  const values = sheet.getRange(2, 1, lastRow - 1, 1).getValues();
  for (let index = 0; index < values.length; index += 1) {
    if (String(values[index][0] || "").trim() === schoolName) return index + 2;
  }
  return 0;
}

function addSpreadsheetSchoolFromDashboard_(params) {
  const payload = buildSchoolPayload_(params);
  const operator = getDashboardOperator_(params).name;
  const sheet = getSchoolSheet_();
  if (findSchoolRow_(sheet, payload.name)) throw new Error(`同じ学校名が既にあります: ${payload.name}`);
  sheet.appendRow([payload.name, 0, 0, 0, 0, 0, 0]);
  appendOperationLog("追加", "学校別分析", payload.name, payload.name, operator, "ダッシュボードから学校を追加");
  return { ok: true, action: "addSchool", schoolName: payload.name };
}

function updateSpreadsheetSchoolFromDashboard_(params) {
  const payload = buildSchoolPayload_(params);
  const operator = getDashboardOperator_(params).name;
  const sheet = getSchoolSheet_();
  const originalName = sanitizeText(params.originalName) || payload.name;
  const rowNumber = findSchoolRow_(sheet, originalName);
  if (!rowNumber) throw new Error("更新対象の学校が見つかりません。");
  const duplicateRow = findSchoolRow_(sheet, payload.name);
  if (duplicateRow && duplicateRow !== rowNumber) throw new Error(`同じ学校名が既にあります: ${payload.name}`);
  sheet.getRange(rowNumber, 1).setValue(payload.name);
  appendOperationLog("更新", "学校別分析", payload.name, payload.name, operator, "ダッシュボードから学校を更新");
  return { ok: true, action: "updateSchool", schoolName: payload.name };
}
function addFollowupFromDashboard(params) {
  if (isSupabaseConfigured_()) {
    return addSupabaseFollowupFromDashboard_(params);
  }

  return addSpreadsheetFollowupFromDashboard_(params);
}

function buildFollowupPayload_(params) {
  const payload = {
    action_title: sanitizeText(params.actionTitle),
    due_date: normalizeSupabaseDate_(params.dueDate),
    status: sanitizeText(params.status) || "未対応",
    memo: sanitizeText(params.memo)
  };
  if (!payload.action_title) throw new Error("対応内容を入力してください。");
  if (["未対応", "対応中", "完了", "不要"].indexOf(payload.status) === -1) {
    throw new Error("フォロー状態が不正です。");
  }
  return payload;
}

function addSupabaseFollowupFromDashboard_(params) {
  const studentCode = sanitizeText(params.studentId);
  const studentRecordId = sanitizeText(params.studentRecordId);
  const student = studentRecordId
    ? getSupabaseRows_("talent_students", `id=eq.${encodeURIComponent(studentRecordId)}&limit=1`)[0]
    : getSupabaseStudentByCode_(studentCode);
  if (!student) throw new Error("対象学生が見つかりません。");

  const operator = getDashboardOperator_(params);
  const payload = Object.assign(buildFollowupPayload_(params), {
    student_id: student.id
  });
  if (operator.employeeId) {
    payload.owner_employee_id = operator.employeeId;
    payload.created_by_employee_id = operator.employeeId;
    payload.updated_by_employee_id = operator.employeeId;
  }
  const insertedRows = requestSupabase_("post", "talent_student_followups", "", payload);
  const inserted = insertedRows[0] || {};

  requestSupabase_("post", "talent_operation_logs", "", {
    action: "追加",
    table_name: "talent_student_followups",
    record_id: inserted.id || null,
    student_id: student.id,
    student_code: String(student.student_code || studentCode || ""),
    student_name_snapshot: String(student.full_name || ""),
    detail: `ダッシュボードからフォロー履歴を追加: ${payload.action_title}`,
    before_data: null,
    after_data: inserted,
    actor_employee_id: operator.employeeId || null
  });

  return {
    ok: true,
    action: "addFollowup",
    followupId: inserted.id || "",
    studentId: String(student.student_code || studentCode || "")
  };
}

function addSpreadsheetFollowupFromDashboard_(params) {
  const payload = buildFollowupPayload_(params);
  const studentCode = sanitizeText(params.studentId);
  const operator = getDashboardOperator_(params);
  appendOperationLog("追加", "フォロー履歴", studentCode, studentCode, operator.name, `ダッシュボードからフォロー履歴を追加: ${payload.action_title}`);
  return { ok: true, action: "addFollowup", studentId: studentCode };
}

function updateFollowupFromDashboard(params) {
  if (isSupabaseConfigured_()) {
    return updateSupabaseFollowupFromDashboard_(params);
  }

  return updateSpreadsheetFollowupFromDashboard_(params);
}

function buildFollowupStatusPayload_(params) {
  const status = sanitizeText(params.status) || "未対応";
  if (["未対応", "対応中", "完了", "不要"].indexOf(status) === -1) {
    throw new Error("フォロー状態が不正です。");
  }
  return { status: status };
}

function updateSupabaseFollowupFromDashboard_(params) {
  const followupId = sanitizeText(params.followupId);
  if (!followupId) throw new Error("更新対象のフォロー履歴が見つかりません。");
  const existing = getSupabaseRows_("talent_student_followups", `id=eq.${encodeURIComponent(followupId)}&limit=1`)[0];
  if (!existing) throw new Error("更新対象のフォロー履歴が見つかりません。");

  const operator = getDashboardOperator_(params);
  const payload = buildFollowupStatusPayload_(params);
  if (operator.employeeId) payload.updated_by_employee_id = operator.employeeId;
  const updatedRows = requestSupabase_("patch", "talent_student_followups", `id=eq.${encodeURIComponent(followupId)}`, payload);
  const updated = updatedRows[0] || Object.assign({}, existing, payload);

  requestSupabase_("post", "talent_operation_logs", "", {
    action: "更新",
    table_name: "talent_student_followups",
    record_id: followupId,
    student_id: existing.student_id || null,
    student_code: "",
    student_name_snapshot: "",
    detail: `ダッシュボードからフォロー状態を更新: ${existing.status || "未対応"} → ${payload.status}`,
    before_data: existing,
    after_data: updated,
    actor_employee_id: operator.employeeId || null
  });

  return { ok: true, action: "updateFollowup", followupId: followupId, status: payload.status };
}

function updateSpreadsheetFollowupFromDashboard_(params) {
  const payload = buildFollowupStatusPayload_(params);
  const followupId = sanitizeText(params.followupId);
  const operator = getDashboardOperator_(params);
  appendOperationLog("更新", "フォロー履歴", followupId, followupId, operator.name, `ダッシュボードからフォロー状態を更新: ${payload.status}`);
  return { ok: true, action: "updateFollowup", followupId: followupId, status: payload.status };
}
function addSpreadsheetStudentFromDashboard_(params) {
  const sheet = getWritableStudentSheet(params.sheetName);
  ensureStudentAuditColumns(sheet);
  const name = sanitizeText(params.name);
  const school = sanitizeText(params.school);
  const operator = getDashboardOperator_(params).name;
  const updatedAt = new Date();
  const studentId = generateNextStudentId(sheet);
  const rowValues = buildStudentRowValues(sheet, {
    "学生ID": studentId,
    "氏名": name,
    "性別": sanitizeText(params.gender) || "未回答",
    "学校名": school,
    "学年": sanitizeText(params.grade),
    "流入元": sanitizeText(params.source),
    "接触日": parseDateOrText(params.contactDate),
    "LINE登録": sanitizeText(params.lineStatus) || "未登録",
    "見学ステータス": sanitizeText(params.salonTourStatus) || "未設定",
    "面接ステータス": sanitizeText(params.interviewStatus) || "未設定",
    "選考結果": sanitizeText(params.resultStatus) || "未定",
    "内定ステータス": sanitizeText(params.offerStatus) || "未定",
    "入社予定": sanitizeText(params.expectedJoinStatus) || "未定",
    "担当者": sanitizeText(params.owner) || "総務人事",
    "次アクション": sanitizeText(params.nextAction),
    "次アクション日": parseDateOrText(params.nextActionDate),
    "メモ": sanitizeText(params.memo),
    "管理状態": sanitizeText(params.managementStatus) || "有効",
    "更新日時": updatedAt,
    "更新者": operator
  });

  if (!name) {
    throw new Error("氏名を入力してください。");
  }

  if (!school) {
    throw new Error("学校名を入力してください。");
  }

  validateStudentPayload(params, sheet, "");

  sheet.appendRow(rowValues);
  applySheetRules(SpreadsheetApp.getActiveSpreadsheet());
  appendOperationLog("追加", sheet.getName(), studentId, name, operator, "ダッシュボードから学生を追加");

  return {
    ok: true,
    action: "addStudent",
    sheetName: sheet.getName(),
    studentId: studentId
  };
}

function updateSpreadsheetStudentFromDashboard_(params) {
  const sheet = getWritableStudentSheet(params.sheetName);
  ensureStudentAuditColumns(sheet);
  const studentId = sanitizeText(params.studentId);
  const operator = getDashboardOperator_(params).name;
  const updatedAt = new Date();

  if (!studentId) {
    throw new Error("学生IDが見つかりません。");
  }

  const rowNumber = findStudentRow(sheet, studentId);
  if (!rowNumber) {
    throw new Error(`学生ID「${studentId}」が見つかりません。`);
  }

  validateStudentPayload(params, sheet, studentId);

  updateStudentRowValues(sheet, rowNumber, {
    "氏名": sanitizeText(params.name),
    "性別": sanitizeText(params.gender) || "未回答",
    "学校名": sanitizeText(params.school),
    "学年": sanitizeText(params.grade),
    "流入元": sanitizeText(params.source),
    "接触日": parseDateOrText(params.contactDate),
    "LINE登録": sanitizeText(params.lineStatus) || "未登録",
    "見学ステータス": sanitizeText(params.salonTourStatus) || "未設定",
    "面接ステータス": sanitizeText(params.interviewStatus) || "未設定",
    "選考結果": sanitizeText(params.resultStatus) || "未定",
    "内定ステータス": sanitizeText(params.offerStatus) || "未定",
    "入社予定": sanitizeText(params.expectedJoinStatus) || "未定",
    "担当者": sanitizeText(params.owner) || "総務人事",
    "次アクション": sanitizeText(params.nextAction),
    "次アクション日": parseDateOrText(params.nextActionDate),
    "メモ": sanitizeText(params.memo),
    "管理状態": sanitizeText(params.managementStatus) || "有効",
    "更新日時": updatedAt,
    "更新者": operator
  });

  applySheetRules(SpreadsheetApp.getActiveSpreadsheet());
  appendOperationLog("更新", sheet.getName(), studentId, sanitizeText(params.name), operator, "ダッシュボードから学生情報を更新");

  return {
    ok: true,
    action: "updateStudent",
    sheetName: sheet.getName(),
    studentId: studentId
  };
}

function addSupabaseStudentFromDashboard_(params) {
  const cohort = getSupabaseCohortFromSheetName_(params.sheetName);
  const studentId = generateNextSupabaseStudentId_();
  validateSupabaseStudentPayload_(params, "", cohort);

  const operator = getDashboardOperator_(params);
  const studentPayload = buildSupabaseStudentPayload_(params, {
    student_code: studentId,
    cohort: cohort
  });
  if (operator.employeeId) {
    studentPayload.created_by_employee_id = operator.employeeId;
    studentPayload.updated_by_employee_id = operator.employeeId;
  }
  const insertedRows = requestSupabase_("post", "talent_students", "", studentPayload);
  const inserted = insertedRows[0] || {};

  appendSupabaseOperationLog_(
    "追加",
    inserted.id,
    inserted.id,
    studentId,
    studentPayload.full_name,
    "ダッシュボードから学生を追加",
    null,
    inserted,
    operator.employeeId
  );

  return {
    ok: true,
    action: "addStudent",
    sheetName: getSupabaseSheetNameFromCohort_(cohort),
    studentId: studentId
  };
}

function updateSupabaseStudentFromDashboard_(params) {
  const studentId = sanitizeText(params.studentId);
  if (!studentId) {
    throw new Error("学生IDが見つかりません。");
  }

  getSupabaseCohortFromSheetName_(params.sheetName);
  const existing = getSupabaseStudentByCode_(studentId);
  if (!existing) {
    throw new Error(`学生ID「${studentId}」が見つかりません。`);
  }

  const cohort = existing.cohort || getSupabaseCohortFromSheetName_(params.sheetName);
  validateSupabaseStudentPayload_(params, studentId, cohort);
  const operator = getDashboardOperator_(params);
  const studentPayload = buildSupabaseStudentPayload_(params, {
    cohort: cohort
  });
  if (operator.employeeId) studentPayload.updated_by_employee_id = operator.employeeId;
  const updatedRows = requestSupabase_(
    "patch",
    "talent_students",
    `student_code=eq.${encodeURIComponent(studentId)}`,
    studentPayload
  );
  const updated = updatedRows[0] || {};

  appendSupabaseOperationLog_(
    "更新",
    updated.id || existing.id,
    updated.id || existing.id,
    studentId,
    studentPayload.full_name,
    "ダッシュボードから学生情報を更新",
    existing,
    updated,
    operator.employeeId
  );

  return {
    ok: true,
    action: "updateStudent",
    sheetName: getSupabaseSheetNameFromCohort_(cohort),
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

function getStudentColumnMap(sheet) {
  const lastColumn = Math.max(sheet.getLastColumn(), STUDENT_HEADERS.length);
  const headers = sheet.getRange(1, 1, 1, lastColumn).getValues()[0];
  return headers.reduce((map, header, index) => {
    const key = String(header || "").trim();
    if (key) map[key] = index + 1;
    return map;
  }, {});
}

function getRowValue(row, columnMap, headerName) {
  const columnIndex = columnMap[headerName];
  if (!columnIndex) return "";
  return row[columnIndex - 1];
}

function buildStudentRowValues(sheet, valuesByHeader) {
  const columnMap = getStudentColumnMap(sheet);
  const width = Math.max(sheet.getLastColumn(), STUDENT_HEADERS.length);
  const rowValues = new Array(width).fill("");

  Object.entries(valuesByHeader).forEach(([headerName, value]) => {
    const columnIndex = columnMap[headerName];
    if (columnIndex) {
      rowValues[columnIndex - 1] = value;
    }
  });

  return rowValues;
}

function updateStudentRowValues(sheet, rowNumber, valuesByHeader) {
  const columnMap = getStudentColumnMap(sheet);

  Object.entries(valuesByHeader).forEach(([headerName, value]) => {
    const columnIndex = columnMap[headerName];
    if (columnIndex) {
      sheet.getRange(rowNumber, columnIndex).setValue(value);
    }
  });
}

function validateStudentPayload(params, sheet, currentStudentId) {
  validateStudentStatusRules_(params);

  const name = sanitizeText(params.name);
  const school = sanitizeText(params.school);
  const duplicateId = findDuplicateStudentId(sheet, name, school, currentStudentId);
  if (duplicateId) {
    throw new Error(`同じ氏名・学校名の学生が既にいます: ${duplicateId}`);
  }
}

function validateStudentStatusRules_(params) {
  const name = sanitizeText(params.name);
  const school = sanitizeText(params.school);
  const interviewStatus = sanitizeText(params.interviewStatus);
  const resultStatus = sanitizeText(params.resultStatus);
  const offerStatus = sanitizeText(params.offerStatus);
  const expectedJoinStatus = sanitizeText(params.expectedJoinStatus);
  const salonTourStatus = sanitizeText(params.salonTourStatus);
  const nextActionDate = sanitizeText(params.nextActionDate);

  if (!name) throw new Error("氏名を入力してください。");
  if (!school) throw new Error("学校名を入力してください。");

  if ((offerStatus === "内定" || offerStatus === "承諾") && interviewStatus !== "実施済") {
    throw new Error("内定・承諾にする場合は、面接ステータスを「実施済」にしてください。");
  }

  if ((expectedJoinStatus === "入社予定" || expectedJoinStatus === "入社済") && offerStatus !== "内定" && offerStatus !== "承諾") {
    throw new Error("入社予定・入社済にする場合は、内定ステータスを「内定」または「承諾」にしてください。");
  }

  if (resultStatus === "不合格" && (offerStatus === "内定" || offerStatus === "承諾")) {
    throw new Error("選考結果が不合格の場合、内定ステータスは「未定」または「辞退」にしてください。");
  }

  if ((salonTourStatus === "予定" || interviewStatus === "予定") && !nextActionDate) {
    throw new Error("見学予定・面接予定の場合は、次アクション日を入力してください。");
  }
}

function findDuplicateStudentId(sheet, name, school, currentStudentId) {
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return "";

  const columnMap = getStudentColumnMap(sheet);
  const rows = sheet.getDataRange().getValues().slice(1);
  const normalizedName = normalizeForDuplicateCheck(name);
  const normalizedSchool = normalizeForDuplicateCheck(school);

  for (let index = 0; index < rows.length; index += 1) {
    const studentId = String(getRowValue(rows[index], columnMap, "学生ID") || "").trim();
    if (currentStudentId && studentId === currentStudentId) continue;

    const rowName = normalizeForDuplicateCheck(getRowValue(rows[index], columnMap, "氏名"));
    const rowSchool = normalizeForDuplicateCheck(getRowValue(rows[index], columnMap, "学校名"));
    if (rowName === normalizedName && rowSchool === normalizedSchool) {
      return studentId;
    }
  }

  return "";
}

function normalizeForDuplicateCheck(value) {
  return String(value || "")
    .normalize("NFKC")
    .replace(/[\s\u3000\u200B-\u200D\uFEFF]+/g, "")
    .toLowerCase()
    .trim();
}

function ensureStudentAuditColumns(sheet) {
  const managementStatusIndex = ensureColumnAfterHeader(sheet, "管理状態", "メモ");
  fillBlankColumnValues(sheet, "管理状態", "有効", "学生ID");
  const updatedAtIndex = ensureColumnAfterHeader(sheet, "更新日時", "管理状態");
  const updatedByIndex = ensureColumnAfterHeader(sheet, "更新者", "更新日時");
  const rowCount = Math.max(sheet.getMaxRows() - 1, 1);
  const managementRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(["有効", "管理対象外"], true)
    .setAllowInvalid(false)
    .build();
  sheet.getRange(2, managementStatusIndex, rowCount, 1).setDataValidation(managementRule);
  sheet.getRange(2, updatedAtIndex, Math.max(sheet.getMaxRows() - 1, 1), 1).setNumberFormat("yyyy/mm/dd hh:mm");
  sheet.getRange(1, managementStatusIndex).setFontWeight("bold").setBackground("#eef5fc");
  sheet.getRange(1, updatedByIndex).setFontWeight("bold").setBackground("#eef5fc");
}

function appendOperationLog(action, sheetName, studentId, studentName, operator, detail) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = getOrCreateOperationLogSheet(ss);
  sheet.appendRow([
    new Date(),
    action,
    sheetName,
    studentId,
    studentName,
    operator,
    detail
  ]);
  sheet.getRange("A2:A1000").setNumberFormat("yyyy/mm/dd hh:mm");
}

function getOrCreateOperationLogSheet(ss) {
  const headers = ["日時", "操作", "対象シート", "学生ID", "氏名", "更新者", "内容"];
  let sheet = ss.getSheetByName("操作履歴");

  if (!sheet) {
    sheet = ss.insertSheet("操作履歴");
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  }

  const currentHeaders = sheet.getRange(1, 1, 1, headers.length).getValues()[0];
  const needsHeader = headers.some((header, index) => String(currentHeaders[index] || "") !== header);
  if (needsHeader) {
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  }

  formatBasicSheet(sheet, headers.length);
  return sheet;
}

function getOperatorName() {
  try {
    const activeEmail = Session.getActiveUser().getEmail();
    if (activeEmail) return activeEmail;
  } catch (error) {
    // Webアプリ実行条件によっては取得できないため、固定名にフォールバックする。
  }

  return "ダッシュボード";
}

function findStudentRow(sheet, studentId) {
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return 0;

  const columnMap = getStudentColumnMap(sheet);
  const studentIdColumn = columnMap["学生ID"] || 1;
  const ids = sheet.getRange(2, studentIdColumn, lastRow - 1, 1).getValues();
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

  const columnMap = getStudentColumnMap(sheet);
  const studentIdColumn = columnMap["学生ID"] || 1;
  const ids = sheet.getRange(2, studentIdColumn, lastRow - 1, 1).getValues();
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
    if (student.managementStatus === "管理対象外") return summary;

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
      "メモ",
      "管理状態",
      "更新日時",
      "更新者"
    ],
    [
      ["S-0001", "山田 花", "女性", "国際文化理容美容専門学校 国分寺校", "2年", "ヘアワークス 新宿", new Date(2026, 5, 3), "登録済", "実施済", "実施済", "合格", "内定", "入社予定", "総務人事", "内定後フォロー面談", new Date(2026, 6, 5), "BASSA池袋に関心", "有効", new Date(), "初期データ"],
      ["S-0002", "佐藤 美咲", "女性", "山野美容専門学校", "2年", "東京総合", new Date(2026, 5, 15), "登録済", "予定", "未設定", "未定", "未定", "未定", "総務人事", "見学前リマインド", new Date(2026, 5, 25), "カラー教育に興味", "有効", new Date(), "初期データ"],
      ["S-0003", "鈴木 里奈", "女性", "横浜ビューティーアート専門学校", "2年", "学校訪問", new Date(2026, 5, 10), "登録済", "実施済", "予定", "未定", "未定", "未定", "総務人事", "面接日程確認", new Date(2026, 5, 28), "", "有効", new Date(), "初期データ"],
      ["S-0004", "田中 優", "男性", "パリ総合美容専門学校", "2年", "さんぽう美容就職フェア 高田馬場", new Date(2026, 3, 18), "登録済", "未設定", "未設定", "未定", "未定", "未定", "総務人事", "見学誘導LINE送信", "", "LINE反応あり", "有効", new Date(), "初期データ"],
      ["S-0005", "高橋 杏", "女性", "高山美容専門学校", "1年", "エイド 代々木", new Date(2026, 4, 24), "登録済", "未設定", "未設定", "未定", "未定", "未定", "総務人事", "学校訪問時に再接点", "", "次年度候補", "有効", new Date(), "初期データ"]
    ]
  );

  applySheetRules(ss);
  getOrCreateOperationLogSheet(ss);

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
  ensureStudentAuditColumns(studentSheet);
  fillBlankColumnValues(studentSheet, "性別", "未回答", "学生ID");

  [
    "学生管理_27卒",
    "学生管理_28卒",
    "学生管理_サロン実習",
    "学生管理_全件参考"
  ].forEach((sheetName) => {
    const sheet = ss.getSheetByName(sheetName);
    if (sheet) {
      ensureColumnAfterHeader(sheet, "性別", "氏名");
      ensureStudentAuditColumns(sheet);
      fillBlankColumnValues(sheet, "性別", "未回答", "学生ID");
    }
  });

  applySheetRules(ss);
  getOrCreateOperationLogSheet(ss);

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
  formatBasicSheet(ss.getSheetByName("学生管理"), 20);

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

    ensureStudentAuditColumns(studentSheet);
    formatBasicSheet(studentSheet, 20);
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

function formatDateTimeValue(value) {
  if (value instanceof Date) {
    return Utilities.formatDate(value, "Asia/Tokyo", "yyyy-MM-dd HH:mm");
  }
  return String(value || "");
}

