export function createUlelementRace(race, index) {
  const ul = `
    <ul class="grid-table-row table-content" id="${index}">
        <li id="${index}" class="table-content">${race.name}</li>
        <li id="${index}" class="table-content">${race.city}</li>
        <li id="${index}" class="table-content">${race.date}</li>
        <li>
            <button class="delect-button" id="${index}">Apagar</button>
        </li>
    </ul>
    `;
  return ul;
}

export function createUlelementParticipant(participant, index) {
  const ul = `
    <ul class="grid-table-row" id="${index}">
        <li id="${index}">${participant.subscription}</li>
        <li id="${index}">${participant.name}</li>
        <li id="${index}">${participant.hometown}</li>
        <li id="${index}">${participant.state}</li>
        <li id="${index}">${participant.category}</li>
        <li id="${index}">${participant.sex}</li>
        <li>
            <button class="delect-button" id="${index}">Apagar</button>
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
