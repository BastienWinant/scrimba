import './index.css';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

import { firebaseConfig } from "../firebase.config"

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// SIGNUP PAGE
const auth = getAuth();