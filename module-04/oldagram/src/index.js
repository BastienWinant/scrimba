import './styles.css';
import { Header } from './components/header/index';
import { Post } from './components/post/index'
import posts from './assets/posts.json';

document.body.insertAdjacentHTML(
  'afterbegin',
  Header()
)

document.body.querySelector('.main').insertAdjacentHTML(
  'afterbegin',
  Post()
)

console.log(posts)

// import { createApi } from 'unsplash-js';

// // on your node server
// const unsplash = createApi({
//   accessKey: process.env.ACCESS_KEY
// });

// unsplash.photos.getRandom({
//   query: 'dog',
//   count: 10,
// }).then(result => {
//   if (result.errors) {
//     // handle error here
//     console.log('error occurred: ', result.errors[0]);
//   } else {
//     const feed = result.response;
//     console.log(feed);
//   }
// });