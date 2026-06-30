/* =====================================================
   SHOREA — unified UI script
   (mobile drawer / auto carousel / FAQ accordion / quick CTA)
   ===================================================== */
(function () {
  "use strict";

  function onReady(fn) {
    if (document.readyState !== "loading") fn();
    else document.addEventListener("DOMContentLoaded", fn);
  }

  onReady(function () {
    var header = document.querySelector(".header");
    var menuBtn = document.querySelector(".menu-btn");
    var nav = document.querySelector(".nav");

    /* ---------- 1) 모바일 햄버거 드로어 ---------- */
    if (menuBtn && nav) {
      var backdrop = document.createElement("div");
      backdrop.className = "nav-backdrop";
      document.body.appendChild(backdrop);

      function openMenu() {
        nav.classList.add("active");
        backdrop.classList.add("show");
        document.body.classList.add("nav-open");
        menuBtn.setAttribute("aria-expanded", "true");
      }
      function closeMenu() {
        nav.classList.remove("active");
        backdrop.classList.remove("show");
        document.body.classList.remove("nav-open");
        menuBtn.setAttribute("aria-expanded", "false");
      }
      menuBtn.setAttribute("aria-label", "메뉴 열기");
      menuBtn.setAttribute("aria-expanded", "false");
      menuBtn.addEventListener("click", function () {
        nav.classList.contains("active") ? closeMenu() : openMenu();
      });
      backdrop.addEventListener("click", closeMenu);
      Array.prototype.forEach.call(nav.querySelectorAll("a"), function (a) {
        a.addEventListener("click", closeMenu);
      });
      document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") closeMenu();
      });

      /* (이슈 a) 리사이즈 중에는 드로어 transition 을 꺼서
         메뉴가 위로 솟구치는 부자연스러운 애니메이션을 제거 */
      var resizeT;
      window.addEventListener("resize", function () {
        document.body.classList.add("no-anim");
        if (window.innerWidth > 1100) closeMenu();
        clearTimeout(resizeT);
        resizeT = setTimeout(function () {
          document.body.classList.remove("no-anim");
        }, 220);
      });
    }

    /* ---------- 2) 스크롤 시 헤더 그림자 ---------- */
    if (header) {
      var onScroll = function () {
        header.classList.toggle("scrolled", window.scrollY > 12);
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
    }

    /* ---------- 3) FAQ 아코디언 (모바일에서만 접힘) ---------- */
    var MOBILE = window.matchMedia("(max-width:768px)");
    var faqItems = Array.prototype.slice.call(document.querySelectorAll(".faq-item"));
    if (faqItems.length) {
      var initFaq = function () {
        faqItems.forEach(function (item, i) {
          if (MOBILE.matches) item.classList.toggle("open", i === 0);
          else item.classList.add("open");
        });
      };
      faqItems.forEach(function (item) {
        var q = item.querySelector("strong");
        if (q) q.addEventListener("click", function () {
          if (MOBILE.matches) item.classList.toggle("open");
        });
      });
      initFaq();
      if (MOBILE.addEventListener) MOBILE.addEventListener("change", initFaq);
    }

    /* ---------- 4) 자동 슬라이드 캐러셀 (모바일에서만 활성) ----------
       - CSS scroll-snap 미사용: 드래그 시 끊김 없음 (이슈 c)
       - 도트 클릭은 항상 해당 항목으로 부드럽게 이동 (4·5번도 정상, 이슈 c) */
    function setupCarousel(track, skipClass) {
      if (!track) return;
      var items = Array.prototype.filter.call(track.children, function (c) {
        return !(skipClass && c.classList.contains(skipClass));
      });
      if (items.length < 2) return;

      var dotsWrap = document.createElement("div");
      dotsWrap.className = "carousel-dots";
      track.parentNode.insertBefore(dotsWrap, track.nextSibling);
      var dotEls = items.map(function (_, i) {
        var d = document.createElement("button");
        d.type = "button";
        d.className = "cdot";
        d.setAttribute("aria-label", (i + 1) + "번 항목으로 이동");
        d.addEventListener("click", function () { stop(); go(i); schedule(); });
        dotsWrap.appendChild(d);
        return d;
      });

      var timer = null, resumeT = null, raf = false;
      function basis() { return items[0].offsetLeft; }
      function pos(it) { return it.offsetLeft - basis(); }
      function scrollable() { return track.scrollWidth - track.clientWidth > 4; }
      function maxScroll() { return track.scrollWidth - track.clientWidth; }
      function nearest() {
        if (track.scrollLeft <= 2) return 0;
        if (track.scrollLeft >= maxScroll() - 2) return items.length - 1;
        var vc = track.scrollLeft + track.clientWidth / 2, best = 0, bd = Infinity;
        items.forEach(function (it, i) {
          var c = pos(it) + it.clientWidth / 2, d = Math.abs(c - vc);
          if (d < bd) { bd = d; best = i; }
        });
        return best;
      }
      function updateDots() {
        var c = nearest();
        dotEls.forEach(function (d, i) { d.classList.toggle("active", i === c); });
      }
      function go(i) {
        var target = pos(items[i]) + items[i].clientWidth / 2 - track.clientWidth / 2;
        target = Math.max(0, Math.min(target, maxScroll()));
        track.scrollTo({ left: target, behavior: "smooth" });
      }
      function next() { if (scrollable()) go((nearest() + 1) % items.length); }
      function play() { stop(); if (scrollable()) timer = setInterval(next, 3000); }
      function stop() { if (timer) { clearInterval(timer); timer = null; } }
      function schedule() { clearTimeout(resumeT); resumeT = setTimeout(play, 2500); }

      track.addEventListener("scroll", function () {
        if (raf) return;
        raf = true;
        requestAnimationFrame(function () { raf = false; updateDots(); });
      }, { passive: true });

      ["mouseenter", "touchstart", "pointerdown"].forEach(function (ev) {
        track.addEventListener(ev, stop, { passive: true });
      });
      ["mouseleave", "touchend"].forEach(function (ev) {
        track.addEventListener(ev, schedule, { passive: true });
      });

      /* (이슈 c) 마우스 드래그로 좌우 이동 — 스냅이 없어 부드럽고,
         손을 떼면 가장 가까운 항목으로 부드럽게 정렬 */
      var down = false, sx = 0, sl = 0, moved = false;
      track.addEventListener("pointerdown", function (e) {
        if (!scrollable()) return;
        down = true; moved = false; sx = e.clientX; sl = track.scrollLeft;
        track.classList.add("dragging");
        try { track.setPointerCapture(e.pointerId); } catch (err) {}
      });
      track.addEventListener("pointermove", function (e) {
        if (!down) return;
        var dx = e.clientX - sx;
        if (Math.abs(dx) > 4) moved = true;
        track.scrollLeft = sl - dx;
      });
      function endDrag() {
        if (!down) return;
        down = false;
        track.classList.remove("dragging");
        if (moved) go(nearest());
        schedule();
      }
      track.addEventListener("pointerup", endDrag);
      track.addEventListener("pointercancel", endDrag);
      track.addEventListener("click", function (e) {
        if (moved) { e.preventDefault(); e.stopPropagation(); }
      }, true);

      function refresh() {
        if (scrollable()) { dotsWrap.style.display = "flex"; play(); }
        else { stop(); dotsWrap.style.display = "none"; track.scrollLeft = 0; }
        updateDots();
      }
      var rt;
      window.addEventListener("resize", function () { clearTimeout(rt); rt = setTimeout(refresh, 160); });
      document.addEventListener("visibilitychange", function () { document.hidden ? stop() : schedule(); });
      refresh();
    }

    setupCarousel(document.querySelector(".service-grid"));
    setupCarousel(document.querySelector(".process-wrap"), "process-line");

    /* ---------- 5) 우측 하단 플로팅 퀵메뉴 ----------
       data-no-fab 가 body 에 있으면(로그인 등) 생성하지 않음 */
    if (!document.body.hasAttribute("data-no-fab")) {
      var fab = document.createElement("div");
      fab.className = "quick-fab";
      fab.innerHTML =
        '<a href="quote.html" class="quick-fab-btn primary">📋 무료 비교견적</a>' +
        '<a href="contact.html" class="quick-fab-btn outline">💬 무료 상담</a>';
      document.body.appendChild(fab);

      var heroBtns = document.querySelector(".hero-buttons");
      if (heroBtns && "IntersectionObserver" in window) {
        new IntersectionObserver(function (es) {
          es.forEach(function (e) { fab.classList.toggle("show", !e.isIntersecting); });
        }, { threshold: 0 }).observe(heroBtns);
      } else {
        var fabScroll = function () { fab.classList.toggle("show", window.scrollY > 480); };
        window.addEventListener("scroll", fabScroll, { passive: true });
        fabScroll();
      }
    }
  });
})();
/* ===========================
   FACTORY TAB
=========================== */

const tabButtons = document.querySelectorAll(".tab-btn");
const tabPanels = document.querySelectorAll(".factory-panel");

tabButtons.forEach(button => {

    button.addEventListener("click", () => {

        const target = button.dataset.tab;

        tabButtons.forEach(btn =>
            btn.classList.remove("active")
        );

        tabPanels.forEach(panel =>
            panel.classList.remove("active")
        );

        button.classList.add("active");

        document
            .getElementById(target)
            .classList.add("active");

    });

});