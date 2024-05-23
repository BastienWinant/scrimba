import './styles.css'
import menuData from '/assets/data/data.json'

function displayMenu() {
  const menuContainer = document.querySelector('.menu')
  menuContainer.innerHTML = menuData.map(menuItem => {
    const { name, ingredients, id, price, emoji } = menuItem

    return `<div class="menu-item">
              <p class="no-margin item-graphic">${emoji}</p>
              <div class="menu-item-info">
                <h3 class="item-name no-margin">${name}</h3>
                <p class="item-ingredients no-margin">${ingredients.join(", ")}</p>
                <p class="item-price no-margin">$${price}</p>
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

// display order totals at the bottom of the screen
function displayOrderSummary() {
  // clear the container HTML
  const orderStatusDiv = document.querySelector('.order-status')
  orderStatusDiv.innerHTML = ''

  // retrieve the order object from local storage
  const orderObj = localStorage.getItem('order') ? JSON.parse(localStorage.getItem('order')) : {}

  orderStatusDiv.innerHTML += `<h2 class="no-margin order-status-title">Your order</h2>\n`

  let totalOrderPrice = 0

  const emptyOrder = Object.keys(orderObj).length === 0
  const orderBtnStatus = emptyOrder ? ' disabled' : ''

  if (emptyOrder) {
    // display the message if the order is empty
    const orderStatusMessage = document.createElement('p')
    orderStatusMessage.classList.add('no-margin', 'empty-order-message')
    orderStatusMessage.textContent = 'Your cart is empty'

    orderStatusDiv.appendChild(orderStatusMessage)
  } else {
    // list all order items with quantity and price
    const orderList = document.createElement('ul')
    orderList.classList.add('order-items-list', 'no-margin', 'no-padding')
    for (const [itemId, orderCount] of Object.entries(orderObj)) {
      const itemObj = menuData.find(item => item.id == itemId)
      const orderItem = document.createElement('li')
      orderItem.classList.add('order-item')

      const itemOrderPrice = orderCount * itemObj.price
      totalOrderPrice += itemOrderPrice

      orderItem.innerHTML = `<h3 class="item-name no-margin">${itemObj.name} <span class="order-item-count">(x${orderCount})</span></h3>\n`
      orderItem.innerHTML += `<button class="no-padding delete-btn" data-item-id="${itemObj.id}">remove</button>`
      orderItem.innerHTML += `<p class="no-margin order-item-price no-padding">$${itemOrderPrice}</p>`

      orderList.appendChild(orderItem)
    }

    orderStatusDiv.appendChild(orderList)
  }

  // display the total order price and checkout button
  orderStatusDiv.innerHTML += `<hr>\n
                                <div class="order-item">
                                  <h3 class="item-name no-margin">Total price:</h3>
                                  <p class="no-margin order-item-price no-padding">$${totalOrderPrice}</p>
                                </div>
                                <button class="full-width-btn order-btn"${orderBtnStatus}>Complete order</button>`
}
function displayOrderConfirmation() {
  const orderStatusDiv = document.querySelector('.order-status')
}

function closeModal() {
  // clear all input fields
  document.querySelector('#name').value = ''
  document.querySelector('#card').value = ''
  document.querySelector('#cvv').value = ''

  // close the modal
  document.querySelector('.dialog-modal').close()
}

// handle click events on the app container
document.querySelector('.app-container').addEventListener('click', (e) => {
  if (e.target.classList.contains('add-btn')) {
    // add a unit of the selected item to the order
    addToOrder(e.target.dataset.itemId)
    displayOrderSummary()
  } else if (e.target.classList.contains('remove-btn')) {
    // remove a unit of the selected item to the order
    removeFromOrder(e.target.dataset.itemId)
    displayOrderSummary()
  } else if (e.target.classList.contains('delete-btn')) {
    // remove the selected item from the order
    deleteFromOrder(e.target.dataset.itemId)
    displayOrderSummary()
  } else if (e.target.classList.contains('order-btn')) {
    // show the checkout modal
    document.querySelector('.dialog-modal').showModal()
  } else if (e.target.classList.contains('modal-close-btn')) {
    // close the checkout modal
    closeModal()
  } else if (e.target.classList.contains('modal-form-btn')) {
    e.preventDefault()
    
    // TODO: handle form submission
  }
})


document.addEventListener('DOMContentLoaded', () => {
  displayMenu()
  displayOrderSummary()
})