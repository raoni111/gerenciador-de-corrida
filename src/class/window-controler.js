// eslint-disable-next-line import/newline-after-import

const { ipcRenderer } = require('electron');

class WindowControler {
  cache;

  constructor(minimizeButton, maxmizeButton, closeWindowButton) {
    this.minimizeButton = minimizeButton;
    this.maxmizeButton = maxmizeButton;
    this.closeWindowButton = closeWindowButton;
  }

  maximizedFunction() {
    this.maxmizeButton.classList.remove('minimized');
    this.maxmizeButton.classList.add('maximized');
  }

  manimizedFunction() {
    this.maxmizeButton.classList.remove('maximized');
    this.maxmizeButton.classList.add('minimized');
  }

  listenerButton() {
    this.closeWindowButton.addEventListener('click', () => {
      ipcRenderer.invoke('close-window');
    });
    this.minimizeButton.addEventListener('click', () => {
      ipcRenderer.invoke('minimize-window');
    });
    this.maxmizeButton.addEventListener('click', () => {
      this.maximized = !this.maximized;

      ipcRenderer.invoke('maxmize-window').then((res) => {
        if (this.cache) {
          this.maxmizeButton.classList.remove(this.cache);
        }
        this.maxmizeButton.classList.add(res);
        this.cache = res;
      });
    });
  }
}

module.exports = WindowControler;
