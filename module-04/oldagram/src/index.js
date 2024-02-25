import './index.css';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { firebaseConfig } from "../firebase.config"

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// SIGNUP FORM
const signupEmail = document.getElementById("signup-email");
const signupPassword = document.getElementById("signup-password");
const signupBtn= document.getElementById("signup-btn");

console.log(signupEmail);