const fs = require('fs');

const path = require('path');
const races = require('../local_storage/races.json');

class LocalStorageManager {
  path = path.join(__dirname, '..', '/local_storage', 'races.json');

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

  writeFileRaces(races) {
    fs.writeFile(this.path, JSON.stringify(races), (error) => {
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

  static get returnRaces() {
    if (races.length === 0) return [];
    return races;
  }
}

module.exports = LocalStorageManager;
