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
          ? `<button class="add-movie-btn" data-movie-id="${ movieObj.imdbID }" disabled>
              <i class="fa-solid fa-square-check fa-xl"></i>
              In watchlist
            </button>`
          : `<button class="add-movie-btn" data-movie-id="${ movieObj.imdbID }">
            <i class="fa-solid fa-circle-plus fa-xl"></i>
            Watchlist
          </button>`
        

    const moviePlot = movieObj.Plot === 'N/A'
          ? ''
          : `<p class="movie-plot">${movieObj.Plot}</p>`

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
        ${ moviePlot }
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
    // searchResults = await fetchSearchResults(searchTerm, searchType, searchYear)
    searchResults = testData
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

dataContainer.addEventListener('click', e => {
  if (e.target.closest('.add-movie-btn')) {
    const btn = e.target.closest('.add-movie-btn')
    addMovieToWatchlist(btn)

    btn.disabled = true
    btn.innerHTML = `<i class="fa-solid fa-square-check fa-xl"></i> In watchlist`
  }
})

const testData = [
  {
      "Title": "The Equalizer",
      "Year": "2014",
      "Rated": "R",
      "Released": "26 Sep 2014",
      "Runtime": "132 min",
      "Genre": "Action, Crime, Thriller",
      "Director": "Antoine Fuqua",
      "Writer": "Richard Wenk, Michael Sloan, Richard Lindheim",
      "Actors": "Denzel Washington, Marton Csokas, Chloë Grace Moretz",
      "Plot": "A man who believes he has put his mysterious past behind him cannot stand idly by when he meets a young girl under the control of ultra-violent Russian gangsters.",
      "Language": "English, Russian, Spanish, German, Ukrainian",
      "Country": "United States",
      "Awards": "1 win & 9 nominations",
      "Poster": "https://m.media-amazon.com/images/M/MV5BMTQ2MzE2NTk0NF5BMl5BanBnXkFtZTgwOTM3NTk1MjE@._V1_SX300.jpg",
      "Ratings": [
          {
              "Source": "Internet Movie Database",
              "Value": "7.2/10"
          },
          {
              "Source": "Rotten Tomatoes",
              "Value": "61%"
          },
          {
              "Source": "Metacritic",
              "Value": "57/100"
          }
      ],
      "Metascore": "57",
      "imdbRating": "7.2",
      "imdbVotes": "429,079",
      "imdbID": "tt0455944",
      "Type": "movie",
      "DVD": "N/A",
      "BoxOffice": "$101,530,738",
      "Production": "N/A",
      "Website": "N/A",
      "Response": "True"
  },
  {
      "Title": "The Equalizer 2",
      "Year": "2018",
      "Rated": "R",
      "Released": "20 Jul 2018",
      "Runtime": "121 min",
      "Genre": "Action, Crime, Thriller",
      "Director": "Antoine Fuqua",
      "Writer": "Richard Wenk, Michael Sloan, Richard Lindheim",
      "Actors": "Denzel Washington, Pedro Pascal, Ashton Sanders",
      "Plot": "Robert McCall serves an unflinching justice for the exploited and oppressed, but how far will he go when that is someone he loves?",
      "Language": "English, French, Turkish, Hebrew, Arabic, Spanish",
      "Country": "United States",
      "Awards": "1 win & 4 nominations",
      "Poster": "https://m.media-amazon.com/images/M/MV5BMTU2OTYzODQyMF5BMl5BanBnXkFtZTgwNjU3Njk5NTM@._V1_SX300.jpg",
      "Ratings": [
          {
              "Source": "Internet Movie Database",
              "Value": "6.7/10"
          },
          {
              "Source": "Rotten Tomatoes",
              "Value": "52%"
          },
          {
              "Source": "Metacritic",
              "Value": "50/100"
          }
      ],
      "Metascore": "50",
      "imdbRating": "6.7",
      "imdbVotes": "203,772",
      "imdbID": "tt3766354",
      "Type": "movie",
      "DVD": "N/A",
      "BoxOffice": "$102,084,362",
      "Production": "N/A",
      "Website": "N/A",
      "Response": "True"
  },
  {
      "Title": "The Equalizer 3",
      "Year": "2023",
      "Rated": "R",
      "Released": "01 Sep 2023",
      "Runtime": "109 min",
      "Genre": "Action, Crime, Thriller",
      "Director": "Antoine Fuqua",
      "Writer": "Richard Wenk, Michael Sloan, Richard Lindheim",
      "Actors": "Denzel Washington, Dakota Fanning, Eugenio Mastrandrea",
      "Plot": "Robert McCall finds himself at home in Southern Italy but he discovers his friends are under the control of local crime bosses. As events turn deadly, McCall knows what he has to do: become his friends' protector by taking on the ...",
      "Language": "English, Italian",
      "Country": "United States, Italy",
      "Awards": "6 nominations",
      "Poster": "https://m.media-amazon.com/images/M/MV5BYjZjYTllOWItYjUxMC00NTA0LWI1ZjItNjE5YjVhZjRmYmYwXkEyXkFqcGdeQXVyMTcwOTQzOTYy._V1_SX300.jpg",
      "Ratings": [
          {
              "Source": "Internet Movie Database",
              "Value": "6.8/10"
          },
          {
              "Source": "Rotten Tomatoes",
              "Value": "76%"
          }
      ],
      "Metascore": "N/A",
      "imdbRating": "6.8",
      "imdbVotes": "127,721",
      "imdbID": "tt17024450",
      "Type": "movie",
      "DVD": "N/A",
      "BoxOffice": "$92,373,751",
      "Production": "N/A",
      "Website": "N/A",
      "Response": "True"
  },
  {
      "Title": "The Equalizer",
      "Year": "2021–",
      "Rated": "TV-14",
      "Released": "07 Feb 2021",
      "Runtime": "N/A",
      "Genre": "Action, Crime, Drama",
      "Director": "N/A",
      "Writer": "Andrew W. Marlowe, Terri Edda Miller",
      "Actors": "Queen Latifah, Tory Kittles, Adam Goldberg",
      "Plot": "An enigmatic figure uses her extensive skills to help those with nowhere else to turn.",
      "Language": "English",
      "Country": "United States",
      "Awards": "2 wins & 16 nominations",
      "Poster": "https://m.media-amazon.com/images/M/MV5BYmY3MTgwYWUtMTc2NC00ZDdmLWIyNDAtOGJkNTQyZjM0NDA5XkEyXkFqcGdeQXVyMTEyMjM2NDc2._V1_SX300.jpg",
      "Ratings": [
          {
              "Source": "Internet Movie Database",
              "Value": "5.5/10"
          }
      ],
      "Metascore": "N/A",
      "imdbRating": "5.5",
      "imdbVotes": "17,365",
      "imdbID": "tt11242246",
      "Type": "series",
      "totalSeasons": "4",
      "Response": "True"
  },
  {
      "Title": "The Equalizer",
      "Year": "1985–1989",
      "Rated": "TV-PG",
      "Released": "18 Sep 1985",
      "Runtime": "48 min",
      "Genre": "Action, Crime, Drama",
      "Director": "N/A",
      "Writer": "Richard Lindheim, Michael Sloan",
      "Actors": "Edward Woodward, Keith Szarabajka, Robert Lansing",
      "Plot": "A retired Intelligence Agent turned private detective helps various threatened clients to equalize the odds.",
      "Language": "English",
      "Country": "United States",
      "Awards": "Nominated for 7 Primetime Emmys. 2 wins & 11 nominations total",
      "Poster": "https://m.media-amazon.com/images/M/MV5BMjAzMzAyODMxMF5BMl5BanBnXkFtZTcwNjcyMjE2MQ@@._V1_SX300.jpg",
      "Ratings": [
          {
              "Source": "Internet Movie Database",
              "Value": "7.8/10"
          }
      ],
      "Metascore": "N/A",
      "imdbRating": "7.8",
      "imdbVotes": "6,031",
      "imdbID": "tt0088513",
      "Type": "series",
      "totalSeasons": "4",
      "Response": "True"
  },
  {
      "Title": "Equalizer 2000",
      "Year": "1987",
      "Rated": "R",
      "Released": "04 Jan 1988",
      "Runtime": "85 min",
      "Genre": "Action, Adventure, Sci-Fi",
      "Director": "Cirio H. Santiago",
      "Writer": "Joe Mari Avellana, Frederick Bailey",
      "Actors": "Richard Norton, Corinne Wahl, William Steis",
      "Plot": "A ruthless vehicular gang rules the post-apocalyptic wasteland. That's until a muscled hero named Slade builds the ultimate machine gun - Equalizer 2000, and declares a one man war on the gang's \"piece of garbage\" leader.",
      "Language": "English",
      "Country": "United States, Philippines",
      "Awards": "N/A",
      "Poster": "https://m.media-amazon.com/images/M/MV5BNzllZGY2MjAtMTZhNy00Mzk1LWJkNzQtNmJmZDA4OGQ1N2M3XkEyXkFqcGdeQXVyMTQ2MjQyNDc@._V1_SX300.jpg",
      "Ratings": [
          {
              "Source": "Internet Movie Database",
              "Value": "4.1/10"
          }
      ],
      "Metascore": "N/A",
      "imdbRating": "4.1",
      "imdbVotes": "715",
      "imdbID": "tt0091012",
      "Type": "movie",
      "DVD": "21 Jun 2018",
      "BoxOffice": "N/A",
      "Production": "N/A",
      "Website": "N/A",
      "Response": "True"
  },
  {
      "Title": "The Equalizer",
      "Year": "2016",
      "Rated": "N/A",
      "Released": "21 Jul 2016",
      "Runtime": "N/A",
      "Genre": "Documentary, Sport",
      "Director": "Rebecca Snow",
      "Writer": "Allen Booth",
      "Actors": "Maria Vasallo",
      "Plot": "What if the greatest high-performance athletes - present and past - could compete against each other on a level playing field?",
      "Language": "English, German",
      "Country": "Canada",
      "Awards": "N/A",
      "Poster": "https://m.media-amazon.com/images/M/MV5BYzNkNmE1MGEtZjc2MS00ODlmLTkyNDUtYjBjYmRmOTQ0N2UwXkEyXkFqcGdeQXVyMjUwNDY0MzY@._V1_SX300.jpg",
      "Ratings": [
          {
              "Source": "Internet Movie Database",
              "Value": "6.4/10"
          }
      ],
      "Metascore": "N/A",
      "imdbRating": "6.4",
      "imdbVotes": "20",
      "imdbID": "tt4648652",
      "Type": "movie",
      "DVD": "N/A",
      "BoxOffice": "N/A",
      "Production": "N/A",
      "Website": "N/A",
      "Response": "True"
  },
  {
      "Title": "The Equalizer 2 Special",
      "Year": "2018",
      "Rated": "N/A",
      "Released": "14 Aug 2018",
      "Runtime": "60 min",
      "Genre": "Documentary",
      "Director": "Dan Storey",
      "Writer": "Tim Postins, Dan Storey, Alex Zane",
      "Actors": "Liz Bernstrom, Todd Black, Sean Devereaux",
      "Plot": "N/A",
      "Language": "English",
      "Country": "United Kingdom",
      "Awards": "N/A",
      "Poster": "N/A",
      "Ratings": [
          {
              "Source": "Internet Movie Database",
              "Value": "7.4/10"
          }
      ],
      "Metascore": "N/A",
      "imdbRating": "7.4",
      "imdbVotes": "10",
      "imdbID": "tt8814938",
      "Type": "movie",
      "DVD": "N/A",
      "BoxOffice": "N/A",
      "Production": "N/A",
      "Website": "N/A",
      "Response": "True"
  },
  {
      "Title": "The Equalizer: Children of the Night",
      "Year": "2014",
      "Rated": "N/A",
      "Released": "30 Dec 2014",
      "Runtime": "5 min",
      "Genre": "Short",
      "Director": "N/A",
      "Writer": "N/A",
      "Actors": "Todd Black, Jason Blumenthal, Antoine Fuqua, Chloë Grace Moretz",
      "Plot": "This short features Blumenthal, Black, Fuqua, Moretz, Washington and Wenk. We learn about Moretz's role and performance as well as info about teen prostitutes.",
      "Language": "English",
      "Country": "USA",
      "Awards": "N/A",
      "Poster": "N/A",
      "Ratings": [
          {
              "Source": "Internet Movie Database",
              "Value": "7.6/10"
          }
      ],
      "Metascore": "N/A",
      "imdbRating": "7.6",
      "imdbVotes": "5",
      "imdbID": "tt5258176",
      "Type": "movie",
      "DVD": "N/A",
      "BoxOffice": "N/A",
      "Production": "N/A",
      "Website": "N/A",
      "Response": "True"
  },
  {
      "Title": "The Equalizer: One Man Army - Training and Fighting",
      "Year": "2014",
      "Rated": "N/A",
      "Released": "30 Dec 2014",
      "Runtime": "7 min",
      "Genre": "Short",
      "Director": "N/A",
      "Writer": "N/A",
      "Actors": "Jason Blumenthal, Antoine Fuqua, Denzel Washington, Richard Wenk",
      "Plot": "This short offers material from Blumenthal, Fuqua, Washington, Wenk, and stunt coordinator Keith Woulard. \"Army\" tells us about the movie's action and fight material.",
      "Language": "English",
      "Country": "USA",
      "Awards": "N/A",
      "Poster": "N/A",
      "Ratings": [],
      "Metascore": "N/A",
      "imdbRating": "N/A",
      "imdbVotes": "N/A",
      "imdbID": "tt5258178",
      "Type": "movie",
      "DVD": "N/A",
      "BoxOffice": "N/A",
      "Production": "N/A",
      "Website": "N/A",
      "Response": "True"
  }
]