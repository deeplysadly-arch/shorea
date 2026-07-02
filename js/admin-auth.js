import { auth, db } from "./firebase.js";

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

import {
    doc,
    getDoc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

onAuthStateChanged(auth, async (user) => {

    if (!user) {

        alert("로그인이 필요합니다.");

        location.href = "../login.html";

        return;

    }

    const snap = await getDoc(
        doc(db, "users", user.uid)
    );

    if (!snap.exists()) {

        alert("회원 정보가 없습니다.");

        location.href = "../login.html";

        return;

    }

    const data = snap.data();

    if (data.role !== "admin") {

        alert("관리자만 접근 가능합니다.");

        location.href = "../index.html";

    }

});