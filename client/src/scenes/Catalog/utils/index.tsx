/* eslint-disable import/prefer-default-export */
export const validateSearch = (searchValue: string, itemName: string) =>
 itemName
  .toLowerCase()
  .replace(/[\s-]/g, '')
  .indexOf(searchValue.toLowerCase().replace(/[/\s-]/g, '')) !== -1;
