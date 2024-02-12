// DOM ELEMENTS
const pagerDisplay = document.getElementById("pager-display");
const phoneDisplay = document.getElementById("phone-display");
const resetBtn = document.getElementById("reset-btn");
const sendBtn = document.getElementById("send-btn");
const keyEls = document.getElementsByClassName("key");

// LOAD ASSETS
const audio = new Audio("assets/pager.wav");

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
function updatePhoneDisplay(value) {
  phoneDisplay.innerText += value;
}

/**
 * Replace the display's inner text with the input value
 * @param {str} value the new text content to be displayed
 */
function updatePagerDisplay(value) {
  pagerDisplay.innerText = value;
}

function playPagerSound() {
  audio.play();
}

/**
 * Updates phone display and plays pager sound
 * @param {str} number the number to be displayed 
 */
function sendMessage(number) {
  updatePagerDisplay(number);
  playPagerSound();
  phoneDisplay.classList.remove("dialing");
}

// CALLBACK FUNCTIONS
Array.from(keyEls).forEach((keyEl) => {
  keyEl.addEventListener("click", (evt) => {
    clearElement(pagerDisplay);
    const keyVal = evt.target.innerText;
    updatePhoneDisplay(keyVal);
  })
});

resetBtn.addEventListener("click", () => {
  // clear the displays
  clearElement(pagerDisplay);
  clearElement(phoneDisplay);
});

sendBtn.addEventListener("click", () => {
  // get the phone input value
  const phoneNumber = phoneDisplay.innerText;
  phoneDisplay.classList.add("dialing");
  setTimeout(sendMessage, 2000, phoneNumber);
});