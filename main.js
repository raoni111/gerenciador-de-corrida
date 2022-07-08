/* eslint-disable global-require */
/* eslint-disable import/no-unresolved */
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = 'true';
const {
  app, BrowserWindow, ipcMain,
} = require('electron');
const path = require('path');
const DisplayPDF = require('./src/class/display-pdf');
const GeneretePdf = require('./src/class/genarete-pdf');
const LocalStorageManager = require('./src/class/local-storage-manager');

require('update-electron-app')({
  repo: 'https://github.com/raoni111/gerenciador-de-corrida',
  updateInterval: '1 hour',
});

class MyApllication {
  /**
   * @type { Electron.BrowserWindowConstructorOptions electron }
   */
  mainWindow;

  createWindow() {
    this.mainWindow = new BrowserWindow({
      minWidth: 1200,
      minHeight: 700,
      webPreferences: {
        plugins: true,
        preload: path.join(__dirname, 'preload.js'),
        nodeIntegration: true,
        webSecurity: false,
        devTools: true,
      },
      autoHideMenuBar: false,
      titleBarStyle: 'hidden',
      icon: path.join(__dirname, '/src/icon/icon.png'),
    });
    this.mainWindow.loadFile(`${__dirname}/src/page/create-new-race/index.html`);

    this.mainWindow.on('maximize', () => {
      this.mainWindow.webContents.send('maximized');
    });
    this.mainWindow.on('unmaximize', () => {
      this.mainWindow.webContents.send('minimized');
    });
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

ipcMain.handle('close-window', () => {
  myApllication.mainWindow.close();
});

ipcMain.handle('minimize-window', () => {
  myApllication.mainWindow.minimize();
});

ipcMain.handle('maxmize-window', () => {
  if (!myApllication.mainWindow.isMaximized()) {
    myApllication.mainWindow.maximize();
    return 'maximized';
  }
  myApllication.mainWindow.restore();
  return 'minimized';
});

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

ipcMain.handle('return-podio', (event, indexRace) => LocalStorageManager.returnPodio(indexRace));

ipcMain.handle('return-participant', (event, index) => localStorageManager.returnAllParticipants(index));

ipcMain.handle('delete-category', (event, indexObj) => {
  const newCategories = localStorageManager.deleteCategory(
    indexObj.indexOfRace,
    indexObj.indexOfCategory,
  );
  return newCategories;
});

ipcMain.handle('add-new-participant-at-the-podio', (event, participantInfomation) => {
  const newPodio = localStorageManager.addNewParticipantToPodio(
    participantInfomation.raceIndex,
    participantInfomation.participantSubscription,
    participantInfomation.time,
  );
  return newPodio;
});

ipcMain.handle('reset-podio-of-race', (event, indexRace) => {
  const newPodio = localStorageManager.resetPodioOfRace(indexRace);
  return newPodio;
});

ipcMain.handle('save-time-of-race', (event, timeInfomation) => {
  const time = localStorageManager.saveTimer(timeInfomation.indexRace, timeInfomation.time);
  return time;
});

ipcMain.handle('return-time-of-race', (event, indexRace) => localStorageManager.returnTime(indexRace));

ipcMain.handle('reset-time-of-race', (event, indexRace) => localStorageManager.resetTime(indexRace));

ipcMain.handle('generete-pdf', (event, podioInfomation) => {
  const generatePDF = new GeneretePdf();
  const displayPDF = new DisplayPDF();
  generatePDF.generetePdf(podioInfomation);
  displayPDF.createWindow();
});

ipcMain.handle('set-new-state-of-race', (event, stateInfomation) => {
  localStorageManager.setStatusOfRace(
    stateInfomation.indexOfRace,
    stateInfomation.state,
  );
});

ipcMain.handle('return-state-of-race', (event, indexOfRace) => {
  const state = LocalStorageManager.returnStateOfRace(indexOfRace);
  return state;
});

ipcMain.handle('search-by-category', (event, searchInfomation) => {
  const especificParticipants = LocalStorageManager
    .searchByCategory(searchInfomation.categoryIndex, searchInfomation.indexRace);
  return especificParticipants;
});
