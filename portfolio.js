const THEME_KEY = "theme";

function setTheme(nextTheme) {
  const theme = nextTheme === "dark" ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", theme);
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch {
    // ignore
  }
}

function getPreferredTheme() {
  try {
    const stored = localStorage.getItem(THEME_KEY);
    if (stored === "light" || stored === "dark") return stored;
  } catch {
    // ignore
  }
  if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
    return "dark";
  }
  return "light";
}

function toggleTheme() {
  const current = document.documentElement.getAttribute("data-theme") || "light";
  setTheme(current === "dark" ? "light" : "dark");
}

function setActiveNav() {
  const path = (window.location.pathname || "").split("/").pop() || "home.html";
  document.querySelectorAll(".nav-links a").forEach((a) => {
    const href = a.getAttribute("href") || "";
    const isActive = href.split("/").pop() === path;
    a.classList.toggle("active", isActive);
  });
}

function toggleMenu() {
  const navLinks = document.getElementById("navLinks");
  if (navLinks) navLinks.classList.toggle("open");
}

const obs = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) e.target.classList.add("in");
    });
  },
  { threshold: 0.12 }
);

function observeAnims(root = document) {
  root.querySelectorAll(".anim").forEach((el) => obs.observe(el));
}

const skillsData = [
  { name: "Python", /*icon: "🐍",*/ level: 95, cat: "language" },
  { name: "Java", /*icon: "☕",*/ level: 75, cat: "language" },
  { name: "JavaScript",/* icon: "⚡",*/ level: 70, cat: "language" },
  { name: "C", /*icon: "⚙️",*/ level: 65, cat: "language" },
  { name: "HTML", /*icon: "🌐",*/ level: 90, cat: "web" },
  { name: "CSS", /*icon: "🎨",*/ level: 90, cat: "web" },
  // { name: "Flask", icon: "🍶", level: 90, cat: "web" },
  { name: "MongoDB",/* icon: "🗄️",*/ level: 80, cat: "database" },
  { name: "MySQL", /*icon: "", */level: 75, cat: "database" },
  { name: "SQLite", /*icon: "", */level: 70, cat: "database" },
  // { name: "AI / ML", icon: "🤖", level: 88, cat: "ai" },
  // { name: "TensorFlow", icon: "🔬", level: 70, cat: "ai" },
  // { name: "Pandas", icon: "🐼", level: 85, cat: "ai" },
  // { name: "NumPy", icon: "🔢", level: 82, cat: "ai" }
];

const projectsData = [
  // {
  //   num: "01",
  //   name: "AI Recruitment System",
  //   icon: "🤖",
  //   desc: "Intelligent recruitment platform powered by Python & Flask. Automates candidate screening, resume parsing with NLP, smart scoring algorithms, and interview scheduling — reducing hiring time by 60%.",
  //   tags: ["AI/ML", "Featured", "Python"],
  //   tech: ["Py", "FL", "AI", "NLP"],
  //   info: "Resume parsing · NLP scoring · Auto-scheduling · REST API"
  // },
  // {
  //   num: "02",
  //   name: "Offline Wikipedia",
  //   icon: "📚",
  //   desc: "Powerful offline knowledge base built with Python & Flask. Full-text search across Wikipedia articles without internet — featuring article caching, bookmarks, and a clean reader interface.",
  //   tags: ["Python", "Flask", "Offline"],
  //   tech: ["Py", "FL", "DB", "JS"],
  //   info: "Full-text search · Article caching · Offline-first · 50k+ articles"
  // },
  // {
  //   num: "03",
  //   name: "Email Automation",
  //   icon: "✉️",
  //   desc: "Sophisticated email automation handling bulk sending, template management, scheduling, analytics, and smart follow-ups. Integrates with SMTP and major email providers via Python.",
  //   tags: ["Automation", "Python", "SMTP"],
  //   tech: ["Py", "SM", "DB", "SC"],
  //   info: "Template engine · Bulk sending · Scheduling · Analytics"
  // },
  {
    num: "01",
    name: "Blog System",
    icon: "📸",
    desc: "Instagram-inspired full-stack blog platform with image-rich posts, stories, user profiles, follow/unfollow, likes, comments, hashtags, and a real-time activity feed.",
    tags: ["Python", "Flask", "Social"],
    tech: ["Py", "FL", "JS", "DB"],
    info: "Rich posts · Stories · Follow system · Likes & comments"
  },
  
  {
    num: "02",
    name: "GST Billing System",
    icon: "🧾",
    desc: "Complete GST-compliant billing & invoicing application. Generates professional tax invoices, manages customers & products, tracks payments, and exports detailed PDF reports.",
    tags: ["Python", "Billing", "Finance"],
    tech: ["Py", "FL", "DB", "PD"],
    info: "GST invoices · CGST/SGST/IGST · PDF export · Reports"
  },
  
  {
    num: "03",
    name: "Lifeline Donor's",
    icon: "🩸",
    desc: "The main aim of this project is to save lives of people by providing blood. Our project Online Blood Bank system Android is developed so that users can view the information of nearby volunteer donors. This is developed by perspectives i.e. volunteer donors and patients. This application reduces the time to a greater extent that is searching for the required blood.",
    tags: ["PHP", "PhpMyadmin"],
    tech: ["Py", "FL", "JS", "MD"],
    info: "Blood Donate · Blood · Save life"
  }
];

function renderSkills(filter) {
  const grid = document.getElementById("skillsGrid");
  if (!grid) return;
  const data = filter === "all" ? skillsData : skillsData.filter((s) => s.cat === filter);

  grid.innerHTML = data
    .map(
      (s) => `
      <div class="skill-card">
        <div class="skill-name">${s.name}</div>
        <div class="skill-bar-bg"><div class="skill-bar" data-lv="${s.level}"></div></div>
        <div class="skill-pct">${s.level}%</div>
      </div>`
    )
    .join("");

  setTimeout(() => {
    document.querySelectorAll(".skill-bar").forEach((b) => {
      b.style.width = `${b.dataset.lv}%`;
    });
  }, 120);
}

function wireSkillTabs() {
  const tabs = document.querySelectorAll("[data-skill-filter]");
  if (!tabs.length) return;
  tabs.forEach((btn) => {
    btn.addEventListener("click", () => {
      tabs.forEach((t) => t.classList.remove("active"));
      btn.classList.add("active");
      renderSkills(btn.getAttribute("data-skill-filter") || "all");
    });
  });
}

function renderProjects() {
  const grid = document.getElementById("projectsGrid");
  if (!grid) return;

  grid.innerHTML = projectsData
    .map((p, i) => {
      const d = i % 3 === 0 ? " d1" : i % 3 === 1 ? " d2" : " d3";
      return `
      <div class="proj-card anim${d}">
        <div class="proj-num">${p.num}</div>
        <div class="proj-icon">${p.icon}</div>
        <div class="proj-name">${p.name}</div>
        <div class="proj-desc" style="text-align: justify">${p.desc}</div>
        <div style="font-family:'DM Mono',monospace;font-size:.68rem;color:var(--ink3);margin-bottom:1rem;line-height:1.6">${p.info}</div>
        <div class="proj-tags">${p.tags.map((t) => `<span class="proj-tag">${t}</span>`).join("")}</div>
        <div class="proj-footer">
          <div class="proj-tech">${p.tech.map((t) => `<span class="tech-tag">${t}</span>`).join("")}</div>
          <a href="https://github.com/Vasu-3010" target="_blank" rel="noopener" class="proj-arrow">↗</a>
        </div>
      </div>`;
    })
    .join("");

  observeAnims(grid);
}

function showToast(icon, msg) {
  const t = document.getElementById("toast");
  if (!t) return;
  const iconEl = document.getElementById("toast-icon");
  const msgEl = document.getElementById("toast-msg");
  if (iconEl) iconEl.textContent = icon;
  if (msgEl) msgEl.textContent = msg;
  t.classList.add("show");
  setTimeout(() => t.classList.remove("show"), 3800);
}

function wireContactForm() {
  const btn = document.getElementById("sendMessageBtn");
  if (!btn) return;
  btn.addEventListener("click", () => {
    const n = (document.getElementById("c-name")?.value || "").trim();
    const e = (document.getElementById("c-email")?.value || "").trim();
    const m = (document.getElementById("c-message")?.value || "").trim();
    if (!n || !e || !m) {
      showToast("⚠", "Please fill all required fields");
      return;
    }
    showToast("✓", `Thanks ${n}! I'll be in touch soon.`);
    ["c-name", "c-email", "c-subject", "c-message"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.value = "";
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  setTheme(getPreferredTheme());
  setActiveNav();
  observeAnims();

  const themeBtn = document.getElementById("theme-btn");
  if (themeBtn) themeBtn.addEventListener("click", toggleTheme);

  const hamburger = document.getElementById("hamburger");
  if (hamburger) hamburger.addEventListener("click", toggleMenu);

  // Close mobile menu after click
  const navLinks = document.getElementById("navLinks");
  if (navLinks) {
    navLinks.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => navLinks.classList.remove("open"));
    });
  }

  // Page-specific renders
  wireSkillTabs();
  if (document.getElementById("skillsGrid")) renderSkills("all");
  if (document.getElementById("projectsGrid")) renderProjects();
  wireContactForm();
});

