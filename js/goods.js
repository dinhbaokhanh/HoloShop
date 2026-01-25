// sildeshow

var slideIndex = 1

function currentDiv(n) {
  showDivs((slideIndex = n))
}

function showDivs(n) {
  var i
  var x = document.getElementsByClassName('mySlides')

  // Check if elements exist
  if (!x || x.length === 0) return

  if (n > x.length) {
    slideIndex = 1
  }
  if (n < 1) {
    slideIndex = x.length
  }
  for (i = 0; i < x.length; i++) {
    x[i].style.display = 'none'
  }
  if (x[slideIndex - 1]) {
    x[slideIndex - 1].style.display = 'block'
  }
}

// set option
function sel(it) {
  var divs = document.getElementById('container').getElementsByTagName('label')
  for (var i = 0; i < divs.length; i++) {
    if (divs[i] != it) {
      divs[i].className = 'options'
    }
  }
  it.className = 'selected-option'
}

// quantity
function decrease() {
  var textBox = document.getElementById('quantity-input')
  if (textBox && textBox.value > 1) {
    textBox.value--
  }
}

function increase() {
  var textBox = document.getElementById('quantity-input')
  if (textBox) {
    textBox.value++
  }
}

function isNumberKey(evt) {
  var charCode = evt.which ? evt.which : event.keyCode
  if (charCode > 31 && (charCode < 48 || charCode > 57)) return false
  return true
}

// Update cart total
function updatecart() {
  var cart_item = document.getElementsByClassName('cart-items')[0]
  if (!cart_item) return

  var cart_rows = cart_item.getElementsByClassName('cart-row')
  var total = 0

  for (var i = 0; i < cart_rows.length; i++) {
    var cart_row = cart_rows[i]
    var price_item = cart_row.getElementsByClassName('cart-price')[0]
    var quantity_item = cart_row.getElementsByClassName(
      'cart-quantity-input'
    )[0]

    if (price_item && quantity_item) {
      var price = parseFloat(price_item.innerText.replace(/[^0-9]/g, ''))
      var quantity = quantity_item.value
      total = total + price * quantity
    }
  }

  var totalElement = document.getElementsByClassName('cart-total-price')[0]
  if (totalElement) {
    totalElement.innerText = total.toLocaleString() + ' VND'
  }
}

// Purchase handler
function purchaseClicked() {
  alert('Thanks for your payment!')
  var cart_item = document.getElementsByClassName('cart-items')[0]
  if (cart_item) {
    while (cart_item.hasChildNodes()) {
      cart_item.removeChild(cart_item.firstChild)
    }
    updatecart()
  }
}

// Add item to cart
function addItemToCart(big_title, title, price, img, quantity) {
  var cartRow = document.createElement('div')
  cartRow.classList.add('cart-row')

  var cartItems = document.getElementsByClassName('cart-items')[0]
  if (!cartItems) return

  var cart_title = cartItems.getElementsByClassName('cart-item-title')

  // Check if item already in cart
  for (var i = 0; i < cart_title.length; i++) {
    if (cart_title[i].innerText == title) {
      alert('This item is already in your cart!')
      return
    }
  }

  var cartRowContents = `
    <div class="cart-item cart-column">
      <img class="cart-item-image" src="${img}" width="100" height="100">
      <div>
        <div class="cart-item-big-title">${big_title}</div>
        ${big_title !== title ? '<div class="space-in-title"></div><div class="cart-item-title">' + title + '</div>' : ''}
      </div>
    </div>
    <span class="cart-price cart-column">${price}</span>
    <div class="cart-quantity cart-column">
      <input class="cart-quantity-input" onkeypress="return isNumberKey(event)" type="text" value="${quantity}">
      <div class="btn btn-danger" type="button">Remove</div>
    </div>`

  cartRow.innerHTML = cartRowContents
  cartItems.append(cartRow)

  // Add event listeners for remove button
  cartRow
    .getElementsByClassName('btn-danger')[0]
    .addEventListener('click', function (event) {
      event.target.parentElement.parentElement.remove()
      updatecart()
    })

  // Add event listeners for quantity input
  cartRow
    .getElementsByClassName('cart-quantity-input')[0]
    .addEventListener('change', function (event) {
      var input = event.target
      if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
      }
      updatecart()
    })

  // Save to localStorage
  var good = {
    bigTitle: big_title,
    title: title,
    quantity: quantity,
    price: price,
  }
  localStorage.setItem('lastAddedItem', JSON.stringify(good))
}

// Initialize cart when DOM is ready
function initCart() {
  // Modal handlers
  var modal = document.getElementById('myModal')
  var btn = document.getElementById('cart')
  var closes = document.getElementsByClassName('close')
  var orderBtn = document.getElementsByClassName('order')[0]

  if (btn && modal) {
    btn.onclick = function () {
      modal.style.display = 'block'
      var cartItemCount = document.getElementsByClassName('cart-item').length

      if (cartItemCount < 1) {
        document.getElementById('modal-content').style.display = 'none'
        document.getElementById('empty-cart').style.display = 'block'
      } else {
        document.getElementById('modal-content').style.display = 'block'
        document.getElementById('empty-cart').style.display = 'none'
      }
    }
  }

  // Close buttons
  for (var i = 0; i < closes.length; i++) {
    closes[i].onclick = function () {
      if (modal) modal.style.display = 'none'
    }
  }

  // Click outside to close
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = 'none'
    }
  }

  // Order button
  if (orderBtn) {
    orderBtn.addEventListener('click', function () {
      var cartItemCount = document.getElementsByClassName('cart-item').length

      if (cartItemCount > 0) {
        purchaseClicked()
      }

      // Update display after purchase
      if (cartItemCount < 1) {
        document.getElementById('modal-content').style.display = 'none'
        document.getElementById('empty-cart').style.display = 'block'
      }
    })
  }

  // Add to cart buttons
  var add_cart = document.getElementsByClassName('btn-cart')
  for (var i = 0; i < add_cart.length; i++) {
    add_cart[i].addEventListener('click', function (event) {
      var button = event.target
      var product = button.parentElement.parentElement
      var option = product.getElementsByClassName('selected-option')

      if (option.length === 0) {
        alert('Please select a product option first!')
        return
      }

      var big_title = product.getElementsByClassName('title')[0].innerText
      var img = option[0].children[0].src
      var title = option[0].children[1].innerText
      var price = option[0].children[2].children[0].innerText
      var quantityInput = document.getElementById('quantity-input')
      var quantity = quantityInput ? quantityInput.value : 1
      var availability = option[0].children[2].children[1].innerText

      if (availability === 'In Stock') {
        addItemToCart(big_title, title, price, img, quantity)
        updatecart()
        alert('Item added to cart!')
      } else {
        alert('Sorry, this option is currently unavailable')
      }
    })
  }

  // Existing cart items (if any)
  var remove_cart = document.getElementsByClassName('btn-danger')
  for (var i = 0; i < remove_cart.length; i++) {
    remove_cart[i].addEventListener('click', function (event) {
      event.target.parentElement.parentElement.remove()
      updatecart()
    })
  }

  var quantity_inputs = document.getElementsByClassName('cart-quantity-input')
  for (var i = 0; i < quantity_inputs.length; i++) {
    quantity_inputs[i].addEventListener('change', function (event) {
      var input = event.target
      if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
      }
      updatecart()
    })
  }
}

// responsive css
function openNav() {
  document.getElementById('mySidenav').style.width = '250px'
}

function closeNav() {
  document.getElementById('mySidenav').style.width = '0'
}

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCart)
} else {
  initCart()
}
