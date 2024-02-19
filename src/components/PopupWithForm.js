import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._handleFormSubmit = handleFormSubmit;
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._submitButton = this._popupForm.querySelector(".modal__button-text");
  }

  _getInputValues() {
    const inputList = this._popupForm.querySelectorAll(".modal__input");
    const formData = {};
    inputList.forEach((input) => {
      formData[input.name] = input.value;
    });
    return formData;
  }

  // setLoading(submit, loadingText = "Saving...") {
  //   if (submit) {
  //     this._handleFormSubmit.textContent = loadingText;
  //   } else {
  //     this._handleFormSubmit.textContent = this._submitButtonText;
  //   }
  // }

  setLoading(isLoading) {
    if (isLoading) {
      this._submitButton.textContent = "Saving...";
    } else {
      this._submitButton.textContent = "Save";
    }
  }

  setEventListeners() {
    super.addEventListeners();
    this._popupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.close();
    });
  }

  close() {
    this._popupForm.reset();
    super.close();
  }
}
