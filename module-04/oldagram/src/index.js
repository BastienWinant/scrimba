import './style.css'
import posts from 'Data/posts.json'

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


function postHeader(post) {
  const postHeader = document.createElement("header");
  postHeader.classList.add("post-header", "border-box");
  
  const headerImg = document.createElement("img");
  headerImg.src=post.avatar;
  headerImg.classList.add("img", "small-img", "rounded-img");
  postHeader.appendChild(headerImg);

  const headingEl = document.createElement("hgroup");
  postHeader.appendChild(headingEl);

  const postUser = document.createElement("h4");
  postUser.textContent = post.name;
  postUser.classList.add("no-margin", "post-user");
  headingEl.appendChild(postUser);

  const postLocation = document.createElement("p");
  postLocation.textContent = post.location;
  postLocation.classList.add("no-margin", "post-location");
  headingEl.appendChild(postLocation);
  
  return postHeader;
}

function postImg(post) {
  const imgEl = document.createElement("img");
  imgEl.src = post.post;
  imgEl.classList.add("img", "post-img");
  return imgEl;
}

function reactionBtn(imgPath) {
  const btnEl = document.createElement("button");
  btnEl.classList.add("btn", "centered-content", "no-padding");
  btnEl.type = "button";

  const imgEl = document.createElement("img");
  imgEl.classList.add("img", "btn-img");
  imgEl.src = imgPath;
  btnEl.appendChild(imgEl);

  return btnEl;
}

function postComment(post) {
  const sectionEl = document.createElement("section");
  sectionEl.classList.add("post-comment");

  const postUser = document.createElement("h4");
  postUser.classList.add("no-margin");
  postUser.textContent = post.username;
  sectionEl.appendChild(postUser);

  const postComment = document.createElement("p");
  postComment.classList.add("no-margin");
  postComment.textContent = post.comment;
  sectionEl.appendChild(postComment);

  return sectionEl;
}

function postCaption(post) {
  const captionEl = document.createElement("figcaption");
  captionEl.classList.add("post-caption");

  // display clickable reaction buttons
  const sectionEl = document.createElement("section");
  sectionEl.classList.add("reaction-btns");
  sectionEl.appendChild(reactionBtn("images/icon-heart.png"));
  sectionEl.appendChild(reactionBtn("images/icon-comment.png"));
  sectionEl.appendChild(reactionBtn("images/icon-dm.png"));
  captionEl.appendChild(sectionEl);

  // display likes
  const pEl = document.createElement("p");
  pEl.classList.add("no-margin", "bold-text");
  pEl.textContent = `${post.likes} likes`;
  captionEl.appendChild(pEl);

  // display comment
  captionEl.appendChild(postComment(post));

  return captionEl;
}

function postFigure(post) {
  const figureEl = document.createElement("figure");
  figureEl.classList.add("no-margin")

  figureEl.appendChild(postImg(post));
  figureEl.appendChild(postCaption(post));

  return figureEl;
}

function createPost(post) {
  const postContainer = document.createElement("article");
  postContainer.classList.add("black-border");
  postContainer.appendChild(postHeader(post));
  postContainer.appendChild(postFigure(post));
  return postContainer;
}

const headerEl = pageHeader();
document.body.appendChild(headerEl);

const mainEl = pageMain();
document.body.appendChild(mainEl);

posts.forEach((post) => {
  mainEl.appendChild(createPost(post));
});