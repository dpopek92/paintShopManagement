import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Fade from 'react-reveal/Fade';
import { darken } from 'polished';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
 faCaretSquareUp,
 faCaretSquareDown,
 faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import { dateToString } from 'utils/functions/date';
import CellWithIcons from '../../specificCells/CellWithIcons';
import FinishDateCell from '../../specificCells/FinishDateCell';
import StatusCell from '../../specificCells/StatusCell';

const StyledTableRow = styled.tr`
 cursor: ${({ isedit }) => (!isedit ? 'pointer' : 'default')};
`;
const StyledIcon = styled(FontAwesomeIcon)`
 margin: 3px 5px;
 color: ${({ theme, type, isedit }) => {
  if (!isedit) return 'gray';
  if (type === 'up') return 'green';
  if (type === 'down') return 'red';
  if (type === 'remove') return theme.blowDanger;
 }};
 cursor: ${({ isedit }) => (isedit ? 'pointer' : 'default')};
 &:hover {
  color: ${({ theme, type, isedit }) => {
   if (!isedit) return 'gray';
   if (type === 'up') return darken(0.2, 'green');
   if (type === 'down') return darken(0.2, 'red');
   if (type === 'remove') return darken(0.2, theme.blowDanger);
  }};
 }
 transition: all 0.2;
`;

const ListRow = ({
 index,
 item,
 view,
 position,
 isEdit,
 handleRemoveOrder,
 history,
 handleMoveOrder,
}) => {
 const styleGloss = { backgroundColor: '#0080FF' };

 const handleRedirect = () => {
  if (isEdit) return;
  history.push(`/order/${item._id}`);
 };
 return (
  <StyledTableRow isedit={isEdit ? 1 : 0} onClick={handleRedirect}>
   <CellWithIcons index={index} item={item} />

   <td>
    {item.user ? `${item.user.company} - ${item.user.firstname[0]}` : '??'}
   </td>

   <td>{item.number}</td>

   <td>{item.name}</td>
   <td>
    <StyledIcon
     icon={faCaretSquareDown}
     size="lg"
     type="down"
     isedit={isEdit ? 1 : 0}
     onClick={() => handleMoveOrder(position, 'DOWN', index)}
    />{' '}
    <StyledIcon
     icon={faCaretSquareUp}
     size="lg"
     type="up"
     isedit={isEdit ? 1 : 0}
     onClick={() => handleMoveOrder(position, 'UP', index)}
    />
   </td>
   <td>{item.color}</td>

   <td style={item.paintType === 'Połysk' ? styleGloss : {}}>
    {item.paintType}
   </td>

   <td>{item.elements}</td>

   <td>{item.surfaceRight ? item.surfaceRight.toFixed(2) : ''}</td>

   <td>{item.surfaceLeft ? item.surfaceLeft.toFixed(2) : ''}</td>

   <td>{item.veneerSymbol ? 'Fornir' : `${!item.isFlat ? 'CNC' : ''}`}</td>

   <td>{dateToString(item.date)}</td>

   <FinishDateCell item={item} view={view} />

   <StatusCell item={item} view={view} />

   <td>
    <StyledIcon
     icon={faTrashAlt}
     type="remove"
     isedit={isEdit ? 1 : 0}
     onClick={() => handleRemoveOrder(position, item._id)}
    />
   </td>
  </StyledTableRow>
 );
};

ListRow.propTypes = {
 index: PropTypes.number,
 item: PropTypes.instanceOf(Object),
};

export default withRouter(ListRow);
