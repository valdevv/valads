const CONFIG = {
  brandName: "VALADS",
  phone: "+421915265671",
  email: "branislav.grafika@gmail.com",
  social: {
    instagram: "https://www.instagram.com/valads_official/"
  },
  projects: [
    {
      eyebrow: "PRÍPADOVÁ ŠTÚDIA 01",
      title: "Reštaurácia Starý dom",
      problem:
        "Podnik nemal moderný web, ktorý by jasne prezentoval jedálny lístok, atmosféru a umožnil rýchly kontakt.",
      solution:
        "Navrhli sme prehľadnú štruktúru stránky so silným vizuálom, jasným CTA na zavolanie a navigáciu a jednoduchým prístupom k menu a rezerváciám.",
      result:
        "Reštaurácia získala profesionálnu online prezentáciu, ktorá pôsobí dôveryhodne a uľahčuje zákazníkom kontakt aj orientáciu.",
      image: "images/case/stary-dom.jpg"
    },
    {
      eyebrow: "PRÍPADOVÁ ŠTÚDIA 02",
      title: "Firemný web pre B2B technologickú spoločnosť",
      problem:
        "Obchodný tím nedostával kvalitné dopyty, pretože web nekomunikoval hodnotu služieb jasne.",
      solution:
        "Navrhli sme nový obsahový rámec, segmentované landing stránky a prehľadné CTA podľa cieľových skupín.",
      result:
        "Web dnes komunikuje hodnotu služieb jasnejšie a obchodný tím získava kvalitnejšie vstupné dopyty."
    },
    {
      eyebrow: "PRÍPADOVÁ ŠTÚDIA 03",
      title: "Relaunch služby v oblasti vzdelávania",
      problem:
        "Pôvodný web bol technicky zastaraný, pomalý a komplikoval správu obsahu internému tímu.",
      solution:
        "Vytvorili sme nový frontend, upravili štruktúru obsahu a nastavili jednoduchú správu stránok bez zbytočnej zložitosti.",
      result:
        "Riešenie je stabilné, obsah sa spravuje jednoducho a návštevníci sa v ponuke orientujú výrazne rýchlejšie."
    }
  ]
};

const header = document.querySelector("#siteHeader");
const navToggle = document.querySelector("#navToggle");
const mainNav = document.querySelector("#mainNav");
const navLinks = Array.from(document.querySelectorAll(".nav-link"));
const anchors = Array.from(document.querySelectorAll('a[href^="#"]'));
const trackedSections = ["domov", "projekty", "o-nas", "proces", "faq", "kontakt"]
  .map((id) => document.getElementById(id))
  .filter(Boolean);

const showcaseTrack = document.getElementById("showcaseTrack");
const showcaseDots = document.getElementById("showcaseDots");
const showcaseShell = document.getElementById("showcaseShell");
const projectsList = document.getElementById("projectsList");

const phoneLink = document.getElementById("phoneLink");
const emailLink = document.getElementById("emailLink");
const instagramLink = document.getElementById("instagramLink");
const footerText = document.getElementById("footerText");
const brandLogo = document.getElementById("brandLogo");

const faqTriggers = Array.from(document.querySelectorAll(".faq-trigger"));

let showcaseIndex = 0;
let showcaseTimer;
let showcaseSlides = [];
let showcaseDotButtons = [];

function normalizePhone(phone) {
  return phone.replace(/[\s()-]/g, "");
}

function populateBrand() {
  document.title = CONFIG.brandName;
  brandLogo.alt = `${CONFIG.brandName} logo`;
  footerText.textContent = `© ${new Date().getFullYear()} ${CONFIG.brandName}. Všetky práva vyhradené.`;
}

function populateContact() {
  phoneLink.textContent = CONFIG.phone;
  phoneLink.href = `tel:${normalizePhone(CONFIG.phone)}`;

  emailLink.textContent = CONFIG.email;
  emailLink.href = `mailto:${CONFIG.email}`;

  instagramLink.href = CONFIG.social.instagram;
}

function createShowcase() {
  const projects = CONFIG.projects.slice(0, 3);
  showcaseTrack.innerHTML = "";
  showcaseDots.innerHTML = "";

  projects.forEach((project, index) => {
    const slide = document.createElement("article");
    slide.className = "showcase-slide";
    slide.setAttribute("aria-hidden", index === 0 ? "false" : "true");
    const showcaseVisual = project.image
      ? `
      <div class="showcase-visual has-image" aria-hidden="true">
        <img src="${project.image}" alt="${project.title}" loading="lazy" decoding="async" />
      </div>
    `
      : `
      <div class="showcase-visual" aria-hidden="true">
        <div class="showcase-visual-placeholder">
          <div class="visual-head"></div>
          <div class="visual-block"></div>
          <div class="visual-row"></div>
          <div class="visual-row"></div>
        </div>
      </div>
    `;

    slide.innerHTML = `
      <div class="showcase-card">
        <div class="showcase-meta">
          <p class="showcase-index">Projekt ${String(index + 1).padStart(2, "0")}</p>
          <h3>${project.title}</h3>
          <p>${project.result}</p>
        </div>
        ${showcaseVisual}
      </div>
    `;
    showcaseTrack.appendChild(slide);

    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "showcase-dot";
    dot.setAttribute("aria-label", `Prepnúť na projekt ${index + 1}`);
    dot.addEventListener("click", () => {
      setShowcaseSlide(index);
      restartShowcaseTimer();
    });
    showcaseDots.appendChild(dot);
  });

  showcaseSlides = Array.from(showcaseTrack.querySelectorAll(".showcase-slide"));
  showcaseDotButtons = Array.from(showcaseDots.querySelectorAll(".showcase-dot"));

  setShowcaseSlide(0);
}

function setShowcaseSlide(index) {
  showcaseIndex = index;

  showcaseSlides.forEach((slide, i) => {
    const isActive = i === showcaseIndex;
    slide.classList.toggle("is-active", isActive);
    slide.setAttribute("aria-hidden", isActive ? "false" : "true");
  });

  showcaseDotButtons.forEach((dot, i) => {
    dot.classList.toggle("is-active", i === showcaseIndex);
    dot.setAttribute("aria-current", i === showcaseIndex ? "true" : "false");
  });
}

function nextShowcaseSlide() {
  const nextIndex = (showcaseIndex + 1) % showcaseSlides.length;
  setShowcaseSlide(nextIndex);
}

function startShowcaseTimer() {
  if (!showcaseSlides.length) return;
  window.clearInterval(showcaseTimer);
  showcaseTimer = window.setInterval(nextShowcaseSlide, 5000);
}

function stopShowcaseTimer() {
  window.clearInterval(showcaseTimer);
}

function restartShowcaseTimer() {
  stopShowcaseTimer();
  startShowcaseTimer();
}

function setupShowcasePause() {
  showcaseShell.addEventListener("mouseenter", stopShowcaseTimer);
  showcaseShell.addEventListener("mouseleave", startShowcaseTimer);
  showcaseShell.addEventListener("focusin", stopShowcaseTimer);
  showcaseShell.addEventListener("focusout", startShowcaseTimer);
}

function createCaseStudies() {
  const projects = CONFIG.projects.slice(0, 3);
  projectsList.innerHTML = "";

  projects.forEach((project, index) => {
    const caseStudy = document.createElement("article");
    caseStudy.className = "case-study";
    const fallbackEyebrow = `PRÍPADOVÁ ŠTÚDIA ${String(index + 1).padStart(2, "0")}`;
    const caseMedia = project.image
      ? `
      <figure class="case-mockup has-image">
        <img class="case-real-image" src="${project.image}" alt="${project.title}" loading="lazy" decoding="async" />
      </figure>
    `
      : `
      <div class="case-mockup" aria-hidden="true">
        <div class="case-mockup-inner">
          <div class="case-mockup-top"></div>
          <div class="case-mockup-main"></div>
          <div class="case-mockup-lines">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    `;

    if (index % 2 === 1) {
      caseStudy.classList.add("is-reversed");
    }

    caseStudy.innerHTML = `
      <div class="case-copy">
        <p class="case-label">${project.eyebrow || fallbackEyebrow}</p>
        <h3>${project.title}</h3>
        <ul class="case-points">
          <li><strong>Problém:</strong> ${project.problem}</li>
          <li><strong>Riešenie:</strong> ${project.solution}</li>
          <li><strong>Výsledok:</strong> ${project.result}</li>
        </ul>
      </div>
      ${caseMedia}
    `;

    projectsList.appendChild(caseStudy);
  });
}

function updateHeaderState() {
  header.classList.toggle("scrolled", window.scrollY > 8);
}

function closeMobileNav() {
  mainNav.classList.remove("is-open");
  navToggle.setAttribute("aria-expanded", "false");
}

function toggleMobileNav() {
  const isOpen = mainNav.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
}

function scrollToSection(targetId) {
  const target = document.querySelector(targetId);
  if (!target) return;

  const offset = header.offsetHeight + 12;
  const top = target.getBoundingClientRect().top + window.scrollY - offset;

  window.scrollTo({
    top,
    behavior: "smooth"
  });
}

function setupSmoothScroll() {
  anchors.forEach((anchor) => {
    const href = anchor.getAttribute("href");
    if (!href || href === "#") return;

    anchor.addEventListener("click", (event) => {
      const target = document.querySelector(href);
      if (!target) return;

      event.preventDefault();
      scrollToSection(href);
      closeMobileNav();
    });
  });
}

function updateActiveNavLink() {
  const offset = window.scrollY + header.offsetHeight + 24;
  let activeId = trackedSections[0] ? `#${trackedSections[0].id}` : "#domov";

  trackedSections.forEach((section) => {
    if (offset >= section.offsetTop) {
      activeId = `#${section.id}`;
    }
  });

  navLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === activeId);
  });
}

function setFaqState(trigger, shouldOpen) {
  const item = trigger.closest(".faq-item");
  const panel = document.getElementById(trigger.getAttribute("aria-controls"));

  item.classList.toggle("is-open", shouldOpen);
  trigger.setAttribute("aria-expanded", String(shouldOpen));
  panel.hidden = !shouldOpen;

  if (shouldOpen) {
    panel.style.maxHeight = `${panel.scrollHeight}px`;
  } else {
    panel.style.maxHeight = "0px";
  }
}

function setupFaq() {
  faqTriggers.forEach((trigger) => {
    setFaqState(trigger, false);

    trigger.addEventListener("click", () => {
      const isOpen = trigger.getAttribute("aria-expanded") === "true";

      faqTriggers.forEach((otherTrigger) => {
        if (otherTrigger !== trigger) {
          setFaqState(otherTrigger, false);
        }
      });

      setFaqState(trigger, !isOpen);
    });
  });

  window.addEventListener("resize", () => {
    faqTriggers.forEach((trigger) => {
      if (trigger.getAttribute("aria-expanded") === "true") {
        const panel = document.getElementById(trigger.getAttribute("aria-controls"));
        panel.style.maxHeight = `${panel.scrollHeight}px`;
      }
    });
  });
}

function init() {
  populateBrand();
  populateContact();
  createShowcase();
  createCaseStudies();

  updateHeaderState();
  updateActiveNavLink();

  setupShowcasePause();
  startShowcaseTimer();

  setupSmoothScroll();
  setupFaq();

  if (navToggle) {
    navToggle.addEventListener("click", toggleMobileNav);
  }

  document.addEventListener("click", (event) => {
    if (!mainNav.contains(event.target) && !navToggle.contains(event.target)) {
      closeMobileNav();
    }
  });

  window.addEventListener("scroll", () => {
    updateHeaderState();
    updateActiveNavLink();
  });
}

init();
