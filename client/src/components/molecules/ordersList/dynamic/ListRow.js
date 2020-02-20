import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import FinishDateCell from '../specificCells/FinishDateCell';
import StatusCell from '../specificCells/StatusCell';
import LastOperationCell from '../specificCells/LastOperationCell';
import CellWithIcons from '../specificCells/CellWithIcons';
import ElementsCell from '../specificCells/ElementsCell';

const StyledRow = styled.tr`
 cursor: pointer;
 background-color: ${({ halfGriding, inProduction }) => {
  if (inProduction) return '#eaf7d8';
  else if (halfGriding) return '#fff3cb';
 }};
`;

const ListRow = ({ index, item, position, history, view }) => {
 const styleGloss = { backgroundColor: '#0080FF' };
 const tableElements = useSelector(state => state.view.tableElements);
 // const position = useSelector(state => state.employee.activePosition);

 return (
  <StyledRow
   onClick={() => history.push(`/order/${item._id}`)}
   inProduction={item.inProduction.includes(position)}
   halfGriding={
    position === 'Szlifiernia' &&
    item.isHalfGriding &&
    !item.inProduction.includes(position)
   }
  >
   {<CellWithIcons index={index} item={item} position={position} />}
   <td>
    {item.user ? `${item.user.company} - ${item.user.firstname[0]}` : '??'}
   </td>
   <td>{item.number}</td>
   {tableElements.name && <td>{item.name}</td>}
   {tableElements.color && <td>{item.color}</td>}
   {tableElements.paintType && (
    <td style={item.paintType === 'Połysk' ? styleGloss : null}>
     {item.paintType}
    </td>
   )}
   {tableElements.elements && <ElementsCell item={item} view={view} />}
   {tableElements.PL && (
    <td>{item.surfaceRight ? item.surfaceRight.toFixed(2) : ''}</td>
   )}
   {tableElements.PP && (
    <td>{item.surfaceLeft ? item.surfaceLeft.toFixed(2) : ''}</td>
   )}
   {tableElements.finishDate && <FinishDateCell item={item} />}
   {tableElements.type && (
    <td>{item.veneerSymbol ? 'Fornir' : `${!item.isFlat ? 'CNC' : ''}`}</td>
   )}
   {tableElements.status && <StatusCell item={item} position={position} />}
   {tableElements.lastOperation && (
    <LastOperationCell item={item} position={position} />
   )}
  </StyledRow>
 );
};

ListRow.propTypes = {
 index: PropTypes.number,
 item: PropTypes.object,
 position: PropTypes.string,
};

export default withRouter(ListRow);
