import './style.css';
import Icon from './logo.png';
import Avatar from './user-avatar.png';

function Header() {
  const headerHTML = 
    `<header class="header">
      <div class="header-container">
        <img class="img header-img" src="${Icon}" alt="Oldagram logo" />
        <img class="img header-img avatar-img" src="${Avatar}" alt="User avatar portrait" />
      </div>
    </header>`

  return headerHTML
  // const headerEl = document.createElement('header');
  // headerEl.classList.add('header', 'black-border');

  // const containerEl = document.createElement('div');
  // containerEl.classList.add('header-container', 'black-border');
  // headerEl.appendChild(containerEl);

  // const logoImg = document.createElement('img');
  // logoImg.classList.add('img', 'header-img');
  // logoImg.alt = "Oldagram logo";
  // logoImg.src = Icon;

  // const avatarImg = document.createElement('img');
  // avatarImg.classList.add('img', 'header-img', 'avatar-img');
  // avatarImg.alt = "User avatar portrait";
  // avatarImg.src = Avatar;

  // containerEl.append(logoImg, avatarImg);

  // return headerEl;
}

export { Header };