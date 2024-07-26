// global variables
let articlesToDisplay = 6;

// catch and dispatch click events
document.addEventListener('click', (e) => {
  if (e.target.id === "nav-collapse-btn" || e.target.id === "nav-expand-btn") {
    toggleNavbar();
  } else if (e.target.id === "grid-expand-btn") {
    expandArticlesGrid();
  } else if (e.target.id === "home-btn") {
    renderHomePage();
    collapseNavbar();
  } else if (e.target.closest(".article-btn")) {
    const articleId = e.target.closest(".article-btn").dataset.articleId;
    renderArticlePage(articleId);
  }
});

// collapse navbar upon window resize
window.addEventListener('resize', () => {
  collapseNavbar();
});

const collapseNavbar = () => {
  document.querySelector("#header-nav").classList.remove("expanded");
}

const toggleNavbar = () => {
  document.querySelector("#header-nav").classList.toggle("expanded");
}

const clearPage = () => {
  document.querySelector("#main").innerHTML = "";
  articlesToDisplay = 3;
}

const addHeroSection = (articleObj) => {
  const mainEl = document.querySelector("#main");

  mainEl.insertAdjacentHTML(
    "afterbegin",
    `<section id="hero" class="hero">
      <button id="hero-btn" class="btn hero-btn article-btn masked" data-article-id="${articleObj.id}" type="button">
        <div class="mask"></div>
        <header class="hero-header">
          <h1 class="hero-title">${articleObj.title}</h1>
          <p class="hero-date">${articleObj.date}</p>
          <p class="hero-intro">${articleObj.intro}</p>
        </header>
      </button>
    </section>`
  )

  document.querySelector("#hero-btn").style.backgroundImage = `url(${articleObj.imgUrl})`;
}

const addCardGrid = () => {
  const mainEl = document.querySelector("#main");

  mainEl.innerHTML +=
    `<section id="recent-articles" class="recent-articles">
      <div id="article-card-grid" class="article-card-grid"></div>
    </section>`
}

const fillCardGrid = (articles) => {
  const gridContainer = document.querySelector("#article-card-grid");

  // select the most recent articles from the back of the array
  const gridArticles = articles.toReversed().slice(0, articlesToDisplay);

  gridContainer.innerHTML = gridArticles.map(articleObj => {
    // truncate the intro text
    const introText = articleObj.intro.length > 200
      ? articleObj.intro.slice(0, 198) + '...'
      : articleObj.intro;

    return `<button class="btn article-btn article-card" data-article-id="${articleObj.id}" type="button">
      <figure class="masked" style="background: blue;">
        <div class="mask"></div>
        <img class="img article-card-img" src="${articleObj.imgUrl}" alt="Illustrative image">
      </figure>
      <div class="article-card-info">
        <h3 class="article-card-title">${articleObj.title}</h3>
        <p class="article-card-date">${articleObj.date}</p>
        <p class="article-card-intro">${introText}</p>
      </div>
    </button>`
  }).join('\n');
}

const addGridExpandBtn = () => {
  const gridSection = document.querySelector("#recent-articles");

  gridSection.insertAdjacentHTML(
    "beforeend",
    `<div id="grid-expand-btn-container" class="grid-expand-btn-container">
      <button id="grid-expand-btn" class="btn grid-expand-btn" type="button">view more</button>
    </div>`
  )
}

const removeGridExpandBtn = () => {
  document.querySelector("#grid-expand-btn-container").style.display = "none";
}

const expandArticlesGrid = () => {
  articlesToDisplay += 3;

  fetch('../data/articles.json')
    .then(response => response.json())
    .then(articles => {
      articles.pop();
      fillCardGrid(articles);

      // remove the expansion button if all articles are displayed
      if (articlesToDisplay >= articles.length) {
        removeGridExpandBtn();
      }
    }
  )
}

const renderHomePage = () => {
  clearPage();

  fetch('../data/articles.json')
    .then(response => response.json())
    .then(articles => {
      // use the most recent article for the hero section
      const lastArticle = articles.pop();
      addHeroSection(lastArticle);
      
      // create an empty grid container
      addCardGrid();

      // display the article cards
      fillCardGrid(articles);

      // don't add the expand button if all articles are displayed
      if (articlesToDisplay < articles.length) {
        addGridExpandBtn();
      };
    });
}

const renderArticlePage = (articleId) => {
  // clearPage();

  fetch('../data/articles.json')
    .then(response => response.json())
    .then(articles => {
      const articleObj = articles.find(article => article.id == articleId);
      console.log(articleObj);
    })
}

renderHomePage();