/* =====================================================
   SHOREA CONTACT
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const submitBtn = document.getElementById("contactSubmit");

    const company = document.getElementById("company");
    const manager = document.getElementById("manager");
    const email = document.getElementById("email");
    const message = document.getElementById("message");

    if (!submitBtn) return;

    submitBtn.addEventListener("click", () => {

        if (
            company.value.trim() === "" ||
            manager.value.trim() === "" ||
            email.value.trim() === "" ||
            message.value.trim() === ""
        ) {

            alert("모든 항목을 입력해주세요.");
            return;

        }

        alert("문의가 정상적으로 접수되었습니다.");

        company.value = "";
        manager.value = "";
        email.value = "";
        message.value = "";

    });

});