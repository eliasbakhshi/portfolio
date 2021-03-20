/* For the contact form */
let form = document.querySelector(".contact-form");
let filledForm= true;
/**
 * @param elementName{string} The name of the element
 * */
let checkForm = elementName => {
    if(form[elementName].value.trim() === "") {
        form[elementName].parentElement.style.border = "2px solid red";
        form[elementName].nextElementSibling.style.color = "red";
        form[elementName].nextElementSibling.textContent = `You should enter your ${elementName} here :)`;
        filledForm = false;
        form[elementName].addEventListener("keyup", e => {
            checkForm(elementName);
        });
    } else {
        form[elementName].parentElement.style.border = "0";
        form[elementName].nextElementSibling.style.color = "#000500";
        form[elementName].nextElementSibling.textContent = elementName;
    }
}

/* When user click on the "Send message" in the contact form*/
form.addEventListener("submit", (e) => {
    e.preventDefault();
    /* Check if the form is filled */
    let formElements = ["name", "email", "subject", "message"]
    formElements.forEach(eName => {
        checkForm(eName);
    });
});

/* It changes the tab color for the mobile users */
document.querySelector('meta[name="theme-color"]').setAttribute('content',  '#123456');

/* Toggle the menu */
let menuIcon = document.querySelector(".hamburger-icon");
let hamburgerMenu = document.querySelector(".nav");
menuIcon.addEventListener("click", icon => {
    menuIcon.classList.toggle("opened");
    hamburgerMenu.classList.toggle("opened");
});

/* Close the menu when user clicks or scrolls outside of that in tablet view. */
function closeMenu(e) {
    let openedNav = document.querySelector(".nav.opened");
    let navIcon = document.querySelector(".hamburger-icon");
    if (openedNav !== null) {
        if ( !openedNav.contains(e.target) && !navIcon.contains(e.target) ){
            navIcon.classList.toggle("opened");
            openedNav.classList.toggle("opened");
        }
    }
}

window.addEventListener("click", closeMenu);
window.addEventListener("scroll", closeMenu);

/* Give the menu bg when it is leaving the home page. */
let el = document.querySelector("#about");
let tabletHeader = document.querySelector(".tablet .nav-bg");
window.addEventListener("scroll", e => {
    if (el.getBoundingClientRect().top < 120) {
        // console.log(el.getBoundingClientRect().top)
        tabletHeader.classList.add("active");
    } else {
        tabletHeader.classList.remove("active");
    }
});

// Foo the smooth scrolling
if (SmoothScroll != undefined) {
    let scroll = new SmoothScroll('a.take-coffee[href*="#"], .nav a[href*="#"]', {
        speed: 1000,
        speedAsDuration: true,
        easing: 'easeInCubic'
    });
}