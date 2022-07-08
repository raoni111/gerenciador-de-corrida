/* eslint-disable new-cap */
const { jsPDF } = require('jspdf');
const path = require('path');
const races = require('../local_storage/races.json');
require('jspdf-autotable');

class GeneretePdf {
  row = [];

  title = '';

  category = '';

  constructor(LocalStorageManager) {
    this.LocalStorageManager = LocalStorageManager;
  }

  generetePdf(podioInfomation) {
    const { indexRace, categoryIndex } = podioInfomation;
    const doc = new jsPDF();
    this.coletDates(indexRace, categoryIndex);
    doc.setFontSize(11);

    if (categoryIndex) {
      doc.text(`${this.title} | CATEGORIA: ${this.category}`, 15, 10);
    }

    doc.text(this.title, 15, 10);
    doc.autoTable([
      'Posição',
      'Inscrição',
      'Nome do participante',
      'Cidade natal',
      'Estado',
      'Categoria',
      'Sexo',
      'Tempo',
    ], this.row);
    doc.save(path.join(__dirname, '..', 'pdfs', 'podio.pdf'));
  }

  async coletDates(indexRace, categoryIndex) {
    const podio = this.searchByCategory(categoryIndex, indexRace);
    podio.forEach((element, index) => {
      this.row.push([
        `${index + 1}°`,
        `${element.subscription}`,
        `${element.name}`,
        `${element.hometown}`,
        `${element.state}`,
        `${element.category}`,
        `${element.sex}`,
        `${element.time}`,
      ]);
    });
  }

  searchByCategory(categoryIndex, indexRace) {
    const { podio } = races[indexRace];

    this.title = races[indexRace].name;

    if (!categoryIndex) return podio;

    this.category = races[indexRace].categories[categoryIndex].name;

    const especificParticipants = [];
    podio.filter((participant) => {
      if (participant.category === this.category) {
        especificParticipants.push(participant);
      }
      return participant;
    });

    return especificParticipants;
  }
}

module.exports = GeneretePdf;
