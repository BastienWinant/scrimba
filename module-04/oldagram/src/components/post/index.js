import './style.css';
import likeLogo from './favorite.svg';
import commentLogo from './comment.svg';
import shareLogo from './send-message.svg';
import bookmarkLogo from './bookmark.svg'

function Post(postObj) {
  console.log(postObj)
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