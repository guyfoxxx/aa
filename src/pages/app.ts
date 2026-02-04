import type { Env } from "../env";
import { escapeHtml } from "../lib/utils";

export function appHtml(env: Env) {
  // Minimal Telegram Mini App
  return `<!doctype html>
<html lang="fa" dir="rtl">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Valinaf25 Mini App</title>
  <script src="https://telegram.org/js/telegram-web-app.js"></script>
  <style>
    :root{
      --bg:#0a0d16;
      --panel:#101826;
      --panel-2:#0f1b2e;
      --stroke:#1f2c44;
      --text:#e9eef7;
      --muted:#a9b6cc;
      --brand:#4c8dff;
      --brand-2:#7b5bff;
      --good:#2ee59d;
      --warn:#ffb020;
      --radius:18px;
      --shadow:0 24px 60px rgba(0,0,0,.45);
    }
    *{box-sizing:border-box}
    body{
      font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto;
      margin:0;
      color:var(--text);
      background:
        radial-gradient(1000px 500px at 80% -10%, rgba(76,141,255,.25), transparent 60%),
        radial-gradient(900px 500px at 20% 0%, rgba(123,91,255,.22), transparent 65%),
        var(--bg);
      min-height:100vh;
    }
    .wrap{max-width:960px; margin:0 auto; padding:18px 16px 40px}
    .hero{
      display:flex; align-items:center; justify-content:space-between; gap:16px;
      padding:18px;
      border-radius:var(--radius);
      border:1px solid rgba(255,255,255,.06);
      background: linear-gradient(180deg, rgba(16,24,38,.85), rgba(16,24,38,.55));
      box-shadow: var(--shadow);
      backdrop-filter: blur(12px);
    }
    .hero h1{margin:0; font-size:20px}
    .hero .sub{color:var(--muted); font-size:12px}
    .card{
      margin-top:14px;
      padding:16px;
      border-radius:var(--radius);
      border:1px solid rgba(255,255,255,.06);
      background: linear-gradient(180deg, rgba(16,27,46,.75), rgba(16,24,38,.55));
      box-shadow: var(--shadow);
      backdrop-filter: blur(12px);
    }
    .row{display:flex; gap:10px; flex-wrap:wrap}
    .pill{padding:6px 12px; border-radius:999px; background:#0f1626; border:1px solid var(--stroke); font-size:12px}
    .chip{padding:4px 10px; border-radius:999px; background:rgba(76,141,255,.15); border:1px solid rgba(76,141,255,.3); font-size:11px}
    .muted{color:var(--muted); font-size:12px}
    .grid{display:grid; grid-template-columns:1fr 1fr; gap:10px}
    .bar{height:10px; background:#0f1626; border:1px solid var(--stroke); border-radius:999px; overflow:hidden}
    .bar > div{height:100%; background:linear-gradient(90deg, var(--brand), var(--brand-2)); width:0%}
    button{
      background: linear-gradient(135deg, var(--brand), var(--brand-2));
      color:white; border:0; padding:10px 12px; border-radius:12px; font-weight:700; cursor:pointer;
      box-shadow: 0 12px 30px rgba(76,141,255,.25);
    }
    button.secondary{
      background:#0f1626; border:1px solid var(--stroke); box-shadow:none;
    }
    input,select,textarea{
      width:100%; padding:10px; border-radius:12px; border:1px solid var(--stroke);
      background:#0f1626; color:var(--text);
    }
    a{color:#8bb5ff}
    .banner{border:1px dashed rgba(123,91,255,.55); background: rgba(123,91,255,.08)}
    .section-title{margin:0 0 10px; font-size:15px}
    .status{display:flex; gap:10px; align-items:center; flex-wrap:wrap}
    .status .dot{width:8px; height:8px; border-radius:999px; background:var(--good)}
    .split{display:grid; grid-template-columns:1.1fr .9fr; gap:12px}
    @media (max-width: 720px){
      .grid,.split{grid-template-columns:1fr}
      .hero{flex-direction:column; align-items:flex-start}
    }
  </style>
</head>
<body>
  <div class="wrap">
    <header class="hero">
      <div>
        <div class="muted">Mini App • Market IQ</div>
        <h1>داشبورد هوشمند ترید</h1>
        <div class="sub">مدیریت سهمیه، تنظیمات و تحلیل سریع بازار</div>
      </div>
      <div class="row">
        <span class="chip">تحلیل فوری</span>
        <span class="chip">پروفایل و کیف پول</span>
      </div>
    </header>

    <div id="banner" class="card banner" style="display:none">
      <div class="section-title">🎁 آفر ویژه</div>
      <div id="bannerText"></div>
      <div style="margin-top:8px"><a id="bannerLink" href="#" target="_blank">مشاهده</a></div>
    </div>

    <div class="card">
      <div class="row">
        <div class="pill" id="pName">نام: ...</div>
        <div class="pill" id="pPoints">امتیاز: ...</div>
        <div class="pill" id="pInvites">دعوت موفق: ...</div>
      </div>
      <div class="status" style="margin-top:10px">
        <span class="dot"></span>
        <div class="muted" id="pSub">اشتراک: ...</div>
      </div>

      <div class="split" style="margin-top:14px">
        <div>
          <div class="muted">سهمیه روزانه</div>
          <div class="bar"><div id="dailyBar"></div></div>
          <div class="muted" id="dailyText" style="margin-top:6px">...</div>
        </div>
        <div>
          <div class="muted">سهمیه ماهانه</div>
          <div class="bar"><div id="monthBar"></div></div>
          <div class="muted" id="monthText" style="margin-top:6px">...</div>
        </div>
      </div>
    </div>

    <div class="card">
      <h3 class="section-title">📈 تحلیل سریع</h3>
      <div class="grid">
        <select id="market">
          <option value="CRYPTO">کریپتو</option>
          <option value="FOREX">فارکس</option>
          <option value="METALS">فلزات</option>
          <option value="STOCKS">سهام</option>
        </select>
        <input id="symbol" placeholder="نماد (مثلاً BTCUSDT یا BTC-USD یا EURUSD=X)" />
      </div>
      <button style="margin-top:10px" id="run">اجرای تحلیل</button>
      <div id="out" style="margin-top:12px; white-space:pre-wrap"></div>
      <div id="img" style="margin-top:12px"></div>
    </div>

    <div class="card">
      <h3 class="section-title">⚙️ تنظیمات</h3>
      <div class="grid">
        <select id="tf">
          <option value="M15">M15</option>
          <option value="H1">H1</option>
          <option value="H4">H4</option>
          <option value="D1">D1</option>
        </select>
        <select id="risk">
          <option value="LOW">ریسک کم</option>
          <option value="MEDIUM">ریسک متوسط</option>
          <option value="HIGH">ریسک زیاد</option>
        </select>
        <select id="style">
          <option value="GENERAL">پرامپت عمومی</option>
          <option value="RTM">RTM</option>
          <option value="ICT">ICT</option>
          <option value="PA">پرایس اکشن</option>
          <option value="ATR">ATR (Volatility)</option>
          <option value="CUSTOM">پرامپت اختصاصی</option>
        </select>
        <select id="news">
          <option value="OFF">خبر خاموش</option>
          <option value="ON">خبر روشن</option>
        </select>
      </div>
      <button style="margin-top:10px" id="save">ذخیره</button>
      <div id="saveMsg" class="muted" style="margin-top:8px"></div>
    </div>

    <div class="card">
      <h3 class="section-title">💳 کیف پول</h3>
      <div class="muted">آدرس برداشت BEP20</div>
      <input id="bep20" placeholder="0x..." />
      <button style="margin-top:10px" id="saveWallet">ثبت آدرس</button>
      <div class="grid" style="margin-top:10px">
        <input id="amt" placeholder="مبلغ (USDT)" />
        <select id="wkind">
          <option value="deposit">درخواست واریز</option>
          <option value="withdraw">درخواست برداشت</option>
        </select>
      </div>
      <button style="margin-top:10px" id="walletReq">ثبت درخواست</button>
      <div id="wmsg" class="muted" style="margin-top:8px"></div>
    </div>
  </div>

<script>
  const tg = window.Telegram?.WebApp;
  tg?.ready();
  tg?.expand();

  async function api(path, body) {
    const res = await fetch(path, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-telegram-init-data": tg?.initData || ""
      },
      body: JSON.stringify(body || {})
    });
    return res.json();
  }

  function setBar(el, pct) {
    el.style.width = Math.max(0, Math.min(100, pct)) + "%";
  }

  async function load() {
    const me = await api("/api/me");
    if (!me.ok) {
      document.body.innerHTML = "<div style='padding:18px'>خطا در احراز هویت Mini App. لطفاً از داخل تلگرام باز کنید.</div>";
      return;
    }

    document.getElementById("pName").textContent = "نام: " + (me.user.name || me.user.firstName || "—");
    document.getElementById("pPoints").textContent = "امتیاز: " + me.user.points;
    document.getElementById("pInvites").textContent = "دعوت موفق: " + me.user.successfulInvites;
    document.getElementById("pSub").textContent = "اشتراک: " + (me.user.subscription.active ? ("فعال تا " + (me.user.subscription.expiresAt || "")) : "غیرفعال");

    document.getElementById("tf").value = me.user.settings.timeframe;
    document.getElementById("risk").value = me.user.settings.risk;
    document.getElementById("style").value = me.user.settings.style;
    document.getElementById("news").value = me.user.settings.news;

    const bep = document.getElementById("bep20");
    if (bep) bep.value = (me.user.wallet && me.user.wallet.bep20Address) ? me.user.wallet.bep20Address : "";

    // quota bars
    const dPct = me.quota.limits.daily === Infinity ? 0 : (me.user.quota.dailyUsed / me.quota.limits.daily) * 100;
    const mPct = me.quota.limits.monthly === Infinity ? 0 : (me.user.quota.monthlyUsed / me.quota.limits.monthly) * 100;
    setBar(document.getElementById("dailyBar"), dPct);
    setBar(document.getElementById("monthBar"), mPct);
    document.getElementById("dailyText").textContent = me.quota.dailyLeft === Infinity ? "نامحدود" : ("باقی‌مانده: " + me.quota.dailyLeft);
    document.getElementById("monthText").textContent = me.quota.monthLeft === Infinity ? "نامحدود" : ("باقی‌مانده: " + me.quota.monthLeft);

    // banner
    if (me.banner && me.banner.enabled) {
      document.getElementById("banner").style.display = "block";
      document.getElementById("bannerText").textContent = me.banner.text;
      document.getElementById("bannerLink").href = me.banner.url || "#";
    }
  }

  document.getElementById("save").onclick = async () => {
    const body = {
      settings: {
        timeframe: document.getElementById("tf").value,
        risk: document.getElementById("risk").value,
        style: document.getElementById("style").value,
        news: document.getElementById("news").value
      }
    };
    const r = await api("/api/settings", body);
    document.getElementById("saveMsg").textContent = r.ok ? "ذخیره شد ✅" : (r.error || "خطا");
    if (r.ok) load();
  };

  document.getElementById("run").onclick = async () => {
    document.getElementById("out").textContent = "در حال تحلیل...";
    document.getElementById("img").innerHTML = "";
    const body = {
      symbol: document.getElementById("symbol").value,
      market: document.getElementById("market").value
    };
    const r = await api("/api/analyze", body);
    if (!r.ok) {
      document.getElementById("out").textContent = r.error || "خطا";
      return;
    }
    document.getElementById("out").textContent = r.text;
    if (r.chartUrl) {
      const img = document.createElement("img");
      img.src = r.chartUrl;
      img.style.width = "100%";
      img.style.borderRadius = "14px";
      document.getElementById("img").appendChild(img);
    }
  };

  load();

document.getElementById("saveWallet").onclick = async () => {
  const addr = document.getElementById("bep20").value;
  const r = await api("/api/wallet/set", { address: addr });
  document.getElementById("wmsg").textContent = r.ok ? "ثبت شد ✅" : (r.error || "خطا");
  if (r.ok) load();
};

document.getElementById("walletReq").onclick = async () => {
  const kind = document.getElementById("wkind").value;
  const amount = Number(document.getElementById("amt").value || 0);
  const r = await api("/api/wallet/request", { kind, amount });
  document.getElementById("wmsg").textContent = r.ok ? ("ثبت شد ✅ (ID: " + r.id + ")") : (r.error || "خطا");
};
</script>
</body>
</html>`;
}

export function htmlResponse(html: string) {
  return new Response(html, {
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "no-store",
    },
  });
}
