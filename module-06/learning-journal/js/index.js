// global variables
let articlesToDisplay = 6;

// catch and dispatch click events
document.addEventListener('click', (e) => {
  if (e.target.id === "nav-collapse-btn" || e.target.id === "nav-expand-btn") {
    toggleNavbar();
  } else if (e.target.id === "grid-expand-btn") {
    expandArticlesGrid();
  } else if (e.target.id === "home-btn" || e.target.id === "logo-btn") {
    renderHomePage();
  } else if (e.target.closest(".article-btn")) {
    const articleId = e.target.closest(".article-btn").dataset.articleId;
    renderArticlePage(articleId);
  } else if (e.target.id === "about-btn") {
    renderAboutPage();
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
  collapseNavbar();
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

const addCardGridHeader = () => {
  const gridSection = document.querySelector("#recent-articles");

  gridSection.insertAdjacentHTML(
    "afterbegin",
    `<header>
      <h2 class="article-card-grid-title">Recent Posts</h2>
    </header>`
  )
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

const displayArticle = (articleObj) => {
  const mainEl = document.querySelector("#main");

  mainEl.innerHTML +=
    `<article class="article">
      <header class="article-header">
        <h1 class="article-title">${articleObj.title}</h1>
        <p class="article-date">${articleObj.date}</p>
        <p class="article-intro">${articleObj.intro}</p>
      </header>
      <img class="img article-img" src="${articleObj.imgUrl}" alt="Illustrative image">
      <section class="article-body">
        <h2 class="article-subtitle">How I stay committed to learning</h2>
        <p class="article-text">I like to think of myself as a lifelong learner. I used to spend hours and hours learning, then try to create simple projects using what I learned or work new techniques into existing projects.</p>
        <p class="article-text">While that was fun, I felt like it would be helpful to share what I was learning and most things about my journey with the world.</p>
        <h2 class="article-subtitle">How I got started</h2>
        <p class="article-text">I started simple and gradually grew my learning journal site. I would take notes about what I was learning. After each learning session, I'd use my notes to not only reflect on what I learned but also write short summaries of what I learned using my own words.</p>
        <p class="article-text">That helped me grok what I was learning, and I realized that posting my learning summaries was also helping others learn and stay motivated.</p>
      </section>
    </article>`
}

const addAboutSection = () => {
  const mainEl = document.querySelector("#main");
  mainEl.innerHTML +=
    `<section class="about">
      <header class="about-header">
        <img class="img about-img" src="./images/avatar.avif" alt="Avatar headshot">
        <hgroup>
          <h1 class="about-title">Hi there! My name is Roku and welcome to my learning journal.</h1>
          <p class="about-intro">After several months of learning in the Frontend Developer Career Path, I've made the big jump over to the Bootcamp to get expert code reviews of my Solo Projects projects and meet like-minded peers.</p>
        </hgroup>
      </header>
      <section class="article-body">
        <h2 class="article-subtitle">How I stay committed to learning</h2>
        <p class="article-text">I like to think of myself as a lifelong learner. I used to spend hours and hours learning, then try to create simple projects using what I learned or work new techniques into existing projects.</p>
        <p class="article-text">While that was fun, I felt like it would be helpful to share what I was learning and most things about my journey with the world.</p>
        <h2 class="article-subtitle">How I got started</h2>
        <p class="article-text">I started simple and gradually grew my learning journal site. I would take notes about what I was learning. After each learning session, I'd use my notes to not only reflect on what I learned but also write short summaries of what I learned using my own words.</p>
        <p class="article-text">That helped me grok what I was learning, and I realized that posting my learning summaries was also helping others learn and stay motivated.</p>
      </section>
    </section>`;
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

const renderAboutPage = () => {
  clearPage();
  addAboutSection();

  fetch('../data/articles.json')
    .then(response => response.json())
    .then(articles => {
      // create an empty grid container
      addCardGrid();

      addCardGridHeader();

      // display the article cards
      fillCardGrid(articles);
      
    })
}

const renderArticlePage = (articleId) => {
  clearPage();

  fetch('../data/articles.json')
    .then(response => response.json())
    .then(articles => {
      // retrieve the article object and remove it from the array
      const articleObj = articles.find(article => article.id == articleId);
      articles.splice(articleId - 1, 1);

      displayArticle(articleObj);

      // create an empty grid container
      addCardGrid();

      addCardGridHeader();

      // display the article cards
      fillCardGrid(articles);
      
    })
}

renderHomePage();