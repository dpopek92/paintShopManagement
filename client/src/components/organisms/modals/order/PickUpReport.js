import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form } from "react-bootstrap";
import Modal from "components/molecules/modal/Modal";
import Buttons from "templates/FlexRowTemplate";
import { setSpinner } from "actions/view";
import { getOrder } from "actions/orders";
import { downloadOrderPickUpReport } from "utils/apiHandlers/orders/get";

const PickUpReport = ({ closeModal, order }) => {
 const activePosition = useSelector(state => state.employee.activePosition);
 const [pickedUpElements, setPickedUpElements] = useState(
  order.pickedUpElements
   ? order.elements - order.pickedUpElements
   : order.elements
 );
 const dispatch = useDispatch();

 const handleSubmit = async (order, orderId) => {
  const position = activePosition ? activePosition : "Biuro";
  dispatch(setSpinner(true));
  await downloadOrderPickUpReport(order, orderId, pickedUpElements, position);
  dispatch(getOrder(orderId, () => dispatch(setSpinner(false)), null));
  closeModal();
 };

 const handleInput = e => {
  const numbers = /^(\s*|\d+)$/;
  if (!e.target.value.match(numbers)) return;
  else setPickedUpElements(e.target.value);
 };

 return (
  <Modal closeModal={closeModal} title={"Odbiór elementów"} variant="success">
   <>
    <p>
     {order.pickedUpElements
      ? `Odebrano już ${order.pickedUpElements} z ${order.elements} elementów zamówienia.`
      : `Zamówienie zawiera 
            ${order.elements}
            element/ów.`}{" "}
     Podaj ilość odbieranych elementów:
    </p>
    <Form.Control
     type="text"
     value={pickedUpElements}
     style={{ marginBottom: 10 }}
     onChange={handleInput}
     placeholder="Ilość odebranych elementów"
    />
    <hr />
    <Buttons justify="flex-end">
     <Button
      variant="success"
      onClick={() => {
       handleSubmit(order, order._id);
      }}
     >
      Pobierz protokół*
     </Button>
     <Button variant="danger" onClick={closeModal}>
      Anuluj
     </Button>
    </Buttons>
    <small>
     *Wydruk protokołu jest równoznaczny z oznaczeniem zamówienia jako odebrane
     lub częściowo odebrane
    </small>
   </>
  </Modal>
 );
};

PickUpReport.propTypes = {
 closeModal: PropTypes.func,
 order: PropTypes.object
};

export default PickUpReport;
