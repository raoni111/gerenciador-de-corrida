// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
const { contextBridge, ipcRenderer } = require('electron');

window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector);
    if (element) element.innerText = text;
  };

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type]);
  }

  contextBridge.exposeInMainWorld('electronAPI', {
    addNewRace: (data) => ipcRenderer.invoke('add-new-race', data),
    returnRaces: () => ipcRenderer.invoke('return-races'),
    returnAllParticipant: (index) => ipcRenderer.invoke('return-participant', index),
    delectRace: (index) => ipcRenderer.invoke('delect-race', index),
    deleteParticipant: (indexInformation) => ipcRenderer.invoke('delete-participant', indexInformation),
    addNewParticipant: (participant) => ipcRenderer.invoke('add-new-participant', participant),
  });
});
