const displayArticles = (data) => {
  const articleGrid = document.querySelector('#article-grid');
  
  articleGrid.innerHTML = data.slice(data.length - 3, data.length).map(articleObj => {
    
    const cardText = articleObj.text.length <= 200 ?
      articleObj.text : articleObj.text.slice(0, 201) + '...';
    
    return `<a class="article-link" href="#">
      <div class="masked">
        <div class="mask"></div>
        <img class="img article-card-img" src="${articleObj.imgUrl}" alt="Illustrative image" >
      </div>
      <hgroup class="article-card-info">
        <h2 class="article-card-title">${articleObj.title}</h2>
        <p class="article-date">${articleObj.date}</p>
        <p class="article-blurb">${cardText}</p>
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