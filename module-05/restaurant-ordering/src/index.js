import './styles.css'
import menuData from '/assets/data/data.json'

function displayMenu() {
  const menuContainer = document.querySelector('.menu')
  menuContainer.innerHTML = menuData.map(menuItem => {
    const { name, ingredients, id, price, emoji } = menuItem

    return `<div class="menu-item black-border">
              <p class="no-margin item-graphic black-border">${emoji}</p>
              <div class="menu-item-info">
                <h3 class="item-name no-margin black-border">${name}</h3>
                <p class="item-ingredients no-margin black-border">${ingredients.join(", ")}</p>
                <p class="item-price no-margin black-border">$${price}</p>
              </div>
              <div class="order-btns">
                <i class="round-btn add-btn fa-solid fa-plus fa-lg" data-item-id="${id}"></i>
                <i class="round-btn remove-btn fa-solid fa-minus fa-lg" data-item-id="${id}"></i>
              </div>
            </div>`
  }).join('\n')
}


function addToOrder(itemId) {
  const orderObj = localStorage.getItem('order') ? JSON.parse(localStorage.getItem('order')) : {}
  orderObj[itemId] = orderObj[itemId] ? orderObj[itemId] + 1 : 1
  localStorage.setItem('order', JSON.stringify(orderObj))
}

function removeFromOrder(itemId) {
  const orderObj = localStorage.getItem('order') ? JSON.parse(localStorage.getItem('order')) : {}
  orderObj[itemId] = orderObj[itemId] ? orderObj[itemId] - 1 : 0

  if (orderObj[itemId] <= 0) {
    delete orderObj[itemId]
  }

  localStorage.setItem('order', JSON.stringify(orderObj))
}

function deleteFromOrder(itemId) {
  const orderObj = localStorage.getItem('order') ? JSON.parse(localStorage.getItem('order')) : {}
  delete orderObj[itemId]
  localStorage.setItem('order', JSON.stringify(orderObj))
}

function displayOrder() {
  const orderObj = JSON.parse(localStorage.getItem('order'))
  
  if (Object.keys(orderObj).length > 0) {
    document.querySelector('.order').style.display = 'flex'

    document.querySelector('.order-items').innerHTML = '';

    let orderSummaryHTML = ''

    let totalOrderPrice = 0;

    for (const [itemId, orderCount] of Object.entries(orderObj)) {
      const item = menuData.find(item => item.id == itemId)
      const itemOrderPrice = item.price * orderCount

      totalOrderPrice += itemOrderPrice

      orderSummaryHTML += `<div class="order-item">
                            <p class="no-margin order-item-name">${item.name} <span class="order-item-count">(x${orderCount})</span></p>
                            <button class="no-padding delete-btn" type="button">remove</button>
                            <p class="no-margin order-item-price">$${itemOrderPrice}</p>
                          </div>\n`
    }

    orderSummaryHTML += '<hr>\n'

    orderSummaryHTML += `<div class="order-item">
                          <p class="no-margin order-item-name">Total Price:</p>
                          <p class="no-margin order-item-price">$${totalOrderPrice}</p>
                        </div>`
    
    document.querySelector('.order-items').innerHTML = orderSummaryHTML
  } else {
    document.querySelector('.order').style.display = 'none'
  }
}

// handle click events on the app container
document.querySelector('.app-container').addEventListener('click', (e) => {
  if (e.target.classList.contains('add-btn')) {
    addToOrder(e.target.dataset.itemId)
    displayOrder()
  } else if (e.target.classList.contains('remove-btn')) {
    removeFromOrder(e.target.dataset.itemId)
    displayOrder()
  } else if (e.target.classList.contains('delete-btn')) {
    deleteFromOrder(e.target.dataset.itemId)
    displayOrder();
  }
})

displayMenu()
displayOrder()