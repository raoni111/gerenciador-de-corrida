import HTMLManager from '../../class/html-manger.js';
import ElectronAPIManager from '../../class/electronAPI-manger.js';
import FormContainerManager from '../../class/form-container-manger.js';
import FormManager from '../../class/form-manager.js';
import TableManager from '../../class/table-manager.js';
import InputsGrupsManger from '../../class/inputs-grups-manger.js';

const formContainer = document.querySelector('.form-create-new-race-conteiner');

const buttonCreateNewRace = document.querySelector('.button-create-new-race');
const buttonClose = document.querySelector('.button-close');
const inputsGrups = document.querySelector('.inputs-grup');
const nexButton = document.querySelector('.button-next-grup');
const backButton = document.querySelector('.button-back-grup');
const tableOfRace = document.querySelector('#grid-table-body');
const form = document.querySelector('.form-create-new-race');

const inputsGrupsManger = new InputsGrupsManger(backButton, nexButton, inputsGrups);
const formContainerManager = new FormContainerManager(formContainer);
const tableOfParticipantManager = new TableManager(tableOfRace, ElectronAPIManager);
const htmlManger = new HTMLManager(ElectronAPIManager);
const formManager = new FormManager(
  form,
  tableOfParticipantManager,
  formContainerManager,
  ElectronAPIManager,
  inputsGrups,
);

inputsGrupsManger.listenButtons();
formManager.listenForm('race-partipants');

window.addEventListener('DOMContentLoaded', () => {
  const { href } = window.location;
  const index = Number(href.slice(href.length - 1, href.length));
  htmlManger.renderInformation(index);
  tableOfParticipantManager.initParticipant(index);
});

buttonCreateNewRace.addEventListener('click', () => {
  formContainerManager.setAttribute('true');
});

buttonClose.addEventListener('click', () => {
  formContainerManager.setAttribute('false');
});
