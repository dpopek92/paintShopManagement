import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import withContext from 'hoc/withContext';
import { isDeadlinePassed } from 'utils/orders';
import { dateToString } from 'utils/functions/date';

const FinishDateCell = ({ item, permissionContext, view }) => {
 const isDeadline = isDeadlinePassed(item.productionFinishDate);
 const finishDate =
  permissionContext === 'user' ? item.finishDate : item.productionFinishDate;
 return (
  <td>
   {dateToString(finishDate)}{' '}
   {view !== 'stats' &&
    permissionContext !== 'user' &&
    isDeadline &&
    item.productionStatus !== 'Zakończone' &&
    !item.pickUpDate && (
     <FontAwesomeIcon
      style={{ fontWeight: 'bold' }}
      icon={faExclamationCircle}
     />
    )}
  </td>
 );
};

FinishDateCell.propTypes = {
 item: PropTypes.instanceOf(Object),
 permissionContext: PropTypes.string,
 view: PropTypes.oneOf([
  'stats',
  'production',
  'new',
  'ended',
  'user',
  'customer',
  'generateCommand',
  'generateList',
  'paintsOrder',
  'search',
  'inProductionList',
  'timetable',
  'addToTimetable',
  'orderProductionPlan',
  'employee',
 ]),
};

export default withContext(FinishDateCell);
