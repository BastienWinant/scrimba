// javascript
const colorModeBtn = document.querySelector('#color-mode-btn')
const colorModeSwitch = document.querySelector('#color-mode-switch')

const titleInput = document.querySelector('#search-title')
const typeInput = document.querySelector('#search-type')
const yearInput = document.querySelector('#search-year')
const searchBtn = document.querySelector('#search-btn')

const dataContainer = document.querySelector('#data-container')

function setPageColors() {
    const colorMode = localStorage.getItem('color-mode') || colorModeBtn.dataset.colorMode
    colorModeBtn.dataset.colorMode = colorMode
    
    const r = document.querySelector(':root')
    
    if (colorMode === 'light') {
        colorModeSwitch.classList.remove('switched')
        
        r.style.setProperty('--main-bg', '#FFFFFF')
        r.style.setProperty('--main-text-low', '#787878')
        r.style.setProperty('--main-text-high', '#363636')
        
        r.style.setProperty('--form-bg', '#F9FAFB')
        r.style.setProperty('--input-text', '#6B7280')
        r.style.setProperty('--input-icon', '#9CA3AF')
        r.style.setProperty('--input-bg', '#FFFFFF')
        r.style.setProperty('--input-border', '#D1D5DB')
        r.style.setProperty('--btn-text', '#374151')
        r.style.setProperty('--btn-bg', '#F9FAFB')
        r.style.setProperty('--btn-border', '#D1D5DB')
        
        r.style.setProperty('--card-text-high', '#111827')
        r.style.setProperty('--card-text-low', '#6B7280')
        r.style.setProperty('--card-separator', '#E5E7EB')
    } else {
        colorModeSwitch.classList.add('switched')
        
        r.style.setProperty('--main-bg', '#121212')
        r.style.setProperty('--main-text-low', '#787878')
        r.style.setProperty('--main-text-high', '#FFFFFF')
        
        r.style.setProperty('--form-bg', '#121212')
        r.style.setProperty('--input-text', '#A5A5A5')
        r.style.setProperty('--input-icon', '#9CA3AF')
        r.style.setProperty('--input-bg', '#2E2E2F')
        r.style.setProperty('--input-border', '#2E2E2F')
        r.style.setProperty('--btn-text', '#FFFFFF')
        r.style.setProperty('--btn-bg', '#4B4B4B')
        r.style.setProperty('--btn-border', '#4B4B4B')
        
        r.style.setProperty('--card-text-high', '#FFFFFF')
        r.style.setProperty('--card-text-low', '#A5A5A5')
        r.style.setProperty('--card-separator', '#2C2C2C')
    }
}

setPageColors()

function toggleColorMode() {
    const colorMode = colorModeBtn.dataset.colorMode === 'light'
                                                        ? 'dark'
                                                        : 'light'
    localStorage.setItem('color-mode', colorMode)
    setPageColors()
}
colorModeBtn.addEventListener('click', toggleColorMode)

function generateResultsHtml(movieArr) {
    return movieArr.map(movieObj => {
        const moviePoster = movieObj.Poster === 'N/A'
            ? 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba'
            : movieObj.Poster
        
        const movieRating = movieObj.imdbRating === 'N/A'
            ? ''
            : `<span class="movie-rating">
                    <i class="fa-solid fa-star fa-sm"></i>
                    ${movieObj.imdbRating}
                </span>`
            
        const movieRuntime = movieObj.Runtime === 'N/A'
            ? ''
            : `<span class="movie-runtime">${movieObj.Runtime}</span>`
        
        const movieGenre = movieObj.Genre === 'N/A'
            ? ''
            : `<span class="movie-runtime">${movieObj.Genre}</span>`
        
        const cardBtn = `<button type="button" class="card-btn remove-movie-btn">
                            <i class="fa-solid fa-circle-minus"></i>
                            Remove
                        </button>`
                
        let moviePlot = movieObj.Plot === 'N/A' ? '' : movieObj.Plot
        if (moviePlot.length > 132) {
            moviePlot = moviePlot.slice(0, 120) + `... <button type="button" class="expand-plot-btn">Read more</button>`    
        }
        
        return `
            <article class="card black-border" data-movie-id="${movieObj.imdbID}">
                <img src="${moviePoster}" alt="movie poster" class="card-img" />
                <div class="card-body">
                    <header class="card-header">
                        <h3 class="movie-title">${movieObj.Title}</h3>
                        ${movieRating}
                    </header>
                    <section class="movie-info black-border">
                        <div class="movie-metadata black-border">
                            ${movieRuntime}
                            ${movieGenre}
                        </div>
                        ${cardBtn}
                    </section>
                    <p class="movie-plot">${moviePlot}</p>
                </div>
            </article>
            <hr class="card-separator" />`
    }).join('\n')
}

function filterWatchlist() {
    const title = titleInput.value
    const type = typeInput.value
    const year = yearInput.value
    
    let watchList = JSON.parse(localStorage.getItem('watchlist'))
    
    if (title) {
        watchList = watchList.filter(movieObj => movieObj.Title.toLowerCase().includes(title.toLowerCase()))
    }
    
    if (type) {
        watchList = watchList.filter(movieObj => movieObj.Type === type)
    }
    
    if (year) {
        watchList = watchList.filter(movieObj => movieObj.Year == year)
    }
    
    return watchList
}

function displaySearchResults() {
    const searchResults = filterWatchlist()
    
    let resultsHTML
    if (searchResults.length > 0) {
        resultsHTML = generateResultsHtml(searchResults) 
    } else {
        resultsHTML = `<div class="no-data-state">
                            Unable to find what you’re looking for. Please try another search.
                        </div>`
    }
    
    dataContainer.innerHTML = resultsHTML  
}
searchBtn.addEventListener('click', e => {
    e.preventDefault()
    displaySearchResults()
})
displaySearchResults()

function expandMoviePlot(e) {
    // retrieve the movie object from the global variable
    const movieCard = e.target.closest('.card')
    const movieId = movieCard.dataset.movieId
    const movieObj = searchResults.find(entry => entry.imdbID === movieId)
    
    const moviePlot = movieObj.Plot
    const plotContainer = movieCard.querySelector('.movie-plot')
    
    plotContainer.innerText = moviePlot
}

function removeFromWatchlist(e) {
    // retrieve the movie object from the global variable
    const movieId = e.target.closest('.card').dataset.movieId
    
    let watchList = JSON.parse(localStorage.getItem('watchlist')) || []
    watchList = watchList.filter(movieObj => movieObj.imdbID !== movieId)
    
    localStorage.setItem('watchlist', JSON.stringify(watchList))
    displaySearchResults()
}

dataContainer.addEventListener('click', e => {
    if (e.target.classList.contains('expand-plot-btn')) {
        expandMoviePlot(e)
    } else if (e.target.closest('.remove-movie-btn')) {
        removeFromWatchlist(e)
    }
})