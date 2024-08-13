let colorsArr = []

document.querySelector('#form').addEventListener('submit', e => {
  e.preventDefault()
  const hex = document.querySelector('#color').value.slice(1,)
  const mode = document.querySelector('#mode').value
  const format = document.querySelector('#format').value
  const count = document.querySelector('#count').value

  colorsArr = fetchColorScheme(hex, mode, count, format)
})


function fetchColorScheme(hex, mode, count, format) {
  const baseUrl = "https://www.thecolorapi.com"
  const endpoint = "scheme"

  const fullUrl = `${baseUrl}/${endpoint}?hex=${hex}&mode=${mode}&count=${count}`

  fetch(fullUrl, { method: 'GET'})
    .then(response => response.json())
    .then(data => {
      const colorsArray = data.colors.map(color => color[format].value)
      console.log(colorsArray)
    })
}