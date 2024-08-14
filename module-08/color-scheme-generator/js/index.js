document.querySelector('#form').addEventListener('submit', e => {
  e.preventDefault()
  generateColorScheme()
})

function randomizeColor() {
  const randomColor = Math.floor(Math.random()*16777215).toString(16)
  document.querySelector('#color').value = `#${randomColor}`
}

function createColorElement(colorObj, format) {
  const liEl = document.createElement('li')
  liEl.classList.add('color', 'black-border')

  // const btnEl = document.createElement('button')
  // btnEl.classList.add('color-btn')
  // btnEl.type = 'button'
  liEl.style.backgroundColor = colorObj.hex.value
  liEl.style.color = colorObj.contrast.value
  // liEl.appendChild(btnEl)

  // btnEl.innerHTML = `<div class="color-btn-inner">
  //   <h2 class="color-name">${colorObj.name.value}</h2>
  //   <p class="color-value">${colorObj[format].value}</p>
  // </div>`

  return liEl;
}

function generateColorScheme() {
  // gather form input values
  const hex = document.querySelector('#color').value.slice(1,)
  const mode = document.querySelector('#mode').value
  const count = document.querySelector('#count').value
  const format = "rgb"

  // build the url
  const baseUrl = "https://www.thecolorapi.com"
  const endpoint = "scheme"
  const fullUrl = `${baseUrl}/${endpoint}?hex=${hex}&mode=${mode}&count=${count}`

  fetch(fullUrl, { method: 'GET'})
    .then(response => response.json())
    .then(data => {
      console.log(data)
      // clear the container
      const colorsList = document.querySelector('#colors-list')
      colorsList.innerHTML = ''
      
      // create a HTML element for each color in the palette
      const colorEls = data.colors.map(color => createColorElement(color, format))
      colorsList.append(...colorEls)
    })
}

randomizeColor()
generateColorScheme()