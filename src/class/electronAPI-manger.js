export default class ElectronAPIManager {
  static async returnAllRaces() {
    let letRaces;

    await window.electronAPI.returnRaces().then((races) => {
      letRaces = races;
    });
    return letRaces;
  }

  static async returnAllParticipant(index) {
    let letParticipants;
    await window.electronAPI.returnAllParticipant(index).then((participants) => {
      letParticipants = participants;
    });
    return letParticipants;
  }

  static async addNewRace(race) {
    let letRaces;
    await window.electronAPI.addNewRace(race)
      .then((races) => {
        letRaces = races;
      });
    return letRaces;
  }

  static async addNewParticipant(participant) {
    let letParticipants;
    await window.electronAPI.addNewParticipant(participant).then((participants) => {
      letParticipants = participants;
    });
    return letParticipants;
  }

  static async addNewCategory(category) {
    let letCategories;
    await window.electronAPI.addNewCategory(category).then((categories) => {
      letCategories = categories;
    });
    return letCategories;
  }

  static async deleteCategory(indexObj) {
    let letCategories;
    await window.electronAPI.deleteCategory(indexObj).then((categories) => {
      letCategories = categories;
    });
    return letCategories;
  }

  static async returnAllCategory(index) {
    let letCategories;
    await window.electronAPI.returnAllCategory(index).then((categories) => {
      letCategories = categories;
    });
    return letCategories;
  }
}
