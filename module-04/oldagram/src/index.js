import './css/style.css'
import postData from 'Data/posts.json'
import Post from './js/post'

function pageHeader() {
  const headerEl = document.createElement('header');
  headerEl.classList.add("page-header", "centered-content");

  const headerContainer = document.createElement('div');
  headerContainer.classList.add("header-container", "border-box");
  headerEl.appendChild(headerContainer);

  const logoImg = document.createElement("img");
  logoImg.src = './images/logo.png';
  logoImg.classList.add("img", "small-img");
  headerContainer.appendChild(logoImg);

  const avatarImg = document.createElement("img");
  avatarImg.src = './images/user-avatar.png';
  avatarImg.classList.add("img", "small-img", "rounded-img");
  headerContainer.appendChild(avatarImg);

  return headerEl;
}

function pageMain() {
  const mainEl = document.createElement("main");
  mainEl.classList.add("post-feed", "black-border");
  return mainEl;
}

const headerEl = pageHeader();
document.body.appendChild(headerEl);

const mainEl = pageMain();
document.body.appendChild(mainEl);

postData.forEach((post) => {
  const postEl = new Post(post);
  mainEl.appendChild(postEl.createElement());
});