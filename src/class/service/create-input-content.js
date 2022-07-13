import translateInfomation from './translate-infomation.js';

export default function createInputContent(information, key) {
  if (!information) return '';

  let div = `
    <div class="input-conteiner">
      <label for="key-${key}">${translateInfomation(key)}</label></br>
      <input type="text" value="${information.trim()}" id="key-${key}" />
    </div>
  `;

  if (key === 'category') {
    div = `
    <div class="input-conteiner">
      <label for="input-of-category">Categoria:</label><br />
      <input type="text" id="input-of-category" value="${information.trim()}" disabled>
      <ul class="grup-of-category-before-input" id="grup-of-category-before-input" display="false">
      </ul>
    </div>
    `;
  }

  return div;
}
