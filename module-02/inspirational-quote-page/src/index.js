import 'CSS/styles.css';
import fillQuoteContainer from 'JS/quoteContainer';
import updatePageBackground from 'JS/bodyBackground';

document.addEventListener("DOMContentLoaded", () => {
  updatePageBackground();
  fillQuoteContainer();
});
