import CreateSelectCategoryElement from './service/create-select-category-element.js';

export default class SelectCategoryManger {
  displayCategoryGrup = false;

  executed = false;

  constructor(categoryGrup, inputOfCategory, ElectronAPIManger, indexOfRace) {
    this.categoryGrup = categoryGrup;
    this.inputOfCategory = inputOfCategory;
    this.ElectronAPIManger = ElectronAPIManger;
    this.indexOfRace = indexOfRace;
  }

  initSelectCategory(race = false) {
    this.categoryGrup.textContent = '';
    if (race) {
      this.categoryGrup.innerHTML = `
        <li class="category-li-element">
          Geral
        </li>
      `;
      this.inputOfCategory.value = 'Geral';
    }
    this.ElectronAPIManger.returnAllCategory(this.indexOfRace).then((categories) => {
      categories.forEach((category, index) => {
        const li = CreateSelectCategoryElement(category, index);
        this.categoryGrup.innerHTML += li;
      });
    });
    if (!this.executed) {
      this.listenerInput();
      this.listenerCategory();
    }
    this.executed = true;
  }

  listenerCategory() {
    this.categoryGrup.addEventListener('click', (e) => {
      if (e.target.className === 'category-li-element') {
        this.inputOfCategory.value = e.target.textContent.trim();
        this.togleAtribute();
      }
    });
  }

  listenerInput() {
    this.inputOfCategory.parentElement.addEventListener('click', (e) => {
      if (e.target.localName === 'input') {
        this.togleAtribute();
      }
    });
  }

  togleAtribute() {
    this.displayCategoryGrup = !this.displayCategoryGrup;
    this.categoryGrup.setAttribute(
      'display',
      this.displayCategoryGrup,
    );
  }
}
