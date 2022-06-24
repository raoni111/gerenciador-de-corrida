export default function CreateSelectCategoryElement(category) {
  const li = `
    <li class="category-li-element">
      ${category.name}
    </li>
  `;
  return li;
}
