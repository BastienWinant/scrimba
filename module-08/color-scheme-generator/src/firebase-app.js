import { initializeApp } from "firebase/app"
import {
  getAuth,
  connectAuthEmulator,
  signInWithEmailAndPassword
} from "firebase/auth"

const loginEmailInput = document.querySelector('#login-email')
const loginPasswordInput = document.querySelector('#login-password')
const loginBtn = document.querySelector('#login-btn')

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DATABASE_URL,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig)
export const firebaseAuth = getAuth(firebaseApp)

if (process.env.NODE_ENV == 'development') {
  connectAuthEmulator(firebaseAuth, "http://localhost:9099")
}

async function loginEmailPassword() {
  const loginEmail = loginEmailInput.value
  const loginPassword = loginPasswordInput.value

  signInWithEmailAndPassword(firebaseAuth, loginEmail, loginPassword)
}

loginBtn.addEventListener('click', e => {
  e.preventDefault();
  console.log('Hello World')
})