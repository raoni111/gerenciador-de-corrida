export default class FormAddAtThePodioManager {
  constructor(formContent, timer, tablePodioManger, ElectronAPIManeger, raceIndex) {
    this.formContent = formContent;
    this.timer = timer;
    this.tablePodioManger = tablePodioManger;
    this.ElectronAPIManeger = ElectronAPIManeger;
    this.raceIndex = raceIndex;
  }

  litenerEvets() {
    this.formContent.addEventListener('submit', (e) => {
      e.preventDefault();
      const allinputs = this.formContent.querySelectorAll('input');
      const participantSubscription = allinputs.item(0).value;
      this.addNewParticipantToPodio(this.raceIndex, participantSubscription);
    });
  }

  async addNewParticipantToPodio(raceIndex, participantSubscription) {
    let letPodio;
    await this.ElectronAPIManeger.addNewParticipantAtThePodio(
      raceIndex,
      participantSubscription,
      this.timer.time,
    ).then((podio) => {
      letPodio = podio;
    });

    if (!letPodio) return;

    this.tablePodioManger.displayParticipant(letPodio);
  }
}
