import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },

  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },

  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },

  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },

  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },

  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

const cardData = {
  name: "Yosemite Valley",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
};
// const card = new Card(cardData, "#card-template");
// Importing Cards

// Elements
const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const addCardModal = document.querySelector("#profile-add-modal");
const previewCardModal = document.querySelector("#preview-card-modal");
const profileTitle = document.querySelector(".profile__title");
const previewImageEl = document.querySelector(".modal__image");
const previewCaptionEl = document.querySelector(".modal__caption");
const profileDescription = document.querySelector(".profile__description");
const profileAddButton = document.querySelector(".profile__add-button");
const profileTitleInput = document.querySelector("#profile-edit-title-input");
const addCardTitleInput = document.querySelector("#add-title-input");

const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);

const profileEditForm = profileEditModal.querySelector(".modal__form");
const addCardForm = addCardModal.querySelector(".modal__form");
const cardsList = document.querySelector(".cards__list");
const cardList = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const profileEditCloseButton = document.querySelector(
  "#edit-profile-close-button"
);

const addCardCloseButton = document.querySelector("#add-card-close-button");
const cardTitleInput = addCardForm.querySelector(".modal");
const cardURLInput = addCardForm.querySelector(".modal__input");
const previewImageCloseModal = document.querySelector(
  "#preview-card-image-close-button"
);

// Objects
const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};
const editFormValidator = new FormValidator(config, profileEditForm);
const addCardFormValidator = new FormValidator(config, addCardForm);

// Functions
function closePopup(modal) {
  document.removeEventListener("keydown", handleEscape);
  modal.classList.remove("modal_opened");
}

function openPopup(modal) {
  document.addEventListener("keydown", handleEscape);
  modal.classList.add("modal_opened");
}

function handleEscape(e) {
  if (e.key === "Escape") {
    const modalOpened = document.querySelector(".modal_opened");
    if (modalOpened) {
      closePopup(modalOpened);
    }
  }
}

function handleImageClick(cardData) {
  openPopup(previewCardModal);
  previewImageEl.setAttribute("src", cardData.link);
  previewImageEl.setAttribute("alt", cardData.name);
  previewCaptionEl.textContent = cardData.name;
}

function overlayClicked(e) {
  return e.target === e.currentTarget;
}

function closeOverlayClicked(modal, e) {
  if (overlayClicked(e)) {
    closePopup(modal);
  }
}

function handleAddCardSubmit(e) {
  e.preventDefault();
  const name = addCardTitleInput.value;
  const link = cardURLInput.value;
  renderCard({ name, link }, cardList);
  e.target.reset();
  closePopup();
}

function renderCard(cardData, wrapper) {
  const cardElement = getCardElement(cardData);
  wrapper.prepend(cardElement);
}
function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__trash-icon");

  cardImageEl.addEventListener("click", () => {
    modalImageEl.src = cardData.link;
    modalImageEl.alt = cardData.name;
    modalCaptionEl.textContent = cardData.name;
    openPopup(previewImageModal);
  });

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });
  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });
  cardImageEl.src = cardData.link;
  cardImageEl.alt = cardData.name;
  cardTitleEl.textContent = cardData.name;
  return cardElement;
}

// Event Listeners
profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openPopup(profileEditModal);
});

profileAddButton.addEventListener("mousedown", () => {
  openPopup(addCardModal);
});

profileEditCloseButton.addEventListener("click", () => {
  closePopup(profileEditModal);
});

addCardCloseButton.addEventListener("click", () => {
  closePopup(addCardModal);
});

previewImageCloseModal.addEventListener("click", () => {
  closePopup(previewCardModal);
});

profileEditForm.addEventListener("submit", (e) => {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup(profileEditModal);
});

addCardForm.addEventListener("submit", handleAddCardSubmit);

// addCardForm.addEventListener("submit", (e) => {
//   e.preventDefault();
//   const cardData = { name: addCardTitleInput.value, link: cardURLInput.value };
//   const card = new Card(cardData, "#card-template", handleImageClick);
//   cardsList.prepend(card.getView());
//   closePopup(addCardModal);
//   addCardForm.reset(".modal__button_disabled");
// });

const modals = [...document.querySelectorAll("modal")];
modals.forEach((modal) => {
  modal.addEventListener("mousedown", (e) => {
    if (e.target === e.currentTarget) {
      closePopup(e.currentTarget);
    }
  });
});

profileEditModal.addEventListener("click", (e) =>
  closeOverlayClicked(profileEditModal, e)
);

addCardModal.addEventListener("click", (e) =>
  closeOverlayClicked(addCardModal, e)
);

previewCardModal.addEventListener("click", (e) =>
  closeOverlayClicked(previewCardModal, e)
);

// Initialization
initialCards.forEach((cardData) => {
  const card = new Card(cardData, "#card-template", handleImageClick);
  const cardElement = card.getView();
  cardsList.prepend(cardElement);
});

editFormValidator.enableValidation();
addCardFormValidator.enableValidation();
