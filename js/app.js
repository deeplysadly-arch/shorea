// SHOREA V2 app.js

document.addEventListener("DOMContentLoaded", () => {

  const header = document.querySelector(".header");

  // 헤더 그림자
  window.addEventListener("scroll", () => {
    if (window.scrollY > 30) {
      header.style.boxShadow = "0 10px 25px rgba(0,0,0,.12)";
    } else {
      header.style.boxShadow = "none";
    }
  });

  // 부드러운 스크롤
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", e => {
      const id = link.getAttribute("href");

      if (id.length > 1) {
        const target = document.querySelector(id);

        if (target) {
          e.preventDefault();
          target.scrollIntoView({
            behavior: "smooth"
          });
        }
      }
    });
  });

  // 카드 애니메이션
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  }, {
    threshold: 0.15
  });

  document.querySelectorAll(".card, .section").forEach(el => {
    observer.observe(el);
  });

});