# Forms → Google Sheets setup

Custom Astro forms POST JSON to a Google Apps Script Web App, which appends rows to a spreadsheet.

## 1. Create the spreadsheet

Create a Google Sheet with tabs named:

- `Commit`
- `TalkToYu`
- `Volunteer`
- `Business`
- `Interview`
- `Subscribe`
- `DonateIntent`

## 2. Deploy the script

1. Open **Extensions → Apps Script** on the spreadsheet.
2. Paste the template from [`scripts/forms-apps-script.js.template.ts`](../scripts/forms-apps-script.js.template.ts) (the string between backticks, or the `doPost` / `doGet` functions).
3. Deploy → New deployment → Web app.
   - Execute as: **Me**
   - Who has access: **Anyone**
4. Copy the Web App URL.

## 3. Configure the site

Create `.env` (not committed) or set a GitHub Actions secret / repository variable:

```
PUBLIC_FORMS_ENDPOINT=https://script.google.com/macros/s/XXXX/exec
```

Rebuild the site so Astro inlines the public env var.

## 4. Test

Submit Commit to Vote on the homepage. A new row should appear on the `Commit` tab.

If `PUBLIC_FORMS_ENDPOINT` is empty, forms show the “not configured” message and ask users to email `hello@vote4yu.ca`.

## Fallback

Tally → Google Sheets remains a fallback if Apps Script is blocked; prefer custom forms for brand-matched UI.
