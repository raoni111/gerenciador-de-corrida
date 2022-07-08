export default class HTMLManager {
  constructor(ElectronAPIManager) {
    this.ElectronAPIManager = ElectronAPIManager;
  }

  renderInformation(index, before = '') {
    this.ElectronAPIManager.returnAllRaces().then((races) => {
      this.setTitleOfTable(races[index], before);
      this.setTitleOfPage(races[index], before);
    });
  }

  setTitleOfTable(race, before) {
    const titleOfPage = document.querySelector('.title-page');
    titleOfPage.textContent += `${before} ${race.name}`;
  }

  setTitleOfPage(race, before) {
    const titlebar = document.getElementById('title-bar');
    titlebar.textContent = `${before} ${race.name}`;
  }
}
