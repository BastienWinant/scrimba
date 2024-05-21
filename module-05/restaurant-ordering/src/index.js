import './styles.css'
import menuData from '/assets/data/data.json'

function displayMenu() {
  const menuContainer = document.querySelector('.menu')
  menuContainer.innerHTML = menuData.map(menuItem => {
    const { name, ingredients, id, price, emoji, orderCount } = menuItem

    return `<div class="menu-item black-border">
              <p class="no-margin item-graphic black-border">${emoji}</p>
              <div class="menu-item-info">
                <h3 class="item-name no-margin black-border">${name}</h3>
                <p class="item-ingredients no-margin black-border">${ingredients.join(", ")}</p>
                <p class="item-price no-margin black-border">$${price}</p>
              </div>
              <i class="add-button fa-solid fa-plus fa-lg" data-item-id="${id}"></i>
            </div>`
  }).join('\n')
}

document.querySelector('.menu').addEventListener('click', (e) => {
  if (e.target.classList.contains('add-button')) {
    console.log(e.target.dataset.itemId)
  }
})

displayMenu()