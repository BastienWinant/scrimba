import './styles.css';
import { Header } from './components/header/index';
import { Post } from './components/post/index'
import posts from './assets/posts.json';

// document.body.insertAdjacentElement(
//   "afterbegin",
//   Header()
// );

document.body.append(
  Header(),
  document.createElement('main')
)

document.querySelector('main').append(...posts.map((postObj, index) => Post(postObj, index)));


// import { createApi } from 'unsplash-js';

// // on your node server
// const unsplash = createApi({
//   accessKey: process.env.ACCESS_KEY
// });

// unsplash.photos.getRandom({
//   count: 20,
// }).then(result => {
//   if (result.errors) {
//     // handle error here
//     console.log('error occurred: ', result.errors[0]);
//   } else {
//     const feed = result.response;
//     console.log(feed);
//   }
// });