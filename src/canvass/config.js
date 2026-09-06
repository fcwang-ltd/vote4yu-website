/* ============================================================================
   config.js — THE ONLY FILE YOU NEED TO EDIT.
   Follow SETUP-MVP.md, then paste your two values below.
   ========================================================================== */
window.CONFIG = {

  // 1. Paste the Apps Script Web App URL here (ends in /exec).
  //    Leave it empty to run the app in offline-only mode — everything still
  //    works, nothing syncs, and volunteers can export CSV at end of shift.
  SCRIPT_URL: '',

  // 2. Any random string. Must match TOKEN in apps-script/Code.gs exactly.
  //    This only stops idle passers-by writing junk into your Sheet.
  TOKEN: 'change-me',

  // Neighbourhoods volunteers can see. Add more names to widen.
  // Available: Cathedraltown, Cachet, Buttonville, Victoria Square, Other
  NEIGHBOURHOODS: ['Cathedraltown'],

  // Ask each volunteer for their name once, and tag every row with it.
  ASK_NAME: true,
};
