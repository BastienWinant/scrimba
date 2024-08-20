import './style.css'

const generatorDashboard = document.querySelector('#generator-dashboard')
export const modeOptions = document.querySelectorAll('input[name="format"]')

modeOptions.forEach(radioInput => {
  radioInput.addEventListener('click', e => {
    localStorage.setItem('gcs-color-format', e.target.value)
  })
})

generatorDashboard.addEventListener('click', e => {
  const saveSchemeBtn = e.target.closest('#save-scheme-btn')

  if (saveSchemeBtn) {
    const bookmarked = saveSchemeBtn.dataset.bookmarked

    if (bookmarked) {
      saveSchemeBtn.innerHTML = `
        <i class="fa-regular fa-bookmark fa-lg"></i>`
      saveSchemeBtn.dataset.bookmarked = "0"
    } else {
      saveSchemeBtn.innerHTML = `
        <i class="fa-solid fa-bookmark fa-lg"></i>`
      saveSchemeBtn.dataset.bookmarked = "1"
    }
  }
})