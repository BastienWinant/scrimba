import './style.css'

import { onAuthStateChanged } from 'firebase/auth'

import { firebaseAuth } from './firebase-app'
import { initializeGeneratorDisplay } from './colorSchemeGenerator/display/index'

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

initializeGeneratorDisplay()

// const submitBtn = document.querySelector('#generator-form-btn')

// submitBtn.addEventListener('click', e => {
//   e.preventDefault()
// })