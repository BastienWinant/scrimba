import './style.css'

import { onAuthStateChanged } from 'firebase/auth'
import { firebaseAuth } from './firebase-app'

// const loginModal = document.querySelector('#login-modal')

// loginModal.showModal()

async function monitorAuthChanges() {
  onAuthStateChanged(firebaseAuth, user => {
    console.log("Auth status changed")
    if (user) {
      console.log("User logged in")
    } else {
      console.log("User logged out")
    }
  })
}

monitorAuthChanges()