// Manual slideshow
var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("dot");
    if (n > slides.length) {
        slideIndex = 1;
    }
    if (n < 1) {
        slideIndex = slides.length;
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className += " active";
}

//automatic slideshow
var autoslideIndex = 0;
autoshowSlides();

function autoshowSlides() {
    var i;
    var autoslides = document.getElementsByClassName("mySlides");
    var autodots = document.getElementsByClassName("dot");
    for (i = 0; i < autoslides.length; i++) {
        autoslides[i].style.display = "none";  
    }
    autoslideIndex++;
    if (autoslideIndex > autoslides.length) {
        autoslideIndex = 1;
    }    
    for (i = 0; i < autodots.length; i++) {
        autodots[i].className = autodots[i].className.replace(" active", "");
    }
    autoslides[autoslideIndex-1].style.display = "block";  
    autodots[autoslideIndex-1].className += " active";
    setTimeout(autoshowSlides, 6000);
}

// responsive
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
}
  
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}

const logout = () => {
    localStorage.removeItem("currentUser");
    location.reload();
    location.href = '../html/Login.html'
};