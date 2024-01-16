// DOM ELEMENTS
// Get the root element
const r = document.querySelector(':root');
const rs = getComputedStyle(r);

// div elements for displaying passwords
const passwordFields = document.querySelectorAll(".password-field")

// password options
let includeNumbers = true;
let includeSpecialChars = true;
const passwordLengthInput = document.querySelector("#length");

// range for password length
const maxLength = 12;
const minLength = 1;

// clickable element for copying password to the clipboard
const passwordActions = document.querySelectorAll(".password-action");

// sets of characters for generating random passwords
const letters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const specChars = ["~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?",
"/"];


let darkMode = false;
const darkmodeToggle = document.querySelector(".darkmode-switch");

// html element for displaying error message
const errorMessage = document.querySelector(".error-alert");


// FUNCTIONS

// toggle the color scheme
function switchDarkmode() {
  darkMode = !darkMode;
  changeColorScheme(darkMode);

  if (darkMode) {
    darkmodeToggle.classList.add("medium-opacity");
  } else {
    darkmodeToggle.classList.remove("medium-opacity");
  }
}

function toggleCheckbox(obj) {
  const objectID = obj.id;

  if (objectID === "include-numbers") {
    includeNumbers = !includeNumbers;

    if (includeNumbers) {
      obj.classList.remove("empty-background");
      obj.textContent = "✔️";
    } else {
      obj.classList.add("empty-background");
      obj.textContent = "";
    }
  } else if (objectID === "include-special-chars") {
    includeSpecialChars = !includeSpecialChars;

    if (includeSpecialChars) {
      obj.classList.remove("empty-background");
      obj.textContent = "✔️";
    } else {
      obj.classList.add("empty-background");
      obj.textContent = "";
    }
  }
}

// creates password as random string of characters
// returns an empty string if password length is not in range
function generatePassword() {
  let characters = [...letters];

  if (includeNumbers) {
    characters.push(...numbers);
  }

  if (includeSpecialChars) {
    characters.push(...specChars);
  }

  let passwordLength = parseInt(passwordLengthInput.value);
  let password = "";

  // check if the password length is in range
  if ((isNaN(passwordLength)) || (passwordLength < minLength) || (passwordLength > maxLength)) {
    // display error message in the html
    errorMessage.classList.remove("no-display");
    passwordLengthInput.classList.add("red-border");
    return password;
  }

  for (let i = 0; i < passwordLength; i++) {
    password += characters[Math.floor(characters.length * Math.random())];
  }

  return password;
}

// add new password in the html
function newPassword() {
  errorMessage.classList.add("no-display");
  passwordLengthInput.classList.remove("red-border");

  for (let i = 0; i < passwordFields.length; i++) {
    const password = generatePassword()
    passwordFields[i].textContent = password;

    if (password !== "") {
      passwordFields[i].nextElementSibling.classList.remove("invisible");
    } else {
      passwordFields[i].nextElementSibling.classList.add("invisible");
    }
  }
}

function copyToClipboard(obj) {
  const passwordField = obj.parentNode.firstElementChild;
  navigator.clipboard.writeText(passwordField.textContent);
}

function changeColorScheme(darkMode) {
  if (darkMode) {
    r.style.setProperty('--container-background', '#1F2937');
    r.style.setProperty('--title-text', '#FFFFFF');
    r.style.setProperty('--tagline-grey', '#D5D4D8');
    r.style.setProperty('--hr-border', '#2F3E53');
  } else {
    r.style.setProperty('--container-background', '#ECFDF5');
    r.style.setProperty('--title-text', '#2B283A');
    r.style.setProperty('--tagline-grey', '#6B7280');
    r.style.setProperty('--hr-border', '#D5D4D8');
  }
}