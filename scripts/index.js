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
// Elements
const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileAddModal = document.querySelector("#profile-add-modal");
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
const addCardForm = profileAddModal.querySelector(".modal__form");
const cardsList = document.querySelector(".cards__list");
const cardList = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const profileEditCloseButton = document.querySelector(
  "#edit-profile-close-button"
);

const addCardCloseButton = document.querySelector("#add-card-close-button");
const cardTitleInput = addCardForm.querySelector(".modal");
const cardURLInput = addCardForm.querySelector(".modal__input_type_url");
const previewImageCloseModal = document.querySelector(
  "#preview-card-image-close-button"
);

//Functions
function closePopup(modal) {
  modal.classList.remove("modal__opened");
  document.removeEventListener("keydown", handleEscape);
}

function openPopup(modal) {
  modal.classList.add("modal__opened");
  document.addEventListener("keydown", handleEscape);
}

function handleEscape(e) {
  if (e.key === "Escape") {
    const modal = document.querySelector(".modal__opened");
    closePopup(modal);
  }
}

// function cardDeleteButton(evt) {
//   evt.target.closest(".card").remove();
// }

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });

  const cardDeleteButton = cardElement.querySelector(".card__trash-icon");
  cardDeleteButton.addEventListener("click", () => {
    cardElement.remove();
  });
  // const deleteButton = cardElement.querySelector(".card__trash-icon");
  // deleteButton.addEventListener("click", cardDeleteButton);

  cardImageEl.setAttribute("src", cardData.link);
  cardImageEl.setAttribute("alt", cardData.name);
  cardTitleEl.textContent = cardData.name;

  cardImageEl.addEventListener("click", function () {
    openPopup(previewCardModal);
    previewImageEl.setAttribute("src", cardData.link);
    previewImageEl.setAttribute("alt", cardData.name);
    previewCaptionEl.textContent = cardData.name;
  });

  return cardElement;
}

//EventListener
profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openPopup(profileEditModal);
});

profileAddButton.addEventListener("click", () => {
  openPopup(profileAddModal);
});

// profileEditCloseButton.addEventListener("click", () => {
//   closePopup(profileEditModal);
// });

// addCardCloseButton.addEventListener("click", () => {
//   closePopup(profileAddModal);
// });

// previewImageCloseModal.addEventListener("click", () => {
//   closePopup(previewCardModal);
// });

profileEditForm.addEventListener("submit", (e) => {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup(profileEditModal);
});

addCardForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const cardData = { name: addCardTitleInput.value, link: cardURLInput.value };
  const cardElement = getCardElement(cardData);
  cardsList.prepend(cardElement);
  closePopup(profileAddModal);
  addCardForm.reset();
});

const popups = document.querySelectorAll(".modal");

popups.forEach((popup) => {
  popup.addEventListener("mousedown", (e) => {
    if (e.target.classList.contains("modal__opened")) {
      closePopup(popup);
    }
    if (e.target.classList.contains("modal__close")) {
      closePopup(popup);
    }
  });
});

//Initialization

initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  cardsList.prepend(cardElement);
});
