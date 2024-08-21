import './style.css'

const nav = document.querySelector('#nav')
const navExpandBtn = document.querySelector('#nav-expand-btn')
const headerBtns = document.querySelectorAll('.header-btn')
export const headerLoginBtn = document.querySelector('#header-login-btn')
export const headerSignupBtn = document.querySelector('#header-signup-btn')
export const savedSchemesBtn = document.querySelector('#saved-schemes-btn')
export const headerLogoutBtn = document.querySelector('#header-logout-btn')

navExpandBtn.addEventListener('click', () => {
  nav.classList.add('expanded')
})

function collapseNav() {
  nav.classList.remove('expanded')
}

headerBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    collapseNav()
  })
})

export function showLoginState(user) {
  if (user) {
    headerLoginBtn.style.display = "none"
    headerSignupBtn.style.display = "none"
    
    savedSchemesBtn.style.display = "initial"
    headerLogoutBtn.style.display = "initial"
  } else {
    headerLoginBtn.style.display = "initial"
    headerSignupBtn.style.display = "initial"

    savedSchemesBtn.style.display = "none"
    headerLogoutBtn.style.display = "none"
  }
}