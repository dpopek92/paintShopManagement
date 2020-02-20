import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';
import Modal from 'components/molecules/modal/Modal';
import Buttons from 'templates/FlexRowTemplate';
import { setOrderReadyToPickUp } from 'utils/apiHandlers/orders/update';
import { setSpinner } from 'actions/view';
import { getOrder } from 'actions/orders';
import { signal } from 'const/';

const ReadyToPickUp = ({ closeModal, order }) => {
 const dispatch = useDispatch();

 // HANDLERS
 const handleClick = async () => {
  dispatch(setSpinner(true));
  await setOrderReadyToPickUp(order._id, () => {
   dispatch(
    getOrder(
     order._id,
     () => {
      dispatch(setSpinner(false));
      closeModal();
     },
     signal.token,
    ),
   );
  });
 };
 return (
  <Modal closeModal={closeModal} title="Gotowość odbioru">
   <p>Czy zamówienie jest gotowe do odbioru?</p>
   <br />
   <p>
    <small>Klient zostanie poinformowany przy pomocy e-mail.</small>
   </p>
   <hr />
   <Buttons justify="flex-end">
    <Button variant="success" onClick={handleClick}>
     Tak
    </Button>
    <Button variant="danger" onClick={closeModal}>
     Nie
    </Button>
   </Buttons>
  </Modal>
 );
};

ReadyToPickUp.propTypes = {
 closeModal: PropTypes.func,
 order: PropTypes.instanceOf(Object),
};

export default ReadyToPickUp;
