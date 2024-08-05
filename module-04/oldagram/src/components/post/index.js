import './style.css';
import likeLogoHollow from './favorite.svg';
import likeLogoFull from './favorite-1.svg';
import commentLogo from './comment.svg';
import shareLogo from './send-message.svg';
import bookmarkLogoHollow from './bookmark.svg'
import bookmarkLogoFull from './bookmark-1.svg'

function updateLikes(postEl, postObj) {
  postObj.likes = postObj.liked_by_user ? postObj.likes - 1 : postObj.likes + 1;
  postObj.liked_by_user = !postObj.liked_by_user;

  postEl.querySelector('.post-likes').innerText = `${postObj.likes} likes`;

  postEl.querySelector('.like-btn .reaction-btn-img').src = 
    postObj.liked_by_user ? likeLogoFull : likeLogoHollow;
  postEl.querySelector('.like-btn').classList.toggle('hollow-btn');
}

function updateBookmark(postEl, postObj) {
  postObj.bookmarked = !postObj.bookmarked;

  postEl.querySelector('.bookmark-btn .reaction-btn-img').src = 
    postObj.bookmarked ? bookmarkLogoFull : bookmarkLogoHollow;
  postEl.querySelector('.bookmark-btn').classList.toggle('hollow-btn');
}

function postHeader(imgUrl, username, location) {
  const htmlString = 
    `<header class="post-header">
        <img class="header-img avatar-img" src="${imgUrl}" alt="User avatar image" />
        <hgroup>
          <h2 class="post-username">${username}</h2>
          ${location ? '<p class="post-location">' + location + '</p>' : ''}
        </hgroup>
      </header>`
  
  return htmlString
}

function postReactionBtns(postLiked, postBookmarked) {
  const htmlString = 
    `<section class="reaction-btns">
        <button class="btn reaction-btn like-btn${postLiked ? '' : ' hollow-btn'}" type="button"><img src="${postLiked ? likeLogoFull : likeLogoHollow}" class="img reaction-btn-img" /></button>
        <button class="btn reaction-btn comment-btn hollow-btn" type="button"><img src="${commentLogo}" class="img reaction-btn-img" /></button>
        <button class="btn reaction-btn share-btn hollow-btn" type="button"><img src="${shareLogo}" class="img reaction-btn-img" /></button>
        <button class="btn reaction-btn bookmark-btn${postBookmarked ? '' : ' hollow-btn'}" type="button"><img src="${postBookmarked ? bookmarkLogoFull : bookmarkLogoHollow}" class="img reaction-btn-img" /></button>
      </section>`
  
  return htmlString
}

function Post(postObj) {
  const postIndex = postObj.id;

  const avatarUrl = postObj.user.profile_image.medium;
  const name = postObj.user.name;
  const location = postObj.location.name;

  const imgUrl = postObj.urls.raw;
  const imgAlt = postObj.alt_description;

  postObj.liked_by_user = postObj.liked_by_user || Math.random() < .3;
  const postLiked = postObj.liked_by_user
  const postLikes = postObj.likes;

  postObj.bookmarked = Math.random() < .3;
  const postBookmarked = postObj.bookmarked;
  
  const username = postObj.user.username;
  const postDescription = postObj.description || postObj.alt_description;

  const postHTML =
    `<article class="post" data-post-id="${postIndex}">
      ${postHeader(avatarUrl, name, location)}
      <figure class="post-content">
        <img class="img post-img" src="${imgUrl}" alt="${imgAlt}" />
        <figcaption class="post-body">
          ${postReactionBtns(postLiked, postBookmarked)}
          <p class="post-likes">${postLikes} likes</p>
          <p class="post-caption"><span class="caption-username">${username}</span> ${postDescription}</p>
        </figcaption>
      </figure>
    </article>`

  return postHTML
}

export { Post, updateLikes, updateBookmark }