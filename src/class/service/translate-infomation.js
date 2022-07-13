export default function translateInfomation(infomation) {
  let infoPTBr = '';

  switch (infomation) {
    case 'name':
      infoPTBr = 'Nome';
      break;
    case 'surname':
      infoPTBr = 'Sobrenome';
      break;
    case 'subscription':
      infoPTBr = 'Inscrição';
      break;
    case 'hometown':
      infoPTBr = 'Cidade natal';
      break;
    case 'state':
      infoPTBr = 'Estado';
      break;
    case 'category':
      infoPTBr = 'Categoria';
      break;
    case 'sex':
      infoPTBr = 'Sexo';
      break;
    case 'dateOfBirth':
      infoPTBr = 'Data de aniversário';
      break;
    case 'tell':
      infoPTBr = 'Telefone';
      break;
    case 'email':
      infoPTBr = 'Email';
      break;
    case 'sponsor':
      infoPTBr = 'Patrocinador';
      break;
    default:
      infoPTBr = '';
      break;
  }
  return infoPTBr;
}
