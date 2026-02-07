/**
 * CV Julien Linard - Modern Interactions & Animations
 */

document.addEventListener("DOMContentLoaded", () => {
  initNavigation();
  initScroll();
  initIntersectionObserver();
  initSmoothScroll();
  initHamburger();
  updateYearsFormateur();
  updateYearsFreelance();
  updateYearsDev();
  updateYearsManagement();
});

/**
 * Navigation sticky avec scroll effect
 */
function initNavigation() {
  const navbar = document.querySelector(".navbar");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });
}

/**
 * Hamburger menu mobile
 */
function initHamburger() {
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  if (!hamburger) return;

  hamburger.addEventListener("click", () => {
    const isExpanded = hamburger.getAttribute("aria-expanded") === "true";
    hamburger.setAttribute("aria-expanded", !isExpanded);
    navMenu.classList.toggle("active");
  });

  // Fermer au clic sur un lien
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active");
      hamburger.setAttribute("aria-expanded", "false");
    });
  });

  // Fermer avec Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && navMenu.classList.contains("active")) {
      navMenu.classList.remove("active");
      hamburger.setAttribute("aria-expanded", "false");
      hamburger.focus();
    }
  });
}

/**
 * Smooth scroll pour ancres
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
}

/**
 * Scroll behavior pour mise en évidence des liens nav
 */
function initScroll() {
  window.addEventListener("scroll", () => {
    const sections = document.querySelectorAll(".section[id]");
    const navLinks = document.querySelectorAll(".nav-link");

    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      if (window.pageYOffset >= sectionTop - 200) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href").slice(1) === current) {
        link.classList.add("active");
      }
    });
  });
}

/**
 * Intersection Observer pour animations au scroll
 */
function initIntersectionObserver() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observer pour les cards
  document
    .querySelectorAll(
      ".project-card, .education-card, .highlight-card, .skill-block, .timeline-content",
    )
    .forEach((element) => {
      element.style.opacity = "0";
      element.style.transform = "translateY(20px)";
      element.style.transition = "opacity 0.6s ease, transform 0.6s ease";
      observer.observe(element);
    });
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
