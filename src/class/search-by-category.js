export default class SearchByCategory {
  constructor(selectManager, tablePodioManager, ElectronAPIManager, indexRace) {
    this.selectManager = selectManager;
    this.tablePodioManager = tablePodioManager;
    this.ElectronAPIManager = ElectronAPIManager;
    this.indexRace = indexRace;
  }

  listenerSelecManager() {
    this.selectManager.categoryGrup.addEventListener('click', (e) => {
      if (e.target.className === 'category-li-element') {
        const categoryIndex = e.target.id;
        this.ElectronAPIManager.searchByCategory(categoryIndex, this.indexRace).then((podio) => {
          this.tablePodioManager.displayParticipant(podio);
        });
      }
    });
  }
}
