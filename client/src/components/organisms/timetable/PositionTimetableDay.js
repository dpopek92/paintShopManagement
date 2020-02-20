import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Row from 'templates/FlexRowTemplate';
import { Button } from 'react-bootstrap';
import List from 'components/molecules/ordersList/static/timetable/List';
import Summary from 'components/molecules/ordersList/static/timetable/Summary';
import TimetableAddOrder from '../modals/timetable/TimetableAddOrder';
import { updateTimetable } from 'utils/apiHandlers/timetable/update';
import { setSpinner } from 'actions/view';
import { useDispatch } from 'react-redux';

const StyledHeading = styled.h1`
 font-weight: bold;
 letter-spacing: 3px;
 color: ${({ theme, pos }) => theme.positions[pos]};
 text-shadow: ${({ pos }) =>
  pos === 'Podkład' ? '2px 2px 5px rgb(48, 48, 48)' : 'none'};
`;
const StyledWrapper = styled.div`
 margin-bottom: 20px;
`;

const PositionTimetableDay = ({
 position,
 data,
 handleRemoveOrder,
 handleMoveOrder,
 handleAddOrder,
}) => {
 const dispatch = useDispatch();
 const { orders } = data.day;
 const [isEdit, setIsEdit] = useState(false);
 const [isAddOrder, setIsAddOrder] = useState(false);

 const handleIsAddOrder = () => setIsAddOrder(!isAddOrder);
 const handleSubmit = async () => {
  dispatch(setSpinner(true));
  const newOrders = orders.map(order => order._id);

  await updateTimetable(position, data.day._id, newOrders, () => {
   dispatch(setSpinner(false));
   setIsEdit(false);
  });
 };
 const handleEdit = () => {
  return isEdit ? handleSubmit() : setIsEdit(!isEdit);
 };
 return (
  <>
   <StyledWrapper>
    <Row justify="space-between">
     <StyledHeading pos={position}>{position}</StyledHeading>
     <Row justify="flex-end">
      <Button
       variant={isEdit ? 'secondary' : 'outline-secondary'}
       onClick={handleEdit}
      >
       {isEdit ? 'Zatwierdź' : 'Edytuj'}
      </Button>
      <Button disabled={!isEdit} variant="primary" onClick={handleIsAddOrder}>
       Dodaj
      </Button>
     </Row>
    </Row>
    <List
     orders={orders}
     view="timetable"
     sortBy="none"
     isEdit={isEdit}
     handleRemoveOrder={handleRemoveOrder}
     position={position}
     handleMoveOrder={handleMoveOrder}
    />
   </StyledWrapper>
   {/* MODALS */}
   {isAddOrder && (
    <TimetableAddOrder
     closeModal={() => setIsAddOrder(false)}
     handleAddOrder={handleAddOrder}
     position={position}
    />
   )}
  </>
 );
};

PositionTimetableDay.propTypes = {};

export default PositionTimetableDay;
