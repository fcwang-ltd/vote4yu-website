/**
 * Google Apps Script — deploy as Web App (Execute as: Me, Who has access: Anyone).
 * Bind to a spreadsheet with tabs: Commit, TalkToYu, Volunteer, Business, Interview, Subscribe, DonateIntent.
 *
 * Set the deploy URL as PUBLIC_FORMS_ENDPOINT in the Astro env / GitHub Actions secrets.
 *
 * Paste into script.google.com (do not commit secrets).
 */

export const APPS_SCRIPT_TEMPLATE = `
function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    if (data.website) {
      return ContentService.createTextOutput(JSON.stringify({ ok: true }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var tabMap = {
      commit: 'Commit',
      talk: 'TalkToYu',
      volunteer: 'Volunteer',
      business: 'Business',
      interview: 'Interview',
      subscribe: 'Subscribe',
      donateIntent: 'DonateIntent'
    };
    var sheetName = tabMap[data.kind] || 'Commit';
    var sheet = ss.getSheetByName(sheetName);
    if (!sheet) sheet = ss.insertSheet(sheetName);

    var row = [new Date(), data.locale || '', data.kind];
    Object.keys(data).forEach(function (k) {
      if (k === 'kind' || k === 'locale' || k === 'website' || k === 'submittedAt') return;
      row.push(k + ': ' + data[k]);
    });
    sheet.appendRow(row);

    return ContentService.createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService.createTextOutput('Vote4Yu forms OK');
}
`.trim();
