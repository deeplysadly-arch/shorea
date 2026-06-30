/* =====================================================
   SHOREA JS FINAL
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const menuBtn = document.querySelector(".menu-btn");
    const nav = document.querySelector(".nav");

    /* ================= MOBILE MENU ================= */

    if(menuBtn){

        menuBtn.addEventListener("click", () => {

            nav.classList.toggle("active");

        });

    }

    /* ================= SCROLL HEADER ================= */

    const header = document.querySelector(".header");

    window.addEventListener("scroll", () => {

        if(window.scrollY > 20){

            header.classList.add("scrolled");

        }else{

            header.classList.remove("scrolled");

        }

    });

    /* ================= SCROLL ANIMATION ================= */

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if(entry.isIntersecting){

                entry.target.classList.add("show");

            }

        });

    }, { threshold: 0.15 });

    document.querySelectorAll(
        ".service-card, .process-item, .ceo, .section-title"
    ).forEach(el => observer.observe(el));

});