import './style.css';
import Icon from './logo.png';
import Avatar from './user-avatar.png';

function Header() {
  return `<header class="header black-border">
    <div class="header-container black-border">
      <img src="${Icon}" class="img header-img" alt="Oldagram logo" />
      <img src="${Avatar}" class="img header-img header-avatar" alt="User avatar portrait" />
    </div>
  </header>`
}

export { Header };