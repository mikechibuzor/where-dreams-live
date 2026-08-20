const DOWNLOAD_SHEET_NAME = "Downloads";
const DOWNLOAD_SHEET_HEADERS = [
  "Timestamp",
  "Issue",
  "Request ID",
  "Referrer",
  "Country",
  "User Agent",
];

/** Run once from the Apps Script editor while this script is bound to the sheet. */
function setupDownloadSheet() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  if (!spreadsheet) {
    throw new Error("Open Apps Script from the target Google Sheet, then run setup again.");
  }

  PropertiesService.getScriptProperties().setProperty(
    "SPREADSHEET_ID",
    spreadsheet.getId(),
  );

  const sheet = getOrCreateDownloadSheet_(spreadsheet);
  sheet.setFrozenRows(1);
  sheet.getRange(1, 1, 1, DOWNLOAD_SHEET_HEADERS.length).setFontWeight("bold");
  sheet.autoResizeColumns(1, DOWNLOAD_SHEET_HEADERS.length);
}

function doPost(event) {
  const scriptProperties = PropertiesService.getScriptProperties();
  const expectedSecret = scriptProperties.getProperty("TRACKING_SECRET");
  const spreadsheetId = scriptProperties.getProperty("SPREADSHEET_ID");

  if (!expectedSecret || !spreadsheetId) {
    return jsonResponse_({ ok: false, error: "Tracker is not configured." });
  }

  let payload;
  try {
    payload = JSON.parse(event.postData.contents);
  } catch (error) {
    return jsonResponse_({ ok: false, error: "Invalid JSON." });
  }

  if (payload.secret !== expectedSecret) {
    return jsonResponse_({ ok: false, error: "Unauthorized." });
  }

  const lock = LockService.getScriptLock();
  if (!lock.tryLock(5_000)) {
    return jsonResponse_({ ok: false, error: "Tracker is busy." });
  }

  try {
    const spreadsheet = SpreadsheetApp.openById(spreadsheetId);
    const sheet = getOrCreateDownloadSheet_(spreadsheet);
    const timestamp = payload.timestamp ? new Date(payload.timestamp) : new Date();

    sheet.appendRow([
      Number.isNaN(timestamp.getTime()) ? new Date() : timestamp,
      safeCell_(payload.issue),
      safeCell_(payload.requestId),
      safeCell_(payload.referrer),
      safeCell_(payload.country),
      safeCell_(payload.userAgent),
    ]);

    return jsonResponse_({ ok: true });
  } finally {
    lock.releaseLock();
  }
}

function getOrCreateDownloadSheet_(spreadsheet) {
  const sheet = spreadsheet.getSheetByName(DOWNLOAD_SHEET_NAME)
    || spreadsheet.insertSheet(DOWNLOAD_SHEET_NAME);

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(DOWNLOAD_SHEET_HEADERS);
  }

  return sheet;
}

function safeCell_(value) {
  const cellValue = String(value || "");
  return /^[=+\-@]/.test(cellValue) ? `'${cellValue}` : cellValue;
}

function jsonResponse_(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
