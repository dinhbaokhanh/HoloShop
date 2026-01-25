let form = document.querySelector('form')
form.addEventListener('submit', (e) => {
  e.preventDefault()

  let username = document.getElementById('username').value.trim()
  let email = document.getElementById('email').value.trim()
  let password = document.getElementById('password').value
  let ConfirmPassword = document.getElementById('confirmPassword').value

  // Validation patterns
  let lowerCaseLetter = /[a-z]/g
  let upperCaseLetter = /[A-Z]/g
  let numbers = /[0-9]/g
  let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  // Validate email format
  if (!emailPattern.test(email)) {
    alert('Please enter a valid email address')
    return
  }

  // Check for duplicate email
  let users = JSON.parse(localStorage.getItem('users')) || []
  let emailExists = users.some((user) => user.email === email)

  if (emailExists) {
    alert(
      '❌ This email is already registered. Please use another email or login.'
    )
    return
  }

  // Check for duplicate username
  let usernameExists = users.some((user) => user.username === username)

  if (usernameExists) {
    alert('This username is already taken. Please choose another username.')
    return
  }

  // Validate username
  if (username.length < 6) {
    alert('Username must be at least 6 characters')
    return
  }

  // Validate password
  if (password.length < 8) {
    alert('Password must be at least 8 characters')
    return
  }

  if (!password.match(lowerCaseLetter)) {
    alert('Password must contain a lowercase letter')
  }

  if (!password.match(upperCaseLetter)) {
    alert('Password must contain an uppercase letter')
  }

  if (!password.match(numbers)) {
    alert('Password must contain a number')
  }

  if (password !== ConfirmPassword) {
    alert('Passwords do not match')
  }

  // Create new user with additional metadata
  const newUser = {
    id: users.length + 1,
    username,
    email,
    password,
    createdAt: new Date().toISOString(),
  }

  users.push(newUser)
  localStorage.setItem('users', JSON.stringify(users))

  alert(
    `✅ Account created successfully! Welcome ${username}!\nPlease login to continue.`
  )
  location.href = './LogIn.html'
})

function myFunction() {
  var element = document.body
  element.classList.toggle('dark-mode')
}

function closeNav() {
  document.getElementById('mySidenav').style.width = '0'
}
