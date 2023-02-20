const headerBurger = document.querySelector(".header__burger");
const headerMenu   = document.querySelector(".header__menu");
const body         = document.querySelector("body");
headerBurger.addEventListener('click', () => {
    headerBurger.classList.toggle("active");
    headerMenu.classList.toggle("active");
    body.classList.toggle("body--lock");
});

const form  = document.querySelector(".footer__form");
const email = document.querySelector(".footer__form-input");
const emailError = document.querySelector('.error');

email.addEventListener('input', function (event) {
  if (email.validity.valid) {
    emailError.textContent = ''; 
    emailError.className = 'error';
  } else {
    showError();
  }
});

form.addEventListener('submit', function (event) {
  if(!email.validity.valid) {
    showError();
    event.preventDefault();
  }
});

function showError() {
  if(email.validity.valueMissing) {
    emailError.textContent = 'You need to enter an e-mail address.';
  } else if(email.validity.typeMismatch) {
    emailError.textContent = 'Entered value needs to be an e-mail address.';
  } else if(email.validity.tooShort) {
    emailError.textContent = `Email should be at least ${ email.minLength } characters; you entered ${ email.value.length }.`;
  }
  emailError.className = 'error active';
}