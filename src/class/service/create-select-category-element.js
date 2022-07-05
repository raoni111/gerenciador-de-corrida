export default function CreateSelectCategoryElement(category, index = '') {
  const li = `
    <li id="${index}" class="category-li-element">
      ${category.name}
    </li>
  `;
  return li;
}
