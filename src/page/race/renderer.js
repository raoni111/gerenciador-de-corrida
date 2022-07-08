import HTMLManager from '../../class/html-manger.js';
import ElectronAPIManager from '../../class/electronAPI-manger.js';
import Timer from '../../class/timer.js';
import FormAddAtThePodioManager from '../../class/form-add-at-the-podio-manager.js';
import TablePodioManger from '../../class/table-podio-manager.js';
import SelectCategoryManger from '../../class/select-category-manager.js';
import SearchByCategory from '../../class/search-by-category.js';

const href = window.location.search.substring(1);
const param = new URLSearchParams(href);
const index = Number(param.get('index'));

const buttonBack = document.querySelector('#back-button-race-podio');

const tablePodio = document.querySelector('#grid-table-body');
const timeContent = document.querySelector('.time-content');
const buttonInitRace = document.querySelector('#button-init-race');
const buttonPlayTimer = document.querySelector('#button-play-timer');
const buttonStopTimer = document.querySelector('#button-pause-time');
const buttonRestartTimer = document.querySelector('#button-restart-timer');
const resetButton = document.querySelector('#rest-podio-button');
const printButton = document.querySelector('#print-button');
const finishButton = document.querySelector('#finish-race');

const navContainer = document.querySelector('#nav-container');
const searchByCategoryContainer = document.querySelector('.search-by-category-container');

const selectGroup = document.querySelector('.grup-of-category-before-input');
const inputOfCategory = document.querySelector('#input-of-category');

const formContent = document.querySelector('#form-add-at-the-podio-container');

const tablePodioManger = new TablePodioManger(
  tablePodio,
  resetButton,
  ElectronAPIManager,
  index,
);

const selectCategoryManager = new SelectCategoryManger(
  selectGroup,
  inputOfCategory,
  ElectronAPIManager,
  index,
);

const timer = new Timer(
  tablePodioManger,
  timeContent,
  buttonInitRace,
  buttonPlayTimer,
  buttonStopTimer,
  buttonRestartTimer,
  printButton,
  finishButton,
  resetButton,
  selectCategoryManager,
  searchByCategoryContainer,
  navContainer,
  formContent,
  ElectronAPIManager,
  index,
);

const searchByCategory = new SearchByCategory(
  selectCategoryManager,
  tablePodioManger,
  ElectronAPIManager,
  index,
);

const formaddAtThePodioManager = new FormAddAtThePodioManager(
  formContent,
  timer,
  tablePodioManger,
  ElectronAPIManager,
  index,
);

formaddAtThePodioManager.litenerEvets();
searchByCategory.listenerSelecManager();

const htmlManger = new HTMLManager(ElectronAPIManager);

buttonBack.addEventListener('click', () => {
  window.location = `../participants/index.html?index=${index}`;
  timer.saveTime();
});

printButton.addEventListener('click', () => {
  ElectronAPIManager.generatePDF(index, searchByCategory.getCategoryIndex);
});

window.addEventListener('DOMContentLoaded', () => {
  htmlManger.renderInformation(index, 'PODIO: ');
  tablePodioManger.initTablePodioManager(index);
  timer.initTimer();
  selectCategoryManager.initSelectCategory(true);
});
