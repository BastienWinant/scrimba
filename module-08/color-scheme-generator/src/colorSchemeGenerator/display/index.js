import './style.css'
import { colorInput, modeInput, submitBtn } from '../form'
import { modeOptions } from '../dashboard'

const colorsList = document.querySelector('#generator-colors-list')

function createColorLiEls(colorArr) {
  return colorArr.map(colorObj => {
    const liEl = document.createElement('li')
    liEl.classList.add('generator-color', 'black-border')
    liEl.style.backgroundColor = colorObj.hex.value
    return liEl
  })
}

function renderScheme() {
  const color = localStorage.getItem('gcs-color-hex') // hex code
  const mode = localStorage.getItem('gcs-color-mode') // monochromatic,analogic,...

  const baseURL = "https://www.thecolorapi.com"
  const endpoint = "scheme"
  const requesURL = `${baseURL}/${endpoint}?hex=${color}&mode=${mode}`

  fetch(requesURL)
    .then(response => response.json())
    .then(data => {
      colorsList.innerHTML = ''
      const liEls = createColorLiEls(data.colors)
      colorsList.append(...liEls)
    })
}

submitBtn.addEventListener('click', e => {
  e.preventDefault()

  const color = colorInput.value.slice(1,)
  const mode = modeInput.value

  localStorage.setItem('gcs-color-hex', color)
  localStorage.setItem('gcs-color-mode', mode)

  renderScheme()
})

export function initalizeDisplay() {
  const randomColor = Math.floor(Math.random() * 16777216).toString(16).padEnd(6, '0')
  colorInput.value = `#${randomColor}`
  localStorage.setItem('gcs-color-hex', randomColor)

  const modeOptions = document.querySelectorAll('#mode option')
  const randomMode = modeOptions[Math.floor(Math.random() * modeOptions.length)].value
  modeInput.value = randomMode
  localStorage.setItem('gcs-color-mode', randomMode)

  renderScheme()
}