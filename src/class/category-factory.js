export default class CategoryFactory {
  category;

  constructor(category) {
    this.category = category;
  }

  createCategoryObj() {
    return {
      name: this.category.value,
    };
  }
}
