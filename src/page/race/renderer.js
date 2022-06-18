import HTMLManager from '../../class/html-manger.js';
import ElectronAPIManager from '../../class/electronAPI-manger.js';
import FormContainerManager from '../../class/form-container-manger.js';
import FormManager from '../../class/form-manager.js';
import TableManager from '../../class/table-manager.js';

const formContainer = document.querySelector('.form-create-new-race-conteiner');

const button_createNewRace = document.querySelector('.button-create-new-race');
const button_close = document.querySelector('.button-close');
const tableOfRace = document.querySelector('#grid-table-body');
const form = document.querySelector('.form-create-new-race');

const formContainerManager = new FormContainerManager(formContainer);
const tableOfParticipantManager = new TableManager(tableOfRace, ElectronAPIManager);
const htmlManger = new HTMLManager(ElectronAPIManager);
const formManager = new FormManager(
  form,
  tableOfParticipantManager,
  formContainerManager,
  ElectronAPIManager,
);

formManager.listenForm('race-partipants');

window.addEventListener('DOMContentLoaded', () => {
  const { href } = window.location;
  const index = Number(href.slice(href.length - 1, href.length));
  htmlManger.renderInformation(index);
  tableOfParticipantManager.initParticipant(index);
});

button_createNewRace.addEventListener('click', () => {
  formContainerManager.setAttribute('true');
});

button_close.addEventListener('click', () => {
  formContainerManager.setAttribute('false');
});
