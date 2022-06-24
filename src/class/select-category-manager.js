import CreateSelectCategoryElement from './service/create-select-category-element.js';

export default class SelectCategoryManger {
  displayCategoryGrup = false;

  constructor(categoryGrup, inputOfCategory, ElectronAPIManger, indexOfRace) {
    this.categoryGrup = categoryGrup;
    this.inputOfCategory = inputOfCategory;
    this.ElectronAPIManger = ElectronAPIManger;
    this.indexOfRace = indexOfRace;
  }

  initSelectCategory() {
    this.categoryGrup.textContent = '';
    this.ElectronAPIManger.returnAllCategory(this.indexOfRace).then((categories) => {
      categories.forEach((category) => {
        const li = CreateSelectCategoryElement(category);
        this.categoryGrup.innerHTML += li;
      });
    });
    this.listenerInput();
    this.listenerCategory();
  }

  listenerCategory() {
    this.categoryGrup.addEventListener('click', (e) => {
      if (e.target.className === 'category-li-element') {
        this.inputOfCategory.value = e.target.textContent.replace(/ /g, '');
        this.togleAtribute();
      }
    });
  }

  listenerInput() {
    this.inputOfCategory.parentElement.addEventListener('click', (e) => {
      if (e.target.id === 'input-of-category') {
        this.togleAtribute();
      }
    });
  }

  togleAtribute() {
    this.displayCategoryGrup = !this.displayCategoryGrup;
    this.categoryGrup.setAttribute('display', `${this.displayCategoryGrup}`);
  }
}
