const displayArticles = (data) => {
  const articleGrid = document.querySelector('#article-grid');
  
  articleGrid.innerHTML = data.slice(data.length - 3, data.length).map(articleObj => {
    
    const cardText = articleObj.intro.length <= 200 ?
      articleObj.intro : articleObj.intro.slice(0, 201) + '...';
    
    return `<a class="article-card-btn" href="#">
      <div class="masked">
        <div class="mask"></div>
        <img class="img article-card-img" src="${articleObj.imgUrl}" alt="Illustrative image" >
      </div>
      <hgroup class="article-card-info">
        <h3 class="article-card-title">${articleObj.title}</h3>
        <p class="article-card-date">${articleObj.date}</p>
        <p class="article-card-intro">${cardText}</p>
      </hgroup>
    </a>`
  }).join('\n');
}

const renderAboutPage = () => {
  fetch('../data/articles.json')
  .then(response => response.json())
  .then(data => {
    displayArticles(data);
  })
}

renderAboutPage();