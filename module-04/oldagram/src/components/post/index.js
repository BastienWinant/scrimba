import './style.css';
import likeLogo from './favorite.svg';
import commentLogo from './comment.svg';
import shareLogo from './send-message.svg';
import bookmarkLogo from './bookmark.svg'

function Post() {
  return `<article class="post black-border">
    <header class="post-header">
      <img src="https://images.unsplash.com/photo-1721983571623-ed178f59d9b3" class="img header-img header-avatar" alt="" />
      <hgroup>
        <h2 class="post-username black-border">John Doe</h2>
        <p class="post-location black-border">Luxembourg, Luxembourg</p>
      </hgroup>
    </header>
    <figure class="post-content black-border">
      <img class="img post-img" src="https://images.unsplash.com/photo-1722480403866-fc98f4789f00" alt="Sahara Desert in Morocco" />
      <figcaption class="post-body">
        <section class="reaction-btns">
          <button class="btn reaction-btn black-border" type="button"><img src="${likeLogo}" class="img reaction-btn-img" /></button>
          <button class="btn reaction-btn black-border" type="button"><img src="${commentLogo}" class="img reaction-btn-img" /></button>
          <button class="btn reaction-btn black-border" type="button"><img src="${shareLogo}" class="img reaction-btn-img" /></button>
          <button class="btn reaction-btn black-border" type="button"><img src="${bookmarkLogo}" class="img reaction-btn-img" /></button>
        </section>
        <p class="post-likes">337 likes</p>
        <section class="post-caption">
          <p class="caption-username">vincey1853</p>
          <p class="caption-text">just took a few mushrooms lol</p>
        </section>
      </figcaption>
    </figure>
  </article>`
}

export { Post }