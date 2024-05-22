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

// increase the order count for the given item id
function addToOrder(itemId) {
  const orderObj = localStorage.getItem('order') ? JSON.parse(localStorage.getItem('order')) : {}
  orderObj[itemId] = orderObj[itemId] ? orderObj[itemId] + 1 : 1
  localStorage.setItem('order', JSON.stringify(orderObj))
}

// decrease the order count for the given item id
function removeFromOrder(itemId) {
  const orderObj = localStorage.getItem('order') ? JSON.parse(localStorage.getItem('order')) : {}
  orderObj[itemId] = orderObj[itemId] ? orderObj[itemId] - 1 : 0

  // remove the item from the object if the count hits 0
  if (orderObj[itemId] <= 0) {
    delete orderObj[itemId]
  }
  
  localStorage.setItem('order', JSON.stringify(orderObj))
}

// remove the item from the order
function deleteFromOrder(itemId) {
  const orderObj = localStorage.getItem('order') ? JSON.parse(localStorage.getItem('order')) : {}
  delete orderObj[itemId]
  localStorage.setItem('order', JSON.stringify(orderObj))
}

function displayOrder() {
  const orderObj = JSON.parse(localStorage.getItem('order'))
  
  if (orderObj !== null && Object.keys(orderObj).length > 0) {
    // display the order summary at the bottom of the page
    document.querySelector('.order').style.display = 'flex'

    let orderSummaryHTML = ''
    let totalOrderPrice = 0

    for (const [itemId, orderCount] of Object.entries(orderObj)) {
      const item = menuData.find(item => item.id == itemId)
      const itemOrderPrice = item.price * orderCount

      totalOrderPrice += itemOrderPrice

      orderSummaryHTML += `<div class="order-item">
                            <p class="no-margin order-item-name">${item.name} <span class="order-item-count">(x${orderCount})</span></p>
                            <button class="no-padding delete-btn" type="button" data-item-id="${itemId}">remove</button>
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
    // hide the order summary at the bottom of the page
    document.querySelector('.order').style.display = 'none'
  }
}

// handle click events on the app container
document.querySelector('.app-container').addEventListener('click', (e) => {
  if (e.target.classList.contains('add-btn')) {
    // add a unit of the selected item to the order
    addToOrder(e.target.dataset.itemId)
    displayOrder()
  } else if (e.target.classList.contains('remove-btn')) {
    // remove a unit of the selected item to the order
    removeFromOrder(e.target.dataset.itemId)
    displayOrder()
  } else if (e.target.classList.contains('delete-btn')) {
    // remove the selected item from the order
    deleteFromOrder(e.target.dataset.itemId)
    displayOrder()
  } else if (e.target.classList.contains('order-btn')) {
    // show the checkout modal
    document.querySelector('.modal').style.display = 'flex'
  } else if (e.target.classList.contains('modal-close-btn')) {
    // close the checkout modal
    document.querySelector('.modal').style.display = 'none'
  } else if (e.target.classList.contains('modal-form-btn')) {
    e.preventDefault()
    // close the modal
    document.querySelector('.modal').style.display = 'none'
    localStorage.removeItem('order')
    displayOrder()
  }
})


document.addEventListener('DOMContentLoaded', () => {
  displayMenu()
  displayOrder()
})