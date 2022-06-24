export default class InputsGrupsManger {
  constructor(backButton, nextButton, inputsGrups) {
    this.backButton = backButton;
    this.nextButton = nextButton;
    this.inputsGrups = inputsGrups;
  }

  listenButtons() {
    this.nextButton.addEventListener('click', () => {
      this.inputsGrups.setAttribute('next-grup', 'true');
    });
    this.backButton.addEventListener('click', () => {
      this.inputsGrups.setAttribute('next-grup', 'false');
    });
  }
}
