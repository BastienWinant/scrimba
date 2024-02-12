// DOM ELEMENTS
const pagerDisplay = document.getElementById("pager-display");
const phoneDisplay = document.getElementById("phone-display");
const resetBtn = document.getElementById("reset-btn");
const sendBtn = document.getElementById("send-btn");
const keyEls = document.getElementsByClassName("key");

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

// CALLBACK FUNCTIONS
Array.from(keyEls).forEach((keyEl) => {
  keyEl.addEventListener("click", (evt) => {
    clearElement(pagerDisplay);
    const keyVal = evt.target.innerText;
    updatePhoneDisplay(keyVal);
  })
})

resetBtn.addEventListener("click", () => {
  // clear the displays
  clearElement(phoneDisplay);
});

sendBtn.addEventListener("click", () => {
  // get the phone input value
  const phoneNumber = phoneDisplay.innerText;
  // updatePagerDisplay(phoneNumber);
  setTimeout(updatePagerDisplay, 2000, phoneNumber);
});