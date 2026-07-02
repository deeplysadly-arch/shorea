import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import { getAuth } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

const firebaseConfig = {

    apiKey: "AIzaSyBz8I7kho4h6wJWXJdYueU3jzI4O3jJJrs",

    authDomain: "shorea.firebaseapp.com",

    projectId: "shorea",

    storageBucket: "shorea.firebasestorage.app",

    messagingSenderId: "678639488998",

    appId: "1:678639488998:web:d455641cf4c61347b05027"

};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);