let colorsArr = []

document.querySelector('#form').addEventListener('submit', e => {
  e.preventDefault()
  colorsArr = generateColorScheme()
})

function colorElement(colorObj, format) {
  const liEl = document.createElement('li')
  liEl.classList.add('color', 'black-border')

  const btnEl = document.createElement('button')
  btnEl.classList.add('color-btn')
  btnEl.type = 'button'
  btnEl.style.backgroundColor = colorObj.hex.value
  btnEl.style.color = colorObj.contrast.value === '#000000' ? '#222' : '#BBB'
  liEl.appendChild(btnEl)

  btnEl.innerHTML = `<div class="color-btn-inner">
    <h2 class="color-name">${colorObj.name.value}</h2>
    <p class="color-value">${colorObj[format].value}</p>
  </div>`

  return liEl;
}

function generateColorScheme() {
  const hex = document.querySelector('#color').value.slice(1,)
  const mode = document.querySelector('#mode').value
  const count = document.querySelector('#count').value
  const format = "rgb"

  const baseUrl = "https://www.thecolorapi.com"
  const endpoint = "scheme"
  const fullUrl = `${baseUrl}/${endpoint}?hex=${hex}&mode=${mode}&count=${count}`

  fetch(fullUrl, { method: 'GET'})
    .then(response => response.json())
    .then(data => {
      console.log(data)
      const colorsList = document.querySelector('#colors-list')
      colorsList.innerHTML = ''
      
      const colorEls = data.colors.map(color => colorElement(color, format))
      colorsList.append(...colorEls)
    })
}