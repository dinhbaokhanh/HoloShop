const contact = document.getElementById("contact");
contact.addEventListener("click", () => {
    window.location.href = './contact.html';
})


// responsive css
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
}
  
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}
  