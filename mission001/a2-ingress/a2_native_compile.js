const fs = require('fs');
const crypto = require('crypto');
const { chromium } = require('playwright-core');

const EXPECTED = '9b8eca4c8cf2e151083020f4b3c2812b0ba3f04502c33fb6af892f0371712137';
const SOURCE_PATH = '/tmp/mission001-a2/MISSION001_TrackA_BotV1_FullDerivative_v0.3.pine';
const EVIDENCE_DIR = 'mission001/a2-evidence';
const sourceBytes = fs.readFileSync(SOURCE_PATH);
const source = sourceBytes.toString('utf8');
const sha = crypto.createHash('sha256').update(sourceBytes).digest('hex');
if (sha !== EXPECTED) process.exit(42);

(async () => {
  fs.mkdirSync(EVIDENCE_DIR, { recursive: true });
  const result = {
    mission: 'MISSION-001', gate: 'A2_NATIVE_TRADINGVIEW_COMPILE_EXACT_P0', route: 'A2_INGRESS_001_GH2_FOCUS_V2',
    timestamp_utc: new Date().toISOString(), expected_sha256: EXPECTED, materialized_sha256: sha,
    source_size_bytes: sourceBytes.length, target: 'https://www.tradingview.com/chart/?symbol=OANDA%3AXAUUSD',
    browser: 'GitHub-hosted Ubuntu / Google Chrome / Playwright', page_loaded: false,
    pine_control_found: false, pine_click_succeeded: false, editor_surface_detected: false,
    source_injection_attempted: false, source_injection_completed: false,
    editor_readback_sha256: null, editor_readback_verdict: 'NOT_AVAILABLE',
    add_to_chart_found: false, add_to_chart_clicked: false, login_gate_visible: false,
    compiler_evidence_lines: [], script_title_visible_after_compile: false,
    compile_verdict: 'UNRESOLVED', error: null
  };
  let browser;
  try {
    browser = await chromium.launch({ channel: 'chrome', headless: true });
    const context = await browser.newContext({ locale: 'en-US', viewport: { width: 1600, height: 1100 } });
    await context.grantPermissions(['clipboard-read', 'clipboard-write'], { origin: 'https://www.tradingview.com' }).catch(() => {});
    const page = await context.newPage();
    const response = await page.goto(result.target, { waitUntil: 'domcontentloaded', timeout: 60000 });
    result.page_loaded = !!response && response.status() < 500;
    result.http_status = response ? response.status() : null;
    result.final_url = page.url();
    result.page_title = await page.title();
    await page.waitForTimeout(12000);

    const pineSelectors = ['[aria-label*="Pine" i]','[title*="Pine" i]','button:has-text("Pine")','[role="button"]:has-text("Pine")','[data-name*="pine" i]'];
    let control = null;
    for (const sel of pineSelectors) {
      const loc = page.locator(sel); const n = await loc.count().catch(() => 0);
      for (let i=0;i<n;i++) if (await loc.nth(i).isVisible().catch(() => false)) { control=loc.nth(i); break; }
      if (control) break;
    }
    result.pine_control_found = !!control;
    if (!control) throw new Error('Pine control not found');
    await control.click({ timeout: 10000, force: true }); result.pine_click_succeeded = true; await page.waitForTimeout(7000);

    const body0 = await page.locator('body').innerText().catch(() => '');
    result.login_gate_visible = /Sign in|Log in/i.test(body0);
    result.editor_surface_detected = /Pine Editor|Add to chart|Update on chart|Create new/i.test(body0) || (await page.locator('.monaco-editor,[class*="monaco-editor"]').count().catch(() => 0)) > 0;
    if (!result.editor_surface_detected) throw new Error('Pine editor surface not detected');

    const textarea = page.locator('.monaco-editor textarea, textarea.inputarea, textarea[aria-roledescription="editor"]').first();
    if (!(await textarea.count())) throw new Error('Editor textarea not found');
    await textarea.evaluate(el => el.focus());
    result.source_injection_attempted = true;
    await page.keyboard.press('Control+A');
    await page.keyboard.press('Backspace');
    await page.keyboard.insertText(source);
    result.source_injection_completed = true;
    await page.waitForTimeout(5000);

    try {
      await textarea.evaluate(el => el.focus());
      await page.keyboard.press('Control+A'); await page.keyboard.press('Control+C'); await page.waitForTimeout(1000);
      const copied = await page.evaluate(() => navigator.clipboard.readText());
      if (copied) {
        const copiedSha = crypto.createHash('sha256').update(Buffer.from(copied,'utf8')).digest('hex');
        result.editor_readback_sha256 = copiedSha;
        result.editor_readback_verdict = copiedSha === EXPECTED ? 'PASS' : 'HASH_MISMATCH';
        if (copiedSha !== EXPECTED) { result.compile_verdict='ABORT_EDITOR_HASH_MISMATCH'; throw new Error(`Editor readback SHA mismatch: ${copiedSha}`); }
      }
    } catch (e) {
      if (result.editor_readback_verdict === 'HASH_MISMATCH') throw e;
      result.editor_readback_error=String(e); result.editor_readback_verdict='NOT_AVAILABLE';
    }

    const addSelectors=['button:has-text("Add to chart")','[role="button"]:has-text("Add to chart")','button:has-text("Update on chart")','[role="button"]:has-text("Update on chart")'];
    let add=null;
    for (const sel of addSelectors) {
      const loc=page.locator(sel); const n=await loc.count().catch(()=>0);
      for(let i=0;i<n;i++) if(await loc.nth(i).isVisible().catch(()=>false)){add=loc.nth(i);break;}
      if(add)break;
    }
    result.add_to_chart_found=!!add;
    if(!add)throw new Error('Add/Update on chart control not found');
    await add.click({timeout:15000, force:true}); result.add_to_chart_clicked=true; await page.waitForTimeout(18000);

    const body=await page.locator('body').innerText().catch(()=> '');
    fs.writeFileSync(`${EVIDENCE_DIR}/a2_tradingview_body.txt`,body);
    const lines=body.split(/\r?\n/).map(s=>s.trim()).filter(Boolean);
    const errorPattern=/(Error at \d+:\d+|Syntax error|Undeclared identifier|Mismatched input|Cannot call|Could not find function|Could not find method|Pine cannot|Compilation error|script has too many|too many plots|The script must have)/i;
    result.compiler_evidence_lines=[...new Set(lines.filter(x=>errorPattern.test(x)))].slice(0,100);
    result.script_title_visible_after_compile=body.includes('Nam Zone06 EA Strategy v0.4 CT-W2 Rebound [RESEARCH]');
    await page.screenshot({path:`${EVIDENCE_DIR}/a2_native_compile.png`,fullPage:false});
    if(result.compiler_evidence_lines.length>0) result.compile_verdict='NATIVE_COMPILE_FAIL';
    else if(result.add_to_chart_clicked && result.script_title_visible_after_compile) result.compile_verdict='NATIVE_COMPILE_PASS';
    else if(result.add_to_chart_clicked) result.compile_verdict='COMPILE_ACTION_COMPLETED_NO_VISIBLE_COMPILER_ERROR_TITLE_UNVERIFIED';
  } catch(e) {
    result.error=String(e); if(result.compile_verdict==='UNRESOLVED')result.compile_verdict='EXECUTION_FAIL';
  } finally {
    if(browser)await browser.close();
    fs.writeFileSync(`${EVIDENCE_DIR}/a2_native_compile_result.json`,JSON.stringify(result,null,2)+'\n');
    console.log(JSON.stringify(result));
  }
})();
