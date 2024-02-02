import getRandomElement from './helpers';
import quotes from 'Assets/quotes.json';

const quoteLink = document.getElementById("quote-link");

/**
 * Creates a new empty <blockquote> element
 * @returns a DOM blockquote element with defined id and classes
 */
function createQuoteContainer() {
  const quoteEl = document.createElement('blockquote');
  quoteEl.classList.add("quote-container", "bbox", "no-margin");

  return quoteEl;
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
export default function fillQuoteContainer() {
  const quoteContainer = createQuoteContainer();

  // get a random object from the quotes array
  const quoteObject = getRandomElement(quotes);

  // create HTML elements for each object entry
  const quoteParagraph = createQuoteParagraph(quoteObject['quote']);
  const quoteSource = createQuoteSource(quoteObject.author);

  // add the HTML elements to the container
  quoteContainer.appendChild(quoteParagraph);
  quoteContainer.appendChild(quoteSource);

  // add the container to the main container
  quoteLink.appendChild(quoteContainer);
}