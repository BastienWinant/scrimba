// static mapping for metric/imperial system conversion
const conversionGuide = {
  distance: {
    metricUnit: "meters",
    imperialUnit: "feet",
    coversionRate: 3.281 // conversion rate from imperial to metric
  },
  volume: {
    metricUnit: "liters",
    imperialUnit: "gallons",
    coversionRate: 0.264 // conversion rate from imperial to metric
  },
  mass: {
    metricUnit: "kilograms",
    imperialUnit: "pounds",
    coversionRate: 2.204 // conversion rate from imperial to metric
  }
}


// DOM ELEMENTS & GLOBAL VARIABLES

const r = document.querySelector(':root');
const amtInput = document.getElementById("amt-input")
const convertBtn = document.getElementById("convert-btn")
const cardsContainer = document.getElementById("cards-container")

let darkMode = false;
const darkmodeToggle = document.querySelector(".fa-lightbulb");


// CUSTOM FUNCTIONS

function generateCardHTML(value, measurement) {
  // extract the metric and imperial measurement units
  const metricUnit = conversionGuide[measurement].metricUnit
  const shortenedMetricUnit = metricUnit === "kilograms" ? "kilos" : metricUnit
  const imperialUnit = conversionGuide[measurement].imperialUnit
  
  // extract the conversion rates between metric and imperial systems
  const toImperialConversionRate = conversionGuide[measurement].coversionRate
  
  // compute the metric and imperial values
  const metricValue = (value / toImperialConversionRate).toFixed(3)
  const imperialValue = (value * toImperialConversionRate).toFixed(3)
  
  htmlString = `<h2 class="no-margin">${measurement} (${metricUnit}/${imperialUnit})</h2>`
  htmlString +=
    `<p>
      ${value} ${shortenedMetricUnit} =  ${imperialValue} ${imperialUnit} | ${value} ${imperialUnit} = ${metricValue} ${shortenedMetricUnit}
    </p>`

  return(htmlString)
}

function generateMeasurementsCards(value) {
  for (const m in conversionGuide) {
    // create a new element for displaying units and values
    const cardElement = document.createElement("section")

    // generate HTML content to be displayed
    const cardHTML = generateCardHTML(value, m)
    cardElement.innerHTML = cardHTML

    // assign classes for styling
    cardElement.classList.add("centered-content")

    // append the new card to the container
    cardsContainer.appendChild(cardElement)
  }
}

function generateErrorCard() {
  // create a new element for displaying error message
  const cardElement = document.createElement("section")
  cardElement.innerHTML = '<p class="error-message">No valid input value found!</p>'

  // assign classes for styling
  cardElement.classList.add("centered-content")
  cardElement.classList.add("error-container")

  // append the new card to the container
  cardsContainer.appendChild(cardElement)
}

function updateContent() {
  // remove HTML from the container
  while(cardsContainer.firstChild) {
    cardsContainer.removeChild(cardsContainer.firstChild)
  }

  // collect the input value to be converted
  const inputValue = amtInput.value

  if (inputValue === "" || inputValue < 0) {
    generateErrorCard()
  } else {
    generateMeasurementsCards(inputValue)
  }
}

function changeColorScheme(darkMode) {
  if (darkMode) {
    r.style.setProperty('--container-background', '#1F2937');
    r.style.setProperty('--units-background', '#273549');
    r.style.setProperty('--card-title-color', '#CCC1FF');
    r.style.setProperty('--card-text-color', '#FFFFFF');
  } else {
    r.style.setProperty('--container-background', '#F4F4F4');
    r.style.setProperty('--units-background', '#FFFFFF');
    r.style.setProperty('--card-title-color', '#5A537B');
    r.style.setProperty('--card-text-color', '#353535');
  }
}

// toggle the color scheme
function switchDarkmode() {
  darkMode = !darkMode;
  changeColorScheme(darkMode);
}

// EVENT LISTENERS
convertBtn.addEventListener("click", updateContent)
darkmodeToggle.addEventListener("click", switchDarkmode)

document.addEventListener("DOMContentLoaded", updateContent)