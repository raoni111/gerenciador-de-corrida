const { BrowserWindow } = require('electron');
const path = require('path');

class DisplayPDF {
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
      },
      autoHideMenuBar: true,
      show: false,
    });

    this.mainWindow.loadFile(path.join(__dirname, '..', 'pdfs', 'podio.pdf'));
    this.mainWindow.once('ready-to-show', () => {
      this.mainWindow.show();
    });
  }
}

module.exports = DisplayPDF;
