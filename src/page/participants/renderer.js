import HTMLManager from '../../class/html-manger.js';
import ElectronAPIManager from '../../class/electronAPI-manger.js';
import FormContainerManager from '../../class/form-container-manger.js';
import FormManager from '../../class/form-manager.js';
import TableManager from '../../class/table-manager.js';
import InputsGrupsManger from '../../class/inputs-grups-manger.js';
import TableCategoryManager from '../../class/table-category-manger.js';
import FormCreateCategoryManger from '../../class/form-create-category-manager.js';
import SelectCategoryManger from '../../class/select-category-manager.js';
import EditInformationManager from '../../class/edit-information-manger.js';

const href = window.location.search.substring(1);
const param = new URLSearchParams(href);
const index = Number(param.get('index'));

// create Participant
const formContainer = document.querySelector('.form-create-new-race-conteiner');
const buttonCreateNewRace = document.querySelector('.button-create-new-race');
const buttonClose = document.querySelector('#close-create-race');
const inputsGrups = document.querySelector('.inputs-grup');
const nexButton = document.querySelector('.button-next-grup');
const backButton = document.querySelector('.button-back-grup');
const tableOfRace = document.querySelector('#grid-table-body');
const form = document.querySelector('.form-create-new-race');

// Create Category
const formCreateCategoryContainer = document.querySelector('.create-new-category-container');
const buttonOpenFormCreateCategory = document.querySelector('#button-create-category');
const buttonCloseFormCreateCategory = document.querySelector('#button-close-create-category');
const formCreateCategory = document.querySelector('#form-create-category');
const tableOfCategory = document.querySelector('#table-of-category');

const grupOfCategory = document.querySelector('#grup-of-category-before-input');
const inputOfCategory = document.querySelector('#input-of-category');
const buttonInitRace = document.querySelector('.button-init-race');

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

// Category Objs
const tableCategoryManager = new TableCategoryManager(tableOfCategory, ElectronAPIManager, index);
const formCreateCategoryCM = new FormContainerManager(
  formCreateCategoryContainer,
  buttonOpenFormCreateCategory,
  buttonCloseFormCreateCategory,
);
const formCreateCategoryManger = new FormCreateCategoryManger(
  formCreateCategory,
  tableCategoryManager,
  formCreateCategoryCM,
  ElectronAPIManager,
  index,
);

const selectCategoryManager = new SelectCategoryManger(
  grupOfCategory,
  inputOfCategory,
  ElectronAPIManager,
  index,
);

const editInformation = new EditInformationManager('grid-table-row', index);

editInformation.eventListener();

inputsGrupsManger.listenButtons();
formManager.listenForm('race-partipants');
formCreateCategoryManger.listenForm();
formCreateCategoryCM.listenButtonOpenClose();

window.addEventListener('DOMContentLoaded', () => {
  htmlManger.renderInformation(index);
  tableOfParticipantManager.initParticipant(index);
  tableCategoryManager.initTableOfCategory();
});

buttonCreateNewRace.addEventListener('click', () => {
  formContainerManager.setAttribute();
  selectCategoryManager.initSelectCategory();
});

buttonClose.addEventListener('click', () => {
  formContainerManager.setAttribute('false');
});

buttonInitRace.addEventListener('click', () => {
  window.location = `../race/index.html?index=${index}`;
});
