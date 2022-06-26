import { createUlelementPartipantPodio } from './service/createUlElement.js';

export default class TablePodioManger {
  constructor(tablePodioManger, ElectronAPIManager) {
    this.tablePodioManger = tablePodioManger;
    this.ElectronAPIManager = ElectronAPIManager;
  }

  displayParticipant(podio) {
    this.tablePodioManger.textContent = '';
    podio.forEach((participant, index) => {
      const ul = createUlelementPartipantPodio(participant, index);
      this.tablePodioManger.innerHTML += ul;
    });
  }

  initTablePodioManager(indexRace) {
    this.ElectronAPIManager.returnPodio(indexRace).then((podio) => {
      this.displayParticipant(podio);
    });
  }
}
