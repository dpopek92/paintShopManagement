/* eslint-disable import/prefer-default-export */
export const removeDuplicates = array => {
 return array.reduce(
  (unique, item) => (unique.includes(item) ? unique : [...unique, item]),
  [],
 );
};
export const removeDuplicatesInOrdersArray = array => {
 return array.reduce((unique, current) => {
  const exist = unique.find(item => item._id === current._id);
  if (!exist) return unique.concat(current);
  return unique;
 }, []);
};
export const containsOneOf = (array, pattern) => {
 if (Array.isArray(pattern)) {
  let state = 0;
  pattern.forEach(item => {
   state += array.includes(item);
  });
  console.log(state);
  return state === 1;
 }
};

// (unique.includes(item) ? unique : [...unique, item])
