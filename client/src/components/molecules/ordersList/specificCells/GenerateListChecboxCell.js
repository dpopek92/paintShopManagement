import React from 'react';
import PropTypes from 'prop-types';

const GenerateListChecboxCell = ({ view, item, onchange }) => {
 return (
  <td>
   <input
    style={{ margin: '5px' }}
    type="checkbox"
    name={item._id}
    id={item._id}
    value={
     view === 'generateList' ? item._id : `${item.user.company} ${item.number}`
    }
    onChange={onchange}
   />
  </td>
 );
};

GenerateListChecboxCell.propTypes = {
 item: PropTypes.instanceOf(Object),
 onchange: PropTypes.func,
 view: PropTypes.oneOf(['generateList', 'generateCommand']),
};

export default GenerateListChecboxCell;
