import ParticipantFactory from './participant-factory.js';
import RaceFactory from './race-factory.js';
import clearInputs from './service/clear-input.js';

export default class FormManager {
  reace = {};

  partipant = {};

  constructor(form, tableOfRaceManager, formContainerManager, ElectronAPIManager) {
    this.form = form;
    this.tableOfRaceManager = tableOfRaceManager;
    this.formContainerManager = formContainerManager;
    this.ElectronAPIManager = ElectronAPIManager;
  }

  listenForm(page) {
    this.form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const allInput = e.target.querySelectorAll('input');

      if (page === 'race') {
        this.useCreateNewRace(allInput);
        clearInputs(allInput);
        this.formContainerManager.setAttribute('false');
        return;
      }

      this.useCreateNewParticipant(allInput);
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
    this.ElectronAPIManager.addNewRace(race).then((races) => {
      this.tableOfRaceManager.displayRaces(races);
    });
  }

  useCreateNewParticipant(allInput) {
    const participantFactory = new ParticipantFactory(allInput);
    this.partipant = participantFactory.createNewParticipant();
    this.useAddNewParticipant(this.partipant);
  }

  useAddNewParticipant(participant) {
    const { href } = window.location;
    const index = Number(href.slice(href.length - 1, href.length));

    this.ElectronAPIManager.addNewParticipant({
      participant,
      index,
    }).then((partipants) => {
      this.tableOfRaceManager.displayPartipant(partipants);
    });
  }
}
