const fs = require('fs');

const path = require('path');
const races = require('../local_storage/races.json');

class LocalStorageManager {
  pathRace = path.join(__dirname, '..', '/local_storage', 'races.json');

  addNewRace(_data) {
    races.push(_data);

    this.writeFileRaces(races);

    return races;
  }

  addNewParticipant(participant) {
    races[participant.index].participants.push(participant.participant);

    this.writeFileRaces(races);

    return races[participant.index].participants;
  }

  addNewCategory(category, index) {
    races[index].categories.push(category);

    this.writeFileRaces(races);

    return races[index].categories;
  }

  addNewParticipantToPodio(raceIndex, participantSubscription, time) {
    const participant = this.returnEspecificParticipant(raceIndex, participantSubscription);

    if (!participant) return null;

    participant.time = time;

    if (this.participantOnPodio(races[raceIndex].podio, participantSubscription)) return null;

    races[raceIndex].podio.push(participant);
    this.writeFileRaces(races);
    return races[raceIndex].podio;
  }

  participantOnPodio(podio, participantSubscription) {
    let letParticipantOnPodio = false;
    podio.forEach((participant) => {
      if (participant.subscription === participantSubscription) {
        letParticipantOnPodio = true;
      }
    });
    return letParticipantOnPodio;
  }

  returnEspecificParticipant(raceIndex, participantSubscription) {
    let letParticipant = null;
    races[raceIndex].participants.forEach((participant) => {
      if (participant.subscription === participantSubscription) {
        letParticipant = participant;
      }
    });
    return letParticipant;
  }

  saveTimer(indexRace, time) {
    races[indexRace].time = time;
    this.writeFileRaces(races);
    return races[indexRace].time;
  }

  resetTime(indexRace) {
    races[indexRace].time = [];
    this.writeFileRaces(races);
    return races[indexRace].time;
  }

  returnTime(indexRace) {
    return races[indexRace].time;
  }

  resetPodioOfRace(indexRace) {
    races[indexRace].podio = [];
    this.writeFileRaces(races);
    return races[indexRace].podio;
  }

  writeFileRaces(races) {
    fs.writeFile(this.pathRace, JSON.stringify(races), (error) => {
      if (error) {
        throw new Error(error);
      }
    });
  }

  delectRace(index) {
    races.splice(index, 1);

    this.writeFileRaces(races);

    return races;
  }

  deleteCategory(indexOfRace, indexOfCategory) {
    races[indexOfRace].categories.splice(indexOfCategory, 1);

    this.writeFileCategory(races);

    return races[indexOfRace].categories;
  }

  deleteParticipant(indexInfomation) {
    const { indexOfPage, index } = indexInfomation;
    races[indexOfPage].participants.splice(index, 1);

    this.writeFileRaces(races);

    return races[indexOfPage].participants;
  }

  returnAllParticipants(index) {
    const { participants } = races[index];
    return participants;
  }

  static returnAllCategories(index) {
    return races[index].categories;
  }

  static returnPodio(indexRace) {
    return races[indexRace].podio;
  }

  static get returnRaces() {
    return races.length === 0 ? [] : races;
  }
}

module.exports = LocalStorageManager;
