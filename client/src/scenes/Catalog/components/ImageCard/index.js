/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
import React from 'react';
import PropTypes from 'prop-types';
import withContext from 'hoc/withContext';

const index = ({ itemName, itemImage, type, onclick, permissionContext }) => {
 const imgPath = `assets/images/${type}/${itemImage}`;
 return (
  <div
   className="catalogCard imageCard"
   type={type}
   image={imgPath}
   style={{
    backgroundImage: `url(${require(`assets/images/${type}/${itemImage}`)})`,
   }}
   tabIndex="0"
   role="button"
   onClick={() =>
    permissionContext !== 'employee' ? onclick(itemName, type) : null
   }
   onKeyDown={() =>
    permissionContext !== 'employee' ? onclick(itemName, type) : null
   }
  >
   <div className="cardCaption">{itemName}</div>
  </div>
 );
};

index.propTypes = {
 itemName: PropTypes.string,
 itemImage: PropTypes.string,
 type: PropTypes.string,
 onclick: PropTypes.func,
 permissionContext: PropTypes.string,
};

export default withContext(index);
