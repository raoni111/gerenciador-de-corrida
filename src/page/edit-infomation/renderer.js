/* eslint-disable guard-for-in */
import ElectronAPIManager from '../../class/electronAPI-manger.js';
import FormEditInformationManager from '../../class/form-edit-infomation-manger.js';
import HTMLManager from '../../class/html-manger.js';
import SelectCategoryManger from '../../class/select-category-manager.js';

const href = window.location.search.substring(1);
const param = new URLSearchParams(href);
const index = Number(param.get('indexRace'));
const indexParticipant = Number(param.get('indexParticipant'));

const form = document.getElementById('form-container-id');
const formEditInformation = document.getElementById('form-content-id');

window.addEventListener('DOMContentLoaded', async () => {
  const formEditInformationManager = new FormEditInformationManager(
    form,
    formEditInformation,
    ElectronAPIManager,
    index,
    indexParticipant,
  );
  const htmlManager = new HTMLManager(ElectronAPIManager);

  await formEditInformationManager.initFormEditParticipant();

  const groupOfCategory = document.querySelector('#grup-of-category-before-input');
  const inputOfCategory = document.querySelector('#input-of-category');

  const selectCategoryManager = new SelectCategoryManger(
    groupOfCategory,
    inputOfCategory,
    ElectronAPIManager,
    index,
  );

  selectCategoryManager.initSelectCategory();
  htmlManager.renderInformation(index);
});

document.getElementById('back-button').addEventListener('click', () => {
  window.location = `../participants/index.html?index=${index}`;
});
