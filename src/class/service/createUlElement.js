export function createUlelementRace(race, index) {
  const ul = `
    <ul class="grid-table-row" id="index-${index}">
        <li id="index-${index}">${race.name}</li>
        <li id="index-${index}">${race.city}</li>
        <li id="index-${index}">${race.date}</li>
        <li>
            <button class="delect-button" id="idenx-${index}">Apagar</button>
        </li>
    </ul>
    `;
  return ul;
}

export function createUlelementPartipant(race, index) {
  const ul = `
    <ul class="grid-table-row" id="index-${index}">
        <li id="index-${index}">${race.name}</li>
        <li id="index-${index}">${race.hometown}</li>
        <li id="index-${index}">${race.state}</li>
        <li id="index-${index}">${race.category}</li>
        <li id="index-${index}">${race.sex}</li>
        <li>
            <button class="delect-button" id="idenx-${index}">Apagar</button>
        </li>
    </ul>
    `;
  return ul;
}
