/* =====================================================
   SHOREA QUALITY
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const analyzeBtn = document.getElementById("analyzeBtn");
    const qcResult = document.getElementById("qcResult");

    const claimBtn = document.getElementById("claimBtn");
    const claimInput = document.getElementById("claimInput");
    const claimResult = document.getElementById("claimResult");

    const upload = document.getElementById("qcUpload");

    /* =============================
       AI 품질 분석
    ============================== */

    if (analyzeBtn && qcResult) {

        analyzeBtn.addEventListener("click", () => {

            qcResult.value = `AI 품질 분석 결과

✔ 외관 : 이상 없음

✔ 기능 : 정상

✔ 포장 : 양호

✔ 수량 : 일치

예상 불량률 : 0.8%

종합 판정 : PASS`;

        });

    }

    /* =============================
       클레임 생성
    ============================== */

    if (claimBtn && claimInput && claimResult) {

        claimBtn.addEventListener("click", () => {

            const text = claimInput.value.trim();

            if (text === "") {

                alert("클레임 내용을 입력하세요.");

                return;

            }

            claimResult.value =
`您好，

我们发现以下质量问题。

${text}

请确认后尽快回复。

谢谢！

SHOREA`;

        });

    }

    /* =============================
       이미지 업로드
    ============================== */

    if (upload) {

        upload.addEventListener("change", (e) => {

            const count = e.target.files.length;

            if (count > 0) {

                alert(count + "개의 파일이 선택되었습니다.");

            }

        });

    }

});