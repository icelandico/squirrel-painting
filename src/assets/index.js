const windowWidth = window.innerWidth;
const MOBILE_BREAKPOINT = 1024;
const SMALL_SCREEN_BREAKPOINT = 768;

const MOBILE_NAV_ID = "#main-nav-mobile";
const DESKTOP_NAV_ID = "#main-nav";
const navbarLogoSection = document.querySelector(".logo-section");
let navbarHidden = false;
const hmbButton = document.querySelector(".hmb-container");
const mobileMenu = document.querySelector(".mobile-menu-container");

const navId = windowWidth < MOBILE_BREAKPOINT ? MOBILE_NAV_ID : DESKTOP_NAV_ID;

/* Set active sction */

document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(`${navId} a`);
  const sections = [];

  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    if (href && href.startsWith("#")) {
      const section = document.querySelector(href);
      if (section) {
        sections.push(section);
      }
    }
  });

  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.5,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const id = entry.target.getAttribute("id");
      const navLink = document.querySelector(`${navId} a[href="#${id}"]`);
      if (entry.isIntersecting) {
        navLink.parentElement.classList.add("active-nav");
      } else {
        navLink.parentElement.classList.remove("active-nav");
      }
    });
  }, observerOptions);

  sections.forEach((section) => {
    observer.observe(section);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  const isMobile = windowWidth < MOBILE_BREAKPOINT;

  const offset = isMobile ? 50 : 120;

  anchorLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      if (isMobile) {
        hmbButton.classList.remove("active");
        mobileMenu.classList.remove("active");
      }
      event.preventDefault();

      const targetId = link.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        const targetPosition = targetElement.offsetTop - offset;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });
});

/* Toggle navbar visibility */

let timeout;
window.addEventListener("scroll", () => {
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    if (window.scrollY > 15) {
      navbarLogoSection.classList.add("max-h-0", "opacity-0");
      navbarLogoSection.classList.remove("max-h-[180px]", "opacity-100");
    } else {
      navbarLogoSection.classList.remove("max-h-0", "opacity-0");
      navbarLogoSection.classList.add("max-h-[180px]", "opacity-100");
    }
  }, 150);
});

/* Toggle mobile menu visibility */

hmbButton.addEventListener("click", () => {
  hmbButton.classList.toggle("active");
  mobileMenu.classList.toggle("active");
});

/* Form submit */

const handleSubmit = (event) => {
  event.preventDefault();

  const myForm = event.target;
  const formData = new FormData(myForm);

  fetch("/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams(formData).toString(),
  })
    .then(() => {
      const name = document.getElementById("name");
      const email = document.getElementById("email");
      const message = document.getElementById("message");
      const datePlace = document.getElementById("date-place");

      const successMessage = document.querySelector(".form-submit-success");

      successMessage.classList.add("visible");
      name.value = "";
      email.value = "";
      message.value = "";
    })
    .catch((error) => alert(error));
};

document
  .querySelector("#contact-form")
  .addEventListener("submit", handleSubmit);
