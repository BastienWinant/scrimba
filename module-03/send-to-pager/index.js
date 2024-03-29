// DOM ELEMENTS
const pagerDisplay = document.getElementById("pager-display");
const phoneDisplay = document.getElementById("phone-display");
const resetBtn = document.getElementById("reset-btn");
const sendBtn = document.getElementById("send-btn");
const eraseBtn = document.getElementById("erase-btn");
const keyEls = document.getElementsByClassName("key");

// LOAD ASSETS
const pageSound = new Audio("assets/pager.wav");
const errorSound = new Audio("assets/error.mp3");

// HELPER FUNCTIONS
/**
 * Clears the supplied element's inner HTML
 * @param {DOM element ref} element DOM element to be cleared
 */
function clearElement(element) {
  element.innerHTML = "";
}

/**
 * Append the input value to the display's inner content
 * @param {string} value the text to be appended to the existing inner content
 */
function appendToPhoneDisplay(value) {
  phoneDisplay.innerText += value;
}

/**
 * Replace the display's inner text with the input value
 * @param {str} value the new text content to be displayed
 */
function updatePhoneDisplay(value) {
  phoneDisplay.innerText = value;
}

/**
 * Replace the display's inner text with the input value
 * @param {str} value the new text content to be displayed
 */
function updatePagerDisplay(value) {
  pagerDisplay.innerText = value;
}

function playSound(audio) {
  audio.play();
}

/**
 * Updates phone display and plays pager sound
 * @param {str} number the number to be displayed 
 */
function sendMessage(number) {
  phoneDisplay.classList.add("dialing");
  setTimeout(() => {
    updatePagerDisplay(number);
    playSound(pageSound);
    phoneDisplay.classList.remove("dialing");
  }, 2000);
}

/**
 * Provides visual and audio cues that an error has occured
 */
function pagerError() {
  phoneDisplay.classList.add("error");
  playSound(errorSound);
  setTimeout(() => {
    phoneDisplay.classList.remove("error");
  }, 1000);
}

/**
 * Verifies that a string is non-empty
 * @param {string} inputStr the string to be validated 
 * @returns True only if the string contains any characters, False otherwise
 */
function validateInput(inputStr) {
  return inputStr !== ""
}

/**
 * Removes the last character of the input string
 * @param {string} inputStr string from wich the last character should removed
 * @returns a new shortened string
 */
function removeLastCharacter(inputStr) {
  return inputStr.slice(0,-1)
}

// CALLBACK FUNCTIONS
Array.from(keyEls).forEach((keyEl) => {
  /**
   * update the phone display with the key's inner text
   */
  keyEl.addEventListener("click", (evt) => {
    clearElement(pagerDisplay);
    const keyVal = evt.target.innerText;
    appendToPhoneDisplay(keyVal);
  })
});

/**
 * Clears both displays of any inner text
 */
resetBtn.addEventListener("click", () => {
  // clear the displays
  clearElement(pagerDisplay);
  clearElement(phoneDisplay);
});

eraseBtn.addEventListener("click", () => {
  const currentInput = phoneDisplay.textContent;
  const newInput = removeLastCharacter(currentInput);

  updatePhoneDisplay(newInput);
})

/**
 * Start paging animation
 */
sendBtn.addEventListener("click", () => {
  const phoneNumber = phoneDisplay.innerText;

  if (!validateInput(phoneNumber)) {
    pagerError();
  } else {
    sendMessage(phoneNumber);
  }
});