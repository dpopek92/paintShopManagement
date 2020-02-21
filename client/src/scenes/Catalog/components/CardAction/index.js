import React from 'react';
import PropTypes from 'prop-types';

const index = ({ onclick, children }) => {
 return (
  <div onClick={onclick} onKeyDown={onclick} role="button" tabIndex="0">
   {children}
  </div>
 );
};

index.propTypes = {
 onclick: PropTypes.func,
 children: PropTypes.element,
};

export default index;
