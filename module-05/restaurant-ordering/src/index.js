import './styles.css'
import validator from 'validator'
import menuArray from 'Data/menuData.json'

function displayMenu() {  
  document.querySelector('.menu').insertAdjacentHTML(
    "beforeend",
    menuArray.map(menuItem =>
                  `<div class="menu-item border-box">
                    <p class="item-graphic no-margin">${menuItem.emoji}</p>
                    <div class="item-details">
                      <h3 class="item-name no-margin light-font">${menuItem.name}</h3>
                      <p class="item-ingredients no-margin">${menuItem.ingredients.join(', ')}</p>
                      <p class="item-price no-margin">$${menuItem.price}</p>
                    </div>
                    <div class="item-order-btns">
                      <i class="fa-solid fa-plus round-btn add-btn border-box" data-item-id="${menuItem.id}"></i>
                      <i class="fa-solid fa-minus round-btn delete-btn border-box" data-item-id="${menuItem.id}"></i>
                    </div>
                  </div>`).join('\n')
  )
}

// store, retrieve, and clear the current order from local storage
function getCurrentOrder() {
  return JSON.parse(localStorage.getItem('order')) || {}
}

function saveCurrentOrder(orderObj) {
  localStorage.setItem('order', JSON.stringify(orderObj))
}

function clearCurrentOrder() {
  localStorage.removeItem('order')
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
    // show the checkout form modal
    document.querySelector('.modal-dialog').showModal()
  } else if (e.target.classList.contains('pay-btn')) {
    e.preventDefault()

    // remove previous error messages and check input validity
    removeFormErrors()
    // const validInputs = verifyFormInputs()
    const validInputs = true

    // if the inputs are valid, close the modal and print confirmation message
    if (validInputs) {
      const name = document.querySelector("#name").value
      displayOrderConfirmation(name)
      clearFormInputs()
      clearCurrentOrder()
      document.querySelector('.modal-dialog').close()
    }
  } else if (e.target.classList.contains('close-btn')) {
    // remove previous error messages and clear input fields
    removeFormErrors()
    clearFormInputs()

    // close the checkout modal
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
  document.querySelector('.order-confirmation').style.display = "none"
  document.querySelector('.order').style.display = "block"

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

      const orderItem = document.createElement('div')
      orderItem.classList.add('order-item')

      orderItem.innerHTML =
          `<h3 class="item-name no-margin light-font">${itemObj.name} <span class="item-quantity">(x${quantity})</span></h3>
          <button class="remove-btn no-padding" data-item-id="${itemId}">remove</button>
          <p class="item-price align-right no-margin">$${itemOrderPrice}</p>`
        
      orderSummary.appendChild(orderItem)
    }

    if ((orderObj.hasOwnProperty(0) || (orderObj.hasOwnProperty(1))) && (orderObj.hasOwnProperty(2))) {
      totalOrderPrice = Math.round(totalOrderPrice * 85) / 100

      const discountEntry = document.createElement('div')
      discountEntry.classList.add('order-discount')
      discountEntry.innerHTML = 
        `<p class="discount-name no-margin">Meal + Drink discount</p>
        <p class="discount-amount align-right no-margin">-15%</p>`
      
      orderSummary.appendChild(discountEntry)
    }
    
    document.querySelector('.order-btn').disabled = false
  }
  
  // compute and display the total order price
  document.querySelector('.order-total').innerHTML =
    `<div class="order-item">
      <h3 class="item-name no-margin light-font">Total price:</h3>
      <p class="item-price align-right no-margin">$${totalOrderPrice}</p>
    </div>`
}

function displayOrderConfirmation(name) {
  document.querySelector('.order').style.display = "none"
  
  document.querySelector('.order-confirmation-message').innerText = `Thanks ${name}! Your order is on its way!`
  document.querySelector('.order-confirmation').style.display = "flex"
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

  if (name.length === 0) {
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

// add an error message below input field
function addInputError(inputEl) {
  inputEl.classList.add('input-error')

  const errorMessage = document.createElement('p')
  errorMessage.classList.add('input-error-message', 'no-margin')
  errorMessage.innerText = 'Please provide a valid input in the field above.'

  inputEl.insertAdjacentElement('afterend', errorMessage)
}

// remove all error messages and input error styling
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


function fillStars(event) {
  const selectedRating = parseInt(event.target.dataset.rating)

  document.querySelectorAll('.fa-star').forEach(star => {
    star.classList.remove('fa-regular')
    star.classList.remove('fa-solid')
    star.classList.remove('fa-gold')

    const rating = parseInt(star.dataset.rating)

    if (rating <= selectedRating) {
      star.classList.add('fa-solid')
    } else {
      star.classList.add('fa-regular')
    }
  })
}

function hollowStars() {
  document.querySelectorAll('.fa-star').forEach(star => {
    star.classList.remove('fa-solid')
    star.classList.add('fa-regular')
  })
}

function goldStars(event) {
  const selectedRating = parseInt(event.target.dataset.rating)

  document.querySelectorAll('.fa-star').forEach(star => {
    star.classList.remove('fa-solid')

    const rating = parseInt(star.dataset.rating)

    if (rating <= selectedRating) {
      star.classList.add('fa-solid', 'fa-gold')
    } else {
      star.classList.add('fa-regular')
    }

    star.removeEventListener('mouseenter', fillStars)
    star.removeEventListener('mouseleave', hollowStars)
    star.removeEventListener('click', hollowStars)

  })

  document.querySelector('.order-confirmation').innerHTML +=
      '<p>Thank you for your feedback!</p>'
}

document.querySelectorAll('.fa-star').forEach(star => {
  star.addEventListener('mouseenter', fillStars)
  star.addEventListener('mouseleave', hollowStars)
  star.addEventListener('click', goldStars)
})

document.addEventListener('DOMContentLoaded', () => {
  displayMenu()
  displayOrderSummary()
})