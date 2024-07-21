import './styles.css'

export default function feedComponent() {
  const mainEl = document.createElement('main');
  
  const feedContainer = document.createElement('div');
  feedContainer.classList.add('container', 'feed-container', 'black-border');
  mainEl.appendChild(feedContainer);
  
  return mainEl;
}