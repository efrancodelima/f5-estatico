// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyBv0UuxcbfaPJGtwGO_OnANZamWn3oAihM",
  authDomain: "soat-fase-5.firebaseapp.com",
  projectId: "soat-fase-5",
  storageBucket: "soat-fase-5.firebasestorage.app",
  messagingSenderId: "643038356612",
  appId: "1:643038356612:web:334f1cc0b6de690d5cced1",
  measurementId: "G-L1NRHVWKFX"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);