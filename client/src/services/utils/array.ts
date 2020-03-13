/* eslint-disable import/prefer-default-export */
export const containsOneOf = (array: any[], pattern: any[]) => {
 if (Array.isArray(pattern)) {
  let state = 0;
  pattern.forEach(item => {
   if (array.includes(item)) state += 1;
  });
  return state === 1;
 }
};
export const removeDuplicates = (array: any[]) => {
 return array.reduce(
  (unique, item) => (unique.includes(item) ? unique : [...unique, item]),
  [],
 );
};
