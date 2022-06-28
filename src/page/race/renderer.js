import HTMLManager from '../../class/html-manger.js';
import ElectronAPIManager from '../../class/electronAPI-manger.js';
import Timer from '../../class/timer.js';
import FormAddAtThePodioManager from '../../class/form-add-at-the-podio-manager.js';
import TablePodioManger from '../../class/table-podio-manager.js';

const { href } = window.location;
const index = Number(href.slice(href.length - 1, href.length));

const buttonBack = document.querySelector('#back-button-race-podio');

const tablePodio = document.querySelector('#grid-table-body');
const timeContent = document.querySelector('.time-content');
const buttonInitRace = document.querySelector('#button-init-race');
const buttonPlayTimer = document.querySelector('#button-play-timer');
const buttonStopTimer = document.querySelector('#button-pause-time');
const buttonRestartTimer = document.querySelector('#button-restart-timer');
const resetButton = document.querySelector('#rest-podio-button');

const formContent = document.querySelector('#form-add-at-the-podio-container');

const timer = new Timer(
  timeContent,
  buttonInitRace,
  buttonPlayTimer,
  buttonStopTimer,
  buttonRestartTimer,
  formContent,
);
const tablePodioManger = new TablePodioManger(
  tablePodio,
  timer,
  resetButton,
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
timer.initTimer();

const htmlManger = new HTMLManager(ElectronAPIManager);

buttonBack.addEventListener('click', () => {
  window.location = `../participants/index.html?index=${index}`;
});

window.addEventListener('DOMContentLoaded', () => {
  const { href } = window.location;
  const index = Number(href.slice(href.length - 1, href.length));
  htmlManger.renderInformation(index, 'PODIO: ');
  tablePodioManger.initTablePodioManager(index);
});
