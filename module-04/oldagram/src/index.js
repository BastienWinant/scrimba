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
    // handle error here
    console.log('error occurred: ', result.errors[0]);
  } else {
    const posts = result.response;
    document.querySelector('.main').innerHTML = posts.map(postObj => Post(postObj)).join('\n');

    document.querySelectorAll('.like-btn').forEach(btn => {
      btn.addEventListener('click', e => {
        const postEl = e.target.closest('.post');
        const postObj = posts.find(post => post.id === postEl.dataset.postId);
    
        updateLikes(postEl, postObj);
      })
    })
    
    document.querySelectorAll('.bookmark-btn').forEach(btn => {
      btn.addEventListener('click', e => {
        const postEl = e.target.closest('.post');
        const postObj = posts.find(post => post.id === postEl.dataset.postId);
    
        updateBookmark(postEl, postObj);
      })
    })
  }
});