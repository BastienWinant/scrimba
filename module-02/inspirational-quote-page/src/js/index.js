import 'CSS/styles.css';
import quotes from 'Assets/quotes.json';
import images from 'Assets/bgImages.json';
import { createApi } from 'unsplash-js';

// API SETUP
// create an API instance
const unsplash = createApi({
  accessKey: process.env.ACCESS_KEY,
});

// HTML DOM ELEMENTS
const mainContainer = document.getElementById('main');
const quoteContainer = document.getElementById("quote-container");

// HELPER FUNCTIONS
/**
 * Returns a random element from the input array
 * @param arr array to be sampled from 
 * @returns a single array element
 */
function getRandomElement(arr) {
  // get a random element from the input array
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}

/**
 * Sets the background-image of the .main element
 * @param {*} imageURL a url to the img to be used as background
 */
function updatePageBackground(imageURL) {
  // update the backround background-image property of the container
  mainContainer.style.backgroundImage = `url('${imageURL}')`;
}

/**
 * Creates a new <p> element with the input string as inner content
 * @param paragraphText string for the paragraph text
 * @returns the new <p> element with content and classes
 */
function createQuoteParagraph(paragraphText) {
  // create the HTML element for the quote text
  const pEl = document.createElement('p');
  pEl.innerHTML = paragraphText;

  // add classes for styling
  pEl.classList.add("quote-text", "no-margin");

  // return the element
  return pEl;
}

/**
 * Creates a new <footer> element with the input string as inner content
 * @param paragraphSource string for the footer text
 * @returns the new <footer> element with content and classes
 */
function createQuoteSource(paragraphSource) {
  // create the HTML element for the quote source
  const footerEl = document.createElement('footer');
  footerEl.innerHTML = paragraphSource;

  // add classes for styling
  footerEl.classList.add("quote-source");

  // return the element
  return footerEl;
}

/**
 * Fill the element with id "quote-container" with inner content
 */
function fillQuoteContainer(backgroundColor, textColor) {
  quoteContainer.style.backgroundColor = backgroundColor;
  quoteContainer.style.color = textColor;

  // get a random object from the quotes array
  const quoteObject = getRandomElement(quotes);

  // create HTML elements for each object entry
  const quoteParagraph = createQuoteParagraph(quoteObject['quote']);
  const quoteSource = createQuoteSource(quoteObject.author);

  // add the HTML elements to the container
  quoteContainer.appendChild(quoteParagraph);
  quoteContainer.appendChild(quoteSource);
}

document.addEventListener("DOMContentLoaded", () => {  
  unsplash.photos.getRandom({
    query: 'landscape',
    orientation: 'portrait',
  }).then(result => {
    if (result.errors) {
      // if a URL could not get pulled from the API,
      // get a URL from the static JSON file
      const imgURL = getRandomElement(images);

      // perform the updates in the DOM
      updatePageBackground(imgURL)
      fillQuoteContainer(imgColor);
    } else {
      // extract the image url and main color
      const imgObj = result.response;
      const imgURL = imgObj.urls.regular;
      const backgroundColor = imgObj.color;

      // set the text color to black or white depending on how dark the background is
      const colorNumber = Number(backgroundColor.replace("#", "0x"));
      const textColor = colorNumber < 8388608 ? "#FFF" : "#000";

      // perform the updates in the DOM
      updatePageBackground(imgURL)
      fillQuoteContainer(backgroundColor, textColor);

      // trigger a download event
      unsplash.photos.trackDownload({ downloadLocation: imgObj.links.download_location, });
    }
  });
});
