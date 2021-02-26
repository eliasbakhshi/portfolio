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


document.querySelector('meta[name="theme-color"]').setAttribute('content',  '#123456');






// Foo the smooth scrolling
let scroll = new SmoothScroll('.nav a[href*="#"]', {
    speed: 1000,
    speedAsDuration: true,
    easing: 'easeInCubic'
});
