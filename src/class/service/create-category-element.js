export default function createCategoryElement(category, index) {
  const div = `
    <div class="category-content">
      <span class="category">${category.name}</span>
      <div class="button-delete-category-contaner">
        <button class="button-delete-category" id="${index}" type="button">
          <img class="img-close-svg" src="./img/close.png" alt="https://www.flaticon.com/free-icon/close_1828665?term=close&page=1&position=15&page=1&position=15&related_id=1828665&origin=tag">
        </button>
      </div>
    </div>
  `;
  return div;
}
