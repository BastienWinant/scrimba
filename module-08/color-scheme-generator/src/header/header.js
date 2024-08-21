import './style.css'

const nav = document.querySelector('#nav')
const navExpandBtn = document.querySelector('#nav-expand-btn')
export const headerLoginBtn = document.querySelector('#header-login-btn')
export const headerSignupBtn = document.querySelector('#header-signup-btn')
export const headerLogoutBtn = document.querySelector('#header-logout-btn')

navExpandBtn.addEventListener('click', () => {
  nav.classList.add('expanded')
})