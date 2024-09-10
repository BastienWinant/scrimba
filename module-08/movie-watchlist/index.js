const searchTermInput = document.querySelector('#search-term')
const resultTypeInput = document.querySelector('#result-type')
const searchSubmitBtn = document.querySelector('#search-submit-btn')

async function omdbApiRequest(term, type) {
  const baseUrl = 'http://www.omdbapi.com'
  const apiKey = 'dc03cb5c'

  const requestUrl = `${baseUrl}/?apikey=${apiKey}&s=${term}&type=${type}`

  const response = await fetch(requestUrl)
  const data = await response.json()
  console.log(data)
}
async function displaySearchResults(e) {
  e.preventDefault()

  const searchTerm = searchTermInput.value
  const resultType = resultTypeInput.value

  omdbApiRequest(searchTerm, resultType)
}
searchSubmitBtn.addEventListener('click', displaySearchResults)