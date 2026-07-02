import { auth, db } from "./firebase.js";

import {
    createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

import {
    doc,
    setDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const signupBtn = document.getElementById("signupBtn");

signupBtn.addEventListener("click", async () => {

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    if (!name || !email || !password) {
        alert("모든 항목을 입력해주세요.");
        return;
    }

   try {

    const userCredential =
        await createUserWithEmailAndPassword(auth, email, password);

    console.log("회원가입 성공", userCredential.user.uid);

    await setDoc(doc(db, "users", userCredential.user.uid), {

        name: name,
        email: email,
        createdAt: serverTimestamp(),
        role: "user"

    });

    console.log("Firestore 저장 성공");

    alert("회원가입이 완료되었습니다.");

    location.href = "login.html";

} catch (error) {

    console.error("회원가입 오류:", error);

    alert(error.code + "\n" + error.message);

}

    console.error(error);
    alert(error.code + "\n" + error.message);

}
});