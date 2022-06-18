export default class ParticipantFactory {
  participant;

  constructor(allInput) {
    this.allInput = allInput;
  }

  createNewParticipant() {
    this.participant = {
      name: this.allInput.item(0).value,
      hometown: this.allInput.item(1).value,
      state: this.allInput.item(2).value,
      category: this.allInput.item(3).value,
      sex: this.allInput.item(4).value,
    };
    return this.participant;
  }
}
