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
      width: 800,
      height: 600,
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
ipcMain.handle('add-new-race', (event, data) => {
  const races = localStorageManager.addNewRace(data);
  return races;
});

ipcMain.handle('return-races', () => LocalStorageManager.returnRaces);

ipcMain.handle('delect-race', (index) => {
  const newRaces = localStorageManager.delectRace(index);
  return newRaces;
});
