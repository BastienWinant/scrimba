import './header.css';

const logo = new URL('./logo.png', import.meta.url);
const avatar = new URL('./user-avatar.png', import.meta.url);

export const Header = () => {
  // create the header container
  const headerEl = document.createElement('header');
  headerEl.classList.add('header');

  const headerContainer = document.createElement('div');
  headerContainer.classList.add('header-container');
  headerEl.appendChild(headerContainer);

  // add Oldagram logo image
  const logoImg = document.createElement("img");
  logoImg.src = logo.href;
  logoImg.classList.add("img", "header-img", "logo-img");
  logoImg.alt = "Oldagram logo";
  headerContainer.appendChild(logoImg);

  // add user avatar image
  const avatarImg = document.createElement("img");
  avatarImg.src = avatar.href;
  avatarImg.classList.add("img", "header-img", "avatar-img");
  avatarImg.alt = "User avatar image";
  headerContainer.appendChild(avatarImg);

  return headerEl;
}