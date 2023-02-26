const headerBurger       = document.querySelector(".header__burger");
const headerMenu         = document.querySelector(".header__menu");
const body               = document.querySelector("body");
const form               = document.querySelector(".footer__form");
const email              = document.querySelector(".footer__form-input");
const formBtn            = document.querySelector(".footer__form-btn");
const emailError         = document.querySelector(".error");
const emailSent          = document.querySelector(".email-sent");
const emailSentLinks     = document.querySelectorAll(".email-sent__link");
const emailSentCloseIcon = document.querySelectorAll(".email-sent__close");
const lockPadding        = document.querySelectorAll(".lock-padding");

headerBurger.addEventListener('click', () => {
    headerBurger.classList.toggle("active");
    headerMenu.classList.toggle("active");
    body.classList.toggle("body--lock");
});


let unlock    = true;
const timeout = 800;

if (emailSentCloseIcon.length > 0) {
  for (let index = 0; index < emailSentCloseIcon.length; index++) {
    const el = emailSentCloseIcon[index];
    emailSent.addEventListener('click', function (e) {
      emailSentClose(el.closest('.email-sent'));
      e.preventDefault();
    })
  }
}


function emailSentClose(emailSentActive, doUnlock = true) {
  if (unlock) {
    emailSentActive.classList.remove('open');
    if (doUnlock) {
      bodyUnlock();
    }
  }
}

document.addEventListener('keydown', function (e) {
  if (e.which === 27) {
    const emailSentActive = document.querySelector('.email-sent.open');
    emailSentClose(emailSentActive);
  }
});

function bodyLock() {
  const lockPaddingValue = window.innerWidth - document.querySelector(".wrapper").offsetWidth + 'px';
  if (lockPadding.length > 0) {
    for (let index = 0; index < lockPadding.length; index++) {
      const el = lockPadding[index];
      el.style.paddingRight = lockPaddingValue;
    }
  }
  body.style.paddingRight = lockPaddingValue;
  body.classList.add('body--lock');

  unlock = false;
  setTimeout(function() {
    unlock = true;
  }, timeout);
}

function bodyUnlock() {
  setTimeout(function () {
    if(lockPadding.length > 0) {
      for (let index = 0; index < lockPadding.length; index++) {
        const el = lockPadding[index];
        el.style.paddingRight = '0px';
      }
    }
    body.style.paddingRight = '0px';
    body.classList.remove('body--lock');
  }, timeout);

  unlock = false;
  setTimeout(function () {
    unlock = true;
  }, timeout);
}

email.addEventListener('input', function (event) {
  if (email.validity.valid) {
    emailError.textContent = '';
    emailError.className = 'error';
  } else {
    showError();
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

form.addEventListener('submit', function (event) {
  if (email.validity.valid) {
    let name = formBtn.getAttribute('data-modal-btn');
    let modal = document.querySelector("[data-modal-window='" + name + "']");
    modal.classList.add('open');
    form.reset();
  }
  event.preventDefault();
  if(!email.validity.valid) {
    showError();
  }
  bodyLock();
  emailError.className = 'error';
});

