export const initialCards = [
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

export const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

export const profileEditModal = document.querySelector("#profile-edit-modal");
export const addCardModal = document.querySelector("#profile-add-modal");
export const profileAddButton = document.querySelector(".profile__add-button");
export const profileEditButton = document.querySelector("#profile-edit-button");
export const profileTitleInput = document.querySelector(
  "#profile-edit-title-input"
);
export const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
export const profileEditForm = profileEditModal.querySelector(".modal__form");
export const addCardForm = addCardModal.querySelector(".modal__form");
export const previewCardModal = document.querySelector("#preview-card-modal");
export const profileAvatarButton = document.querySelector(
  ".profile__avatar-button"
);
export const profileAvatarModal = document.querySelector(
  "#profile-avatar-modal"
);
export const profileAvatarForm =
  profileAvatarModal.querySelector(".modal__form");

export const cardDeleteButton = document.querySelector(".card__trash-icon");
export const cardDeleteModal = document.querySelector("#delete-card-modal");
export const cardDeleteForm = cardDeleteModal.querySelector(".modal__form");
