/* eslint-disable consistent-return */
/* eslint-disable import/prefer-default-export */
const sortListBy = {
 string: (a, b, type, key) => {
  if (type === 'ascend') return a[key].localeCompare(b[key]);
  if (type === 'descend') return b[key].localeCompare(a[key]);
 },
 date: (a, b, type, key) => {
  const dateA = new Date(a[key]);
  const dateB = new Date(b[key]);
  if (type === 'ascend') return dateA - dateB;
  if (type === 'descend') return dateB - dateA;
 },
 number: (a, b, type, key) => {
  if (type === 'ascend') return a[key] - b[key];
  if (type === 'descend') return b[key] - a[key];
 },
};

export default sortListBy;
