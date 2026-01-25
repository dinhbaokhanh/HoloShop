/**
 * Authentication Helper
 * Manages user authentication across the HoloShop application
 */

// Check if user is logged in
function isAuthenticated() {
  const currentUser = localStorage.getItem('currentUser')
  const isLoggedIn = localStorage.getItem('isLoggedIn')
  return currentUser && isLoggedIn === 'true'
}

// Get current user
function getCurrentUser() {
  try {
    const userStr = localStorage.getItem('currentUser')
    return userStr ? JSON.parse(userStr) : null
  } catch (e) {
    console.error('Error parsing current user:', e)
    return null
  }
}

// Update user info display in navigation
function updateUserDisplay() {
  const currentUser = getCurrentUser()
  const accountLinks = document.querySelectorAll('.account')

  accountLinks.forEach((accountLink) => {
    if (currentUser) {
      // User is logged in
      accountLink.setAttribute('title', `Logged in as: ${currentUser.username}`)
      accountLink.style.color = '#4CAF50'

      // Add username badge if not exists
      if (!accountLink.querySelector('.user-badge')) {
        const badge = document.createElement('span')
        badge.className = 'user-badge'
        badge.style.cssText = `
          position: absolute;
          top: -5px;
          right: -5px;
          background: #4CAF50;
          color: white;
          border-radius: 50%;
          width: 10px;
          height: 10px;
          border: 2px solid white;
        `
        accountLink.style.position = 'relative'
        accountLink.appendChild(badge)
      }
    } else {
      // User is not logged in
      accountLink.setAttribute('title', 'Login to your account')
      accountLink.style.color = ''

      // Remove badge if exists
      const badge = accountLink.querySelector('.user-badge')
      if (badge) {
        badge.remove()
      }
    }
  })
}

// Logout function
function performLogout() {
  const currentUser = getCurrentUser()
  const username = currentUser ? currentUser.username : 'User'

  if (confirm(`Are you sure you want to logout, ${username}?`)) {
    localStorage.removeItem('currentUser')
    localStorage.removeItem('isLoggedIn')
    alert('You have been logged out successfully!')

    // Redirect to login page
    const currentPath = window.location.pathname
    if (currentPath.includes('/goods/')) {
      window.location.href = '../html/LogIn.html'
    } else if (currentPath.includes('/html/')) {
      window.location.href = './LogIn.html'
    } else {
      window.location.href = './html/LogIn.html'
    }
  }
}

// Initialize authentication on page load
function initAuth() {
  updateUserDisplay()

  // Add logout handlers to logout buttons if they exist
  const logoutButtons = document.querySelectorAll('[onclick*="logout"]')
  logoutButtons.forEach((button) => {
    button.onclick = (e) => {
      e.preventDefault()
      performLogout()
    }
  })
}

// Run on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAuth)
} else {
  initAuth()
}

// Export functions for use in other scripts
window.auth = {
  isAuthenticated,
  getCurrentUser,
  updateUserDisplay,
  performLogout,
  initAuth,
}
