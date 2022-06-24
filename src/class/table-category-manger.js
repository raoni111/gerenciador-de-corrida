import createCategoryElement from './service/create-category-element.js';

export default class TableCategoryManager {
  constructor(tableOfCategory, ElectronAPIManger, indexOfRace) {
    this.tableOfCategory = tableOfCategory;
    this.ElectronAPIManger = ElectronAPIManger;
    this.indexOfRace = indexOfRace;
  }

  displayCategory(categories) {
    this.tableOfCategory.textContent = '';
    categories.forEach((category, index) => {
      const div = createCategoryElement(category, index);
      this.tableOfCategory.innerHTML += div;
    });
  }

  deleteCategory(index) {
    const indexNumber = Number(index);
    this.ElectronAPIManger.deleteCategory({
      indexOfRace: this.indexOfRace,
      indexOfCategory: indexNumber,
    }).then((categories) => {
      this.displayCategory(categories);
    });
  }

  listenDeleteButton() {
    this.tableOfCategory.addEventListener('click', (e) => {
      const { target } = e;
      if (target.parentElement.className === 'button-delete-category') {
        const buttonId = target.parentElement.id;
        this.deleteCategory(buttonId);
      }
    });
  }

  initTableOfCategory() {
    this.ElectronAPIManger.returnAllCategory(this.indexOfRace).then((categories) => {
      this.displayCategory(categories);
    });
    this.listenDeleteButton();
  }
}
