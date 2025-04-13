// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAYH8gaUnOWwUKaS7CRKyF0O9r-uyh3GAA",
  authDomain: "sicoarena-68697.firebaseapp.com",
  projectId: "sicoarena-68697",
  storageBucket: "sicoarena-68697.appspot.com",
  messagingSenderId: "576925491516",
  appId: "1:576925491516:web:97e65f67f74751087bbe39",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
