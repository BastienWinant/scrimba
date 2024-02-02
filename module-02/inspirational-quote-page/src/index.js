import './styles.css';
import fillQuoteContainer from './quoteContainer';
import updatePageBackground from './bodyBackground';

document.addEventListener("DOMContentLoaded", () => {
  updatePageBackground();
  fillQuoteContainer();
});
