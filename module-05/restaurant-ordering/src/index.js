import './styles.css'
import validator from 'validator'
import menuArray from 'Data/menuData.json'

function displayMenu() {  
  document.querySelector('.menu').insertAdjacentHTML(
    "beforeend",
    menuArray.map(menuItem =>
                  `<div class="menu-item border-box">
                    <p class="item-graphic no-margin black-border">${menuItem.emoji}</p>
                    <div class="item-details black-border">
                      <h3 class="item-name no-margin light-font">${menuItem.name}</h3>
                      <p class="item-ingredients no-margin">${menuItem.ingredients.join(', ')}</p>
                      <p class="item-price no-margin">$${menuItem.price}</p>
                    </div>
                    <div class="item-order-btns black-border">
                      <i class="fa-solid fa-plus round-btn add-btn border-box" data-item-id="${menuItem.id}"></i>
                      <i class="fa-solid fa-minus round-btn delete-btn border-box" data-item-id="${menuItem.id}"></i>
                    </div>
                  </div>`).join('\n')
  )
}

function getCurrentOrder() {
  return JSON.parse(localStorage.getItem('order')) || {}
}

function saveCurrentOrder(orderObj) {
  localStorage.setItem('order', JSON.stringify(orderObj))
}

// handle & dispatch click events
document.querySelector('.app-container').addEventListener('click', (e) => {
  if (e.target.classList.contains('add-btn')) {
    addToOrder(e.target.dataset.itemId)
    displayOrderSummary()
  } else if (e.target.classList.contains('delete-btn')) {
    deleteFromOrder(e.target.dataset.itemId)
    displayOrderSummary()
  } else if (e.target.classList.contains('remove-btn')) {
    removeFromOrder(e.target.dataset.itemId)
    displayOrderSummary()
  } else if (e.target.classList.contains('order-btn')) {
    document.querySelector('.modal-dialog').showModal()
  } else if (e.target.classList.contains('pay-btn')) {
    e.preventDefault()
    removeFormErrors()
    const validInputs = verifyFormInputs()

    if (validInputs) {
      clearFormInputs()
      document.querySelector('.modal-dialog').close()
    }

  } else if (e.target.classList.contains('close-btn')) {
    removeFormErrors()
    clearFormInputs()
    document.querySelector('.modal-dialog').close()
  }
})

// add a unit of the item to the order
function addToOrder(itemId) {
  const orderObj = getCurrentOrder()
  orderObj[itemId] = orderObj[itemId] ? orderObj[itemId] + 1 : 1
  saveCurrentOrder(orderObj)
}

// delete a unit of the item from the order
function deleteFromOrder(itemId) {
  const orderObj = getCurrentOrder()
  
  if (orderObj.hasOwnProperty(itemId)) {
    orderObj[itemId] -= 1
    
    if (orderObj[itemId] <= 0) {
      delete orderObj[itemId]
    }
  }
  
  saveCurrentOrder(orderObj)
}

// remove the item from the order
function removeFromOrder(itemId) {
  const orderObj = getCurrentOrder()
  delete orderObj[itemId]
  saveCurrentOrder(orderObj)
}

function displayOrderSummary() {
  const orderObj = getCurrentOrder()
  
  // clear the HTML currently in the container
  const orderSummary = document.querySelector('.order-items')
  orderSummary.innerHTML = ''
    
  let totalOrderPrice = 0
  
  if (Object.keys(orderObj).length === 0) {
    orderSummary.innerHTML =
      `<p class="empty-order-message no-margin">Your cart is empty.</p>`
    
    // disable the order button if the cart is empty
    document.querySelector('.order-btn').disabled = true
  } else {
    for (const [itemId, quantity] of Object.entries(orderObj)) {
      const itemObj = menuArray.find(item => item.id == itemId)
      const itemOrderPrice = itemObj.price * quantity
      totalOrderPrice += itemOrderPrice
      
      orderSummary.innerHTML +=
        `<div class="order-item">
          <h3 class="item-name no-margin light-font">${itemObj.name} <span class="item-quantity">(x${quantity})</span></h3>
          <button class="remove-btn no-padding black-border" data-item-id="${itemId}">remove</button>
          <p class="item-price align-right no-margin black-border">$${itemOrderPrice}</p>
        </div>`
    }
    
    document.querySelector('.order-btn').disabled = false
  }
  
  // compute and display the total order price
  document.querySelector('.order-total').innerHTML =
    `<div class="order-item">
      <h3 class="item-name no-margin light-font">Total price:</h3>
      <p class="item-price align-right no-margin black-border">$${totalOrderPrice}</p>
    </div>`
}

function clearFormInputs() {
  document.querySelector("#name").value = ''
  document.querySelector("#card").value = ''
  document.querySelector("#cvv").value = ''
}

function verifyFormInputs() {
  const name = document.querySelector("#name").value
  const card = document.querySelector("#card").value
  const cvv = document.querySelector("#cvv").value

  let validInputs = true

  if (!validator.isAlpha(name) || name.length === 0) {
    addInputError(document.querySelector("#name"))
    validInputs = false
  }

  if (!validator.isCreditCard(card) || card.length === 0) {
    addInputError(document.querySelector("#card"))
    validInputs = false
  }

  if (!validator.isNumeric(cvv) || cvv.length !== 3) {
    addInputError(document.querySelector("#cvv"))
    validInputs = false
  }
  
  return validInputs
}

function addInputError(inputEl) {
  inputEl.classList.add('input-error')

  const errorMessage = document.createElement('p')
  errorMessage.classList.add('input-error-message', 'no-margin')
  errorMessage.innerText = 'Please provide a valid input in the field above.'

  inputEl.insertAdjacentElement('afterend', errorMessage)
}

function removeFormErrors() {
  const formInputs = document.querySelectorAll('.form-input')
  formInputs.forEach(input => {
    input.classList.remove('input-error')
  })

  const inputErrorMessages = document.querySelectorAll('.input-error-message')
  inputErrorMessages.forEach(errorMessage => {
    errorMessage.remove()
  })
}

document.addEventListener('DOMContentLoaded', () => {
  displayMenu()
  displayOrderSummary()
})