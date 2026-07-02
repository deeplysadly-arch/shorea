import { auth } from "./firebase.js";

import {
    createUserWithEmailAndPassword,
    updateProfile
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

document.addEventListener("DOMContentLoaded", () => {

    const signupBtn = document.getElementById("signupBtn");

    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const password = document.getElementById("password");

    if (!signupBtn) return;

    signupBtn.addEventListener("click", async () => {

        if (
            name.value.trim() === "" ||
            email.value.trim() === "" ||
            password.value === ""
        ) {

            alert("모든 항목을 입력하세요.");

            return;

        }

        try {

            const user = await createUserWithEmailAndPassword(

                auth,

                email.value.trim(),

                password.value

            );

            await updateProfile(user.user, {

                displayName: name.value.trim()

            });

            alert("회원가입이 완료되었습니다.");

            window.location.href = "login.html";

        } catch (error) {

            switch (error.code) {

                case "auth/email-already-in-use":

                    alert("이미 가입된 이메일입니다.");

                    break;

                case "auth/weak-password":

                    alert("비밀번호는 6자 이상이어야 합니다.");

                    break;

                case "auth/invalid-email":

                    alert("올바른 이메일 형식이 아닙니다.");

                    break;

                default:

                    alert(error.message);

            }

        }

    });

});