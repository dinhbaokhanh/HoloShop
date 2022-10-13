// sildeshow

var slideIndex = 1;
showDivs(slideIndex);

function currentDiv(n) {
    showDivs(slideIndex = n);
}

function showDivs(n) {
    var i;
    var x = document.getElementsByClassName("mySlides");
    if (n > x.length) {slideIndex = 1}    
    if (n < 1) {slideIndex = x.length}
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";  
    }
    x[slideIndex-1].style.display = "block";  
}

// set option
function sel(it) {
    var divs = document.getElementById('container').getElementsByTagName('label');  //get all divs from div called container
    for(var i = 0; i < divs.length;  i++) {
        if(divs[i] != it) {  
            divs[i].className='options';
        }
    }
    it.className='selected-option';  
}

// quantity
function decrease(){
  var textBox = document.getElementById("quantity-input");
    if (textBox.value > 1 ) {
        textBox.value--;
  }
}

function increase(){
    var textBox = document.getElementById("quantity-input");
    textBox.value++;  
} 

function isNumberKey(evt){
    var charCode = (evt.which) ? evt.which : event.keyCode
        if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;

        return true;
}


// Modal
var modal = document.getElementById("myModal");
var btn = document.getElementById("cart");
var close = document.getElementsByClassName("close")[0];
var extra_close = document.getElementsByClassName("close")[1];
var order = document.getElementsByClassName("order")[0];
btn.onclick = function () {
    modal.style.display = "block";
    if (document.getElementsByClassName('cart-item').length < 1 || document.getElementsByClassName('cart-item').length == 1 ) {
        document.getElementById('modal-content').style.display = "none";
        document.getElementById('empty-cart').style.display = 'block';
    } else {
        document.getElementById('modal-content').style.display = "block";
        document.getElementById('empty-cart').style.display = 'none';
    }
}

extra_close.onclick = function () {
    modal.style.display = "none";
}
close.onclick = function () {
    modal.style.display = "none";
}

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Cart

var remove_cart = document.getElementsByClassName("btn-danger");
for (var i = 0; i < remove_cart.length; i++) {
    var button = remove_cart[i]
    button.addEventListener("click", function () {
        var button_remove = event.target
        button_remove.parentElement.parentElement.remove()
        updatecart()
    })
}

function updatecart() {
    var cart_item = document.getElementsByClassName("cart-items")[0];
    var cart_rows = cart_item.getElementsByClassName("cart-row");
    var total = 0;
    for (var i = 0; i < cart_rows.length; i++) {
        var cart_row = cart_rows[i]
        var price_item = cart_row.getElementsByClassName("cart-price ")[0]
        var quantity_item = cart_row.getElementsByClassName("cart-quantity-input")[0]
        var price = parseFloat(price_item.innerText)// chuyển một chuổi string sang number để tính tổng tiền.
        var quantity = quantity_item.value // lấy giá trị trong thẻ input
        total = total + (price * quantity)
    }
    document.getElementsByClassName("cart-total-price")[0].innerText = total + ' VND'

}

document.getElementsByClassName('order')[0].addEventListener('click', function(){
    if (document.getElementsByClassName('cart-item').length > 1) {
        purchaseClicked()
    }
    if (document.getElementsByClassName('cart-item').length < 1 || document.getElementsByClassName('cart-item').length == 1 ) {
        document.getElementById('modal-content').style.display = "none";
        document.getElementById('empty-cart').style.display = 'block';
    } else {
        document.getElementById('modal-content').style.display = "block";
        document.getElementById('empty-cart').style.display = 'none';
    }
})

function purchaseClicked() {
    alert('Thanks for your payment')
    var cart_item = document.getElementsByClassName('cart-items')[0]
    while (cart_item.hasChildNodes()) {
        cart_item.removeChild(cart_item.firstChild)     
    }
    updatecart()
}

var quantity_input = document.getElementsByClassName("cart-quantity-input");
for (var i = 0; i < quantity_input.length; i++) {
    var input = quantity_input[i];
    input.addEventListener("change", function (event) {
        var input = event.target
        if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
        }
        updatecart()
    })
}

var add_cart = document.getElementsByClassName("btn-cart");
    
for (var i = 0; i < add_cart.length; i++) {
    var add = add_cart[i];
    

    add.addEventListener("click", function (event) {
        var button = event.target;
        var product = button.parentElement.parentElement;
        var option = product.getElementsByClassName('selected-option');
        var big_title = product.getElementsByClassName('title')[0].outerText;
        var img = option[0].children[0].src;
        var title = option[0].children[1].innerText;
        var price = option[0].children[2].children[0].innerText;
        var quantity = document.getElementById("quantity-input").value;
        var availbility = option[0].children[2].children[1].innerText;
        console.log(availbility)
        
        if (availbility === 'In Stock') {
            addItemToCart(big_title, title, price, img, quantity)
            updatecart()   
        } else {
            alert('This option is currently unavailable')
        }   
    })
}


function addItemToCart(big_title, title, price, img, quantity) {
    var cartRow = document.createElement('div') 
    var quantity = document.getElementById("quantity-input").value;
    console.log(quantity)
    

    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cart_title = cartItems.getElementsByClassName('cart-item-title')

    for (var i = 0; i < cart_title.length; i++) {
        if (cart_title[i].innerText == title) {         
            quantity ++;
            alert('Please check your cart')
            return
        }
    }
    
    if (big_title == title) {
        var cartRowContents = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${img}" style = "{
                width: 100px;
                height: 100px;
                object-fit: cover;
            }">
            <div>
                <div class="cart-item-big-title">${big_title}</div>
            </div>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" onkeypress="return isNumberKey(event)" type="text" value="${quantity}">
            <div class="btn btn-danger" type="button">Remove</div>
        </div>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', function () {
        var button_remove = event.target
        button_remove.parentElement.parentElement.remove()
        updatecart()
    })
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', function (event) {
        var input = event.target
        if (isNaN(input.value) || input.value <= 0) {
        input.value = quantity;
        }
        updatecart()
    })
    } else {

    var cartRowContents = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${img}" style = "{
                width: 100px;
                height: 100px;
                object-fit: cover;
            }">
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

    var good = {};
    good.bigTitle = big_title;
    good.title = title;
    good.quantity = quantity;
    good.price = price;
    localStorage.setItem('good', JSON.stringify(good));
    console.log(localStorage.getItem('good'));
    
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', function () {
        var button_remove = event.target
        button_remove.parentElement.parentElement.remove()
        updatecart()
    })
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', function (event) {
        var input = event.target
        if (isNaN(input.value) || input.value <= 0) {
        input.value = quantity;
        }
        updatecart()
    })
}}



// responsive css
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
}
  
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}


function saveItems() {
    
}
