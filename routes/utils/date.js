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

module.exports = { initZero, dateToString };
