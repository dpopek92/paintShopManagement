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

// (unique.includes(item) ? unique : [...unique, item])
