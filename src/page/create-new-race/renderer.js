import FormContainerManager from '../../class/form-container-manger.js';
import FormManager from '../../class/form-manager.js';
import TableManager from '../../class/table-manager.js';
import ElectronAPIManager from '../../class/electronAPI-manger.js';

const button_createNewRace = document.querySelector('.button-create-new-race');
const button_close = document.querySelector('#button-close-create-race');
const fromCreateRaceContainer = document.querySelector('.form-create-new-race-conteiner');
const formCreateRace = document.querySelector('.form-create-new-race');
const tableOfRace = document.querySelector('#grid-table-body');

const tableOfRaceManager = new TableManager(tableOfRace, ElectronAPIManager);
const formCreateRaceContainer = new FormContainerManager(
  fromCreateRaceContainer,
  button_createNewRace,
  button_close,
);
const formManager = new FormManager(
  formCreateRace,
  tableOfRaceManager,
  formCreateRaceContainer,
  ElectronAPIManager,
);

// Events
formManager.listenForm('race');
formCreateRaceContainer.listenButtonOpenClose();

// Event after DOMContetLoaded
window.addEventListener('DOMContentLoaded', () => {
  tableOfRaceManager.initRaces();
});
