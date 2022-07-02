export default class FormContainerManager {
  togle = false;

  constructor(formContainer, buttonCreateNewRace, buttonClose) {
    this.formContainer = formContainer;
    this.buttonCreateNewRace = buttonCreateNewRace;
    this.buttonClose = buttonClose;
  }

  setAttribute() {
    this.togle = !this.togle;
    this.formContainer.setAttribute('display', `${this.togle}`);
  }

  listenButtonOpenClose() {
    this.buttonCreateNewRace.addEventListener('click', () => {
      this.setAttribute('true');
    });
    this.buttonClose.addEventListener('click', () => {
      this.setAttribute('false');
    });
  }
}
