/* =====================================================
   SHOREA FACTORY
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const searchBtn = document.querySelector(".factory-search .btn-primary");
    const resultBox = document.getElementById("factoryResult");

    if (searchBtn) {

        searchBtn.addEventListener("click", () => {

            if (resultBox) {

                resultBox.value = `AI 추천 결과

추천 공장 : Yiwu Smart Factory

추천 이유

• 목표 단가와 가장 유사
• MOQ 조건 우수
• 납기 안정적
• 기존 거래 평점 우수

추천 점수 : 96점`;

            }

        });

    }

    document.querySelectorAll(".factory-card .btn-primary").forEach(btn => {

        btn.addEventListener("click", () => {

            alert("비교견적 요청이 접수되었습니다.");

        });

    });

    const quoteBtn = document.getElementById("quoteSubmit");

    if (quoteBtn) {

        quoteBtn.addEventListener("click", () => {

            alert("견적 요청이 완료되었습니다.");

        });

    }

});