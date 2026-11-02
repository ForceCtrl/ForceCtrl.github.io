/* Find bar. While the hero is held, the scroll presses the keys:
   Ctrl gives a little, then clicks down; then F; with both down the find bar drops in, "force" is
   typed the first time, and the keys spring back. Scrolling back up undoes each step. The bar's
   count follows the section in view and its arrows step between sections. */
(function () {
  "use strict";
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const nav = document.querySelector(".nav");
  const q = nav.querySelector(".find-q"), n = nav.querySelector(".find-n b");
  const links = Array.from(nav.querySelectorAll(".nav-links a"));
  const caps = Array.from(document.querySelectorAll(".hero .cap"));
  const hold = document.querySelector(".hero-hold");
  const word = q.textContent;
  nav.querySelector(".find-n").lastChild.textContent = " of " + links.length;

  // 1. the hold: [start of give, click] for Ctrl and for F, as fractions of the held scroll
  const KEYS = [[0.04, 0.26], [0.36, 0.58]];
  const GIVE = 0.3;                         // travel before the click, as a fraction of the full travel
  let typed = false, timers = [], fired = false;
  const later = (f, ms) => timers.push(setTimeout(f, ms));
  const type = () => {
    if (typed || reduce) { q.textContent = word; return; }
    typed = true; q.textContent = ""; q.classList.add("typing");
    [...word].forEach((ch, i) => later(() => { q.textContent += ch; }, 120 + 70 * i));
    later(() => q.classList.remove("typing"), 120 + 70 * word.length + 900);
  };
  const setKey = (c, d, state) => {
    c.classList.toggle("down", state === "down"); c.classList.toggle("up", state === "up");
    c.style.setProperty("--d", d);
  };
  const fire = (v) => {
    if (v === fired) return;
    fired = v; timers.forEach(clearTimeout); timers = [];
    if (v) {   // both keys are down: the bar drops, then the keys spring back
      later(() => { nav.classList.add("open"); type(); }, 90);
      later(() => caps.forEach((c) => setKey(c, 0, "up")), 380);
    } else {
      nav.classList.remove("open"); q.textContent = word; q.classList.remove("typing");
    }
  };
  const update = () => {
    const H = hold ? hold.offsetHeight : 0;
    const s = H ? window.scrollY / H : (window.scrollY > 40 ? 1 : 0);
    if (s >= KEYS[1][1]) { if (!fired) caps.forEach((c) => setKey(c, 1, "down")); fire(true); return; }
    fire(false);
    caps.forEach((c, i) => {
      const [a, b] = KEYS[i];
      if (s >= b) setKey(c, 1, "down");
      else setKey(c, (reduce ? 0 : GIVE * Math.min(Math.max((s - a) / (b - a), 0), 1)).toFixed(3), "");
    });
  };
  let queued = false;
  window.addEventListener("scroll", () => { if (!queued) { queued = true; requestAnimationFrame(() => { queued = false; update(); }); } }, { passive: true });
  window.addEventListener("resize", update);
  update();
  nav.addEventListener("focusin", () => nav.classList.add("open"));   // keyboard users reach it at the top too

  // 2. the match count follows the section in view (main.js marks it .is-current). A stretch that is
  //    none of the listed sections (the problem section) keeps the last count instead of falling back.
  const btns = nav.querySelectorAll(".find-btn");
  let last = 0;
  const current = () => {
    const i = links.findIndex((a) => a.classList.contains("is-current"));
    if (i >= 0) last = i;
    return last;
  };
  const sync = () => {
    const i = current(); n.textContent = i + 1;
    btns[0].disabled = i === 0; btns[1].disabled = i === links.length - 1;
  };
  new MutationObserver(sync).observe(nav.querySelector(".nav-links"), { subtree: true, attributes: true, attributeFilter: ["class"] });
  sync();
  btns.forEach((b) => b.addEventListener("click", () => {
    const a = links[current() + Number(b.dataset.step)];
    if (a) document.querySelector(a.getAttribute("href")).scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
  }));
})();
