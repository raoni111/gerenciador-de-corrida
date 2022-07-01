const { contextBridge, ipcRenderer } = require('electron');

window.addEventListener('DOMContentLoaded', async () => {
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
    generatePDF: (indexRace) => ipcRenderer.invoke('generete-pdf', indexRace),
  });
});
