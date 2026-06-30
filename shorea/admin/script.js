/* ======================================================
SHOREA ADMIN
====================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const sidebar = document.querySelector(".sidebar");
    const menuBtn = document.querySelector(".menu-btn");
    const overlay = document.querySelector(".sidebar-overlay");

    if(menuBtn){

        menuBtn.addEventListener("click",()=>{

            sidebar.classList.toggle("open");
            overlay.classList.toggle("show");

        });

    }

    if(overlay){

        overlay.addEventListener("click",()=>{

            sidebar.classList.remove("open");
            overlay.classList.remove("show");

        });

    }

});


/* ======================================================
TOP BUTTON
====================================================== */

const topBtn=document.querySelector(".floating-top");

window.addEventListener("scroll",()=>{

if(window.scrollY>300){

topBtn.style.display="flex";

}else{

topBtn.style.display="none";

}

});

topBtn.onclick=()=>{

window.scrollTo({

top:0,

behavior:"smooth"

});

};


/* ======================================================
MENU ACTIVE
====================================================== */

const menus=document.querySelectorAll(".sidebar li");

menus.forEach(menu=>{

menu.onclick=()=>{

menus.forEach(i=>i.classList.remove("active"));

menu.classList.add("active");

};

});
/* ======================================================
NOTIFICATION
====================================================== */

const notice=document.querySelector(".notification-panel");

const closeBtn=document.querySelector(".close-notification");

const profile=document.querySelector(".admin-profile");

if(profile){

profile.onclick=()=>{

notice.classList.toggle("open");

};

}

if(closeBtn){

closeBtn.onclick=()=>{

notice.classList.remove("open");

};

}


/* ======================================================
MODAL
====================================================== */

const modal=document.querySelector(".modal");

const modalClose=document.querySelector(".modal-close");

document.querySelectorAll(".btn-confirm").forEach(btn=>{

btn.onclick=()=>{

modal.style.display="none";

};

});

document.querySelectorAll(".btn-cancel").forEach(btn=>{

btn.onclick=()=>{

modal.style.display="none";

};

});

if(modalClose){

modalClose.onclick=()=>{

modal.style.display="none";

};

}

window.onclick=(e)=>{

if(e.target===modal){

modal.style.display="none";

}

};


/* ======================================================
LOADING
====================================================== */

window.onload=()=>{

const loading=document.querySelector(".loading-screen");

loading.style.display="flex";

setTimeout(()=>{

loading.style.display="none";

},700);

};


/* ======================================================
MEMO
====================================================== */

const memo=document.querySelector(".memo");

if(localStorage.getItem("shoreaMemo")){

memo.value=localStorage.getItem("shoreaMemo");

}

document.querySelector(".save-btn").onclick=()=>{

localStorage.setItem("shoreaMemo",memo.value);

alert("메모가 저장되었습니다.");

};