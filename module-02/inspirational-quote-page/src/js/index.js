import 'CSS/styles.css';
import images from 'Assets/bgImages.json';
import fillQuoteContainer from 'JS/quoteContainer';
import updatePageBackground from 'JS/bodyBackground';
import { createApi } from 'unsplash-js';

// API SETUP
// create an API instance
const unsplash = createApi({
  accessKey: process.env.ACCESS_KEY,
});

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
      const textColor = colorNumber < 8388608 ? "#f0ead6" : "#212427";

      // perform the updates in the DOM
      updatePageBackground(imgURL)
      fillQuoteContainer(backgroundColor, textColor);

      // trigger a download event
      unsplash.photos.trackDownload({ downloadLocation: imgObj.links.download_location, });
    }
  });
});
