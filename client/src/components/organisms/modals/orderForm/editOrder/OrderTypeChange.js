import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import Buttons from 'templates/FlexRowTemplate';
import Modal from 'components/molecules/modal/Modal';
import { addType } from 'actions/newOrder';

const orderTypes = [
  'Domówienie',
  'Reklamacja (wina BLOW)',
  'Poprawa (wina klienta)',
  'Materiał klienta'
];

const OrderTypeChange = ({ closeModal }) => {
  const dispatch = useDispatch();
  const [orderType, setOrderType] = useState(null);

  // HANDLERS
  const handleOrderType = e => setOrderType(e.target.value);
  const handleSetType = () => {
    dispatch(addType(orderType));
    // if (orderType === "Poprawa (wina klienta)") {
    //  dispatch(setNumber(newOrder.number + ".P"));
    // } else if (orderType === "Reklamacja (wina BLOW)") {
    //  dispatch(setNumber(newOrder.number + ".R"));
    // } else if (orderType === "Domówienie") {
    //  dispatch(setNumber(newOrder.number + ".D"));
    // }
    closeModal();
  };
  return (
    <Modal closeModal={closeModal} title="Zmiana typu zamówienia">
      <Form.Group onChange={handleOrderType} value={orderType}>
        {orderTypes.map(item => (
          <Form.Check
            custom
            key={item}
            value={item}
            type={'radio'}
            label={item}
            id={item}
            name="orderType"
          />
        ))}
      </Form.Group>

      <hr />
      <Buttons justify="flex-end">
        <Button variant="success" onClick={handleSetType}>
          Wybierz
        </Button>
        <Button variant="danger" onClick={closeModal}>
          Anuluj
        </Button>
      </Buttons>
    </Modal>
  );
};

OrderTypeChange.propTypes = {
  closeModal: PropTypes.func
};

export default OrderTypeChange;
