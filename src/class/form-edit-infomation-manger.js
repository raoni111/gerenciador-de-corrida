/* eslint-disable guard-for-in */
import createInputContent from './service/create-input-content.js';

export default class FormEditInfomationManager {
  infomation;

  participant;

  constructor(form, formContent, ElectronAPIManger, indexRace, indexParticipant = null) {
    this.form = form;
    this.formContent = formContent;
    this.ElectronAPIManger = ElectronAPIManger;
    this.indexRace = indexRace;
    this.indexParticipant = indexParticipant;

    this.infomation = {
      indexRace: this.indexRace,
      indexParticipant: this.indexParticipant,
      infos: [],
    };
  }

  async initFormEditParticipant() {
    await this.ElectronAPIManger.returnAllParticipant(this.indexRace).then((res) => {
      this.participant = res[this.indexParticipant];
    });

    this.listenerForm();
    this.displayInputs(this.participant);
  }

  listenerForm() {
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();

      this.aditInfomation(e);
      this.editParticipant();
      this.postParticipant();
    });
  }

  aditInfomation(e) {
    this.infomation.infos = [];

    e.path[0].querySelectorAll('input').forEach((input) => {
      this.addInfomation(input);
    });
  }

  addInfomation(input) {
    this.infomation.infos.push({
      key: input.id.replace('key-', '').replace('input-of-', '').trim(),
      value: input.value.trim(),
    });
  }

  editParticipant() {
    this.infomation.infos.forEach((info) => {
      for (const key in this.participant) {
        if (info.key.trim() === key.trim()) {
          this.participant[key] = info.value;
        }
      }
    });
  }

  postParticipant() {
    this.ElectronAPIManger.editParticipant(
      this.indexRace,
      this.indexParticipant,
      this.participant,
    ).then((res) => {
      if (res) {
        window.location = `../participants/index.html?index=${this.indexRace}`;
      }
    });
  }

  displayInputs(participant) {
    for (const key in participant) {
      if (key === 'time') return;
      this.formContent.innerHTML += createInputContent(participant[key], key);
    }
  }
}
