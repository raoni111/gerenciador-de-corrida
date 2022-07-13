/* eslint-disable guard-for-in */
import createInputContent from './service/create-input-content.js';

export default class FormEditInfomationManager {
  constructor(form, ElectronAPIManger, indexRace, indexParticipant = null) {
    this.form = form;
    this.ElectronAPIManger = ElectronAPIManger;
    this.indexRace = indexRace;
    this.indexParticipant = indexParticipant;
  }

  async initFormEditParticipant() {
    let participant;
    await this.ElectronAPIManger.returnAllParticipant(this.indexRace).then((res) => {
      participant = res[this.indexParticipant];
    });

    this.displayInputs(participant);
  }

  displayInputs(participant) {
    for (const key in participant) {
      if (key === 'time') return;
      this.form.innerHTML += createInputContent(participant[key], key);
    }
  }
}
