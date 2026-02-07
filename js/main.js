/**
 * CV Julien Linard - Modern Interactions & Animations
 */

document.addEventListener("DOMContentLoaded", () => {
  initScrollOptimized();
  initHamburger();
  initIntersectionObserver();
  updateYearsFormateur();
  updateYearsFreelance();
  updateYearsDev();
  updateYearsManagement();
});

/**
 * Optimized scroll handler - combines navigation + active section
 * Uses requestAnimationFrame + passive listener for better perf
 */
function initScrollOptimized() {
  const navbar = document.querySelector(".navbar");
  const sections = Array.from(document.querySelectorAll(".section[id]"));
  const links = Array.from(document.querySelectorAll(".nav-link"));

  let ticking = false;

  const update = () => {
    const y = window.scrollY;

    // navbar shadow
    if (navbar) navbar.classList.toggle("scrolled", y > 50);

    // active section
    let currentId = "";
    for (const section of sections) {
      if (y >= section.offsetTop - 200) currentId = section.id;
    }

    for (const link of links) {
      link.classList.toggle("active", link.hash.slice(1) === currentId);
    }
  };

  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      update();
      ticking = false;
    });
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  update(); // init
}

// ...existing code...

// ...existing code...

// ...existing code...

/**
 * Intersection Observer pour animations au scroll
 * Utilise des classes CSS au lieu de styles inline pour meilleure perf
 */
function initIntersectionObserver() {
  const elements = document.querySelectorAll(
    ".project-card, .education-card, .highlight-card, .skill-block, .timeline-content",
  );

  elements.forEach((el) => el.classList.add("reveal"));

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    },
    { threshold: 0.1, rootMargin: "0px 0px -100px 0px" },
  );

  elements.forEach((el) => observer.observe(el));
}

/**
 * Utilitaire export
 */
window.cvUtils = {
  scrollToSection: (sectionId) => {
    const section = document.querySelector(`#${sectionId}`);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  },
};

/**
 * Calcule les années d'expérience en tant que formateur
 * Depuis le 1er août 2022 jusqu'à maintenant
 */
function updateYearsFormateur() {
  const startDate = new Date(2022, 7, 1); // 1er aout 2022 (mois 0-indexed)
  const today = new Date();

  let years = today.getFullYear() - startDate.getFullYear();

  // Si l'anniversaire n'est pas encore passé cette année, soustraire 1
  if (
    today.getMonth() < startDate.getMonth() ||
    (today.getMonth() === startDate.getMonth() &&
      today.getDate() < startDate.getDate())
  ) {
    years--;
  }

  const yearsElement = document.getElementById("yearsFormateur");
  if (yearsElement) {
    yearsElement.textContent = `${years}+`;
  }
}

/**
 * Calcule les années en tant que freelance
 * Depuis janvier 2023 jusqu'à maintenant
 */
function updateYearsFreelance() {
  const startDate = new Date(2023, 0, 1); // janvier 2023 (mois 0-indexed)
  const today = new Date();

  let years = today.getFullYear() - startDate.getFullYear();

  if (
    today.getMonth() < startDate.getMonth() ||
    (today.getMonth() === startDate.getMonth() &&
      today.getDate() < startDate.getDate())
  ) {
    years--;
  }

  const yearsElement = document.getElementById("yearsFreelance");
  if (yearsElement) {
    yearsElement.textContent = `${years}+`;
  }
}

/**
 * Calcule les années d'expérience en développement
 * Depuis septembre 2019 jusqu'à maintenant
 */
function updateYearsDev() {
  const startDate = new Date(2019, 8, 1); // septembre 2019 (mois 0-indexed)
  const today = new Date();

  let years = today.getFullYear() - startDate.getFullYear();

  if (
    today.getMonth() < startDate.getMonth() ||
    (today.getMonth() === startDate.getMonth() &&
      today.getDate() < startDate.getDate())
  ) {
    years--;
  }

  const yearsElement = document.getElementById("yearsDev");
  if (yearsElement) {
    yearsElement.textContent = `${years}+`;
  }
}

/**
 * Calcule les années d'expérience en management
 * Depuis janvier 2008 jusqu'à maintenant
 */
function updateYearsManagement() {
  const startDate = new Date(2008, 0, 1); // janvier 2008 (mois 0-indexed)
  const today = new Date();

  let years = today.getFullYear() - startDate.getFullYear();

  if (
    today.getMonth() < startDate.getMonth() ||
    (today.getMonth() === startDate.getMonth() &&
      today.getDate() < startDate.getDate())
  ) {
    years--;
  }

  const yearsElement = document.getElementById("yearsManagement");
  if (yearsElement) {
    yearsElement.textContent = `${years}+`;
  }
}
