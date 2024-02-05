import getRandomElement from './helpers';
import images from 'Assets/bgImages.json';

const mainContainer = document.getElementById('main');

export default function updatePageBackground(imageURL) {
  // // get a random object from the images array
  // const imageURL = getRandomElement(images);

  // update the backround background-image property of the container
  mainContainer.style.backgroundImage = `url('${imageURL}')`;
}