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
}
