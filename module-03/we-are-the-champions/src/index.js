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
const inputsSection = document.getElementById('input-fields');
const textArea = document.getElementById('text-area');
const fromInput = document.getElementById('from-input');
const toInput = document.getElementById('to-input');
const publishBtn = document.getElementById('publish-btn');
const endorsementsContainer = document.getElementById('endorsements-container');

// EVENT HANDLERS
publishBtn.addEventListener('click', () => {
  // retrieve the user input values
  const endorsementData = gatherEndorsementInputs();

  resetInputClasses();

  // check that the inputs are valid
  if (validateEndorsementInputs()){
    // if the inputs are valid, add them to the database
    inputsSection.classList.remove('error');
    push(endorsementsInDB, endorsementData);
    emptyTextInputs();
  } else {
    // if inputs are not valid, display an error message
    inputsSection.classList.add('error');
  }
});

// ON VALUE CALLBACK FUNCTION
onValue(endorsementsInDB, (snapshot) => {
  // clear the HTML container
  clearEndorsementsContainer();

  if (snapshot.exists()) {
    // get a snapshot of the endorsement DB entries
    let endorsementsArr = Object.entries(snapshot.val()).toReversed();
    
    // add each entry to the container
    endorsementsArr.forEach((endorsement) => {
      appendEndorsement(endorsement);
    });
  } else {
    // if no endorsement entry as found, display a custom message
    displayEmptyMessage();
  }
});

// HELPER FUNCTIONS
// gather the different input field values in a single object
function gatherEndorsementInputs() {
  return {
    text: textArea.value,
    from: fromInput.value,
    to: toInput.value,
    date: new Date(),
    liked: false,
    // add a random number of likes just for effect
    likes: Math.floor(Math.random() * 21)
  }
}

// remove the red border class from all text input fields
function resetInputClasses() {
  textArea.classList.remove('red-border');
  fromInput.classList.remove('red-border');
  toInput.classList.remove('red-border');
}

// checks that the user entered values in all input fields
function validateEndorsementInputs() {
  const text = textArea.value;
  const fromName = fromInput.value;
  const toName = toInput.value;

  let validInputs = true;

  // apply a red border around empty fields and flag invalid inputs
  if (text === "") {
    textArea.classList.add('red-border');
    validInputs = false;
  }

  if (fromName === "") {
    fromInput.classList.add('red-border');
    validInputs = false;
  }

  if (toName === "") {
    toInput.classList.add('red-border');
    validInputs = false;
  }

  return validInputs;
}

// empty the input fields
function emptyTextInputs () {
  textArea.value = "";
  fromInput.value = "";
  toInput.value = "";
}

// clear the endorsements wall section
function clearEndorsementsContainer() {
  endorsementsContainer.innerHTML = "";
}

// appends a new HTML element to the wall section
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
  // create the <footer> container
  const footerEl = document.createElement('footer');
  footerEl.classList.add('card-footer');

  // add the name user who wrote the post
  const titleEl = document.createElement('h3');
  titleEl.classList.add('no-margin');
  titleEl.textContent = `From ${endorsementEntry[1].from}`;

  // add a clickable like logo
  const divEl = document.createElement('div');
  divEl.classList.add('likes-container');

  const imgEl = document.createElement('img');
  imgEl.classList.add("like-logo");

  // check if the user has already likes the post
  if (endorsementEntry[1].liked) {
    imgEl.src = "../assets/hearts-suit-full.svg";
    imgEl.addEventListener('click', decreaseLikes.bind(endorsementEntry));
  } else {
    imgEl.src = "../assets/hearts-suit-hollow.svg";
    imgEl.addEventListener('click', increaseLikes.bind(endorsementEntry));
  }

  // add the number of likes on the post
  const pEl = document.createElement('p');
  pEl.classList.add('no-margin');
  pEl.textContent = endorsementEntry[1].likes;

  // place the elements inside their respective containers
  divEl.appendChild(imgEl);
  divEl.appendChild(pEl);

  footerEl.appendChild(titleEl);
  footerEl.appendChild(divEl);

  cardEl.appendChild(footerEl);

  return cardEl;
}

// specifies what to display when the database is empty
function displayEmptyMessage() {
  let pEl = document.createElement('p');
  pEl.classList.add('message-box');
  pEl.textContent = "It's quiet in here...";

  endorsementsContainer.appendChild(pEl);
}

function increaseLikes() {
  // update the likes in the object bounded to the function
  this[1].likes += 1;
  this[1].liked = true;

  // create a reference to the endorsement entry in the database
  const endorsementRef = ref(database, `endorsements/${this[0]}`);

  // set the value in the database to object with the updates likes
  set(endorsementRef, this[1]);
}

function decreaseLikes() {
  // update the likes in the object bounded to the function
  this[1].likes -= 1;
  this[1].liked = false;

  // create a reference to the endorsement entry in the database
  const endorsementRef = ref(database, `endorsements/${this[0]}`);

  // set the value in the database to object with the updates likes
  set(endorsementRef, this[1]);
}