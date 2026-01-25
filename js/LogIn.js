// Initialize fixed demo accounts
function initializeDemoAccounts() {
  const demoAccounts = [
    {
      id: 1,
      username: 'demo_user',
      email: 'demo@hololive.shop',
      password: 'Demo123456',
      createdAt: new Date().toISOString(),
    },
    {
      id: 2,
      username: 'hololive_fan',
      email: 'fan@hololive.shop',
      password: 'Hololive2024',
      createdAt: new Date().toISOString(),
    },
    {
      id: 3,
      username: 'guest_user',
      email: 'guest@hololive.shop',
      password: 'Guest12345',
      createdAt: new Date().toISOString(),
    },
  ]

  if (!localStorage.getItem('users')) {
    localStorage.setItem('users', JSON.stringify(demoAccounts))
  } else {
    // Merge demo accounts with existing users
    let existingUsers = JSON.parse(localStorage.getItem('users'))
    demoAccounts.forEach((demoAccount) => {
      const exists = existingUsers.some(
        (user) => user.email === demoAccount.email
      )
      if (!exists) {
        existingUsers.push(demoAccount)
      }
    })
    localStorage.setItem('users', JSON.stringify(existingUsers))
  }
}

// Initialize on page load
initializeDemoAccounts()

// Display demo account info
function displayDemoInfo() {
  const demoInfo = document.createElement('div')
  demoInfo.style.cssText =
    'background: #e3f2fd; border: 1px solid #2196f3; border-radius: 8px; padding: 15px; margin: 20px 0; font-size: 14px;'
  demoInfo.innerHTML = `
    <h4 style="margin: 0 0 10px 0; color: #1976d2;">🎮 Demo Accounts</h4>
    <div style="line-height: 1.8;">
      <strong>Account 1:</strong> demo@hololive.shop / Demo123456<br>
      <strong>Account 2:</strong> fan@hololive.shop / Hololive2024<br>
      <strong>Account 3:</strong> guest@hololive.shop / Guest12345
    </div>
  `

  const form = document.querySelector('form')
  if (form) {
    form.parentNode.insertBefore(demoInfo, form)
  }
}

// Display demo info on page load
window.addEventListener('DOMContentLoaded', displayDemoInfo)

let form = document.querySelector('form')
form.addEventListener('submit', (e) => {
  e.preventDefault()

  let emailInput = document.getElementById('email')
  let passwordInput = document.getElementById('password')

  let email = emailInput.value.trim()
  let password = passwordInput.value.trim()

  // Validate inputs
  if (!email || !password) {
    alert('Please enter both email and password')
    return
  }

  let users = JSON.parse(localStorage.getItem('users')) || []

  let existingUser = users.find(
    (user) => user.email === email && user.password === password
  )

  if (existingUser) {
    // Create session with timestamp
    const session = {
      ...existingUser,
      loginTime: new Date().toISOString(),
      sessionId: 'session_' + Date.now(),
    }

    localStorage.setItem('currentUser', JSON.stringify(session))
    localStorage.setItem('isLoggedIn', 'true')

    alert(`Welcome back, ${existingUser.username}!`)
    location.href = '../index.html'
  } else {
    alert(
      '❌ Invalid email or password. Please try again or use a demo account.'
    )
    passwordInput.value = ''
  }
})

// responsive css
function openNav() {
  document.getElementById('mySidenav').style.width = '250px'
}

function closeNav() {
  document.getElementById('mySidenav').style.width = '0'
}
