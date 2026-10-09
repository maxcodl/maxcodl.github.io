const GH = "https://github.com/maxcodl/";
const LANG_COLORS = {
  "C++": "#f34b7d", Java: "#b07219", Kotlin: "#a97bff",
  JavaScript: "#f1e05a", Python: "#3572a5",
};

const PROJECTS = [
  { name: "OpenWebCam", icon: "📷", platform: "Windows + Android", lang: "C++", cat: "desktop", featured: true,
    desc: "Use your Android phone as a webcam on Windows 11 over USB." },
  { name: "MochiMochi", icon: "🍡", platform: "Android", lang: "Java", cat: "android",
    desc: "Import stickers from Telegram into WhatsApp." },
  { name: "Odo", icon: "🚗", platform: "Android", lang: "Kotlin", cat: "android",
    desc: "Vehicle records manager: fuel, services, expenses, trips and odometer readings, with offline storage and analytics." },
  { name: "SessionSwitcher", icon: "🔀", platform: "Browser extension", lang: "JavaScript", cat: "web",
    desc: "Save and switch between multiple cookie-based sessions for any site." },
  { name: "NoSponsoredAds", icon: "🚫", platform: "Browser extension", lang: "JavaScript", cat: "web",
    desc: "For people who don't want to see sponsored ads on Chrome and Chromium-based browsers." },
  { name: "TgMoosik", icon: "🎵", platform: "Telegram bot", lang: "Python", cat: "bots",
    desc: "Simple bot to search and download songs on Telegram." },
  { name: "DolbyAtmos", icon: "🔊", platform: "Android", lang: "Kotlin", cat: "android",
    desc: "Simple shortcut app to launch Dolby on OnePlus devices." },
  { name: "Bulk-Email-sender", icon: "✉️", platform: "Automation", lang: "Python", cat: "bots",
    desc: "A janky way to send emails automatically from Gmail using Selenium." },
  { name: "Website_Categorizer", icon: "🗂️", platform: "Web app", lang: "Python", cat: "web",
    desc: "A Flask app for categorizing websites." },
  { name: "website-categorizer", icon: "🧠", platform: "Web app", lang: "JavaScript", cat: "web",
    desc: "An app to categorize websites using OpenAI." },
];

const CATS = { all: "all", android: "android", web: "web & extensions", bots: "bots & automation", desktop: "desktop" };

// --- project cards ---
const grid = document.getElementById("grid");
const filters = document.getElementById("filters");

grid.innerHTML = PROJECTS.map((p) => `
  <article class="card${p.featured ? " featured" : ""}" data-cat="${p.cat}">
    <div class="top"><span class="icon">${p.icon}</span><span class="platform mono">${p.platform}</span></div>
    <h3>${p.name}</h3>
    <p>${p.desc}</p>
    <div class="meta">
      <span class="lang"><i class="dot" style="background:${LANG_COLORS[p.lang]}"></i>${p.lang}</span>
      <a class="go" href="${GH}${p.name}" target="_blank" rel="noopener">view on github ↗</a>
    </div>
  </article>`).join("");

filters.innerHTML = Object.entries(CATS).map(([k, v]) =>
  `<button class="chip${k === "all" ? " on" : ""}" data-f="${k}" type="button">${v}</button>`).join("");

filters.addEventListener("click", (e) => {
  const chip = e.target.closest(".chip");
  if (!chip) return;
  filters.querySelectorAll(".chip").forEach((c) => c.classList.toggle("on", c === chip));
  grid.querySelectorAll(".card").forEach((c) =>
    c.classList.toggle("hide", chip.dataset.f !== "all" && c.dataset.cat !== chip.dataset.f));
});

// --- card tilt + spotlight ---
grid.addEventListener("pointermove", (e) => {
  const card = e.target.closest(".card");
  if (!card) return;
  const r = card.getBoundingClientRect();
  const x = e.clientX - r.left, y = e.clientY - r.top;
  card.style.setProperty("--mx", x + "px");
  card.style.setProperty("--my", y + "px");
  card.style.transform = `perspective(900px) rotateX(${((y / r.height) - 0.5) * -6}deg) rotateY(${((x / r.width) - 0.5) * 6}deg) translateY(-4px)`;
});
grid.addEventListener("pointerout", (e) => {
  const card = e.target.closest(".card");
  if (card) card.style.transform = "";
});

// --- typewriter ---
const typed = document.getElementById("typed");
const phrases = ["android apps.", "browser extensions.", "telegram bots.", "tools i need.", "things that work."];
let pi = 0, ci = 0, deleting = false;
(function tick() {
  const word = phrases[pi];
  ci += deleting ? -1 : 1;
  typed.textContent = word.slice(0, ci);
  let delay = deleting ? 40 : 80;
  if (!deleting && ci === word.length) { delay = 1600; deleting = true; }
  else if (deleting && ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; delay = 300; }
  setTimeout(tick, delay);
})();

// --- reveal + counters ---
const countUp = (el) => {
  const target = +el.dataset.count;
  const t0 = performance.now();
  const step = (t) => {
    const k = Math.min((t - t0) / 1200, 1);
    el.textContent = Math.round(target * (1 - Math.pow(1 - k, 3)));
    if (k < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
};
const io = new IntersectionObserver((entries) => {
  entries.forEach((en) => {
    if (!en.isIntersecting) return;
