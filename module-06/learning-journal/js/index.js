document.body.addEventListener('click', (e) => {
  if ((e.target.classList.contains('nav-expand-btn')) || (e.target.classList.contains('nav-collapse-btn'))) {
    document.querySelector('#header-nav').classList.toggle('expanded');
  }
})

window.addEventListener('resize', () => {
  document.querySelector('#header-nav').classList.remove('expanded');
})