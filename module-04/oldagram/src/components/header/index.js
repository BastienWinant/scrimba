import './styles.css'
// import avatar from './images/user-avatar.png';
// import logo from './images/logo.png';

export default function headerComponent() {
  const headerEl = document.createElement('header');
  headerEl.classList.add('header', 'black-border');

  const headerContainer = document.createElement('div');
  headerContainer.classList.add('container', 'header-container', 'black-border');
  headerEl.appendChild(headerContainer);

  const logoImg = document.createElement('img');
  logoImg.classList.add('header-logo', 'black-border');
  // logoImg.src = logo;
  logoImg.src = './images/logo.png';
  headerContainer.appendChild(logoImg);

  const avatarImg = document.createElement('img');
  avatarImg.classList.add('header-avatar', 'black-border');
  // avatarImg.src = avatar;
  avatarImg.src = './images/user-avatar.png';
  headerContainer.appendChild(avatarImg);

  return headerEl;
}