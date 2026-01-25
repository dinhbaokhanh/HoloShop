const submit = document.getElementById('submit')
submit.addEventListener('click', () => {
  alert("You've submitted the form")
})

// responsive css
function openNav() {
  document.getElementById('mySidenav').style.width = '250px'
}

function closeNav() {
  document.getElementById('mySidenav').style.width = '0'
}
