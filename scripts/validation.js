function showInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
  const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
  inputEl.classList.add(inputErrorClass);
  errorMessageEl.textContent = inputEl.validationMessage;
  errorMessageEl.classList.add(errorClass);
}

function hideInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
  const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
  inputEl.classList.remove(inputErrorClass);
  errorMessageEl.textContent = "";
  errorMessageEl.classList.remove(errorClass);
}

function checkInputValidity(formEl, inputEl, options) {
  if (!inputEl.validity.valid) {
    showInputError(formEl, inputEl, options);
  } else {
    hideInputError(formEl, inputEl, options);
  }
}

function hasInvalidInput(inputList) {
  return !inputList.every((inputEl) => inputEl.validity.valid);
}

function disableButton(button, inactiveButtonClass) {
  button.classList.add(inactiveButtonClass);
  button.disabled = true;
}

function enableButton(button, inactiveButtonClass) {
  button.classList.remove(inactiveButtonClass);
  button.disabled = false;
}

function toggleButtonState(inputEls, submitButton, options) {
  let foundInvalid = false;
  inputEls.forEach((inputEl) => {
    if (!inputEl.validity.valid) {
      foundInvalid = true;
    }
  });

  if (foundInvalid) {
    disableButton(submitButton, options.inactiveButtonClass);
  } else {
    enableButton(submitButton, options.inactiveButtonClass);
  }
}

function setEventListeners(formEl, options) {
  const { inputSelector } = options;
  const inputEls = [...formEl.querySelectorAll(inputSelector)];
  const submitButton = formEl.querySelector(options.submitButtonSelector);
  toggleButtonState(inputEls, submitButton, options);
  inputEls.forEach((inputEl) => {
    inputEl.addEventListener("input", (e) => {
      checkInputValidity(formEl, inputEl, options);
      toggleButtonState(inputEls, submitButton, options);
    });
  });
}

function enableValidation(options) {
  const formEls = [...document.querySelectorAll(options.formSelector)];
  formEls.forEach((formEl) => {
    formEl.addEventListener("submit", (e) => {
      e.preventDefault();
    });

    setEventListeners(formEl, options);
    //look for all inputs inside of form
    //loop throught all the inputs to see if all are valid
    //if input is not valid
    //grab validation message
    //add error class to input
    //display error message
    //button disable button
    //if all inputs are valid
    //enable button
    //reset error messages
  });
}

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error",
};

enableValidation(config);
