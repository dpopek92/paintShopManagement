import React from 'react';
import PropTypes from 'prop-types';
import withContext from 'hoc/withContext';
import { isObjectEmpty } from 'utils/functions/objects';

const ElementsCell = ({ item, view, permissionContext }) => {
 let elementsToCorrect = 0;
 let elementsLost = 0;

 if (
  (view === 'production' ||
   permissionContext === 'employee' ||
   permissionContext === 'display') &&
  item.items
 ) {
  item.items.map(itemsItem => {
   if (
    itemsItem.elementToCorrect &&
    !isObjectEmpty(itemsItem.elementToCorrect)
   ) {
    elementsToCorrect += itemsItem.elementToCorrect.quantity;
   }
   if (itemsItem.elementLost && !isObjectEmpty(itemsItem.elementLost)) {
    elementsLost += itemsItem.elementLost.quantity;
   }
  });
  return (
   <td>
    {item.elements}
    {elementsToCorrect !== 0 && (
     <span style={{ backgroundColor: '#ccf7b3', fontWeight: 'normal' }}>
      /{elementsToCorrect}
     </span>
    )}
    {elementsLost !== 0 && (
     <span style={{ backgroundColor: '#e7bcba', fontWeight: 'normal' }}>
      /{elementsLost}
     </span>
    )}
   </td>
  );
 }
 return <td>{item.elements}</td>;
};

ElementsCell.propTypes = {
 item: PropTypes.instanceOf(Object),
 view: PropTypes.string,
 permissionContext: PropTypes.string,
};

export default withContext(ElementsCell);
