// Requires a dev server already running at http://127.0.0.1:$PORT (defaults
// to 5176; run via e2e-tests/run.sh, or set the PORT env var yourself).
//
// SettingsPanel layout: fields are grouped into white "card" sections (iOS
// Settings style, aligned with the main view's gray page / white cards
// look), with "Mode debug" as its own group at the end of the panel.
import assert from 'node:assert/strict';
import { chromium } from 'playwright';

const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await browser.newPage({ locale: 'fr-FR' });
page.on('pageerror', (err) => {
  throw new Error(`Page error: ${err.message}`);
});
await page.goto(`http://127.0.0.1:${process.env.PORT ?? 5176}/`);
// Simulate a returning user (settings already chosen) so the first-launch
// settings modal does not pop up and intercept clicks meant for this test.
await page.evaluate(() => {
  localStorage.setItem('donorSettings', JSON.stringify({ countryCode: 'BE', sex: 'male' }));
});
await page.reload();
await page.waitForTimeout(300);

await page.click('button[aria-label="Menu"]');
await page.click('button:has-text("Paramètres")');
await page.waitForTimeout(300);

const groups = page.locator('.sheet .card-stack > .card-group');
assert.equal(await groups.count(), 4, 'expected 4 settings groups in the settings panel');

// Each row's own label text is in a text node preceding its <select>/<input>
// — read that instead of the row's full textContent, which for a <select>
// also includes every (non-selected) <option>'s text.
const firstGroupFields = await groups.nth(0).locator('> label').evaluateAll((rows) =>
  rows.map((row) => row.firstChild?.textContent?.trim() ?? '')
);
assert.deepEqual(
  firstGroupFields,
  ['Pays (règles applicables)', 'Sexe', 'Langue', 'Thème'],
  'expected the first group to hold, in order, the country/sex/language/theme fields'
);

const lastGroupText = await groups.nth(3).evaluate((el) => el.textContent?.trim());
assert.ok(lastGroupText?.startsWith('Mode debug'), 'expected "Mode debug" to be its own, last group in the panel');

await browser.close();
console.log('OK: SettingsPanel is split into grouped cards, with "Mode debug" moved to its own group at the end.');
