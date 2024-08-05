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

  return headerHTML;
}

export { Header };