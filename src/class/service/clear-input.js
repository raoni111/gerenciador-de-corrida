export default function clearInputs(allInputs) {
  for (let i = 0; i < allInputs.length; i += 1) {
    allInputs.item(i).value = '';
  }
}
