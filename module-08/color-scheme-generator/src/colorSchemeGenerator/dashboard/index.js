import './style.css'

export const modeOptions = document.querySelectorAll('input[name="format"]')

modeOptions.forEach(radioInput => {
  radioInput.addEventListener('click', e => {
    localStorage.setItem('gcs-color-format', e.target.value)
  })
})