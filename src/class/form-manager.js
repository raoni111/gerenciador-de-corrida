import RaceFactory from './race-factory.js';
import clearInputs from './service/clear-input.js';

export default class FormManager {
  reace = {};

  constructor(form, tableOfRaceManager, formContainerManager) {
    this.form = form;
    this.tableOfRaceManager = tableOfRaceManager;
    this.formContainerManager = formContainerManager;
  }

  listenForm() {
    this.form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const allInput = e.target.querySelectorAll('input');
      this.useCreateNewRace(allInput);
      clearInputs(allInput);
      this.formContainerManager.setAttribute('false');
    });
  }

  useCreateNewRace(allInput) {
    const raceFactory = new RaceFactory(allInput);
    this.race = raceFactory.createNewRace();
    this.useAddNewRace(this.race);
  }

  useAddNewRace(race) {
    window.electronAPI.addNewRace(race)
      .then((response) => {
        this.tableOfRaceManager.displayRaces(response);
      });
  }
}
