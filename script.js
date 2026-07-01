const scenarios = {
  commute: {
    kicker: "早安，宏恩",
    title: "今天別跟雨賭運氣。",
    avatar: "☁",
    temp: "26°",
    place: "台北市 · 中山區",
    condition: "體感 28° · 降雨機率 80%",
    time: "08:25 前出門",
    copy: "走捷運出口 2，帶摺疊傘。08:40 後雨勢會變明顯。",
    confidence: "高",
    confidenceWidth: "82%",
    rainLabel: "08:40 雨勢增強",
    line: "「我不是催你，我是在保護你的鞋。」",
    bars: [18, 30, 47, 72, 88, 66, 48, 34]
  },
  lunch: {
    kicker: "午餐時間到了",
    title: "現在去，剛好躲過雨。",
    avatar: "◕",
    temp: "29°",
    place: "台北市 · 信義區",
    condition: "體感 33° · 紫外線偏高",
    time: "12:10–12:35 外出",
    copy: "走有騎樓的松高路；13:00 起有短暫陣雨，回程記得帶傘。",
    confidence: "中高",
    confidenceWidth: "70%",
    rainLabel: "13:00 短暫陣雨",
    line: "「先吃飯。等雨來了，便當不會自己走過來。」",
    bars: [8, 10, 13, 24, 40, 67, 76, 55]
  },
  weekend: {
    kicker: "週末計畫檢查",
    title: "午後雷雨，行程往前挪。",
    avatar: "☀",
    temp: "31°",
    place: "新北市 · 淡水區",
    condition: "體感 35° · 午後雨機率 70%",
    time: "14:00 前完成戶外行程",
    copy: "河岸散步排上午；15:00 後改到室內備案，回程避開強陣風時段。",
    confidence: "中",
    confidenceWidth: "61%",
    rainLabel: "15:20 對流增強",
    line: "「浪漫可以淋雨，手機通常不行。」",
    bars: [5, 12, 18, 22, 39, 74, 91, 84]
  }
};

const demoEls = {
  kicker: document.querySelector("[data-demo-kicker]"),
  title: document.querySelector("[data-demo-title]"),
  avatar: document.querySelector("[data-avatar]"),
  temp: document.querySelector("[data-temp]"),
  place: document.querySelector("[data-place]"),
  condition: document.querySelector("[data-condition]"),
  time: document.querySelector("[data-action-time]"),
  copy: document.querySelector("[data-action-copy]"),
  confidence: document.querySelector("[data-confidence]"),
  confidenceBar: document.querySelector("[data-confidence-bar]"),
  rainLabel: document.querySelector("[data-rain-label]"),
  line: document.querySelector("[data-ai-line]"),
  bars: [...document.querySelectorAll(".rain-bars i")]
};

function setScenario(name) {
  const data = scenarios[name];
  if (!data) return;
  Object.entries({
    kicker: data.kicker,
    title: data.title,
    avatar: data.avatar,
    temp: data.temp,
    place: data.place,
    condition: data.condition,
    time: data.time,
    copy: data.copy,
    confidence: data.confidence,
    rainLabel: data.rainLabel,
    line: data.line
  }).forEach(([key, value]) => {
    if (demoEls[key]) demoEls[key].textContent = value;
  });
  demoEls.confidenceBar.style.width = data.confidenceWidth;
  demoEls.bars.forEach((bar, index) => bar.style.setProperty("--h", `${data.bars[index]}%`));
  document.querySelectorAll("[data-scenario]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.scenario === name);
  });
}

document.querySelectorAll("[data-scenario]").forEach((button) => {
  button.addEventListener("click", () => setScenario(button.dataset.scenario));
});

const speakButton = document.querySelector("[data-speak]");
if (speakButton) {
  speakButton.addEventListener("click", () => {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(demoEls.line.textContent.replace(/[「」]/g, ""));
    utterance.lang = "zh-TW";
    utterance.rate = 1.02;
    window.speechSynthesis.speak(utterance);
  });
}

const billing = {
  monthly: { plus: "69", family: "129", plusPeriod: "/ 月", familyPeriod: "/ 月" },
  annual: { plus: "590", family: "1,090", plusPeriod: "/ 年", familyPeriod: "/ 年" }
};

document.querySelectorAll("[data-billing]").forEach((button) => {
  button.addEventListener("click", () => {
    const mode = button.dataset.billing;
    const values = billing[mode];
    document.querySelector("[data-plus-price]").textContent = values.plus;
    document.querySelector("[data-family-price]").textContent = values.family;
    document.querySelector("[data-plus-period]").textContent = values.plusPeriod;
    document.querySelector("[data-family-period]").textContent = values.familyPeriod;
    document.querySelectorAll("[data-billing]").forEach((item) => item.classList.toggle("is-active", item === button));
  });
});

const navToggle = document.querySelector("[data-nav-toggle]");
const nav = document.querySelector("[data-nav]");
if (navToggle && nav) {
  navToggle.addEventListener("click", () => {
    const expanded = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!expanded));
    nav.classList.toggle("is-open", !expanded);
    document.body.classList.toggle("nav-open", !expanded);
  });
  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navToggle.setAttribute("aria-expanded", "false");
      nav.classList.remove("is-open");
      document.body.classList.remove("nav-open");
    });
  });
}

const header = document.querySelector("[data-header]");
window.addEventListener("scroll", () => header?.classList.toggle("is-scrolled", window.scrollY > 24), { passive: true });

const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

document.querySelector("[data-year]").textContent = new Date().getFullYear();
