import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';
import Buttons from 'templates/FlexRowTemplate';
import Modal from 'components/molecules/modal/Modal';
import EmployeesList from 'components/molecules/employeesList/EmployeesListCheckboxes';
import { setSpinner } from 'actions/view';
import { loadPositionEmployees } from 'actions/employee';
import { stopOrder } from 'utils/apiHandlers/orders/update';
import { getOrder } from 'actions/orders';
import { signal } from 'const';

const StopOrder = ({ closeModal, order }) => {
 const dispatch = useDispatch();
 const position = useSelector(state => state.employee.activePosition);
 const employees = useSelector(state => state.employee.employees);
 // toReq
 const [orderEmployees, setOrderEmployees] = useState([]);
 const [isOrderCompleted, setIsOrderCompleted] = useState(false);
 // display
 const [title, setTitle] = useState('Kto wykonywał zamówienie?');
 const [isLostElements, setIsLostElements] = useState(false);

 // CHECK IF LOST ELEMENTS & GET POSITION EMPLOYEES
 useEffect(() => {
  if (
   order.items.some(item => {
    if (item.elementLost) {
     if (item.elementLost.position === position) {
      return true;
     }
    }
   })
  ) {
   setIsLostElements(true);
   setTitle('Czy zamówienie jest już kompletne?');
  }
  dispatch(loadPositionEmployees(position, () => {}, signal.token));
 }, [position, order]);

 // HANDLERS
 const handleStopOrder = async (halfGrinding = null) => {
  let isFowardToGriding = halfGrinding;
  dispatch(setSpinner(true));
  if (position === 'Lakiernia') {
   if (order.veneerSymbol || order.surfaceLeft) {
    if (order.forwardToGriding === 0) {
     isFowardToGriding = true;
    }
   }
  }
  await stopOrder(
   order._id,
   position,
   orderEmployees,
   isFowardToGriding,
   isOrderCompleted,
   () => {
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
   },
   () => {
    dispatch(setSpinner(false));
    closeModal();
   },
  );
 };
 const handleCheck = e => {
  if (e.target.checked) {
   setOrderEmployees(orderEmployees.concat(e.target.value));
  } else if (orderEmployees.includes(e.target.value)) {
   const newOrderEmployees = orderEmployees.filter(
    item => item !== e.target.value,
   );
   setOrderEmployees(newOrderEmployees);
  }
 };

 return (
  <Modal closeModal={closeModal} title={title}>
   {!isLostElements ? (
    <>
     {employees && (
      <EmployeesList employees={employees} handleCheck={handleCheck} />
     )}
     <hr />
     <Buttons column>
      {position === 'Podkład' && (
       <Button variant="outline-dark" onClick={() => handleStopOrder(true)}>
        Przeszlif
       </Button>
      )}
      {position === 'Szlifiernia' && order.isHalfGriding && (
       <Button variant="outline-dark" onClick={() => handleStopOrder(true)}>
        Zakończ przeszlif
       </Button>
      )}
      {/* {position === 'Lakiernia' && (order.surfaceLeft || order.veneerSymbol) && (
       <Button variant="outline-dark" onClick={() => handleStopOrder(true)}>
        Przekaż na szlifiernię
       </Button>
      )} */}
      <Button variant="success" onClick={() => handleStopOrder()}>
       Zakończ zlecenie
      </Button>
      <Button variant="danger" onClick={closeModal}>
       Anuluj
      </Button>
     </Buttons>
    </>
   ) : (
    <>
     <Buttons justify="flex-end">
      <Button
       variant="success"
       onClick={() => {
        setIsOrderCompleted(true);
        setTitle('Kto wykonywał zamówienie?');
        setIsLostElements(false);
       }}
      >
       Tak
      </Button>
      <Button
       variant="danger"
       onClick={() => {
        setTitle('Kto wykonywał zamówienie?');
        setIsLostElements(false);
       }}
      >
       Nie
      </Button>
     </Buttons>
     <small>
      * - Klikając <strong>Tak</strong> potwierdzasz włączenie elementów
      oznaczonych jako 'brakujące' na produkcję.
     </small>
    </>
   )}
  </Modal>
 );
};

StopOrder.propTypes = {
 closeModal: PropTypes.func,
 order: PropTypes.instanceOf(Object),
};

export default StopOrder;
