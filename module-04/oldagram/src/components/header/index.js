import './style.css';
import Icon from './logo.png';
import Avatar from './user-avatar.png';

function Header() {
  const headerHTML = 
    `<div class="header-container">
      <img class="img header-img" src="${Icon}" alt="Oldagram logo" />
      <img class="img header-img avatar-img" src="${Avatar}" alt="User avatar portrait" />
    </div>`

  return headerHTML;
}

export { Header };