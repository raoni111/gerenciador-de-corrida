const { contextBridge, ipcRenderer } = require('electron');
const WindowControler = require('./src/class/window-controler');

window.addEventListener('DOMContentLoaded', async () => {
  contextBridge.exposeInMainWorld('electronAPI', {
    addNewRace: (data) => ipcRenderer.invoke('add-new-race', data),
    returnRaces: () => ipcRenderer.invoke('return-races'),
    returnAllParticipant: (index) => ipcRenderer.invoke('return-participant', index),
    delectRace: (index) => ipcRenderer.invoke('delect-race', index),
    deleteParticipant: (indexInformation) => ipcRenderer.invoke('delete-participant', indexInformation),
    deleteCategory: (indexObj) => ipcRenderer.invoke('delete-category', indexObj),
    addNewParticipant: (participant) => ipcRenderer.invoke('add-new-participant', participant),
    addNewCategory: (categoryObj) => ipcRenderer.invoke('add-new-category', categoryObj),
    returnAllCategory: (index) => ipcRenderer.invoke('return-all-category', index),
    addNewParticipantAtThePodio: (participantInformation) => ipcRenderer.invoke('add-new-participant-at-the-podio', participantInformation),
    returnPodio: (indexRace) => ipcRenderer.invoke('return-podio', indexRace),
    resetPodioOfRace: (indexRace) => ipcRenderer.invoke('reset-podio-of-race', indexRace),
    saveTimeOfRace: (indexInformation) => ipcRenderer.invoke('save-time-of-race', indexInformation),
    returnTimeOfRace: (indexRace) => ipcRenderer.invoke('return-time-of-race', indexRace),
    resetTimeOfRace: (indexRace) => ipcRenderer.invoke('reset-time-of-race', indexRace),
    generatePDF: (podioInfomation) => ipcRenderer.invoke('generete-pdf', podioInfomation),
    setStateOfRace: (stateInformation) => ipcRenderer.invoke('set-new-state-of-race', stateInformation),
    returnStateOfRace: (indexRace) => ipcRenderer.invoke('return-state-of-race', indexRace),
    searchByCategory: (searchInformation) => ipcRenderer.invoke('search-by-category', searchInformation),
  });

  const minimizeButton = document.querySelector('#minimize');
  const maxmizeButton = document.querySelector('#maximize');
  const closeWindowButton = document.querySelector('#close-window');

  const windowControler = new WindowControler(
    minimizeButton,
    maxmizeButton,
    closeWindowButton,
  );
  windowControler.listenerButton();

  ipcRenderer.on('maximized', () => {
    console.log('teste');
    windowControler.maximizedFunction();
  });

  ipcRenderer.on('minimized', () => {
    windowControler.manimizedFunction();
  });
});
