export default class EditInformationManager {
  constructor(hundle, indexRace) {
    this.hundle = hundle;
    this.indexRace = indexRace;
  }

  eventListener() {
    document.addEventListener('click', (e) => {
      const { target } = e;
      const { parentElement } = target;
      const indexParticipant = target.id;

      if (target.className === this.hundle && target.className !== 'delect-button') {
        this.redirectUser(indexParticipant);
      } else if (parentElement.className === this.hundle && target.className !== 'delect-button') {
        this.redirectUser(indexParticipant);
      }
    });
  }

  redirectUser(indexParticipant) {
    window.location = `../edit-infomation/index.html?indexRace=${this.indexRace}&indexParticipant=${indexParticipant}`;
  }
}
