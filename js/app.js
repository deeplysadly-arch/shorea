/* ==========================================
   SHOREA V5
========================================== */

document.addEventListener("DOMContentLoaded", () => {

  const menuBtn = document.querySelector(".menu-btn");
  const nav = document.querySelector(".main-nav");

  // 모바일 메뉴 토글
  if (menuBtn && nav) {
    menuBtn.addEventListener("click", () => {
      nav.classList.toggle("active");
      menuBtn.classList.toggle("active");
    });

    // 메뉴 클릭 시 자동 닫기
    nav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        nav.classList.remove("active");
        menuBtn.classList.remove("active");
      });
    });
  }

  // 스크롤 시 Header 그림자
  const header = document.querySelector(".header");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 20) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // 등장 애니메이션
  const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }

    });

  }, {
    threshold: 0.15
  });

  document.querySelectorAll(
    ".service-card,.step,.ceo-section,.section-title"
  ).forEach(el => observer.observe(el));

});