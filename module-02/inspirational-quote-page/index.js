const quoteContainer = document.getElementById('quote-container');
const mainContainer = document.getElementById('main');

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
function fillQuoteContainer() {
  // get a random object from the quotes array
  const quoteObject = getRandomElement(quotes);

  // create HTML elements for each object entry
  const quoteParagraph = createQuoteParagraph(quoteObject['quote']);
  const quoteSource = createQuoteSource(quoteObject.author);

  // add the HTML elements to the container
  quoteContainer.appendChild(quoteParagraph);
  quoteContainer.appendChild(quoteSource);
}

function updatePageBackground() {
  // get a random object from the images array
  const imageURL = getRandomElement(images);

  // update the backround background-image property of the container
  // mainContainer
}


document.addEventListener("DOMContentLoaded", () => {
  fillQuoteContainer();
})