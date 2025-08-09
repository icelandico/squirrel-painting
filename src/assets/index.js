const windowWidth = window.innerWidth;
const MOBILE_BREAKPOINT = 1024;
const SMALL_SCREEN_BREAKPOINT = 768;

const MOBILE_NAV_ID = "#main-nav-mobile";
const DESKTOP_NAV_ID = "#main-nav";

const navId = windowWidth < MOBILE_BREAKPOINT ? MOBILE_NAV_ID : DESKTOP_NAV_ID;

document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(`${navId} a`);

  console.log("navLinks", navLinks);
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
        console.log("intersecting", navLink);
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

const getVisibleImagesCount = () => {
  if (windowWidth >= 1024) {
    return 3;
  }
  return 1;
};

document.addEventListener("DOMContentLoaded", () => {
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  const offset = windowWidth <= 768 ? 70 : 0;

  anchorLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
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

class Carousel {
  constructor(element) {
    this.content = element.querySelector(".carousel-content");
    this.elements = Array.from(this.content.children);
    this.elementsLength = this.elements.length;
    this.arrowLeft = element.querySelector(".carousel-arrow-left");
    this.arrowRight = element.querySelector(".carousel-arrow-right");
    this.activeElement = 0;
    this.updateArrowStates();
  }

  activateElement(n) {
    if (n < 0 || n >= this.elementsLength) {
      return;
    }
    this.activeElement = n;

    const elementToScrollTo = this.elements[n];

    this.content.scrollTo({
      left: elementToScrollTo.offsetLeft - this.content.offsetLeft,
      behavior: "smooth",
    });

    this.updateArrowStates();
  }

  updateArrowStates() {
    const visibleImages = getVisibleImagesCount();

    if (this.activeElement <= 0) {
      this.arrowLeft.classList.add("inactive");
    } else {
      this.arrowLeft.classList.remove("inactive");
    }

    if (this.activeElement >= this.elementsLength - visibleImages) {
      this.arrowRight.classList.add("inactive");
    } else {
      this.arrowRight.classList.remove("inactive");
    }
  }

  addEventListeners() {
    this.arrowLeft.addEventListener("click", () => {
      this.activateElement(this.activeElement - 1);
    });

    this.arrowRight.addEventListener("click", () => {
      this.activateElement(this.activeElement + 1);
    });
  }
}

const carousel = document.getElementById("carousel");
new Carousel(carousel).addEventListeners();
