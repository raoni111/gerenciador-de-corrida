// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

import FormContainerManager from './class/form-container-manger.js';
import FormManager from './class/form-manager.js';
import TableOfRaceManager from './class/table-of-race.manager.js';

// import FormManager from './class/form-manager.js';

const button_createNewRace = document.querySelector('.button-create-new-race');
const button_close = document.querySelector('.button-close');
const formContainer = document.querySelector('.form-create-new-race-conteiner');
const form = document.querySelector('.form-create-new-race');
const tableOfRace = document.querySelector('#grid-table-body');

// const inputs = form.querySelectorAll();

// const formManager = new FormManager(form);
// formManager.listenForm(saveRace);
// src\renderer.js

const formContainerManager = new FormContainerManager(formContainer);
const tableOfRaceManager = new TableOfRaceManager(tableOfRace);
const formManager = new FormManager(form, tableOfRaceManager, formContainerManager);
// Events
formManager.listenForm();
button_createNewRace.addEventListener('click', () => {
  formContainerManager.setAttribute('true');
});

button_close.addEventListener('click', () => {
  formContainerManager.setAttribute('false');
});

window.addEventListener('DOMContentLoaded', () => {
  tableOfRaceManager.init();
});
