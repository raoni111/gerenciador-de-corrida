export default class SearchByCategory {
  categoryIndex;

  constructor(selectManager, tablePodioManager, ElectronAPIManager, indexRace) {
    this.selectManager = selectManager;
    this.tablePodioManager = tablePodioManager;
    this.ElectronAPIManager = ElectronAPIManager;
    this.indexRace = indexRace;
  }

  listenerSelecManager() {
    this.selectManager.categoryGrup.addEventListener('click', (e) => {
      if (e.target.className === 'category-li-element') {
        this.categoryIndex = e.target.id;
        this.ElectronAPIManager.searchByCategory(
          this.categoryIndex,
          this.indexRace,
        ).then((podio) => {
          this.tablePodioManager.displayParticipant(podio);
        });
      }
    });
  }

  get getCategoryIndex() {
    return this.categoryIndex;
  }
}
