/* =====================================================
   SHOREA NEGOTIATION
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const prompt = document.getElementById("prompt");
    const sendBtn = document.getElementById("sendBtn");
    const chatArea = document.getElementById("chatArea");

    if (!prompt || !sendBtn || !chatArea) return;

    /* =========================
       채팅 추가
    ========================= */

    function addMessage(type, text) {

        const message = document.createElement("div");
        message.className = "message " + type;

        const avatar = document.createElement("div");
        avatar.className = "avatar";
        avatar.textContent = (type === "user") ? "🙂" : "🤖";

        const bubble = document.createElement("div");
        bubble.className = "bubble";
        bubble.textContent = text;

        message.appendChild(avatar);
        message.appendChild(bubble);

        chatArea.appendChild(message);

        chatArea.scrollTop = chatArea.scrollHeight;

    }

    /* =========================
       전송
    ========================= */

    function sendMessage() {

        const text = prompt.value.trim();

        if (text === "") return;

        addMessage("user", text);

        prompt.value = "";

        setTimeout(() => {

            addMessage(
                "ai",
                "OpenAI API 연결 전입니다.\n현재는 테스트 모드입니다."
            );

        }, 500);

    }

    sendBtn.addEventListener("click", sendMessage);

    prompt.addEventListener("keydown", function (e) {

        if (e.key === "Enter" && !e.shiftKey) {

            e.preventDefault();

            sendMessage();

        }

    });

    /* =========================
       빠른 메뉴
    ========================= */

    document.querySelectorAll(".quick-btn").forEach(function (btn) {

        btn.addEventListener("click", function () {

            switch (btn.textContent.trim()) {

                case "🌏 번역":
                    prompt.value = "다음 문장을 중국어 무역 표현으로 번역해줘.";
                    break;

                case "🤝 가격협상":
                    prompt.value = "가격 협상 문장을 작성해줘.";
                    break;

                case "✉ 이메일":
                    prompt.value = "중국 거래처 이메일을 작성해줘.";
                    break;

                case "💬 WeChat":
                    prompt.value = "WeChat 메시지를 작성해줘.";
                    break;

                case "📄 PI":
                    prompt.value = "Proforma Invoice를 작성해줘.";
                    break;

                case "📦 CI":
                    prompt.value = "Commercial Invoice를 작성해줘.";
                    break;

                case "🚚 PL":
                    prompt.value = "Packing List를 작성해줘.";
                    break;

                case "📑 계약서":
                    prompt.value = "구매 계약서를 작성해줘.";
                    break;

            }

            prompt.focus();

        });

    });

    /* =========================
       문서 카드
    ========================= */

    document.querySelectorAll(".template-card").forEach(function (card) {

        card.addEventListener("click", function () {

            const template = card.dataset.template;

            if (template) {

                prompt.value = template;
                prompt.focus();

            }

        });

    });

    /* =========================
       파일 업로드
    ========================= */

    const upload = document.getElementById("fileUpload");
    const fileList = document.getElementById("fileList");

    if (upload && fileList) {

        upload.addEventListener("change", function (e) {

            fileList.innerHTML = "";

            Array.from(e.target.files).forEach(function (file) {

                const item = document.createElement("div");

                item.className = "file-item";

                item.innerHTML = `
                    <span>📄 ${file.name}</span>
                    <span>${Math.round(file.size / 1024)} KB</span>
                `;

                fileList.appendChild(item);

            });

        });

    }

});