import Popup from "./Popup";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
    // this._submitButton = this._popupForm.querySelector(".modal__button");
    // this._submitButtonText =
    //   this._submitButton.querySelector("#delete-card-modal");
  }

  setSubmitAction(action) {
    this._handleFormSubmit = action;
  }

  setLoading(submit, loadingText = "Saving...") {
    if (submit) {
      this._submitButton.textContent = loadingText;
    } else {
      this._submitButton.textContent = this._submitButtonText;
    }
  }

  setEventListeners() {
    this._popupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this._handleFormSubmit();
    });
    super.addEventListeners();
  }
}
