const initZero = number => {
 if (number < 10) {
  return `0${number}`;
 } else return number;
};

const dateToString = value => {
 const date = new Date(value);
 const toString = `${initZero(date.getDate())}.${initZero(
  date.getMonth() + 1
 )}.${date.getFullYear()}r.`;
 return toString;
};

const isObjectInArray = (arr, prop, value) => {
 if (arr.some(obj => obj[prop].toString() === value.toString())) {
  return true;
 } else {
  return false;
 }
};
const firstLetterToUpperCase = string => {
 return string.charAt(0).toUpperCase() + string.slice(1);
};

const isObjectEmpty = obj => {
 return JSON.stringify(obj) === JSON.stringify({});
};
module.exports = {
 isObjectInArray,
 dateToString,
 isObjectEmpty,
 firstLetterToUpperCase
};
