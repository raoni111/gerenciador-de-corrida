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

export function createUlelementPartipant(participant, index) {
  const ul = `
    <ul class="grid-table-row" id="index-${index}">
        <li id="index-${index}">${participant.subscription}</li>
        <li id="index-${index}">${participant.name}</li>
        <li id="index-${index}">${participant.hometown}</li>
        <li id="index-${index}">${participant.state}</li>
        <li id="index-${index}">${participant.category}</li>
        <li id="index-${index}">${participant.sex}</li>
        <li>
            <button class="delect-button" id="idenx-${index}">Apagar</button>
        </li>
    </ul>
    `;
  return ul;
}

export function createUlelementPartipantPodio(participant, index) {
  const ul = `
  <ul class="grid-table-row">
      <li>${index + 1}º</li>
      <li>${participant.subscription}</li>
      <li>${participant.name}</li>
      <li>${participant.hometown}</li>
      <li>${participant.state}</li>
      <li>${participant.category}</li>
      <li>${participant.sex}</li>
      <li>${participant.time}</li>
  </ul>
  `;
  return ul;
}
