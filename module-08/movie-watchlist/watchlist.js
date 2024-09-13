const toggleBtn = document.querySelector('#mode-toggle-btn')
const toggleSwitch = document.querySelector('#toggle-switch')
const searchForm = document.querySelector('#search-form')
const searchTermInput = document.querySelector('#search-term')
const searchTypeInput = document.querySelector('#search-type')
const searchYearInput = document.querySelector('#search-year')
const searchSubmitBtn = document.querySelector('#submit-btn')
const dataContainer = document.querySelector('#data-container')

// dark mode toggle
function setPageColors() {
  const r = document.querySelector(':root')
  const colorMode = localStorage.getItem('color-mode')

  if (colorMode === 'light') {
    toggleSwitch.classList.remove('switched')
    r.style.setProperty('--header-text', '#FFFFFF')
    r.style.setProperty('--header-bg', '#000000DD')
    
    r.style.setProperty('--main-bg', '#FFFFFF')
    r.style.setProperty('--main-text-low', '#DFDDDD')
    r.style.setProperty('--main-text-high', '#363636')

    r.style.setProperty('--form-bg', '#DFDDDD')
    r.style.setProperty('--form-label-text', '#363636')
    r.style.setProperty('--input-text', '#6B7280')
    r.style.setProperty('--input-bg', '#FFFFFF')
    r.style.setProperty('--input-border', '#D1D5DB')
    r.style.setProperty('--btn-text', '#374151')
    r.style.setProperty('--btn-bg', '#F9FAFB')
    r.style.setProperty('--btn-border', '#D1D5DB')

    r.style.setProperty('--card-text-high', '#111827')
    r.style.setProperty('--card-text-low', '#6B7280')
  } else {
    toggleSwitch.classList.add('switched')

    r.style.setProperty('--main-bg', '#121212')
    r.style.setProperty('--main-text-low', '#787878')
    r.style.setProperty('--main-text-high', '#FFFFFF')

    r.style.setProperty('--form-bg', '#121212')
    r.style.setProperty('--form-label-text', '#FFFFFF')
    r.style.setProperty('--input-text', '#6B7280')
    r.style.setProperty('--input-bg', '#2E2E2F')
    r.style.setProperty('--input-border', '#2E2E2F')
    r.style.setProperty('--btn-text', '#FFFFFF')
    r.style.setProperty('--btn-bg', '#4B4B4B')
    r.style.setProperty('--btn-border', '#4B4B4B')

    r.style.setProperty('--card-text-high', '#FFFFFF')
    r.style.setProperty('--card-text-low', '#A5A5A5')
  }
}
setPageColors()

function toggleMode() {
  const colorMode = toggleBtn.dataset.mode === 'light'
                                              ? 'dark'
                                              : 'light'

  toggleBtn.dataset.mode = colorMode
  localStorage.setItem('color-mode', colorMode)
  setPageColors()
}
toggleBtn.addEventListener('click', toggleMode)

function filterResults(title, type, year) {}

// WATCHLIST FILTERING
function fetchSearchResults(term, type, year) {
  let watchList = JSON.parse(localStorage.getItem('watchlist'))

  if (term) {
    watchList = watchList.filter(movieObj => movieObj.Title.toLowerCase().includes(term.toLowerCase()))
  }

  if (type) {
    watchList = watchList.filter(movieObj => movieObj.Type === type)
  }

  if (year) {
    watchList = watchList.filter(movieObj => movieObj.Year == year)
  }

  return watchList
}

// generate HTML for a list of movie data objects
function generateResultHTML(movieArr) {
  const html = movieArr.map(movieObj => {
    const moviePoster = movieObj.Poster === 'N/A'
          ? 'https://plus.unsplash.com/premium_photo-1684923604860-64e661f2ff72'
          : movieObj.Poster

    const movieRating = movieObj.imdbRating === 'N/A'
          ? ''
          : `<div class="movie-rating">
              <i class="fa-solid fa-star"></i>
              ${movieObj.imdbRating}
            </div>`
    
    const movieRunTime = movieObj.Runtime === 'N/A'
          ? ''
          : `<p>${movieObj.Runtime}</p>`
    
    const movieGenre = movieObj.Genre === 'N/A'
          ? ''
          : `<p>${movieObj.Genre}</p>`
    
    const moviePlot = movieObj.Plot === 'N/A'
          ? ''
          : `<p class="movie-plot">${movieObj.Plot}</p>`

    return `<article class="card">
      <img src="${moviePoster}" alt="movie poster" class="card-img">
      <div class="card-body">
        <header class="card-header">
          <h3 class="movie-title">${movieObj.Title}</h3>
          ${movieRating}
        </header>
        <section class="movie-info">
          <div class="movie-metadata">
            ${movieRunTime}
            ${movieGenre}
          </div>
          <button class="remove-movie-btn" data-movie-id="${movieObj.imdbID}">
            <i class="fa-solid fa-circle-minus"></i>
            Watchlist
          </button>
        </section>
        ${moviePlot}
      </div>
    </article>
    <hr class="card-separator">`
  }).join('\n')

  return html
}

function displaySearchResults() {
  const searchTerm = searchTermInput.value
  const searchType = searchTypeInput.value
  const searchYear = searchYearInput.value

  // let searchResults
  searchForm.reset()
  const searchResults = fetchSearchResults(searchTerm, searchType, searchYear)

  let searchResultHTML
  if (searchResults.length > 0) {
    searchResultHTML = generateResultHTML(searchResults)
  } else {
    searchResultHTML =
      `<div class="container no-data-state">
        <p>Unable to find what you’re looking for. The movie you want might not be in your watchlist yet...</p>
        <a href="./search.html" class="cta-link">
          <i class="fa-solid fa-circle-plus fa-lg"></i>
          <span>Let's add some movies!</span>
        </a>
      </div>`
  }

  dataContainer.innerHTML = searchResultHTML
}
searchSubmitBtn.addEventListener('click', e => {
  e.preventDefault()
  displaySearchResults()
  dataContainer.scrollIntoView()
})
displaySearchResults()

// store movie data into localstorage
function removeMovieFromWatchlist(btn) {
  const movieId = btn.dataset.movieId
  let watchList = JSON.parse(localStorage.getItem('watchlist'))

  watchList = watchList.filter(movieObj => movieObj.imdbID !== movieId)
  localStorage.setItem('watchlist', JSON.stringify(watchList))
}

dataContainer.addEventListener('click', e => {
  if (e.target.closest('.remove-movie-btn')) {
    removeMovieFromWatchlist(e.target)
  }
})