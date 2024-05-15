import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBYWve6gCF5JAh8k98ItCgqki6ruXH1CTs",
    authDomain: "chat-gpt-messenger-aa841.firebaseapp.com",
    projectId: "chat-gpt-messenger-aa841",
    storageBucket: "chat-gpt-messenger-aa841.appspot.com",
    messagingSenderId: "497742027102",
    appId: "1:497742027102:web:d9d61c6fae5b848cdbd7cf",
    measurementId: "G-KBP42WM7SQ"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db }