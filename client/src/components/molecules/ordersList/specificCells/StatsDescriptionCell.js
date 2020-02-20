import React from 'react';
import PropTypes from 'prop-types';

const StatsDescriptionCell = ({ description }) => {
 return (
  <td>
   {description.desc} <br />
   {description.employees &&
    description.employees.map(item => (
     <small
      key={item._id}
      // onClick={() =>
      //  history.push(`/admin/employees/${item.id}`, { ...item })
      // }
     >
      {' '}
      {item.name},
     </small>
    ))}
  </td>
 );
};

StatsDescriptionCell.propTypes = {
 description: PropTypes.instanceOf(Object),
};

export default StatsDescriptionCell;
