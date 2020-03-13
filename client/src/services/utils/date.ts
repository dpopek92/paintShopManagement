export const initZero = (number: number) => {
 if (number < 10) return `0${number}`;
 return number;
};

export const dateToString = (value: Date) => {
 const date = new Date(value);
 return `${initZero(date.getDate())}.${initZero(
  date.getMonth() + 1,
 )}.${date.getFullYear()}r.`;
};
