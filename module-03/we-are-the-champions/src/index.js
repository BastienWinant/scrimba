// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, push, onValue, set } from 'firebase/database'

// Your web app's Firebase configuration
const firebaseConfig = require('../firebase.config');

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const endorsementsInDB = ref(database, 'endorsements');

// DOM ELEMENTS
const textArea = document.getElementById('text-area');
const fromInput = document.getElementById('from-input');
const toInput = document.getElementById('to-input');
const publishBtn = document.getElementById('publish-btn');
const endorsementsContainer = document.getElementById('endorsements-container');

// EVENT HANDLERS
publishBtn.addEventListener('click', () => {
  const endorsementData = gatherEndorsementInputs();
  push(endorsementsInDB, endorsementData);
  emptyTextInputs();
});

// ON VALUE CALLBACK FUNCTION
onValue(endorsementsInDB, (snapshot) => {
  // clear the HTML container
  clearEndorsementsContainer();

  if (snapshot.exists()) {
    // get a snapshot of the endorsement DB entries
    let endorsementsArr = Object.entries(snapshot.val());
    
    // add each entry to the container
    endorsementsArr.forEach((endorsement) => {
      appendEndorsement(endorsement);
    });
  } else {
    displayEmptyMessage();
  }
});

// HELPER FUNCTIONS
function gatherEndorsementInputs() {
  return {
    text: textArea.value,
    from: fromInput.value,
    to: toInput.value,
    date: new Date(),
    likes: 0
  }
}

function emptyTextInputs () {
  textArea.value = "";
  fromInput.value = "";
  toInput.value = "";
}

function clearEndorsementsContainer() {
  endorsementsContainer.innerHTML = "";
}

function appendEndorsement(endorsement) {
  let cardEl = createCard()
  cardEl = addCardHeader(cardEl, endorsement[1]);
  cardEl = addCardBody(cardEl, endorsement[1]);
  cardEl = addCardFooter(cardEl, endorsement);

  endorsementsContainer.appendChild(cardEl);
}

/* HELPER FUNCTIONS */
function createCard() {
  const cardEl = document.createElement('article');
  cardEl.classList.add('bbox', 'card');

  return cardEl;
}

function addCardHeader(cardEl, endorsementObj) {
  // create the header element
  const headerEl = document.createElement('header');
  headerEl.classList.add('card-header');

  // create the card title
  const titleEl = document.createElement('h3');
  titleEl.classList.add('no-margin');
  titleEl.textContent = `To ${endorsementObj.to}`;
  
  // add the title inside the header
  headerEl.appendChild(titleEl);

  // add the header inside the card
  cardEl.appendChild(headerEl);

  return cardEl;
}

function addCardBody(cardEl, endorsementObj) {
  // create the body paragraph element
  const pEl = document.createElement('p');
  pEl.classList.add('no-margin', 'card-body');
  pEl.textContent = endorsementObj.text;

  // add the paragraph inside the card
  cardEl.appendChild(pEl);

  return cardEl;
}

function addCardFooter(cardEl, endorsementEntry) {
  const footerEl = document.createElement('footer');
  footerEl.classList.add('card-footer');

  const titleEl = document.createElement('h3');
  titleEl.classList.add('no-margin');
  titleEl.textContent = `From ${endorsementEntry[1].from}`;

  const divEl = document.createElement('div');
  divEl.classList.add('likes-container');

  const imgEl = document.createElement('img');
  imgEl.src = "../assets/hearts-suit-hollow.svg";
  imgEl.classList.add("like-logo");

  // const endorsementRef = ref(database, `endorsements/${endorsementEntry[0]}`)
  imgEl.addEventListener('click', updateLikes.bind(endorsementEntry));

  const pEl = document.createElement('p');
  pEl.classList.add('no-margin');
  pEl.textContent = endorsementEntry[1].likes;

  divEl.appendChild(imgEl);
  divEl.appendChild(pEl);

  footerEl.appendChild(titleEl);
  footerEl.appendChild(divEl);

  cardEl.appendChild(footerEl);

  return cardEl;
}

function displayEmptyMessage() {
  let pEl = document.createElement('p');
  pEl.classList.add('message-box');
  pEl.textContent = "It's quiet in here...";

  endorsementsContainer.appendChild(pEl);
}

function updateLikes() {
  this[1].likes += 1
  
  const endorsementRef = ref(database, `endorsements/${this[0]}`);
  set(endorsementRef, this[1]);
}