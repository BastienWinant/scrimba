const toggleBtn = document.querySelector('#mode-toggle-btn')
const toggleSwitch = document.querySelector('#toggle-switch')
const searchForm = document.querySelector('#search-form')
const searchTermInput = document.querySelector('#search-term')
const searchTypeInput = document.querySelector('#search-type')
const searchYearInput = document.querySelector('#search-year')
const searchSubmitBtn = document.querySelector('#submit-btn')
const dataContainer = document.querySelector('#data-container')

let searchResults

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

// API DATA FETCHING
// returns API data based on supplied parameters
async function omdbApiRequest(params) {
  const apiKey = 'dc03cb5c'
  const baseUrl = 'http://www.omdbapi.com'

  let requestUrl = `${baseUrl}/?apikey=${apiKey}`

  for (const key in params) {
    if (params[key]) {
      requestUrl += `&${key}=${params[key]}`
    }
  }
  
  const response = await fetch(requestUrl)

  try {
    const data = await response.json()
    return data.Response === 'True' ? data : undefined
  } catch {
    return
  }
}

// get data for a single movie
async function fetchMovieDetails(movieId) {
  const requestParams = {'i': movieId }
  const data = await omdbApiRequest(requestParams)

  return data
}

// get a list of movie IDs for search parameters 
async function fetchMovieIDs(term, type, year, page) {
  const requestParams = {
    's': term,
    'type': type,
    'y': year,
    'page': page
  }

  const data = await omdbApiRequest(requestParams)
  const movieIds = data.Search.map(movie => movie.imdbID)
  
  return movieIds
}

async function fetchSearchResults(searchTerm, searchType, searchYear) {
  const movieIds = await fetchMovieIDs(searchTerm, searchType, searchYear)
  const movieDetails = await Promise.all(movieIds.map(id => fetchMovieDetails(id)))

  return movieDetails
}

// generate HTML for a list of movie data objects
function checkWatchList(movieId) {
  const watchList = JSON.parse(localStorage.getItem('watchlist'))
  return watchList.find(movieObj => movieObj.imdbID === movieId)
}

function generateResultHTML(movieArr) {
  const html = movieArr.map(movieObj => {
    const moviePoster = movieObj.Poster === 'N/A'
          ? 'https://plus.unsplash.com/premium_photo-1684923604860-64e661f2ff72'
          : movieObj.Poster

    const movieRating = movieObj.imdbRating === 'N/A'
          ? ''
          : `<div class="movie-rating">
              <i class="fa-solid fa-star"></i>
              ${ movieObj.imdbRating }
            </div>`
    
    const movieRunTime = movieObj.Runtime === 'N/A'
          ? ''
          : `<p>${ movieObj.Runtime }</p>`
    
    const movieGenre = movieObj.Genre === 'N/A'
          ? ''
          : `<p>${ movieObj.Genre }</p>`
    
    const cardBtn = checkWatchList(movieObj.imdbID)
          ? `<button type="button" class="add-movie-btn" data-movie-id="${ movieObj.imdbID }" disabled>
              <i class="fa-solid fa-square-check fa-xl"></i>
              In watchlist
            </button>`
          : `<button type="button" class="add-movie-btn" data-movie-id="${ movieObj.imdbID }">
            <i class="fa-solid fa-circle-plus fa-xl"></i>
            Watchlist
          </button>`
        

    let moviePlot = movieObj.Plot === 'N/A' ? '' : movieObj.Plot
    moviePlot = moviePlot.length > 132
          ? moviePlot.slice(0,132) + `... <button class="expand-plot-btn" data-movie-id="${ movieObj.imdbID }">Read more</button>`
          : moviePlot

    return `<article class="card">
      <img src="${ moviePoster }" alt="movie poster" class="card-img">
      <div class="card-body">
        <header class="card-header">
          <h3 class="movie-title">${movieObj.Title}</h3>
          ${ movieRating }
        </header>
        <section class="movie-info">
          <div class="movie-metadata">
            ${ movieRunTime }
            ${ movieGenre }
          </div>
          ${ cardBtn }
        </section>
        <p class="movie-plot">${ moviePlot }</p>
      </div>
    </article>
    <hr class="card-separator">`
  }).join('\n')

  return html
}

async function displaySearchResults() {
  const searchTerm = searchTermInput.value
  const searchType = searchTypeInput.value
  const searchYear = searchYearInput.value

  // let searchResults
  let searchResultHTML
  if (searchTerm) {
    searchForm.reset()
    searchResults = await fetchSearchResults(searchTerm, searchType, searchYear)
    searchResultHTML = generateResultHTML(searchResults)
  } else {
    searchResultHTML =
      `<div class="container no-data-state">
        <p>Unable to find what you’re looking for. Please try another search.</p>
      </div>`
  }

  dataContainer.innerHTML = searchResultHTML
}
searchSubmitBtn.addEventListener('click', e => {
  e.preventDefault()
  displaySearchResults()
  dataContainer.scrollIntoView()
})

// store movie data into localstorage
function addMovieToWatchlist(btn) {
  const movieId = btn.dataset.movieId
  const movieObj = searchResults.find(movieEntry => movieEntry.imdbID === movieId)

  let watchList = JSON.parse(localStorage.getItem('watchlist')) || []

  // avoid saving duplicates in the watchlist
  const duplicate = watchList.find(movieEntry => movieEntry.imdbID === movieObj.imdbID)
  if (!duplicate) {
    watchList.push(movieObj)
    localStorage.setItem('watchlist', JSON.stringify(watchList))
  }
}

// show the full plot of the movie
function expandPlotText(btnEl) {
  const movieId = btnEl.dataset.movieId
  const moviePlot = searchResults.find(movieObj => movieObj.imdbID === movieId).Plot
  
  const plotContainer = btnEl.parentElement
  plotContainer.innerText = moviePlot
}

dataContainer.addEventListener('click', e => {
  if (e.target.closest('.add-movie-btn')) {
    const btn = e.target.closest('.add-movie-btn')
    addMovieToWatchlist(btn)

    btn.disabled = true
    btn.innerHTML = `<i class="fa-solid fa-square-check fa-xl"></i> In watchlist`
  } else if (e.target.classList.contains('expand-plot-btn')) {
    expandPlotText(e.target)
  }
})