import { initializeApp } from "firebase/app"
import {
  getAuth,
  connectAuthEmulator,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth"

import {
  getDatabase,
  connectDatabaseEmulator
} from "firebase/database";

import {
  loginModal,
  loginEmailInput,
  loginPasswordInput,
  loginBtn,
  cancelLoginBtn
} from './userAuth/login'

import {
  signupModal,
  signupEmailInput,
  signupPasswordInput,
  signupBtn,
  cancelSignupBtn
} from './userAuth/signup'


import {
  headerLoginBtn,
  headerSignupBtn,
  headerLogoutBtn
} from './header/header'

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
export const firebaseDB = getDatabase(firebaseApp)

if (process.env.NODE_ENV == 'development') {
  connectAuthEmulator(firebaseAuth, "http://localhost:9099")
  connectDatabaseEmulator(firebaseDB, "http://localhost:9000")
}

async function signupEmailPassword() {
  const signupEmail = signupEmailInput.value
  const signupPassword = signupPasswordInput.value

  createUserWithEmailAndPassword(firebaseAuth, signupEmail, signupPassword)
    .then(userCredential => {
      console.log(userCredential)
    })
    .catch(error => {
      const errorCode = error.code
      const errorMessage = error.message

      console.log(`${errorCode}: ${errorMessage}`)
    })
}

signupBtn.addEventListener('click', e => {
  e.preventDefault()
  signupEmailPassword()
  signupModal.close()
})


async function loginEmailPassword() {
  const loginEmail = loginEmailInput.value
  const loginPassword = loginPasswordInput.value

  signInWithEmailAndPassword(firebaseAuth, loginEmail, loginPassword)
    .then(userCredential => {
      console.log(userCredential)
    })
    .catch(error => {
      const errorCode = error.code
      const errorMessage = error.message

      console.log(`${errorCode}: ${errorMessage}`)
    })
}

loginBtn.addEventListener('click', e => {
  e.preventDefault()
  loginEmailPassword()
  loginModal.close()
})

headerLogoutBtn.addEventListener('click', e => {
  signOut(firebaseAuth)
})

headerLoginBtn.addEventListener('click', e => {
  loginModal.showModal()
})

headerSignupBtn.addEventListener('click', e => {
  signupModal.showModal()
})

cancelLoginBtn.addEventListener('click', () => {
  loginModal.close()
})

cancelSignupBtn.addEventListener('click', () => {
  signupModal.close()
})