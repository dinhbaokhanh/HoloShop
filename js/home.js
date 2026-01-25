// Manual slideshow
var slideIndex = 1
showSlides(slideIndex)

function plusSlides(n) {
  showSlides((slideIndex += n))
}

function currentSlide(n) {
  showSlides((slideIndex = n))
}

function showSlides(n) {
  var i
  var slides = document.getElementsByClassName('mySlides')
  var dots = document.getElementsByClassName('dot')
  if (n > slides.length) {
    slideIndex = 1
  }
  if (n < 1) {
    slideIndex = slides.length
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = 'none'
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(' active', '')
  }
  slides[slideIndex - 1].style.display = 'block'
  dots[slideIndex - 1].className += ' active'
}

//automatic slideshow
var autoslideIndex = 0
autoshowSlides()

function autoshowSlides() {
  var i
  var autoslides = document.getElementsByClassName('mySlides')
  var autodots = document.getElementsByClassName('dot')
  for (i = 0; i < autoslides.length; i++) {
    autoslides[i].style.display = 'none'
  }
  autoslideIndex++
  if (autoslideIndex > autoslides.length) {
    autoslideIndex = 1
  }
  for (i = 0; i < autodots.length; i++) {
    autodots[i].className = autodots[i].className.replace(' active', '')
  }
  autoslides[autoslideIndex - 1].style.display = 'block'
  autodots[autoslideIndex - 1].className += ' active'
  setTimeout(autoshowSlides, 6000)
}

// responsive
function openNav() {
  document.getElementById('mySidenav').style.width = '250px'
}

function closeNav() {
  document.getElementById('mySidenav').style.width = '0'
}

// Check if user is logged in and update UI
function updateAuthUI() {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'))
  const accountIcon = document.querySelector('.account')

  if (currentUser && accountIcon) {
    // User is logged in - show username and logout option
    accountIcon.setAttribute('title', `Logged in as: ${currentUser.username}`)
    accountIcon.style.color = '#4CAF50'

    // Add username display
    const usernameDisplay = document.createElement('span')
    usernameDisplay.style.cssText =
      'font-size: 12px; margin-left: 5px; color: #333;'
    usernameDisplay.textContent = currentUser.username

    if (
      accountIcon.parentElement &&
      !document.querySelector('.username-display')
    ) {
      usernameDisplay.className = 'username-display'
      accountIcon.parentElement.appendChild(usernameDisplay)
    }
  }
}

// Run on page load
window.addEventListener('DOMContentLoaded', updateAuthUI)

const logout = () => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'))
  const username = currentUser ? currentUser.username : 'User'

  if (confirm(`Are you sure you want to logout, ${username}?`)) {
    localStorage.removeItem('currentUser')
    localStorage.removeItem('isLoggedIn')
    alert('You have been logged out successfully!')
    location.href = './html/LogIn.html'
  }
}
