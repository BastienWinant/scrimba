let articlesToDisplay = 6;

document.body.addEventListener('click', (e) => {
  if ((e.target.classList.contains('nav-expand-btn')) || (e.target.classList.contains('nav-collapse-btn'))) {
    document.querySelector('#header-nav').classList.toggle('expanded');
  } else if (e.target.classList.contains('grid-expand-btn')) {
    articlesToDisplay += 3;
    displayArticles(articlesToDisplay + 1);
  } 
});

window.addEventListener('resize', () => {
  document.querySelector('#header-nav').classList.remove('expanded');
});

const displayHero = (articleObj) => {
  document.querySelector('#hero').style.backgroundImage = `url(${articleObj.imgUrl})`;
  document.querySelector('#hero-title').innerText = articleObj.title;
  document.querySelector('#hero-date').innerText = articleObj.date;
  document.querySelector('#hero-blurb').innerText = articleObj.text;
}


const displayArticles = (data, n) => {
  const articleGrid = document.querySelector('#article-grid');

  articleGrid.innerHTML = data.slice(1, n).map(articleObj => {
    
    const cardText = articleObj.text.length <= 200 ?
      articleObj.text : articleObj.text.slice(0, 201) + '...';
    
    return `<a class="article-link" href="#">
      <div class="masked">
        <div class="mask"></div>
        <img class="img article-img" src="${articleObj.imgUrl}" alt="Illustrative image" >
      </div>
      <hgroup class="article-info black-border">
        <h2 class="article-title">${articleObj.title}</h2>
        <p class="article-date">${articleObj.date}</p>
        <p class="article-blurb">${cardText}</p>
      </hgroup>
    </a>`
  }).join('\n');

  if (n >= data.length) {
    document.querySelector('#grid-expand-btn-container').style.display = "none";
  }
}

const renderPage = () => {
  fetch('../data/articles.json')
  .then(response => response.json())
  .then(data => {
    displayHero(data[0]);
    displayArticles(data, articlesToDisplay + 1);
  })
}

renderPage();