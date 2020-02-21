import React from 'react';
import PropTypes from 'prop-types';
import withContext from 'hoc/withContext';
import './ColorCard.scss';

const ColorCard = ({
 colorName,
 colorValue,
 onclick,
 type = null,
 permissionContext,
}) => {
 return (
  <div
   className="catalogCard colorCard"
   style={{ backgroundColor: colorValue }}
   onClick={() =>
    permissionContext !== 'employee' ? onclick(colorName, type) : null
   }
   onKeyDown={() =>
    permissionContext !== 'employee' ? onclick(colorName, type) : null
   }
   role="button"
   tabIndex="0"
  >
   <div className="cardCaption">{colorName}</div>
  </div>
 );
};

ColorCard.propTypes = {
 colorName: PropTypes.string,
 colorValue: PropTypes.string,
 onclick: PropTypes.func,
 type: PropTypes.string,
 permissionContext: PropTypes.string,
};

export default withContext(ColorCard);
