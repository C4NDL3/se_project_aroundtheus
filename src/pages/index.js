import Api from "../components/Api.js";
import Card from "../components/card.js";
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
  cardDeleteButton,
  cardDeleteModal,
  cardDeleteForm,
} from "../utils/constants.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "7de0cfd0-91fd-49fd-9d21-140e9d9b5161",
    "Content-Type": "application/json",
  },
});

let section;

api
  .getInitialCards()
  .then((cards) => {
    section = new Section(
      {
        items: cards,
        renderer: (cardData) => {
          const sectionCard = createCard(cardData);
          section.addItem(sectionCard);
        },
      },
      ".cards__list "
    );

    section.renderItems();
  })
  .catch((error) => {
    console.error("Error fetching initial cards", error);
  });

api
  .getUserInfo()
  .then((userData) => {
    userInfo.setUserInfo({
      name: userData.name,
      about: userData.description,
    });
  })
  .catch((err) => {
    console.log(err);
  });

// User Info
const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  descriptionSelector: ".profile__description",
  avatarSelector: ".profile__image",
});

// Function to handle click event
function handleImageClick({ name, link }) {
  popupWithImage.open(name, link);
}

function createCard(cardData) {
  const card = new Card(cardData, "#card-template", handleImageClick);
  return card.getView();
}

function handleProfileEditSubmit({ name, description }) {
  profileEditPopup.setLoading(true);
  api
    .updateUserInfo(name, description)
    .then(() => {
      userInfo.setUserInfo({ name: name, description: description });
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      profileEditPopup.setLoading(false);
      profileEditPopup.close();
    });
}

function handleAddImageSubmit(name, url) {
  addCardPopup.setLoading(true);
  api
    .addCard(name, url)
    .then((cardData) => {
      const card = createCard(cardData);
      section.addItem(card);
      addCardPopup.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      addCardPopup.setLoading(false);
    });
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

// function handleDeleteCard(cardId) {
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

// Form Validator

const avatarFormValidator = new FormValidator(config, profileAvatarForm);
avatarFormValidator.enableValidation();

const editFormValidator = new FormValidator(config, profileEditForm);
editFormValidator.enableValidation();

const addCardFormValidator = new FormValidator(config, addCardForm);
addCardFormValidator.enableValidation();

// Popup with form

const profileAvatarPopup = new PopupWithForm(
  "#profile-avatar-modal",
  profileAvatarButton,
  handleAvatarSubmit
);

profileAvatarButton.addEventListener("click", () => {
  profileAvatarPopup.open();
});
profileAvatarPopup.setEventListeners();

const profileEditPopup = new PopupWithForm(
  "#profile-edit-modal",
  handleProfileEditSubmit
);

profileEditButton.addEventListener("click", () => {
  editFormValidator.resetValidation();
  const { name, description } = userInfo.getUserInfo();
  profileTitleInput.value = name;
  profileDescriptionInput.value = description;
  profileEditPopup.open();
});

profileEditPopup.setEventListeners();

const addCardPopup = new PopupWithForm(
  "#profile-add-modal",
  handleAddImageSubmit
);

profileAddButton.addEventListener("click", () => {
  addCardFormValidator.resetValidation();
  addCardPopup.open();
});

addCardPopup.setEventListeners();

// cardDeleteButton.addEventListener("click", () => {
//   cardDeletePopup.open();
// });

// Preview Card
const popupWithImage = new PopupWithImage("#preview-card-modal");
popupWithImage.addEventListeners();

// Delete Card
// const cardDeleteFormValidator = new FormValidator(config, cardDeleteForm);
// cardDeleteFormValidator.enableValidation();

const cardDeletePopup = new PopupWithConfirmation("#delete-card-modal");
cardDeletePopup.setEventListeners();
