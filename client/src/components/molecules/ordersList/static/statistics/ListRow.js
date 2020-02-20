import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { dateToString } from 'utils/functions/date';
import ElementsCell from '../../specificCells/ElementsCell';
import FinishDateCell from '../../specificCells/FinishDateCell';
import StatusCell from '../../specificCells/StatusCell';
import CellWithIcons from '../../specificCells/CellWithIcons';
import StatsDescriptionCell from '../../specificCells/StatsDescriptionCell';

const ListRow = ({ description, item, index, history }) => {
 const styleGloss = { backgroundColor: '#0080FF' };

 return (
  <tr
   onClick={() => history.push(`/order/${item._id}`, { ...item })}
   style={{ cursor: 'pointer' }}
  >
   <CellWithIcons index={index} item={item} />
   <td>
    {item.user ? `${item.user.company} - ${item.user.firstname[0]}` : '??'}
   </td>
   <td>{item.number}</td>
   <td>{item.name}</td>
   <td>{item.color}</td>
   <td style={item.paintType === 'Połysk' ? styleGloss : {}}>
    {item.paintType}
   </td>
   <ElementsCell item={item} view="stats" />
   <td>{item.surfaceRight ? item.surfaceRight.toFixed(2) : ''}</td>
   <td>{item.surfaceLeft ? item.surfaceLeft.toFixed(2) : ''}</td>
   <td>{item.veneerSymbol ? 'Fornir' : `${!item.isFlat ? 'CNC' : ''}`}</td>
   <td>{dateToString(item.date)}</td>
   <FinishDateCell item={item} view="stats" />
   <StatusCell item={item} view="stats" />
   <StatsDescriptionCell item={item} description={description} />
  </tr>
 );
};

ListRow.propTypes = {
 item: PropTypes.instanceOf(Object),
 index: PropTypes.number,
 description: PropTypes.instanceOf(Object),
};

export default withRouter(ListRow);
