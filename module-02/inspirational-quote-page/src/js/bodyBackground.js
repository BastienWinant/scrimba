import getRandomElement from './helpers';

const mainContainer = document.getElementById('main');

/**
 * Sets the background-image of the .main element
 * @param {*} imageURL a url to the img to be used as background
 */
export default function updatePageBackground(imageURL) {
  // update the backround background-image property of the container
  mainContainer.style.backgroundImage = `url('${imageURL}')`;
}