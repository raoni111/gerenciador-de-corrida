export default class RaceFactory {
  race = {};

  constructor(allInputs) {
    this.allInputs = allInputs;
  }

  createNewRace() {
    this.race = {
      name: this.allInputs.item(0).value,
      city: this.allInputs.item(1).value,
      date: this.allInputs.item(2).value,
      participants: [],
    };
    return this.race;
  }
}
