import CategoryFactory from './category-factory.js';

export default class FormCreateCategoryManger {
  constructor(
    formCreateCategory,
    tableCategoryManager,
    formContainerManger,
    ElectronAPIManager,
    indexOfRace,
  ) {
    this.formCreateCategory = formCreateCategory;
    this.tableCategoryManager = tableCategoryManager;
    this.formContainerManger = formContainerManger;
    this.ElectronAPIManager = ElectronAPIManager;
    this.indexOfRace = indexOfRace;
  }

  listenForm() {
    this.formCreateCategory.addEventListener('submit', (e) => {
      e.preventDefault();
      const form = e.target;
      const allInput = form.querySelectorAll('input');
      const categoryName = allInput.item(0);
      this.addNewCategory(categoryName, this.indexOfRace);
    });
  }

  addNewCategory(category, index) {
    const categoryFactory = new CategoryFactory(category);
    const categoryObj = categoryFactory.createCategoryObj();

    this.ElectronAPIManager.addNewCategory({
      category: categoryObj,
      index,
    }).then((categories) => {
      this.tableCategoryManager.displayCategory(categories);
    });
  }
}
