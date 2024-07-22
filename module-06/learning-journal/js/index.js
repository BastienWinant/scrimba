let articlesToDisplay = 6;

document.body.addEventListener('click', (e) => {
  if ((e.target.classList.contains('nav-expand-btn')) || (e.target.classList.contains('nav-collapse-btn'))) {
    document.querySelector('#header-nav').classList.toggle('expanded');
  } else if (e.target.classList.contains('grid-expand-btn')) {
    articlesToDisplay += 3;
    displayArticles(articlesToDisplay);
  } 
});

window.addEventListener('resize', () => {
  document.querySelector('#header-nav').classList.remove('expanded');
});


const displayArticles = n => {
  const articleGrid = document.querySelector('#article-grid');

  fetch('../data/articles.json')
    .then(response => response.json())
    .then(data => {
      articleGrid.innerHTML = data.slice(0, n).map(articleObj => {
        const cardText = articleObj.text.length <= 200 ?
          articleObj.text : articleObj.text.slice(0, 201) + '...';
        return `<a class="article-card" href="#">
          <div class="masked">
            <div class="mask"></div>
            <img class="img article-img" src="${articleObj.imgUrl}" alt="Illustrative image" >
          </div>
          <div class="article-info">
            <h2 class="article-title">${articleObj.title}</h2>
            <p class="article-date">${articleObj.date}</p>
            <p class="article-blurb">${cardText}</p>
          </div>
        </a>`
      }).join('\n');

      if (n >= data.length) {
        document.querySelector('#grid-expand-btn-container').style.display = "none";
      }
    });
}

displayArticles(articlesToDisplay);