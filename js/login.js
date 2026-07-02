import { auth } from "./firebase.js";

import {
    signInWithEmailAndPassword,
    setPersistence,
    browserLocalPersistence,
    browserSessionPersistence
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

const loginBtn = document.querySelector(".login-btn");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const rememberMe = document.getElementById("rememberMe");

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

        await setPersistence(
            auth,
            rememberMe.checked
                ? browserLocalPersistence
                : browserSessionPersistence
        );

        await signInWithEmailAndPassword(
            auth,
            email,
            password
        );

        alert("로그인되었습니다.");

        location.href = "index.html";

    } catch (e) {

        switch (e.code) {

            case "auth/invalid-credential":
                alert("이메일 또는 비밀번호가 올바르지 않습니다.");
                break;

            case "auth/too-many-requests":
                alert("로그인 시도가 너무 많습니다.");
                break;

            default:
                alert(e.message);

        }

    } finally {

        loginBtn.disabled = false;
        loginBtn.textContent = "로그인";

    }

}

loginBtn.addEventListener("click", login);

passwordInput.addEventListener("keydown", e => {

    if (e.key === "Enter") login();

});