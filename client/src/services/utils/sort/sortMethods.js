/* eslint-disable consistent-return */
/* eslint-disable import/prefer-default-export */
const sortListBy = {
 string: (a, b, type, key) => {
  if (type === 'ascend') return a.user[key].localeCompare(b.user[key]);
  if (type === 'descend') return b.user[key].localeCompare(a.user[key]);
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
