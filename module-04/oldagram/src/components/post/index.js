import './style.css';
import likeLogo from './favorite.svg';
import commentLogo from './comment.svg';
import shareLogo from './send-message.svg';
import bookmarkLogo from './bookmark.svg'

function postHeader(postObj) {
  const user = postObj.user.name;
  const imgUrl = postObj.user.profile_image.medium;
  const location = postObj.location.name;

  const headerEl = document.createElement('header');
  headerEl.classList.add('post-header');

  const imgEl = document.createElement('img');
  imgEl.classList.add('img', 'header-img', 'header-avatar');
  imgEl.src = imgUrl;
  imgEl.alt = "User avatar image";
  headerEl.appendChild(imgEl);

  const hgroupEl = document.createElement('hgroup');
  headerEl.appendChild(hgroupEl);

  const userName = document.createElement('h2');
  userName.classList.add('post-username', 'black-border');
  userName.innerText = user;

  const locationName = document.createElement('p');
  locationName.classList.add('post-location', 'black-border');
  locationName.innerText = location;

  hgroupEl.append(userName, locationName);

  return headerEl;
}

function postImage(postObj) {
  const imgUrl = postObj.urls.raw;
  const imgAlt = postObj.alt_description;

  const imgEl = document.createElement('img');
  imgEl.classList.add('img', 'post-img');
  imgEl.src = imgUrl;
  imgEl.alt = imgAlt;

  return imgEl;
}

function postLikes(postObj) {
  const container = document.createElement('p');
  container.classList.add('post-likes');
  container.innerText = `${postObj.likes} likes`;

  return container;
}

function postCaption(postObj) {
  const userName = postObj.user.username;
  const captionText = postObj.description || postObj.alt_description;

  const postCaption = document.createElement('p');
  postCaption.classList.add('caption-text');

  const postUser = document.createElement('span');
  postUser.classList.add('caption-username');
  postUser.innerText = userName;

  postCaption.append(postUser);

  if (captionText) {

  }
  postCaption.innerHTML += captionText ? ' ' + captionText : '';

  return postCaption;
}

function postBody(postObj) {
  const container = document.createElement('figcaption');
  container.classList.add('post-body');

  const likes = postLikes(postObj);
  container.append(likes);

  // const postLikes = document.createElement('p');
  // postLikes.classList.add('post-likes');
  // postLikes.innerText = `${postObj.likes} likes`;
  // container.append(postLikes);

  // const userName = postObj.user.username;
  // const captionText = postObj.description;
  // const postCaption = document.createElement('p');
  // postCaption.classList.add('caption-text');
  const caption = postCaption(postObj);
  container.append(caption);

  return container;
}

function postContent(postObj) {
  const container = document.createElement('figure');
  container.classList.add('post-content', 'black-border');

  const imgEl = postImage(postObj);
  container.append(imgEl);

  const captionEl = postBody(postObj);
  container.append(captionEl);

  return container;
}

function Post(postObj, postIndex) {
  const container = document.createElement('article');
  container.classList.add('post', 'black-border');
  container.setAttribute('data-post-id', postIndex);

  const headerEl = postHeader(postObj);
  container.append(headerEl);

  const figureEl = postContent(postObj);
  container.append(figureEl);

  // container.innerHTML +=
  //   `<figure class="post-content black-border">
  //     <img class="img post-img" src="${postObj.urls.raw}" alt="Sahara Desert in Morocco" />
  //     <figcaption class="post-body">
  //       <section class="reaction-btns">
  //         <button class="btn reaction-btn black-border" type="button"><img src="${likeLogo}" class="img reaction-btn-img" /></button>
  //         <button class="btn reaction-btn black-border" type="button"><img src="${commentLogo}" class="img reaction-btn-img" /></button>
  //         <button class="btn reaction-btn black-border" type="button"><img src="${shareLogo}" class="img reaction-btn-img" /></button>
  //         <button class="btn reaction-btn black-border" type="button"><img src="${bookmarkLogo}" class="img reaction-btn-img" /></button>
  //       </section>
  //       <p class="post-likes">${postObj.likes} likes</p>
  //       <section class="post-caption">
  //         <p class="caption-text"><span class="caption-username">${postObj.user.username}</span> ${postObj.alt_description}</p>
  //       </section>
  //     </figcaption>
  //   </figure>`

  return container;


  return `<article class="post black-border" data-post-id="1">
    <header class="post-header">
      <img src="${postObj.user.profile_image.medium}" class="img header-img header-avatar" alt="" />
      <hgroup>
        <h2 class="post-username black-border">${postObj.user.name}</h2>
        <p class="post-location black-border">${postObj.location.name}</p>
      </hgroup>
    </header>
    <figure class="post-content black-border">
      <img class="img post-img" src="${postObj.urls.raw}" alt="Sahara Desert in Morocco" />
      <figcaption class="post-body">
        <section class="reaction-btns">
          <button class="btn reaction-btn black-border" type="button"><img src="${likeLogo}" class="img reaction-btn-img" /></button>
          <button class="btn reaction-btn black-border" type="button"><img src="${commentLogo}" class="img reaction-btn-img" /></button>
          <button class="btn reaction-btn black-border" type="button"><img src="${shareLogo}" class="img reaction-btn-img" /></button>
          <button class="btn reaction-btn black-border" type="button"><img src="${bookmarkLogo}" class="img reaction-btn-img" /></button>
        </section>
        <p class="post-likes">${postObj.likes} likes</p>
        <section class="post-caption">
          <p class="caption-text"><span class="caption-username">${postObj.user.username}</span> ${postObj.alt_description}</p>
        </section>
      </figcaption>
    </figure>
  </article>`
}

export { Post }