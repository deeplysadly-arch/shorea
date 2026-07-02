/* =====================================================
   SHOREA PRODUCT
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const saveBtn = document.getElementById("saveProduct");
    const aiBtn = document.getElementById("aiSuggest");

    const productName = document.getElementById("productName");
    const factoryName = document.getElementById("factoryName");
    const memo = document.getElementById("productMemo");
    const result = document.getElementById("productResult");

    /* =============================
       제품 저장
    ============================== */

    if (saveBtn) {

        saveBtn.addEventListener("click", () => {

            if (
                productName.value.trim() === "" ||
                factoryName.value.trim() === ""
            ) {

                alert("제품명과 공장명을 입력하세요.");

                return;

            }

            alert("제품 정보가 저장되었습니다.");

        });

    }

    /* =============================
       AI 제안
    ============================== */

    if (aiBtn && result) {

        aiBtn.addEventListener("click", () => {

            const name = productName.value.trim() || "등록된 제품";

            result.value =
`AI 제품 분석 결과

제품명 : ${name}

✔ 포장 강도 개선 권장

✔ MOQ 500EA 이상 추천

✔ FOB 조건 협상 권장

✔ 생산 전 샘플 확인 권장

✔ 출고 전 QC 검사 추천

종합 의견

현재 조건으로 생산 가능합니다.`;

        });

    }

    /* =============================
       자동 메모 높이
    ============================== */

    if (memo) {

        memo.addEventListener("input", () => {

            memo.style.height = "auto";
            memo.style.height = memo.scrollHeight + "px";

        });

    }

});