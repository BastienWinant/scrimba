// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, push } from 'firebase/database'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = require('../firebase.config');

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// DOM ELEMENTS
const inputArea = document.getElementById('text-area')
const toInput = document.getElementById('to-input');
const fromInput = document.getElementById('from-input');
const publishBtn = document.getElementById('publish-btn');

// EVENT HANDLERS
publishBtn.addEventListener('click', () => {
  console.log('Publishing endorsement');
})