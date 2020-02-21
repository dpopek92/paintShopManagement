/* eslint-disable import/prefer-default-export */
export const containsOneOf = (array, pattern) => {
 if (Array.isArray(pattern)) {
  let state = 0;
  pattern.forEach(item => {
   state += array.includes(item);
  });
  return state === 1;
 }
};
export const removeDuplicates = array => {
 return array.reduce(
  (unique, item) => (unique.includes(item) ? unique : [...unique, item]),
  [],
 );
};
