import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Modal from 'components/molecules/modal/Modal';
import PlacedOrdersTable from 'components/molecules/ordersList/paintsOrders/PlacedOrdersTable';
import { StyledH6 as Heading } from 'components/atoms/heading/Headings';
import Row from 'templates/FlexRowTemplate';
import { Button, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { setSpinner } from 'actions/view';
import { getOrdersByDate } from 'utils/apiHandlers/paints/get';
import { months } from 'const';

const StyledWrapper = styled.div`
 width: 200px;
 margin: 0 20px 20px 0;
`;

const PlacedOrders = ({ closeModal }) => {
 const dispatch = useDispatch();

 const [year, setYear] = useState('');
 const [month, setMonth] = useState('');
 const [orders, setOrders] = useState([]);

 useEffect(() => {
  const getData = async () => {
   dispatch(setSpinner(true));
   const data = await getOrdersByDate(year, month, () => {
    dispatch(setSpinner(false));
   });
   return setOrders(data.orders);
  };
  if (year && month) getData();
 }, [year, month]);

 // HANDLERS
 const handleYear = e => setYear(e.target.value);
 const handleMonth = e => setMonth(e.target.value);

 return (
  <Modal closeModal={closeModal} title="Złożone zamówienia" size="xl">
   <div>
    <Heading>Data:</Heading>
    <Row justify="flex-start">
     <StyledWrapper>
      <Form.Control as="select" value={year} onChange={handleYear}>
       <option value="" disabled>
        Rok
       </option>
       <option value="2020">2020</option>
      </Form.Control>
     </StyledWrapper>{' '}
     <StyledWrapper>
      <Form.Control as="select" value={month} onChange={handleMonth}>
       <option value="" disabled>
        Miesiąc
       </option>
       {months.map((item, index) => (
        <option key={item} value={index + 1}>
         {item}
        </option>
       ))}
      </Form.Control>
     </StyledWrapper>
    </Row>
   </div>
   {orders.length > 0 && (
    <PlacedOrdersTable orders={orders} year={year} month={month} />
   )}
   <hr />
   <Row justify="flex-end">
    <Button variant="danger" onClick={closeModal}>
     Zamknij
    </Button>
   </Row>
  </Modal>
 );
};

PlacedOrders.propTypes = {
 closeModal: PropTypes.func,
};

export default PlacedOrders;
