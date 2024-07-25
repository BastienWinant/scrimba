let articlesToDisplay = 6;

// expand the articles grid
document.body.addEventListener('click', (e) => {
  if (e.target.classList.contains('grid-expand-btn')) {
    expandArticlesGrid();
  } 
});

// set the background img and add text to the hero section
const displayHero = (articleObj) => {
  const mainEl = document.querySelector('#main');

  // mainEl.insertAdjacentHTML
  mainEl.insertAdjacentHTML(
    'afterbegin',
    `<section id="hero" class="hero">
      <div class="mask"></div>
      <a class="article-card-link article-card-info hero-link" href="#">
        <h1 id="hero-title" class="article-card-title hero-title">${articleObj.title}</h1>
        <p id="hero-date" class="article-card-date hero-date">${articleObj.date}</p>
        <p id="hero-intro" class="article-card-intro hero-intro">${articleObj.intro}</p>
      </a>
    </section>`
  )

  document.querySelector('#hero').style.backgroundImage = `url(${articleObj.imgUrl})`;
}

// append an empty grid container to the page's main element
const createArticlesGrid = () => {
  const mainEl = document.querySelector('#main');
  mainEl.innerHTML += 
    `<section class="recent-articles">
      <div id="article-grid" class="article-grid"></div>
      <div id="grid-expand-btn-container" class="grid-expand-btn-container">
        <button class="btn grid-expand-btn">view more</button>
      </div>
    </section>`
}

// fetch articles data and fill articles grid
const displayArticles = (data, n) => {
  const articleGrid = document.querySelector('#article-grid');
  articleGrid.innerHTML = data.slice(0, n).map(articleObj => {
    // truncate the intro text if longer than 200 characters
    const cardText = articleObj.intro.length <= 200 ?
      articleObj.intro : articleObj.intro.slice(0, 201) + '...';
    
    return `<a class="article-card-link" href="#">
      <div class="masked">
        <div class="mask"></div>
        <img class="img article-card-img" src="${articleObj.imgUrl}" alt="Illustrative image" >
      </div>
      <hgroup class="article-card-info">
        <h2 class="article-card-title">${articleObj.title}</h2>
        <p class="article-card-date">${articleObj.date}</p>
        <p class="article-card-intro">${cardText}</p>
      </hgroup>
    </a>`
  }).join('\n');

  // hide the expand button if all articles are displayed
  if (n >= data.length) {
    document.querySelector('#grid-expand-btn-container').style.display = "none";
  }
}

const expandArticlesGrid = () => {
  articlesToDisplay += 3;

  fetch('../data/articles.json')
    .then(response => response.json())
    .then(data => {
      displayArticles(data, articlesToDisplay);
  })
}

const renderHomePage = () => {
  fetch('../data/articles.json')
    .then(response => response.json())
    .then(data => {
      displayHero(data[data.length - 1]);
      createArticlesGrid();
      displayArticles(data, articlesToDisplay);
    }
  )
}

renderHomePage();