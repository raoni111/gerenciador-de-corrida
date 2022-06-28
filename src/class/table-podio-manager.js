import { createUlelementPartipantPodio } from './service/createUlElement.js';

export default class TablePodioManger {
  constructor(tablePodioManger, timer, resetButton, ElectronAPIManager, index) {
    this.tablePodioManger = tablePodioManger;
    this.timer = timer;
    this.resetButton = resetButton;
    this.ElectronAPIManager = ElectronAPIManager;
    this.index = index;
  }

  displayParticipant(podio) {
    this.tablePodioManger.textContent = '';
    podio.forEach((participant, index) => {
      const ul = createUlelementPartipantPodio(participant, index);
      this.tablePodioManger.innerHTML += ul;
    });
  }

  resetPodio(raceIndex) {
    this.ElectronAPIManager.resetPodioOfRace(raceIndex).then((podio) => {
      this.displayParticipant(podio);
    });
    this.timer.restart();
  }

  listenerRestButton() {
    this.resetButton.addEventListener('click', () => {
      this.resetPodio(this.index);
    });
  }

  initTablePodioManager(indexRace) {
    this.ElectronAPIManager.returnPodio(indexRace).then((podio) => {
      this.displayParticipant(podio);
    });
    this.listenerRestButton();
  }
}
