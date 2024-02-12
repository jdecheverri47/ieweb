// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCZjnRCAlJjq6Y69FuhsqDtJLs7t4TR6GI",
  authDomain: "ieid-8d946.firebaseapp.com",
  projectId: "ieid-8d946",
  storageBucket: "ieid-8d946.appspot.com",
  messagingSenderId: "504423796449",
  appId: "1:504423796449:web:0133dd7ed43eb21bfc71a0",
  measurementId: "G-XPGX4ERB9V",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

const auth = getAuth();
const db = getFirestore(app);

export { auth, db };
