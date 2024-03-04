// export default class Section {
//   constructor({ items, renderer }, containerSelector) {
//     this._items = items;
//     this._renderer = renderer;
//     this._container = document.querySelector(containerSelector);
//   }

//   renderItems() {
//     this._items.forEach((data) => {
//       this._renderer(data);
//     });
//   }

//   addItem(Element) {
//     this._container.prepend(Element);
//   }
// }

export default class Section {
  constructor({ renderer }, containerSelector, api) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
    this._api = api;
  }

  renderItems() {
    this._api
      .getInitialCards()
      .then((initialCards) => {
        initialCards.forEach((cardData) => {
          this._renderer(cardData);
        });
      })
      .catch((error) => {
        console.error("Error fetching initial cards", error);
      });
  }

  addItem(element) {
    this._container.prepend(element);
  }
}
