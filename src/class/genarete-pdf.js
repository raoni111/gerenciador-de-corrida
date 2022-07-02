/* eslint-disable new-cap */
const { jsPDF } = require('jspdf');
const path = require('path');
const races = require('../local_storage/races.json');
require('jspdf-autotable');

class GeneretePdf {
  row = [];

  title = '';

  generetePdf(indexRace) {
    const doc = new jsPDF();
    this.coletDates(indexRace);
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

  coletDates(indexRace) {
    this.title = races[indexRace].name;
    races[indexRace].podio.forEach((element, index) => {
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
}

module.exports = GeneretePdf;
