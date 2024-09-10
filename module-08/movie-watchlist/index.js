const searchTermInput = document.querySelector('#search-term')
const resultTypeInput = document.querySelector('#result-type')
const searchSubmitBtn = document.querySelector('#search-submit-btn')

async function omdbApiRequest(term, type) {
  const baseUrl = 'http://www.omdbapi.com'
  const apiKey = 'dc03cb5c'

  const requestUrl = `${baseUrl}/?apikey=${apiKey}&s=${term}`
  requestUrl += type ? `&type=${type}` : ''

  const response = await fetch(requestUrl)
  const data = await response.json()
  
  return data
}
async function displaySearchResults(e) {
  e.preventDefault()

  const searchTerm = searchTermInput.value
  const resultType = resultTypeInput.value

  let searchData

  if (!searchTerm) {
    // TODO: show error
  } else {
    searchData = await omdbApiRequest(searchTerm, resultType)
  }

  console.log(searchData)
}
searchSubmitBtn.addEventListener('click', displaySearchResults)