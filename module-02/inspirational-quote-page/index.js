const quoteContainer = document.getElementById('quote-container');

function getRandomIndex(arr) {
  // get a random element from the input array
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}

function createQuoteParagraph(paragraphText) {
  // create the HTML element for the quote text
  const pEl = document.createElement('p');
  pEl.innerHTML = paragraphText;

  // add classes for styling
  pEl.classList.add("quote-text", "no-margin");

  // return the element
  return pEl;
}

function createQuoteSource(paragraphSource) {
  // create the HTML element for the quote source
  const footerEl = document.createElement('footer');
  footerEl.innerHTML = paragraphSource;

  // add classes for styling
  footerEl.classList.add("quote-source");

  // return the element
  return footerEl;
}

function fillQuoteContainer(quoteObj) {
  const quoteParagraph = createQuoteParagraph(quoteObj['quote']);
  const quoteSource = createQuoteSource(quoteObj.author);

  quoteContainer.appendChild(quoteParagraph);
  quoteContainer.appendChild(quoteSource);
}


document.addEventListener("DOMContentLoaded", () => {
  const quoteObject = getRandomIndex(quotes);
  fillQuoteContainer(quoteObject);
})