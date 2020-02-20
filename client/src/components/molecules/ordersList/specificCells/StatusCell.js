import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

const StatusCell = ({ item, view, position }) => {
 const status = item.productionStatus
  ? item.productionStatus.split(' ')
  : [item.status];

 return (
  <td style={{ fontWeight: 'bold' }}>
   {status.map(item => (
    <span
     key={item}
     className={
      view === 'production' ||
      view === 'generateList' ||
      view === 'generateCommand'
       ? ''
       : item
     }
    >
     {item}{' '}
    </span>
   ))}
   {position === 'Pakowanie' && item.isReadyToPickUp && (
    <span>
     <FontAwesomeIcon
      style={{ color: '#e165b9' }}
      icon={faCheck}
      title="Do odbioru"
     />
    </span>
   )}
  </td>
 );
};

StatusCell.propTypes = {
 item: PropTypes.instanceOf(Object),
 view: PropTypes.string,
};

export default StatusCell;
