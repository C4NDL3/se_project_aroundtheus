export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  renderResult(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Error: ${res.status}`);
    }
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: "GET",
      headers: this._headers,
    }).then(this.renderResult);
  }

  addCard(name, url) {
    return fetch(`${this._baseUrl}/v1/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ name, url }),
    }).then(this.renderResult);
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: this._headers,
    }).then(this.renderResult);
  }

  updateAvatar(url) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: url.avatar,
      }),
    }).then(this.renderResult);
  }

  deletecard(card) {
    return fetch(`${this._baseUrl}/cards/${card}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this.renderResult);
  }
}
