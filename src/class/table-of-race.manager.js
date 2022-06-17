import createUlelement from './service/createUlElement.js';

export default class TableOfRaceManager {
  constructor(tableOfRace) {
    this.tableOfRace = tableOfRace;
  }

  displayRaces(races) {
    this.tableOfRace.textContent = '';
    races.forEach((race, index) => {
      const ul = createUlelement(race, index);
      this.tableOfRace.innerHTML += ul;
    });
  }

  lestenerDelectButton() {
    this.tableOfRace.addEventListener('click', (e) => {
      const { target } = e;
      if (target.className === 'delect-button') {
        const index = target.id.slice(6, 7);
        this.delectRace(index);
      }
    });
  }

  delectRace(index) {
    window.electronAPI.delectRace(index).then((newRaces) => {
      this.displayRaces(newRaces);
    });
  }

  init() {
    window.electronAPI.returnRaces().then((races) => {
      this.displayRaces(races);
    });
    this.lestenerDelectButton();
  }
}
