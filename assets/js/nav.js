/* Archbold — navigation behaviour (vanilla JS, no dependencies) */
(function () {
  "use strict";

  var header = document.querySelector(".site-header");
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".main-nav");
  var langSwitch = document.querySelector(".lang-switch");
  var langButton = langSwitch ? langSwitch.querySelector(".lang-current") : null;

  // Header background once the hero has been scrolled past.
  function onScroll() {
    if (!header) return;
    if (window.scrollY > 40) {
      header.classList.add("is-scrolled");
    } else {
      header.classList.remove("is-scrolled");
    }
  }
  document.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Enable header transitions only after first paint, so nothing animates on page load.
  requestAnimationFrame(function () {
    requestAnimationFrame(function () {
      document.documentElement.classList.add("is-ready");
    });
  });

  // Mobile menu toggle.
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("is-open");
      toggle.classList.toggle("is-active", isOpen);
      document.body.style.overflow = isOpen ? "hidden" : "";
      toggle.setAttribute("aria-expanded", String(isOpen));
    });

    nav.querySelectorAll("a.nav-link").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("is-open");
        toggle.classList.remove("is-active");
        document.body.style.overflow = "";
      });
    });
  }

  // Language dropdown.
  if (langSwitch && langButton) {
    langButton.addEventListener("click", function (e) {
      e.stopPropagation();
      langSwitch.classList.toggle("is-open");
    });
    document.addEventListener("click", function () {
      langSwitch.classList.remove("is-open");
    });
  }
})();
