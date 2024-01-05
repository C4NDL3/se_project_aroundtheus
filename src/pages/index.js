import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import "./index.css";
import Popup from "../components/Popup.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import {
  initialCards,
  config,
  profileEditModal,
  addCardModal,
  profileAddButton,
  profileEditButton,
  profileTitleInput,
  profileDescriptionInput,
  profileEditForm,
  addCardForm,
  previewCardModal,
} from "../utils/constants.js";

const section = new Section(
  {
    items: initialCards,
    renderer: (cardData) => {
      const sectionCard = createCard(cardData);
      section.addItem(sectionCard);
    },
  },
  ".cards__list "
);
section.renderItems();

const cardFormValidator = new FormValidator(config, previewCardModal);
cardFormValidator.enableValidation();
const editFormValidator = new FormValidator(config, profileEditForm);
editFormValidator.enableValidation();
const addCardFormValidator = new FormValidator(config, addCardForm);
addCardFormValidator.enableValidation();
const popupWithImage = new PopupWithImage("#preview-card-modal");
popupWithImage.setEventListeners();

const profileEditPopup = new PopupWithForm(
  "#profile-edit-modal",
  handleProfileEditSubmit
);
profileEditPopup.setEventListeners();
const addCardPopup = new PopupWithForm(
  "#profile-add-modal",
  handleAddImageSubmit
);
addCardPopup.setEventListeners();

const userInfo = new UserInfo(".profile__title", ".profile__description");

document.querySelector(".profile__add-button").addEventListener("click", () => {
  cardFormValidator.toggleButtonState();
  addCardPopup.open();
});

function createCard(cardData) {
  return new Card(cardData, "#card-template", () => {
    popupWithImage.open(cardData.link, cardData.name);
  }).getView();
}

function handleProfileEditSubmit(formData) {
  userInfo.setUserInfo(formData.name, formData.description);
  profileEditPopup.close();
}

function handleAddImageSubmit(formData) {
  const card = createCard({ name: formData.name, link: formData.link });
  section.addItem(card);
  addCardPopup.close();
}

profileEditButton.addEventListener("click", () => {
  const { name, description } = userInfo.getUserInfo();
  profileTitleInput.value = name;
  profileDescriptionInput.value = description;
  profileEditPopup.open();
});

// const card = new Card(cardData, "#card-template");
// Importing Cards

// // Elements
// const profileTitle = document.querySelector(".profile__title");
// const previewImageEl = document.querySelector(".modal__image");
// const previewCaptionEl = document.querySelector(".modal__caption");
// const profileDescription = document.querySelector(".profile__description");
// const addCardTitleInput = document.querySelector("#add-title-input");

// const cardsList = document.querySelector(".cards__list");
// const cardList = document.querySelector(".cards__list");
// const cardTemplate =
//   document.querySelector("#card-template").content.firstElementChild;

// const cardSelector = "#card-template";

// const profileEditCloseButton = document.querySelector(
//   "#edit-profile-close-button"
// );

// const addCardCloseButton = document.querySelector("#add-card-close-button");
// // const cardTitleInput = addCardForm.querySelector(".modal");
// const cardURLInput = addCardForm.querySelector(
//   "#profile-add-description-input"
// );
// const previewImageCloseModal = document.querySelector(
//   "#preview-card-image-close-button"
// );

// // Functions
// function closePopup(modal) {
//   document.removeEventListener("keydown", handleEscape);
//   modal.classList.remove("modal_opened");
// }

// function openPopup(modal) {
//   document.addEventListener("keydown", handleEscape);
//   modal.classList.add("modal_opened");
// }

// function handleEscape(e) {
//   if (e.key === "Escape") {
//     const modalOpened = document.querySelector(".modal_opened");
//     if (modalOpened) {
//       closePopup(modalOpened);
//     }
//   }
// }

// function handleImageClick(cardData) {
//   openPopup(previewCardModal);
//   previewImageEl.setAttribute("src", cardData.link);
//   previewImageEl.setAttribute("alt", cardData.name);
//   previewCaptionEl.textContent = cardData.name;
// }

// function overlayClicked(e) {
//   return e.target === e.currentTarget;
// }

// function closeOverlayClicked(modal, e) {
//   if (overlayClicked(e)) {
//     closePopup(modal);
//   }
// }

// function handleAddCardSubmit(e) {
//   e.preventDefault();
//   const name = addCardTitleInput.value;
//   const link = cardURLInput.value;
//   renderCard({ name, link }, cardList);
//   e.target.reset();
//   closePopup(addCardModal);
//   addCardFormValidator.toggleButtonState();
// }

// function createCard(cardData) {
//   const cardEl = new Card(cardData, cardSelector, handleImageClick);
//   return cardEl.getView();
// }
// function renderCard(cardData, wrapper) {
//   const card = createCard(cardData);
//   wrapper.prepend(card);
// }

// // Event Listeners
// profileEditButton.addEventListener("click", () => {
//   profileTitleInput.value = profileTitle.textContent;
//   profileDescriptionInput.value = profileDescription.textContent;
//   openPopup(profileEditModal);
// });

// profileAddButton.addEventListener("mousedown", () => {
//   openPopup(addCardModal);
// });

// profileEditCloseButton.addEventListener("click", () => {
//   closePopup(profileEditModal);
// });

// addCardCloseButton.addEventListener("click", () => {
//   closePopup(addCardModal);
// });

// previewImageCloseModal.addEventListener("click", () => {
//   closePopup(previewCardModal);
// });

// profileEditForm.addEventListener("submit", (e) => {
//   e.preventDefault();
//   profileTitle.textContent = profileTitleInput.value;
//   profileDescription.textContent = profileDescriptionInput.value;
//   closePopup(profileEditModal);
// });

// addCardForm.addEventListener("submit", handleAddCardSubmit);

// profileEditModal.addEventListener("click", (e) =>
//   closeOverlayClicked(profileEditModal, e)
// );

// addCardModal.addEventListener("click", (e) =>
//   closeOverlayClicked(addCardModal, e)
// );

// previewCardModal.addEventListener("click", (e) =>
//   closeOverlayClicked(previewCardModal, e)
// );

// // Initialization
// // initialCards.forEach((cardData) => {
// //   const card = new Card(cardData, "#card-template", handleImageClick);
// //   const cardElement = card.getView();
// //   cardsList.prepend(cardElement);
// // });

// initialCards.forEach((cardData) => renderCard(cardData, cardsList));

// editFormValidator.enableValidation();
// addCardFormValidator.enableValidation();
