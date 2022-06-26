export default class ParticipantFactory {
  participant;

  constructor(allInput) {
    this.allInput = allInput;
  }

  createNewParticipant() {
    this.participant = {
      name: this.allInput.item(0).value,
      surname: this.allInput.item(1).value,
      subscription: this.allInput.item(2).value,
      hometown: this.allInput.item(3).value,
      state: this.allInput.item(4).value,
      category: this.allInput.item(5).value,
      sex: this.allInput.item(6).value,
      dateOfBirth: this.allInput.item(7).value,
      tell: this.allInput.item(8).value,
      email: this.allInput.item(9).value,
      sponsor: this.allInput.item(10).value,
      time: '',
    };
    return this.participant;
  }
}
