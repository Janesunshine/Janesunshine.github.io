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

    /* ---- Nav sidebar (desktop): the bundled greedy-nav plugin does two
       things that assume a short horizontal bar, both wrong once the nav
       is a full-height vertical sidebar:
       1) it collapses links into a hidden dropdown based on horizontal-
          overflow math, and
       2) on every layout pass it sets `body`'s padding-top inline to the
          masthead's own height, to clear a fixed *bar*. With the
          masthead now 100vh tall, that inline style pushes the entire
          page down by a full viewport height.
       Rather than fight either, just correct both after the plugin runs,
       whenever the sidebar layout is active. Mobile is untouched — the
       plugin's own behavior is exactly right there. */
    var sidebarQuery = window.matchMedia("(min-width: 881px)");
    function fixSidebarNav() {
      if (!sidebarQuery.matches) { document.body.style.paddingTop = ""; return; }
      document.body.style.paddingTop = "0px";
      var vlinks = document.querySelector("#site-nav .visible-links");
      var hlinks = document.querySelector("#site-nav .hidden-links");
      var btn = document.querySelector("#site-nav button");
      if (hlinks && vlinks) {
        // Reclaimed links must land back before the CTA, not after it —
        // the CTA never leaves visible-links (it's "persist"), so a bare
        // appendChild would stack reclaimed links below it.
        var ctaEl = vlinks.querySelector(".masthead__menu-item--cta");
        while (hlinks.firstChild) {
          if (ctaEl) { vlinks.insertBefore(hlinks.firstChild, ctaEl); }
          else { vlinks.appendChild(hlinks.firstChild); }
        }
      }
      if (btn) { btn.classList.add("hidden"); btn.classList.remove("close"); }
    }
    fixSidebarNav();
    window.addEventListener("resize", fixSidebarNav);
    if (sidebarQuery.addEventListener) sidebarQuery.addEventListener("change", fixSidebarNav);

    /* ---- Custom cursor: the native pointer stays visible everywhere by
       default; a small filled ring only takes over while hovering a link
       or other clickable element — only on devices with a real mouse.
       Never touches touch/coarse-pointer devices, so mobile taps are
       untouched. */
    if (!reduceMotion && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      var cursor = document.createElement("div");
      cursor.className = "glow-cursor";
      document.body.appendChild(cursor);

      var tx = 0, ty = 0, cx = 0, cy = 0, started = false;
      window.addEventListener("mousemove", function (e) {
        tx = e.clientX; ty = e.clientY;
        if (!started) { cx = tx; cy = ty; started = true; }
      });

      (function trail() {
        cx += (tx - cx) * 0.22;
        cy += (ty - cy) * 0.22;
        cursor.style.transform = "translate(" + cx + "px, " + cy + "px)";
        window.requestAnimationFrame(trail);
      })();

      var interactive = "a, button, .pf-row, .glow-chip, .glow-tagrow__role, .glow-badge, [role='button']";
      document.addEventListener("mouseover", function (e) {
        if (e.target.closest && e.target.closest(interactive)) {
          document.documentElement.classList.add("has-glow-cursor");
          cursor.classList.add("is-visible", "is-active");
        }
      });
      document.addEventListener("mouseout", function (e) {
        if (e.target.closest && e.target.closest(interactive)) {
          document.documentElement.classList.remove("has-glow-cursor");
          cursor.classList.remove("is-visible", "is-active");
        }
      });
    }
  });
})();
