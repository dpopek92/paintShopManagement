import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { dateToString } from 'utils/functions/date';
import CellWithIcons from '../specificCells/CellWithIcons';
import LastEditCell from '../specificCells/LastEditCell';
import GenerateListChecboxCell from '../specificCells/GenerateListChecboxCell';
import FinishDateCell from '../specificCells/FinishDateCell';
import StatusCell from '../specificCells/StatusCell';
import PaidStatusCell from '../specificCells/PaidStatusCell';
import LastOperationCell from '../specificCells/LastOperationCell';
import ElementsCell from '../specificCells/ElementsCell';
import PaintExistCheckboxCell from '../specificCells/paintsOrder/PaintExistCheckboxCell';
import PaintQuantityCell from '../specificCells/paintsOrder/PaintQuantityCell';

const StyledTableRow = styled.tr`
 cursor: pointer;
`;

const ListRow = ({
 index,
 item,
 history,
 view,
 handleGenListCheckbox,
 handlePaintsOrderCheckbox,
 handlePaintsOrderInput,
 customerId,
 paintsOrdersValues,
 paintsOrdersSkipped,
 handleRedirect,
 addOrder,
}) => {
 const [isContextMenu, setIsContextMenu] = useState(false);
 //  console.log(isContextMenu);
 const styleGloss = { backgroundColor: '#0080FF' };

 const redirectFunc = e => {
  if (view === 'inProductionList') return handleRedirect(item._id);
  if (view === 'paintsOrder') return handleRedirect(e, item._id);
  if (view === 'addToTimetable' || view === 'orderProductionPlan')
   return addOrder(item);
  return history.push(`/order/${item._id}`);
 };

 return (
  <StyledTableRow
   onClick={e => {
    if (
     !isContextMenu &&
     view !== 'generateList' &&
     view !== 'generateCommand'
    ) {
     redirectFunc(e);
    }
   }}
   className={
    view === 'production' ||
    view === 'generateList' ||
    view === 'generateCommand'
     ? `${item.productionStatus}`
     : ''
   }
  >
   {view === 'production' && <LastEditCell item={item} />}

   {(view === 'generateList' || view === 'generateCommand') && (
    <GenerateListChecboxCell
     view={view}
     item={item}
     onchange={handleGenListCheckbox}
    />
   )}

   <CellWithIcons index={index} item={item} />

   <td>
    {item.user ? `${item.user.company} - ${item.user.firstname[0]}` : '??'}
   </td>

   <td>{item.number}</td>

   <td>{item.name}</td>

   {view === 'paintsOrder' && (
    <PaintExistCheckboxCell
     item={item}
     onchange={handlePaintsOrderCheckbox}
     paintsOrdersValues={paintsOrdersValues}
    />
   )}

   <td>{item.color}</td>

   <td style={item.paintType === 'Połysk' ? styleGloss : {}}>
    {item.paintType}
   </td>

   <ElementsCell item={item} view={view} />

   <td>{item.surfaceRight ? item.surfaceRight.toFixed(2) : ''}</td>

   <td>{item.surfaceLeft ? item.surfaceLeft.toFixed(2) : ''}</td>

   <td>{item.veneerSymbol ? 'Fornir' : `${!item.isFlat ? 'CNC' : ''}`}</td>

   {view !== 'paintsOrder' && <td>{dateToString(item.date)}</td>}

   <FinishDateCell item={item} view={view} />

   {view !== 'ended' && view !== 'new' && (
    <StatusCell item={item} view={view} />
   )}

   {(view === 'production' || view === 'generateCommand') && (
    <LastOperationCell item={item} view={view} />
   )}

   {(view === 'ended' || view === 'customer') && (
    <>
     <td>{item.pickUpDate ? dateToString(item.pickUpDate) : ''}</td>
     <PaidStatusCell
      item={item}
      setIsContextMenu={setIsContextMenu}
      view={view}
      customerId={customerId}
     />
    </>
   )}

   {view === 'paintsOrder' && (
    <PaintQuantityCell
     item={item}
     onchange={handlePaintsOrderInput}
     paintsOrdersValues={paintsOrdersValues}
     paintsOrdersSkipped={paintsOrdersSkipped}
    />
   )}
  </StyledTableRow>
 );
};

ListRow.propTypes = {
 index: PropTypes.number,
 item: PropTypes.instanceOf(Object),
 view: PropTypes.oneOf([
  'production',
  'ended',
  'new',
  'generateList',
  'user',
  'customer',
  'search',
  'generateCommand',
  'paintsOrder',
  'inProductionList',
  'addToTimetable',
  'orderProductionPlan',
  'employee',
 ]).isRequired,
 customerId: PropTypes.string,
};

export default withRouter(ListRow);
