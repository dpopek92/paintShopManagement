import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { Button, Form } from 'react-bootstrap';
import Modal from 'components/molecules/modal/Modal';
import Buttons from 'templates/FlexRowTemplate';
import { setSpinner } from 'actions/view';
import { getOrder } from 'actions/orders';
import { changeOrderStatus } from 'utils/apiHandlers/orders/update';
import { allStates } from 'const/';

const StyledLabel = styled(Form.Check.Label)`
 cursor: pointer;
 font-weight: bold;
 font-size: 18px;
 color: ${({ theme, pos }) => theme.positions[pos]};
 text-shadow: ${({ pos }) =>
  pos === 'Podkład' ? `1px 1px 3px rgb(75, 75, 75)` : 'none'};
`;

const StatusChange = ({ closeModal, order }) => {
 const dispatch = useDispatch();

 // toReq
 const [productionStatus, setProductionStatus] = useState([]);

 const handleStatus = e => {
  const { checked, value } = e.target;
  if (checked) return setProductionStatus(productionStatus.concat(value));

  return setProductionStatus(productionStatus.filter(state => state !== value));
 };

 const handleSubmit = async () => {
  let status = '';
  if (
   productionStatus.includes('Surówka') ||
   productionStatus.includes('Podkład') ||
   productionStatus.includes('Szlifiernia')
  )
   status = 'Przygotowanie';
  else if (productionStatus.includes('Lakiernia')) status = 'Lakierowanie';
  else if (productionStatus.includes('Polernia')) status = 'Polerowanie';
  else if (productionStatus.includes('Pakowanie')) status = 'Pakowanie';
  else if (productionStatus.includes('Zakończone')) status = 'Do odbioru';
  else if (productionStatus.includes('Odebrane')) status = 'Odebrane';
  const prodStatus = productionStatus.join(' ');
  dispatch(setSpinner(true));
  await changeOrderStatus(order._id, { status, productionStatus: prodStatus });
  dispatch(
   getOrder(
    order._id,
    () => {
     dispatch(setSpinner(false));
     closeModal();
    },
    null,
   ),
  );
 };

 return (
  <Modal closeModal={closeModal} title="Zmiana statusu" variant="success">
   <>
    <p>
     Aktualny status zamówienia to:{' '}
     <strong>
      {order.productionStatus ? order.productionStatus : order.status}
     </strong>
     , zmień na: <br />
     {productionStatus.map(status => (
      <span key={status} className={status} style={{ fontWeight: 'bold' }}>
       {status}{' '}
      </span>
     ))}
    </p>
    <Buttons column>
     {allStates.map(state => (
      <Form.Group key={state} controlId={state} style={{ margin: 0 }}>
       <Form.Check type="checkbox">
        <Form.Check.Input
         type="checkbox"
         checked={productionStatus.includes(state)}
         value={state}
         onChange={handleStatus}
        />
        <StyledLabel pos={state}>{state}</StyledLabel>
       </Form.Check>
      </Form.Group>
     ))}
    </Buttons>
    <hr />
    <Buttons justify="flex-end">
     <Button variant="success" onClick={handleSubmit}>
      Zatwierdź
     </Button>
     <Button variant="danger" onClick={closeModal}>
      Anuluj
     </Button>
    </Buttons>
   </>
  </Modal>
 );
};

StatusChange.propTypes = {
 closeModal: PropTypes.func,
 order: PropTypes.instanceOf(Object),
};

export default StatusChange;
