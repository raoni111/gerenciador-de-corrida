// Modules to control application life and create native browser window
const {
  app, BrowserWindow, ipcMain,
} = require('electron');
const path = require('path');
const LocalStorageManager = require('./src/class/local-storage-manager');

class MyApllication {
  mainWindow;

  createWindow() {
    this.mainWindow = new BrowserWindow({
      width: 1200,
      height: 700,
      webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
        nodeIntegration: true,
      },
      autoHideMenuBar: false,
    });

    this.mainWindow.loadFile(`${__dirname}/src/page/create-new-race/index.html`);
  }

  loadNewFile(filePath) {
    this.mainWindow.loadFile(filePath);
  }
}

// class init
const myApllication = new MyApllication();
const localStorageManager = new LocalStorageManager();

app.whenReady().then(() => {
  myApllication.createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) { myApllication.createWindow(); }
  });
});
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

// ipcMain space
ipcMain.handle('return-races', () => LocalStorageManager.returnRaces);

ipcMain.handle('add-new-race', (event, data) => {
  const race = localStorageManager.addNewRace(data);
  return race;
});

ipcMain.handle('delect-race', (event, index) => {
  const newRaces = localStorageManager.delectRace(index);
  return newRaces;
});

ipcMain.handle('delete-participant', (event, indexInfomation) => {
  const addNewParticipants = localStorageManager.deleteParticipant(indexInfomation);
  return addNewParticipants;
});

ipcMain.handle('add-new-participant', (event, participant) => {
  const participants = localStorageManager.addNewParticipant(participant);
  return participants;
});

ipcMain.handle('add-new-category', (event, categoryObj) => {
  const categories = localStorageManager.addNewCategory(categoryObj.category, categoryObj.index);
  return categories;
});

ipcMain.handle('return-all-category', (event, index) => LocalStorageManager.returnAllCategories(index));

ipcMain.handle('return-participant', (event, index) => localStorageManager.returnAllParticipants(index));

ipcMain.handle('delete-category', (event, indexObj) => {
  const newCategories = localStorageManager.deleteCategory(
    indexObj.indexOfRace,
    indexObj.indexOfCategory,
  );
  return newCategories;
});
