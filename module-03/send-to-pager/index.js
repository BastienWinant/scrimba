// DOM ELEMENTS
const pagerDisplay = document.getElementById("pager-display");
const phoneDisplay = document.getElementById("phone-display");
const resetBtn = document.getElementById("reset-btn");
const sendBtn = document.getElementById("send-btn");
const keyEls = document.getElementsByClassName("key");

// HELPER FUNCTIONS
/**
 * Clears the supplied element's inner HTML
 * @param {*} element DOM element to be cleared
 */
function clearElement(element) {
  element.innerHTML = "";
}

function updatePhoneDisplay(value) {
  phoneDisplay.textContent += value;
}

// CALLBACK FUNCTIONS
Array.from(keyEls).forEach((keyEl) => {
  keyEl.addEventListener("click", (evt) => {
    const keyVal = evt.target.textContent;
    updatePhoneDisplay(keyVal);
  })
})

resetBtn.addEventListener("click", () => {
  clearElement(pagerDisplay);
  clearElement(phoneDisplay);
});