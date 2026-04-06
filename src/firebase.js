import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";

export const googleProvider = new GoogleAuthProvider();

const firebaseConfig = {
  // PASTE YOUR COPIED CONFIG HEREconst firebaseConfig = {
  apiKey: "AIzaSyAtYgrVSHWTTP9Nadx_id_dzEKGf5q9eLY",
  authDomain: "new-hub-2bf76.firebaseapp.com",
  projectId: "new-hub-2bf76",
  storageBucket: "new-hub-2bf76.firebasestorage.app",
  messagingSenderId: "645310345158",
  appId: "1:645310345158:web:98248f1074c2e5450b4cc7",
  measurementId: "G-K9FX8STXL7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// 🔥 Database
export const db = getFirestore(app);

// 🔐 Authentication
export const auth = getAuth(app);