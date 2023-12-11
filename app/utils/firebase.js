// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDS0MJZBRVRMtzetQZFxSq6El5u5XyLMNc",
  authDomain: "ieidtest.firebaseapp.com",
  projectId: "ieidtest",
  storageBucket: "ieidtest.appspot.com",
  messagingSenderId: "949635688176",
  appId: "1:949635688176:web:f13b04f4f11a6c4a218435",
  measurementId: "G-633N4EJVS8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
