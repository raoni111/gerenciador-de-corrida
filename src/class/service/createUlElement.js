export default function createUlelement(race, index) {
  const ul = `
    <ul class="grid-table-row">
        <li>${race.name}</li>
        <li>${race.city}</li>
        <li>${race.date}</li>
        <li>
            <button class="delect-button" id="idenx-${index}">Apagar</button>
        </li>
    </ul>
    `;
  return ul;
}
