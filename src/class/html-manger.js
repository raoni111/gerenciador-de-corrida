export default class HTMLManager {
  constructor(ElectronAPIManager) {
    this.ElectronAPIManager = ElectronAPIManager;
  }

  renderInformation(index) {
    this.ElectronAPIManager.returnAllRaces().then((races) => {
      this.setTitleOfTable(races[index]);
      this.setTitleOfPage(races[index]);
    });
  }

  setTitleOfTable(race) {
    const titleOfPage = document.querySelector('.title-page');
    titleOfPage.textContent = race.name;
  }

  setTitleOfPage(race) {
    document.title = race.name;
  }
}
