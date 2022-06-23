import { createUlelementPartipant, createUlelementRace } from './service/createUlElement.js';

export default class TableManager {
  constructor(tableOfRace, ElectronAPIManager) {
    const { href } = window.location;
    this.index = Number(href.slice(href.length - 1, href.length));
    this.tableOfRace = tableOfRace;
    this.ElectronAPIManager = ElectronAPIManager;
  }

  displayRaces(races) {
    this.tableOfRace.textContent = '';
    races.forEach((race, index) => {
      const ul = createUlelementRace(race, index);
      this.tableOfRace.innerHTML += ul;
    });
  }

  displayPartipant(participants) {
    this.tableOfRace.textContent = '';
    participants.forEach((participant, index) => {
      const ul = createUlelementPartipant(participant, index);
      this.tableOfRace.innerHTML += ul;
    });
  }

  lestenerDelectButton(page) {
    this.tableOfRace.addEventListener('click', (e) => {
      const { target } = e;
      const { tagName } = target;
      const index = target.id.slice(6, 7);

      if (target.className === 'delect-button') {
        if (page === 'race') {
          this.delectRace(index);
          return;
        }
        this.deleteParticipant(this.index, index);
      }

      if (tagName === 'UL' || tagName === 'LI') {
        window.location = `../race/index.html?index=${index}`;
      }
    });
  }

  delectRace(index) {
    window.electronAPI.delectRace(index).then((newRaces) => {
      this.displayRaces(newRaces);
    });
  }

  deleteParticipant(indexOfPage, index) {
    window.electronAPI.deleteParticipant({
      indexOfPage,
      index,
    }).then((participants) => {
      this.displayPartipant(participants);
    });
  }

  initRaces() {
    this.ElectronAPIManager.returnAllRaces().then((races) => {
      this.displayRaces(races);
    });
    this.lestenerDelectButton('race');
  }

  initParticipant(index) {
    this.ElectronAPIManager.returnAllParticipant(index).then((participants) => {
      this.displayPartipant(participants);
    });
    this.lestenerDelectButton('participant');
  }
}