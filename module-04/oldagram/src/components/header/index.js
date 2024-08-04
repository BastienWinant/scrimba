import './style.css';
import Icon from './logo.png';
import Avatar from './user-avatar.png';

function Header() {
  const headerEl = document.createElement('header');
  headerEl.classList.add('header', 'black-border');

  const containerEl = document.createElement('div');
  containerEl.classList.add('header-container', 'black-border');
  headerEl.appendChild(containerEl);

  const logoImg = document.createElement('img');
  logoImg.classList.add('img', 'header-img');
  logoImg.alt = "Oldagram logo";
  logoImg.src = Icon;

  const avatarImg = document.createElement('img');
  avatarImg.classList.add('img', 'header-img', 'header-avatar');
  avatarImg.alt = "User avatar portrait";
  avatarImg.src = Avatar;

  containerEl.append(logoImg, avatarImg);

  return headerEl;
}

export { Header };