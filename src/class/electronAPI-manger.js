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

  static async resetPodioOfRace(indexRace) {
    let letPodio;
    await window.electronAPI.resetPodioOfRace(indexRace).then((podio) => {
      letPodio = podio;
    });
    return letPodio;
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

  static async addNewParticipantAtThePodio(raceIndex, participantSubscription, time) {
    let letPodio;
    await window.electronAPI.addNewParticipantAtThePodio({
      raceIndex,
      participantSubscription,
      time,
    }).then((podio) => {
      letPodio = podio;
    });
    return letPodio;
  }

  static async returnPodio(indexRace) {
    let letPodio;
    await window.electronAPI.returnPodio(indexRace).then((podio) => {
      letPodio = podio;
    });
    return letPodio;
  }

  static async saveTimeOfRace(indexRace, time) {
    let letTime;
    await window.electronAPI.saveTimeOfRace({
      indexRace,
      time,
    }).then((time) => {
      letTime = time;
    });
    return letTime;
  }

  static async returnTimeOfRace(indexRace) {
    let letTime;
    await window.electronAPI.returnTimeOfRace(indexRace).then((time) => {
      letTime = time;
    });
    return letTime;
  }

  static async resetTimeOfRace(indexRace) {
    let letTime;
    await window.electronAPI.resetTimeOfRace(indexRace).then((time) => {
      letTime = time;
    });
    return letTime;
  }

  static async generatePDF(index) {
    window.electronAPI.generatePDF(index);
  }

  static async setStateOfRace(indexRace, state) {
    await window.electronAPI.setStateOfRace({
      indexOfRace: indexRace,
      state,
    });
  }

  static async returnStateOfRace(indexRace) {
    let letState;
    await window.electronAPI.returnStateOfRace(indexRace).then((state) => {
      letState = state;
    });
    return letState;
  }

  static async searchByCategory(categoryIndex, indexRace) {
    let letEspecificParticipants;
    await window.electronAPI.searchByCategory({
      categoryIndex,
      indexRace,
    }).then((especificParticipants) => {
      letEspecificParticipants = especificParticipants;
    });
    return letEspecificParticipants;
  }
}
