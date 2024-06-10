export default class Card {
  constructor(
    cardData,
    cardSelector,
    handleImageClick,
    handleDeleteCard,
    handleLike
  ) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteCard = handleDeleteCard;
    this.id = cardData._id;
    this.isLiked = cardData.isLiked;
    this._handleLike = handleLike;
  }
  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      this._handleLike(this);
    });

    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteCard(this);
    });

    this._cardImageEl.addEventListener("click", () => {
      this._handleImageClick({ name: this._name, link: this._link });
    });
  }

  handleDeleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  handleLikeIcon() {
    this._likeButton.classList.toggle("card__like-button_active");
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
    this._likeButton = this._cardElement.querySelector(".card__like-button");

    this._setEventListeners();
    this._renderLikes();

    return this._cardElement;
  }

  // updateLikeStatus(isLiked) {
  //   this.isLiked = isLiked;
  //   this._renderLikes();
  // }

  _renderLikes() {
    if (this.isLiked) {
      this._likeButton.classList.add("card__like-button_active");
    } else {
      this._likeButton.classList.remove("card__like-button_active");
    }
  }
}
