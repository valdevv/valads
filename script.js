const CONFIG = {
  brandName: "VALADS",
  phone: "+421 903 654 210",
  email: "hello@valads.sk",
  location: "Košice / Slovensko",
  social: {
    facebook: "https://www.facebook.com/",
    instagram: "https://www.instagram.com/"
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
      title: "Firemný web pre B2B technologickú spoločnosť",
      problem:
        "Obchodný tím nedostával kvalitné dopyty, pretože web nekomunikoval hodnotu služieb jasne.",
      solution:
        "Navrhli sme nový obsahový rámec, segmentované landing stránky a prehľadné CTA podľa cieľových skupín.",
      result:
        "Podiel relevantných dopytov vzrástol o 46 % a čas strávený na webe sa predĺžil na dvojnásobok."
    },
    {
      title: "Relaunch služby v oblasti vzdelávania",
      problem:
        "Pôvodný web bol technicky zastaraný, pomalý a komplikoval správu obsahu internému tímu.",
      solution:
        "Vytvorili sme nový frontend, upravili štruktúru obsahu a nastavili jednoduchú správu stránok bez zbytočnej zložitosti.",
      result:
        "Web sa načítava výrazne rýchlejšie, tím zvláda publikovanie samostatne a počet registrácií stúpol o 33 %."
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
const locationText = document.getElementById("locationText");
const facebookLink = document.getElementById("facebookLink");
const instagramLink = document.getElementById("instagramLink");
const footerText = document.getElementById("footerText");
const brandLogo = document.getElementById("brandLogo");

const faqTriggers = Array.from(document.querySelectorAll(".faq-trigger"));

const form = document.getElementById("contactForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");
const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const messageError = document.getElementById("messageError");

const toast = document.getElementById("toast");
let toastTimer;

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

  locationText.textContent = CONFIG.location || "";

  facebookLink.href = CONFIG.social.facebook;
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
    slide.innerHTML = `
      <div class="showcase-card">
        <div class="showcase-meta">
          <p class="showcase-index">Projekt ${String(index + 1).padStart(2, "0")}</p>
          <h3>${project.title}</h3>
          <p>${project.result}</p>
        </div>
        <div class="showcase-visual" aria-hidden="true">
          <div class="visual-head"></div>
          <div class="visual-block"></div>
          <div class="visual-row"></div>
          <div class="visual-row"></div>
          <div class="visual-row"></div>
        </div>
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
    const fallbackEyebrow = `Prípadová štúdia ${String(index + 1).padStart(2, "0")}`;
    const caseMedia = project.image
      ? `
      <div class="case-mockup has-image" aria-hidden="true">
        <img class="case-real-image" src="${project.image}" alt="${project.title}" loading="lazy" decoding="async" />
      </div>
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

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("is-visible");

  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => {
    toast.classList.remove("is-visible");
  }, 3200);
}

function setError(field, errorElement, message) {
  errorElement.textContent = message;
  field.setAttribute("aria-invalid", message ? "true" : "false");
}

function validateForm() {
  let isValid = true;

  const trimmedName = nameInput.value.trim();
  const trimmedEmail = emailInput.value.trim();
  const trimmedMessage = messageInput.value.trim();

  if (!trimmedName) {
    setError(nameInput, nameError, "Prosím, zadajte meno.");
    isValid = false;
  } else {
    setError(nameInput, nameError, "");
  }

  if (!trimmedEmail) {
    setError(emailInput, emailError, "Prosím, zadajte email.");
    isValid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
    setError(emailInput, emailError, "Prosím, zadajte platný email.");
    isValid = false;
  } else {
    setError(emailInput, emailError, "");
  }

  if (!trimmedMessage) {
    setError(messageInput, messageError, "Prosím, napíšte správu.");
    isValid = false;
  } else if (trimmedMessage.length < 10) {
    setError(messageInput, messageError, "Správa by mala mať aspoň 10 znakov.");
    isValid = false;
  } else {
    setError(messageInput, messageError, "");
  }

  return isValid;
}

function setupForm() {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!validateForm()) {
      showToast("Formulár ešte potrebuje doplniť povinné údaje.");
      return;
    }

    form.reset();
    setError(nameInput, nameError, "");
    setError(emailInput, emailError, "");
    setError(messageInput, messageError, "");
    showToast("Ďakujeme, správu sme prijali. Ozveme sa čoskoro.");
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
  setupForm();

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
