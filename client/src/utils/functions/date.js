export const initZero = number => {
 if (number < 10) {
  return `0${number}`;
 } else return number;
};

export const dateToString = value => {
 const date = new Date(value);
 const toString = `${initZero(date.getDate())}.${initZero(
  date.getMonth() + 1
 )}.${date.getFullYear()}r.`;
 return toString;
};

export const dateToStringWithHour = value => {
 const date = new Date(value);
 const toString = `${initZero(date.getDate())}.${initZero(
  date.getMonth() + 1
 )}/${initZero(date.getHours())}:${initZero(date.getMinutes())}`;
 return toString;
};

export const formatDateToDatePicker = value => {
 const date = new Date(value);
 const toString = `${date.getFullYear()}-${initZero(
  date.getMonth() + 1
 )}-${initZero(date.getDate())}`;
 return toString;
};

export const getHoursMinutesString = value => {
 let date = new Date(value).getTime();

 let ms = date % 1000;
 date = (date - ms) / 1000;

 let secs = date % 60;
 date = (date - secs) / 60;

 let mins = date % 60;
 let hrs = (date - mins) / 60;

 return initZero(hrs) + ":" + initZero(mins);
};
