// puppet_worker.js
const puppeteer = require("puppeteer");

const {
  BASE_URL,
  LOGIN_PATH,
  TARGET_URL,
  USERNAME,
  PASSWORD,
  SOURCE = "puppet",
  INTERVAL_MS = "30000",   // 30s between attempts
  NAV_TIMEOUT_MS = "20000",
  HEADLESS = "new",
  VERBOSE = "0"
} = process.env;

function log(...args) {
  if (VERBOSE === "1") console.log(new Date().toISOString(), ...args);
}
const sleep = (ms) => new Promise(r => setTimeout(r, ms));

async function login(page, loginApi, username, password, source) {
  log("Logging in at", loginApi);
  const res = await page.evaluate(async (loginApi, username, password, source) => {
    try {
      const r = await fetch(loginApi, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ username, password, source })
      });
      return { ok: r.ok, text: await r.text() };
    } catch (e) {
      return { ok: false, text: String(e) };
    }
  }, loginApi, username, password, source);
  if (!res.ok) throw new Error("login failed: " + res.text);
  log("Login OK");
  const cookies = await page.cookies();
  log("Current cookies:", JSON.stringify(cookies, null, 2));
}

async function visit(page, url) {
  const target = new URL(url);
  target.searchParams.set("_t", Date.now().toString());
  log("Visiting", target.toString());
  await page.goto(target.toString(), { waitUntil: "networkidle0" });
}

(async () => {
  if (!BASE_URL || !LOGIN_PATH || !TARGET_URL || !USERNAME || !PASSWORD) {
    console.error("Missing env vars: BASE_URL, LOGIN_PATH, TARGET_URL, USERNAME, PASSWORD");
    process.exit(2);
  }

  const loginApi = new URL(LOGIN_PATH, BASE_URL).toString();
  const targetUrl = new URL(TARGET_URL, BASE_URL).toString();
  const intervalMs = parseInt(INTERVAL_MS, 10);

  const browser = await puppeteer.launch({
    headless: HEADLESS,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();
  page.setDefaultNavigationTimeout(parseInt(NAV_TIMEOUT_MS, 10));

  // Initial login (will retry after interval if it fails)
  for (;;) {
    try {
      await page.goto(BASE_URL, { waitUntil: "domcontentloaded" });
      await login(page, loginApi, USERNAME, PASSWORD, SOURCE);
      break; // login successful
    } catch (e) {
      log("Login attempt failed:", e.message);
      log(`Retrying in ${intervalMs}ms`);
      await sleep(intervalMs);
    }
  }

  // Regular 30s loop
  for (;;) {
    try {
      await visit(page, targetUrl);
      log(`Visit complete; next in ${intervalMs}ms`);
    } catch (e) {
      log("Visit error:", e.message);
    }
    await sleep(intervalMs);
  }
})();