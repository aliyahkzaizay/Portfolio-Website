// script.js

// Helpers
const qs = (sel, parent = document) => parent.querySelector(sel);
const qsa = (sel, parent = document) => [...parent.querySelectorAll(sel)];

// ===== Reveal (raise) animation on section enter =====
const revealSections = qsa(".reveal-section");

if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-revealed");
          // animate once (optional). Remove next line if you want it to replay.
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18 }
  );

  revealSections.forEach((sec) => revealObserver.observe(sec));
} else {
  // If reduced motion, show everything
  revealSections.forEach((sec) => sec.classList.add("is-revealed"));
}

// ===== Mobile menu (animated dropdown) =====
const menuBtn = qs(".menu-btn");
const mobileMenu = qs("#mobileMenu");

function openMobileMenu() {
  if (!mobileMenu) return;
  mobileMenu.hidden = false;
  requestAnimationFrame(() => mobileMenu.classList.add("is-open"));
  menuBtn?.setAttribute("aria-expanded", "true");
}
function closeMobileMenu() {
  if (!mobileMenu) return;
  mobileMenu.classList.remove("is-open");
  menuBtn?.setAttribute("aria-expanded", "false");

  const onEnd = () => {
    mobileMenu.hidden = true;
    mobileMenu.removeEventListener("transitionend", onEnd);
  };
  mobileMenu.addEventListener("transitionend", onEnd);
}
function toggleMobileMenu() {
  if (!mobileMenu) return;
  if (mobileMenu.hidden) openMobileMenu();
  else closeMobileMenu();
}

menuBtn?.addEventListener("click", (e) => {
  e.stopPropagation();
  toggleMobileMenu();
});

qsa(".mobile-link").forEach((link) => link.addEventListener("click", closeMobileMenu));

document.addEventListener("click", (e) => {
  if (!mobileMenu || mobileMenu.hidden) return;
  const clickedInside = e.target.closest(".navpill");
  if (!clickedInside) closeMobileMenu();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && mobileMenu && !mobileMenu.hidden) closeMobileMenu();
});

// ===== Tabs: Work section =====
const workTabs = qsa("[data-tab]");
const workPanels = qsa("[data-panel]");

workTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const key = tab.dataset.tab;

    workTabs.forEach((t) => {
      t.classList.toggle("is-active", t === tab);
      t.setAttribute("aria-selected", String(t === tab));
    });

    workPanels.forEach((p) => {
      const isTarget = p.dataset.panel === key;
      p.hidden = !isTarget;
    });
  });
});

// ===== Tabs: About section =====
const aboutTabs = qsa("[data-about]");
const aboutPanels = qsa("[data-about-panel]");

aboutTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const key = tab.dataset.about;

    aboutTabs.forEach((t) => {
      t.classList.toggle("is-active", t === tab);
      t.setAttribute("aria-selected", String(t === tab));
    });

    aboutPanels.forEach((p) => {
      const isTarget = p.dataset.aboutPanel === key;
      p.hidden = !isTarget;
    });
  });
});

// ===== Smooth scroll for internal anchors =====
qsa('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", (e) => {
    const href = a.getAttribute("href");
    if (!href || href === "#") return;

    const target = qs(href);
    if (!target) return;

    e.preventDefault();
    if (mobileMenu && !mobileMenu.hidden) closeMobileMenu();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

// ===== Active nav highlight while scrolling =====
const sections = ["home", "work", "about", "contact"]
  .map((id) => document.getElementById(id))
  .filter(Boolean);

const navLinks = document.querySelectorAll(".navlink");

function setActiveLink(id) {
  navLinks.forEach((a) => {
    const match = a.getAttribute("href") === `#${id}`;
    a.classList.toggle("is-active", match);
    if (match) a.setAttribute("aria-current", "page");
    else a.removeAttribute("aria-current");
  });
}

const observer = new IntersectionObserver(
  (entries) => {
    const visible = entries
      .filter((e) => e.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (visible?.target?.id) setActiveLink(visible.target.id);
  },
  { threshold: [0.2, 0.35, 0.5, 0.65] }
);

sections.forEach((sec) => observer.observe(sec));
setActiveLink("home");

// ===== Project Modal =====
const modal = qs("#projectModal");
const modalTitle = qs("#modalTitle");
const modalDesc = qs("#modalDesc");
const modalTech = qs("#modalTech");
const modalLink = qs("#modalLink");

let lastFocused = null;

function openModal(data) {
  if (!modal) return;
  lastFocused = document.activeElement;

  modalTitle.textContent = data.title || "Project";
  modalDesc.textContent = data.desc || "";
  modalTech.textContent = data.tech ? `Tech: ${data.tech}` : "";
  modalLink.href = data.link || "#";

  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");

  const closeBtn = qs("[data-close-modal]", modal);
  closeBtn?.focus();
}

function closeModal() {
  if (!modal) return;
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  if (lastFocused && typeof lastFocused.focus === "function") lastFocused.focus();
}

qsa(".project").forEach((card) => {
  const getData = () => ({
    title: card.dataset.title,
    desc: card.dataset.desc,
    tech: card.dataset.tech,
    link: card.dataset.link,
  });

  card.addEventListener("click", () => openModal(getData()));
  card.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openModal(getData());
    }
  });
});

qsa("[data-close-modal]").forEach((el) => el.addEventListener("click", closeModal));
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});

// ===== Contact form demo (still demo) =====
const contactForm = qs("#contactForm");
const formNote = qs("#formNote");

contactForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = qs("#name")?.value?.trim();
  const email = qs("#email")?.value?.trim();
  const msg = qs("#message")?.value?.trim();

  if (!name || !email || !msg) {
    formNote.textContent = "Please fill out all fields.";
    return;
  }

  formNote.textContent = "Message received! (Demo) — connect this to Formspree/Netlify when ready.";
  contactForm.reset();
});

// ===== Live Eastern Time (ET) =====
const etTimeEl = qs("#etTime");

function formatETTime() {
  const fmt = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    hour: "numeric",
    minute: "2-digit",
  });

  const timeStr = fmt.format(new Date());
  if (etTimeEl) etTimeEl.textContent = `${timeStr} ET`;
}

formatETTime();
setInterval(formatETTime, 60 * 1000);
