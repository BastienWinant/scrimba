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
              <div class="order-btns">
                <i class="round-btn add-btn fa-solid fa-plus fa-lg" data-item-id="${id}"></i>
                <i class="round-btn add-btn fa-solid fa-minus fa-lg" data-item-id="${id}"></i>
              </div>
            </div>`
  }).join('\n')
}

function updateOrder(itemId) {
  // TODO: retrieve order from localStorage or create new object

  const menuItem = menuData.find(item => item.id == itemId)
  menuItem.orderCount = menuItem.orderCount ? menuItem.orderCount + 1 : 1

  // TODO: store order in localstorage
}

function displayOrder() {
  // TODO: retrieve order from localStorage

  const orderContainer = document.querySelector('.order-items')
  orderContainer.innerHTML = menuData.map(menuItem => {
    const { name, price, id, orderCount } = menuItem
    if (orderCount > 0) {
      return `<div class="order-entry black-border">
                <p class="item-name no-margin">${name}</p>
                <p class="remove-btn no-margin">remove</p>
                <p class="item-price no-margin">$${price}</p>
              </div>`
    }
  }).join('\n')

}

document.querySelector('.menu').addEventListener('click', (e) => {
  if (e.target.classList.contains('add-btn')) {
    updateOrder(e.target.dataset.itemId)
    displayMenu()
    displayOrder()
  }
})

displayMenu()