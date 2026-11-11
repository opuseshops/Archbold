/* Archbold — gallery lightbox (vanilla JS, no dependencies)
   Works against any set of elements matching [data-lightbox] inside
   a common gallery container. Builds its own DOM once and reuses it. */
(function () {
  "use strict";

  var items = Array.prototype.slice.call(document.querySelectorAll("[data-lightbox]"));
  if (!items.length) return;

  var current = 0;
  var lightbox, imgEl, captionEl, closeBtn, prevBtn, nextBtn;

  function build() {
    lightbox = document.createElement("div");
    lightbox.className = "lightbox";
    lightbox.setAttribute("role", "dialog");
    lightbox.setAttribute("aria-modal", "true");
    lightbox.setAttribute("aria-hidden", "true");

    lightbox.innerHTML =
      '<button class="lightbox-close" aria-label="Close">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1"><line x1="4" y1="4" x2="20" y2="20"/><line x1="20" y1="4" x2="4" y2="20"/></svg>' +
      "</button>" +
      '<button class="lightbox-nav lightbox-prev" aria-label="Previous project">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1"><polyline points="15 5 8 12 15 19"/></svg>' +
      "</button>" +
      '<button class="lightbox-nav lightbox-next" aria-label="Next project">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1"><polyline points="9 5 16 12 9 19"/></svg>' +
      "</button>" +
      '<figure class="lightbox-figure">' +
        '<img alt="" />' +
        '<figcaption class="lightbox-caption"></figcaption>' +
      "</figure>";

    document.body.appendChild(lightbox);

    imgEl = lightbox.querySelector("img");
    captionEl = lightbox.querySelector(".lightbox-caption");
    closeBtn = lightbox.querySelector(".lightbox-close");
    prevBtn = lightbox.querySelector(".lightbox-prev");
    nextBtn = lightbox.querySelector(".lightbox-next");

    closeBtn.addEventListener("click", close);
    prevBtn.addEventListener("click", function () { step(-1); });
    nextBtn.addEventListener("click", function () { step(1); });

    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) close();
    });

    document.addEventListener("keydown", function (e) {
      if (!lightbox.classList.contains("is-open")) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") step(-1);
      if (e.key === "ArrowRight") step(1);
    });
  }

  function render() {
    var el = items[current];
    var full = el.getAttribute("data-lightbox") || el.querySelector("img").src;
    var title = el.getAttribute("data-title") || "";
    var type = el.getAttribute("data-type") || "";

    // Hide the current image immediately so the previous photo never
    // lingers on screen while the next one loads.
    imgEl.classList.remove("is-loaded");
    imgEl.alt = title;
    captionEl.replaceChildren();
    if (title) {
      var strong = document.createElement("strong");
      strong.textContent = title;
      captionEl.appendChild(strong);
    }
    if (type) captionEl.appendChild(document.createTextNode(type));

    // Swap the source only after it has fully loaded, then fade it in.
    var loader = new Image();
    loader.onload = function () {
      // Ignore late loads that no longer match what's on screen
      // (e.g. the user clicked next/prev again before this finished).
      if (loader.src !== resolveSrc(items[current])) return;
      imgEl.src = loader.src;
      // Force reflow so the opacity transition actually runs.
      void imgEl.offsetWidth;
      imgEl.classList.add("is-loaded");
    };
    loader.src = full;
  }

  function resolveSrc(el) {
    return el.getAttribute("data-lightbox") || el.querySelector("img").src;
  }

  function open(index) {
    current = index;
    render();
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function close() {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  function step(dir) {
    current = (current + dir + items.length) % items.length;
    render();
  }

  build();

  items.forEach(function (el, index) {
    el.addEventListener("click", function () { open(index); });
    el.setAttribute("tabindex", "0");
    el.setAttribute("role", "button");
    el.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        open(index);
      }
    });
  });
})();
