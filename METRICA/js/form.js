const body           = document.querySelector("body");
const lockPadding    = document.querySelectorAll(".lock-padding");
const emailSentLinks = document.querySelectorAll(".email-sent__link");
let unlock           = true;
const timeout        = 800;

if(emailSentLinks.length > 0) {
	for (let index = 0; index < emailSentLinks.length; index++) {
		const emailSentLink = emailSentLinks[index];
		emailSentLink.addEventListener('click', function (e) {
			const emailSentName   = emailSentLink.getAttribute('href').replace("#", "");
			const curentEmailSent = document.getElementById(emailSentName);
			emailSentOpen(curentEmailSent);
			e.preventDefault();
		});
	}
}

const emailSentCloseIcon = document.querySelectorAll(".email-sent__close");
if (emailSentCloseIcon.length > 0) {
	for (let index = 0; index < emailSentCloseIcon.length; index++) {
		const el = emailSentCloseIcon[index];
		el.addEventListener('click', function (e) {
			emailSentClose(el.closest('.email-sent'));
			e.preventDefault();
		});
	}
}

function emailSentOpen(curentEmailSent) {
	if (curentEmailSent && unlock) {
		const emailSentActive = document.querySelector('.email-sent.open');
		if (emailSentActive) {
			emailSentClose(emailSentActive, false);
		} else {
			bodyLock();
		}
		curentEmailSent.classList.add('open');
		curentEmailSent.addEventListener("click", function (e) {
			if (!e.target.closest('.email-sent__content')) {
				emailSentClose(e.target.closest('.email-sent'));
			}
		});
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

function bodyLock() {
	const lockPaddingValue = window.innerWidth - document.querySelector(".wrapper").offsetWidth + 'px';
	if (lockPadding.length > 0) {
		for (let index = 0; index < lockPadding.length; index++) {
			const el = lockPadding[index];
			el.style.paddingRight = lockPaddingValue;
		}
	}
	body.style.paddingRight = lockPaddingValue;
	body.classList.add('lock');

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
		body.classList.remove('lock');
	}, timeout);

	unlock = false;
	setTimeout(function () {
		unlock = true;
	}, timeout);
}

document.addEventListener('keydown', function (e) {
	if (e.which === 27) {
		const emailSentActive = document.querySelector('.email-sent.open');
		emailSentClose(emailSentActive);
	}
});