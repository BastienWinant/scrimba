import './post.css';

const PostTitleGroup = () => {
  const hgroupEl = document.createElement('hgroup');
  
  const username = document.createElement('h2');
  username.classList.add("username");
  username.textContent = "Vincent Van Gogh";
  hgroupEl.appendChild(username);

  const location = document.createElement("p");
  location.classList.add("location");
  location.innerText = "Zudert, Netherlands";
  hgroupEl.appendChild(location);

  return hgroupEl;
}

const PostHeader = () => {
  const headerEl = document.createElement('header');
  headerEl.classList.add("post-header");
  
  const headerImg = document.createElement('img');
  headerImg.src = "https://images.unsplash.com/photo-1721804978061-2c23db2b5e4c";
  headerImg.classList.add("img", "post-header-img");
  headerEl.appendChild(headerImg);

  headerEl.appendChild(PostTitleGroup());

  return headerEl;
}

const postMedia = () => {
  const btnEl = document.createElement("button");
  btnEl.type = "button";
  btnEl.classList.add("btn", "img-btn");

  // const maskEl = document.createElement("div");
  // maskEl.classList.add("mask");
  // btnEl.appendChild(maskEl);

  const imgEl = document.createElement("img");
  imgEl.src = "https://images.unsplash.com/photo-1721212975534-1801e6168ee4";
  imgEl.classList.add("img", "post-img");
  btnEl.appendChild(imgEl);

  return btnEl;
}

export const Post = () => {
  const postContainer = document.createElement('article');
  postContainer.classList.add("post");

  postContainer.appendChild(PostHeader());
  postContainer.appendChild(postMedia())

  return postContainer;
}