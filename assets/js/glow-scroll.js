/* ==========================================================================
   GLOW — scroll interactions: reveal, parallax, hero fade, progress bar
   Vanilla JS, no dependencies. No-ops gracefully on pages without the hero.
   ========================================================================== */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function ready(fn) {
    if (document.readyState !== "loading") fn();
    else document.addEventListener("DOMContentLoaded", fn);
  }

  ready(function () {
    /* ---- Scroll progress bar (all pages) ---- */
    var bar = document.createElement("div");
    bar.className = "glow-progress";
    document.body.appendChild(bar);

    /* ---- Scroll-reveal via IntersectionObserver ---- */
    var revealEls = Array.prototype.slice.call(document.querySelectorAll(".reveal"));
    if (revealEls.length) {
      if (reduceMotion || !("IntersectionObserver" in window)) {
        revealEls.forEach(function (el) { el.classList.add("in"); });
      } else {
        var io = new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("in");
              io.unobserve(entry.target);
            }
          });
        }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
        revealEls.forEach(function (el) { io.observe(el); });
      }
    }

    /* ---- Portfolio "Read more" toggles (grid + featured cards) ---- */
    function wireMore(card, descSel, btnSel) {
      var desc = card.querySelector(descSel);
      var btn = card.querySelector(btnSel);
      if (!desc || !btn) return;
      // Only show the toggle if the text is actually clamped/overflowing.
      if (desc.scrollHeight - desc.clientHeight > 4) {
        btn.hidden = false;
        btn.addEventListener("click", function () {
          var open = card.classList.toggle("is-open");
          btn.textContent = open ? "Show less" : "Read more";
        });
      }
    }
    Array.prototype.slice.call(document.querySelectorAll(".glow-pcard"))
      .forEach(function (card) { wireMore(card, ".glow-pcard__desc", ".glow-pcard__more"); });
    Array.prototype.slice.call(document.querySelectorAll(".pf-featured"))
      .forEach(function (card) { wireMore(card, ".pf-featured__desc", ".pf-featured__more"); });

    /* ---- Scroll progress bar (cheap, rAF-throttled). No parallax. ---- */
    var scrollTicking = false;
    function onScroll() {
      var y = window.pageYOffset || document.documentElement.scrollTop;
      var docH = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.transform = "scaleX(" + (docH > 0 ? Math.min(y / docH, 1) : 0) + ")";
      scrollTicking = false;
    }
    function requestScroll() {
      if (!scrollTicking) { scrollTicking = true; window.requestAnimationFrame(onScroll); }
    }
    window.addEventListener("scroll", requestScroll, { passive: true });
    window.addEventListener("resize", requestScroll);
    onScroll();
  });
})();
