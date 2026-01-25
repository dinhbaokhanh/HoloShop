document.addEventListener('DOMContentLoaded', function () {
  var goodsContainer = document.getElementById('goods-container')

  if (goodsContainer && typeof productsData !== 'undefined') {
    var htmlContent = ''

    productsData.forEach(function (product) {
      var tagClasses = product.tags ? product.tags.join(' ') : ''
      var productUrl = '../goods/products.html?id=' + product.id

      htmlContent += `
                <div class="items ${tagClasses}">
                    <a href="${productUrl}">
                        <img class="items-image" src="${product.image}" alt="${product.title}">
                        <div class="items-name">${product.title}</div>
                        <div class="items-price">~ ${product.price}</div>
                    </a>
                </div>
            `
    })

    goodsContainer.innerHTML = htmlContent
  }

  initCartEvents()
})

function change() {
  var groupsCbs = document.querySelectorAll(".groups input[type='checkbox']")
  var categoriesCbs = document.querySelectorAll(
    ".categories input[type='checkbox']"
  )
  var filters = {
    groups: getClassOfCheckedCheckboxes(groupsCbs),
    categories: getClassOfCheckedCheckboxes(categoriesCbs),
  }

  filterResults(filters)
}

function getClassOfCheckedCheckboxes(checkboxes) {
  var classes = []

  if (checkboxes && checkboxes.length > 0) {
    for (var i = 0; i < checkboxes.length; i++) {
      var cb = checkboxes[i]

      if (cb.checked) {
        classes.push(cb.getAttribute('rel'))
      }
    }
  }

  return classes
}

function filterResults(filters) {
  var rElems = document.querySelectorAll('.goods .items')
  var hiddenElems = []

  if (!rElems || rElems.length <= 0) {
    return
  }

  for (var i = 0; i < rElems.length; i++) {
    var el = rElems[i]

    if (filters.groups.length > 0) {
      var isHidden = true

      for (var j = 0; j < filters.groups.length; j++) {
        var filter = filters.groups[j]

        if (el.classList.contains(filter)) {
          isHidden = false
          break
        }
      }

      if (isHidden) {
        hiddenElems.push(el)
      }
    }

    if (filters.categories.length > 0) {
      var isHidden = true

      for (var j = 0; j < filters.categories.length; j++) {
        var filter = filters.categories[j]

        if (el.classList.contains(filter)) {
          isHidden = false
          break
        }
      }

      if (isHidden) {
        hiddenElems.push(el)
      }
    }
  }

  for (var i = 0; i < rElems.length; i++) {
    rElems[i].style.display = 'block'
  }

  if (hiddenElems.length <= 0) {
    return
  }

  for (var i = 0; i < hiddenElems.length; i++) {
    hiddenElems[i].style.display = 'none'
  }
}

function SearchEngine() {
  var input, filter, items, items_name, i, txtValue
  input = document.getElementById('search-input')
  filter = input.value.toLowerCase()
  items = document.getElementsByClassName('items')

  for (i = 0; i < items.length; i++) {
    items_name = items[i].getElementsByClassName('items-name')[0]
    txtValue = items_name.textContent || items_name.innerText
    if (txtValue.toLowerCase().indexOf(filter) > -1) {
      items[i].style.display = ''
    } else {
      items[i].style.display = 'none'
    }
  }
}

function openNav() {
  document.getElementById('mySidenav').style.width = '250px'
}

function closeNav() {
  document.getElementById('mySidenav').style.width = '0'
}

function sel(it) {
  var divs = document.getElementById('container').getElementsByTagName('label')
  for (var i = 0; i < divs.length; i++) {
    if (divs[i] != it) {
      divs[i].className = 'options'
    }
  }
  it.className = 'selected-option'
}

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

function initCartEvents() {
  var modal = document.getElementById('myModal')
  var btn = document.getElementById('cart')
  var close = document.getElementsByClassName('close')[0]
  var extra_close = document.getElementsByClassName('close')[1]
  var orderBtn = document.getElementsByClassName('order')[0]

  if (btn) {
    btn.onclick = function () {
      modal.style.display = 'block'
      checkCartEmpty()
    }
  }

  if (extra_close) {
    extra_close.onclick = function () {
      modal.style.display = 'none'
    }
  }

  if (close) {
    close.onclick = function () {
      modal.style.display = 'none'
    }
  }

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = 'none'
    }
  }

  if (orderBtn) {
    orderBtn.addEventListener('click', function () {
      if (document.getElementsByClassName('cart-item').length > 0) {
        purchaseClicked()
      }
      checkCartEmpty()
    })
  }

  var remove_cart = document.getElementsByClassName('btn-danger')
  for (var i = 0; i < remove_cart.length; i++) {
    var button = remove_cart[i]
    button.addEventListener('click', function (event) {
      var button_remove = event.target
      button_remove.parentElement.parentElement.remove()
      updatecart()
    })
  }

  var quantity_input = document.getElementsByClassName('cart-quantity-input')
  for (var i = 0; i < quantity_input.length; i++) {
    var input = quantity_input[i]
    input.addEventListener('change', function (event) {
      var input = event.target
      if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
      }
      updatecart()
    })
  }

  var add_cart = document.getElementsByClassName('btn-cart')
  for (var i = 0; i < add_cart.length; i++) {
    var add = add_cart[i]
    add.addEventListener('click', function (event) {
      var button = event.target
      var product = button.parentElement.parentElement
      var option = product.getElementsByClassName('selected-option')
      var big_title = product.getElementsByClassName('title')[0].outerText
      var img = option[0].children[0].src
      var title = option[0].children[1].innerText
      var price = option[0].children[2].children[0].innerText
      var quantity = document.getElementById('quantity-input').value

      addItemToCart(big_title, title, price, img, quantity)
      updatecart()
    })
  }
}

function checkCartEmpty() {
  var cartItems = document.getElementsByClassName('cart-item')
  var modalContent = document.getElementById('modal-content')
  var emptyCart = document.getElementById('empty-cart')

  if (cartItems.length < 1) {
    if (modalContent) modalContent.style.display = 'none'
    if (emptyCart) emptyCart.style.display = 'block'
  } else {
    if (modalContent) modalContent.style.display = 'block'
    if (emptyCart) emptyCart.style.display = 'none'
  }
}

function updatecart() {
  var cart_item = document.getElementsByClassName('cart-items')[0]
  var cart_rows = cart_item.getElementsByClassName('cart-row')
  var total = 0
  for (var i = 0; i < cart_rows.length; i++) {
    var cart_row = cart_rows[i]
    var price_item = cart_row.getElementsByClassName('cart-price ')[0]
    var quantity_item = cart_row.getElementsByClassName(
      'cart-quantity-input'
    )[0]
    var price = parseFloat(price_item.innerText)
    var quantity = quantity_item.value
    total = total + price * quantity
  }
  document.getElementsByClassName('cart-total-price')[0].innerText =
    total + ' VND'
}

function purchaseClicked() {
  alert('Thanks for your payment')
  var cart_item = document.getElementsByClassName('cart-items')[0]
  while (cart_item.hasChildNodes()) {
    cart_item.removeChild(cart_item.firstChild)
  }
  updatecart()
}

function addItemToCart(big_title, title, price, img, quantity) {
  var cartRow = document.createElement('div')
  var quantityInput = document.getElementById('quantity-input')
  var quantityVal = quantityInput ? quantityInput.value : 1

  cartRow.classList.add('cart-row')
  var cartItems = document.getElementsByClassName('cart-items')[0]
  var cart_title = cartItems.getElementsByClassName('cart-item-title')

  for (var i = 0; i < cart_title.length; i++) {
    if (cart_title[i].innerText == title) {
      quantityVal++
      alert('Please check your cart')
      return
    }
  }

  var cartRowContents = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${img}" width="100" height="100">
            <div>
                <div class="cart-item-big-title">${big_title}</div>
                <div class="space-in-title"></div>
                <div class="cart-item-title">${title}</div>
            </div>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" onkeypress="return isNumberKey(event)" type="text" value="${quantity}">
            <div class="btn btn-danger" type="button">Remove</div>
        </div>`
  cartRow.innerHTML = cartRowContents
  cartItems.append(cartRow)

  cartRow
    .getElementsByClassName('btn-danger')[0]
    .addEventListener('click', function (event) {
      var button_remove = event.target
      button_remove.parentElement.parentElement.remove()
      updatecart()
    })
  cartRow
    .getElementsByClassName('cart-quantity-input')[0]
    .addEventListener('change', function (event) {
      var input = event.target
      if (isNaN(input.value) || input.value <= 0) {
        input.value = quantityVal
      }
      updatecart()
    })
}
