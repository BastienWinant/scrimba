import './styles.css';
import { Header } from './components/header/index';
import { Post, updateLikes, updateBookmark } from './components/post/index'
import { createApi } from 'unsplash-js';

document.querySelector('header').insertAdjacentHTML(
  "afterbegin",
  Header()
);

const unsplash = createApi({
  accessKey: process.env.ACCESS_KEY
});

unsplash.photos.getRandom({
  count: 20,
}).then(result => {
  if (result.errors) {
    console.log('error occurred: ', result.errors[0]);
  } else {
    // render the posts in a formatted feed
    const posts = result.response;
    document.querySelector('.main').innerHTML = posts.map(postObj => Post(postObj)).join('\n');

    // add the like functionality
    document.querySelectorAll('.like-btn').forEach(btn => {
      btn.addEventListener('click', e => {
        const postEl = e.target.closest('.post');
        const postObj = posts.find(post => post.id === postEl.dataset.postId);

        updateLikes(postEl, postObj);
      })
    })

    // add the bookmark functionality
    document.querySelectorAll('.bookmark-btn').forEach(btn => {
      btn.addEventListener('click', e => {
        const postEl = e.target.closest('.post');
        const postObj = posts.find(post => post.id === postEl.dataset.postId);

        updateBookmark(postEl, postObj);
      })
    })

    // add the like functionality on image double-click
    document.querySelectorAll('.post-img-overlay').forEach(img => {
      img.addEventListener('dblclick', e => {
        const postEl = e.target.closest('.post');
        const postObj = posts.find(post => post.id === postEl.dataset.postId);
        
        if (!postObj.liked_by_user) {
          updateLikes(postEl, postObj);
          postEl.querySelector('.post-img-overlay').classList.add('showing');
          setTimeout(() => {
            postEl.querySelector('.post-img-overlay').classList.remove('showing');
          }, 1000)
        }
      })
    })
  }
});