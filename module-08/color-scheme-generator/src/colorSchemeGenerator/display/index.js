import './style.css'

import { colorInput, modeInput, submitBtn } from '../form'

const colorsList = document.querySelector('#generator-colors')

function generateColorLis(colorsArr) {
  return colorsArr.map(colorObj => {
    const liEl = document.createElement('li')
    liEl.classList.add('generator-color')
    liEl.style.backgroundColor = colorObj.hex.value
    
    const colorClass = colorObj.contrast.value === "#000000" ? ' dark-text': ' light-text'

    liEl.innerHTML = `
      <p class="generator-color-code${colorClass}">${colorObj.hex.value}</p>
      <p class="generator-color-name${colorClass}">${colorObj.name.value}</div>`
    return liEl
  })
}

function renderGeneratorScheme(colorsArr) {
  colorsList.innerHTML = ''
  const colorLiEls = generateColorLis(colorsArr)
  colorsList.append(...colorLiEls)  
}

function updateGeneratorDisplay() {
  const colorHex = localStorage.getItem('gcs-color-hex')
  const colorMode = localStorage.getItem('gcs-color-mode')

  const baseUrl = "https://www.thecolorapi.com"
  const endpoint = "scheme"
  const requestUrl = `${baseUrl}/${endpoint}?hex=${colorHex}&mode=${colorMode}`

  fetch(requestUrl)
    .then(response => response.json())
    .then(data => {
      renderGeneratorScheme(data.colors)
    })
}

submitBtn.addEventListener('click', e => {
  e.preventDefault()

  const colorHex = colorInput.value.slice(1,)
  localStorage.setItem('gcs-color-hex', colorHex)

  const colorMode = modeInput.value
  localStorage.setItem('gcs-color-mode', colorMode)

  updateGeneratorDisplay()
  console.log('Getting color')
})

export function initializeGeneratorDisplay() {
  const randomColor = Math.floor(Math.random()*16777216).toString(16).padEnd(6, '0')
  localStorage.setItem('gcs-color-hex', randomColor)
  colorInput.value = `#${randomColor}`
  
  const modeOptions = document.querySelectorAll('#mode option')
  const randomMode = modeOptions[Math.floor(Math.random() * modeOptions.length)].value
  localStorage.setItem('gcs-color-mode', randomMode)
  modeInput.value = randomMode

  updateGeneratorDisplay()
}