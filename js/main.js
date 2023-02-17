const headerBurger = document.querySelector(".header__burger");
const headerMenu   = document.querySelector(".header__menu");
const body         = document.querySelector("body");
headerBurger.addEventListener('click', () => {
    headerBurger.classList.toggle("active");
    headerMenu.classList.toggle("active");
    body.classList.toggle("body--lock");
});

const form          = document.querySelector(".footer__form");
const submitBtn     = form.querySelector(".footer__form-btn");
const inputArr      = Array.from(form);
const validInputArr = [];

inputArr.forEach((el) => {
	if (el.hasAttribute("data-reg")) {
		el.setAttribute("is-valid", 0);
		validInputArr.push(el);
	};
});

form.addEventListener("input", inputHandler);
submitBtn.addEventListener("click", btnHandler);

function inputHandler({target}) {
	if(target.hasAttribute("data-reg")) {
		inputCheck(target);
	};
};

function btnHandler(e) {
	const isAllValid = [];
	validInputArr.forEach((el) => {
		isAllValid.push(el.getAttribute("is-valid"));
	});
	const isValid = isAllValid.reduce((acc, currunet) => {
		return acc && currunet;
	});
	if(!Boolean(Number(isValid))) {
		e.preventDefault();
	}
};

function inputCheck(el) {
	const inputValue = el.value;
	const inputReg   = el.getAttribute("data-reg");
	const reg        = new RegExp(inputReg);


	if(reg.test(inputValue)) {
		el.style.backgroundColor = "#BAE399";
		el.setAttribute("is-valid", 1);
	} else {
		el.style.backgroundColor = "#da6969";
		el.setAttribute("is-valid", 0);
	};
};
