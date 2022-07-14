/* eslint-disable guard-for-in */
import ElectronAPIManager from '../../class/electronAPI-manger.js';
import FormEditInfomationManager from '../../class/form-edit-infomation-manger.js';
import SelectCategoryManger from '../../class/select-category-manager.js';

const href = window.location.search.substring(1);
const param = new URLSearchParams(href);
const index = Number(param.get('indexRace'));
const indexParticipant = Number(param.get('indexParticipant'));

const form = document.getElementById('form-container-id');
const formEditInfomation = document.getElementById('form-content-id');

window.addEventListener('DOMContentLoaded', async () => {
  const formEditInfomationManager = new FormEditInfomationManager(
    form,
    formEditInfomation,
    ElectronAPIManager,
    index,
    indexParticipant,
  );

  await formEditInfomationManager.initFormEditParticipant();

  const grupOfCategory = document.querySelector('#grup-of-category-before-input');
  const inputOfCategory = document.querySelector('#input-of-category');

  const selectCategoryManager = new SelectCategoryManger(
    grupOfCategory,
    inputOfCategory,
    ElectronAPIManager,
    index,
  );

  selectCategoryManager.initSelectCategory();
});

document.getElementById('back-button').addEventListener('click', () => {
  window.location = `../participants/index.html?index=${index}`;
});
