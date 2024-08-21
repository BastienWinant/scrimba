import './style.css'

const colorInput = document.querySelector('#color')
const modeInput = document.querySelector('#mode')
const submitBtn = document.querySelector('#generator-form-btn')

function updateGeneratorDisplay() {
  const colorHex = localStorage.getItem('gcs-color-hex')
  const colorMode = localStorage.getItem('gcs-color-mode')

  const baseUrl = "https://www.thecolorapi.com"
  const endpoint = "scheme"
  const requestUrl = `${baseUrl}/${endpoint}?hex=${colorHex}&mode=${colorMode}`

  fetch(requestUrl)
    .then(response => response.json())
    .then(data => {
      console.log(data)
    })
}

submitBtn.addEventListener('click', e => {
  e.preventDefault()
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