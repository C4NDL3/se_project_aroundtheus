export default class UserInfor {
  constructor(nameSelector, descriptionSelector) {
    this._nameElement = document.querySelector(nameSelector);
    this._descriptionElement = document.querySelector(descriptionSelector);
  }

  getUserInfo() {
    const UserInfo = {
      name: this._nameElement.textContent,
      description: this._descriptionElement.textContent,
    };
    return UserInfo;
  }

  setUserInfo(name, description) {
    this._nameElement.textContent = name;
    this._descriptionElement.textContent = description;
  }
}
