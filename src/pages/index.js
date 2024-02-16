import Api from "../components/Api.js";
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
  profileAvatarButton,
  profileAvatarModal,
  profileAvatarForm,
} from "../utils/constants.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "7de0cfd0-91fd-49fd-9d21-140e9d9b5161",
    "Content-Type": "application/json",
  },
});

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
// User Info
const userInfo = new UserInfo(
  ".profile__title",
  ".profile__description",
  ".profile__image"
);

// ADD CARD
const addCardPopup = new PopupWithForm(
  "#profile-add-modal",
  handleAddImageSubmit
);
addCardPopup.setEventListeners();
const addCardFormValidator = new FormValidator(config, addCardForm);
addCardFormValidator.enableValidation();
profileAddButton.addEventListener("click", () => {
  addCardFormValidator.resetValidation();
  addCardPopup.open();
});

// Profile Edit
const profileEditPopup = new PopupWithForm(
  "#profile-edit-modal",
  handleProfileEditSubmit
);
const editFormValidator = new FormValidator(config, profileEditForm);
editFormValidator.enableValidation();

profileEditButton.addEventListener("click", () => {
  editFormValidator.resetValidation();
  const { name, description } = userInfo.getUserInfo();
  profileTitleInput.value = name;
  profileDescriptionInput.value = description;
  profileEditPopup.open();
});

profileEditPopup.setEventListeners();

// Edit Avatar
const profileAvatarPopup = new PopupWithForm(
  "#profile-avatar-modal",
  handleAvatarSubmit
);
const avatarFormValidator = new FormValidator(config, profileAvatarForm);
avatarFormValidator.enableValidation();

profileAvatarButton.addEventListener("click", () => {
  avatarFormValidator.resetValidation();
  profileAvatarPopup.open();
});
profileAvatarPopup.setEventListeners();

// Preview Card
const popupWithImage = new PopupWithImage("#preview-card-modal");
popupWithImage.addEventListeners();
// function handleImageClick(link, name) {
//   previewImageEl.src = link;
//   previewImageEl.alt = name;
//   previewCaptionEl.textContent = name;
//   popupWithImage.open(link, name);
// }

// Delete Card
const cardDeletePopup = new PopupWithConfirmation("#delete-card-modal");

// Function to handle click event
function handleImageClick({ name, link }) {
  popupWithImage.open(name, link);
}
// document.querySelector(".profile__add-button").addEventListener("click", () => {
//   cardFormValidator.toggleButtonState();
//   addCardPopup.open();
// });

function createCard(cardData) {
  const card = new Card(cardData, "#card-template", handleImageClick);
  return card.getView();
}

// function createCard(cardData) {
//   return new Card(cardData, "#card-template", () => {
//     popupWithImage.open(cardData.link, cardData.name);
//   }).getView();
// }

function handleProfileEditSubmit(formData) {
  profileEditPopup.setLoading(true);
  api.profileUpdate(formData).then((userData) => {
    userInfo.setUserInfo(formData.name, formData.description);
  });
  profileEditPopup.close();
}

function handleAddImageSubmit(formData) {
  const card = createCard({ name: formData.name, link: formData.url });
  section.addItem(card);
}

function handleAvatarSubmit(url) {
  profileAvatarPopup.setLoading(true);
  api
    .updateAvatar(url)
    .then((data) => {
      userInfo.setAvatar(data.avatar);
      profileAvatarPopup.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      profileAvatarPopup.setLoading(false);
    });
}

// function handleTrashCard(cardId) {
//   cardDeletePopup.open();
//   cardDeletePopup.setSubmitAction(() => {
//     cardDeletePopup.setLoading(true, "Deleting...");
//     api
//       .deletecard(cardId._id)
//       .then(() => {
//         cardDeletePopup.close();
//         cardId.removeCard();
//       })
//       .catch((err) => {
//         console.error(err);
//       })
//       .finally(() => {
//         cardDeletePopup.setLoading(false, "Yes");
//       });
//   });
// }
