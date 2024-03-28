export default class Card {
  constructor(cardData, cardSelector, handleImageClick, handleDeleteCard, id) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteCard = handleDeleteCard;
    this._id = id;
  }

  _setEventListeners() {
    this._cardElement
      .querySelector(".card__like-button")
      .addEventListener("click", () => {
        this._handleLikeIcon();
      });

    // this._cardElement
    //   .querySelector(".card__trash-icon")
    //   .addEventListener("click", () => {
    //     this._handleDeleteCard();
    //   });

    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteCard(this);
    });

    this._cardImageEl.addEventListener("click", () => {
      this._handleImageClick({ name: this._name, link: this._link });
    });
  }

  _handleDeleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _handleLikeIcon() {
    this._cardElement
      .querySelector(".card__like-button")
      .classList.toggle("card__like-button_active");
  }

  _getElement() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  getView() {
    this._cardElement = this._getElement();
    this._cardTitleEl = this._cardElement.querySelector(".card__title");
    // this._cardImageEl.querySelector(".card__image").src = this._link;
    // this._cardImageEl.querySelector(".card__image").alt = this._name;
    this._cardImageEl = this._cardElement.querySelector(".card__image");

    this._cardImageEl.src = this._link;
    this._cardImageEl.alt = this._name;
    this._cardTitleEl.textContent = this._name;
    this._deleteButton = this._cardElement.querySelector(".card__trash-icon");

    this._setEventListeners();

    return this._cardElement;
  }

  updateLikeStatus(isLiked) {
    this.isLiked = isLiked;
    this._renderLikes();
  }

  getId() {
    return this.id;
  }

  _renderLikes() {
    if (this.isLiked) {
      this._handleLikeIcon.classList.add(".card__like-button_active");
    } else {
      this._handleLikeIcon.classList.remove(".card__like-button_active");
    }
  }
}
