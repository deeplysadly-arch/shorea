import { auth } from "./firebase.js";

import {
    signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

document.addEventListener("DOMContentLoaded", () => {

    const loginBtn = document.querySelector(".login-btn");
    const emailInput = document.querySelector("input[type='email']");
    const passwordInput = document.querySelector("input[type='password']");

    if (!loginBtn || !emailInput || !passwordInput) return;

    async function login() {

        const email = emailInput.value.trim();
        const password = passwordInput.value;

        if (!email || !password) {
            alert("이메일과 비밀번호를 입력하세요.");
            return;
        }

        loginBtn.disabled = true;
        loginBtn.textContent = "로그인 중...";

        try {

            await signInWithEmailAndPassword(auth, email, password);

            alert("로그인되었습니다.");

            window.location.href = "index.html";

        } catch (error) {

            switch (error.code) {

                case "auth/invalid-credential":
                case "auth/user-not-found":
                case "auth/wrong-password":
                    alert("이메일 또는 비밀번호가 올바르지 않습니다.");
                    break;

                case "auth/invalid-email":
                    alert("이메일 형식이 올바르지 않습니다.");
                    break;

                case "auth/too-many-requests":
                    alert("로그인 시도가 너무 많습니다. 잠시 후 다시 시도하세요.");
                    break;

                default:
                    alert(error.message);

            }

        } finally {

            loginBtn.disabled = false;
            loginBtn.textContent = "로그인";

        }

    }

    loginBtn.addEventListener("click", login);

    passwordInput.addEventListener("keydown", (e) => {

        if (e.key === "Enter") {

            login();

        }

    });

});