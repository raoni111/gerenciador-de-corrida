export default class FormContainerManager {
  constructor(formContainer, buttonCreateNewRace, buttonClose) {
    this.formContainer = formContainer;
    this.buttonCreateNewRace = buttonCreateNewRace;
    this.buttonClose = buttonClose;
  }

  setAttribute(boolean) {
    this.formContainer.setAttribute('display', boolean);
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
