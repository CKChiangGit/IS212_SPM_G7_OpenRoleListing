// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBRlpvZarK4Sp8JdbvNHPAYzF_vdBg_1Wk",
  authDomain: "spm-db-8d2d5.firebaseapp.com",
  projectId: "spm-db-8d2d5",
  storageBucket: "spm-db-8d2d5.appspot.com",
  messagingSenderId: "568063193299",
  appId: "1:568063193299:web:0103a45ebcf97dbd98e426"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore()