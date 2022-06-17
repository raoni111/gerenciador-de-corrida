const fs = require('fs');

const path = require('path');
const races = require('../local_storage/races.json');

class LocalStorageManager {
  path = path.join(__dirname, '..', '/local_storage', 'races.json');

  addNewRace(_data) {
    races.push(_data);

    fs.writeFile(this.path, JSON.stringify(races), (error) => {
      if (error) {
        throw new Error(error);
      }
    });
    return races;
  }

  delectRace(index) {
    races.splice(index, 1);
    fs.writeFile(this.path, JSON.stringify(races), (error) => {
      if (error) {
        throw new Error(error);
      }
    });
    return races;
  }

  static get returnRaces() {
    if (races.length === 0) return [];
    return races;
  }
}

module.exports = LocalStorageManager;
