export function emptyPropertyList({ ...rest }) {
  const errorsList = [];

  for (const propertie in rest) {
    if (!rest[propertie]) {
      errorsList.push(propertie);
    }
  }

  return errorsList;
}