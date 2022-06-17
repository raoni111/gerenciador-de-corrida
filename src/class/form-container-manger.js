export default class FormContainerManager {
  constructor(formContainerManager) {
    this.formContainerManager = formContainerManager;
  }

  setAttribute(boolean) {
    this.formContainerManager.setAttribute('display', boolean);
  }
}
