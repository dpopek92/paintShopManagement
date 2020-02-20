import React, { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { Button, Form } from "react-bootstrap";
import Modal from "components/molecules/modal/Modal";
import Buttons from "templates/FlexRowTemplate";
import { setSpinner } from "actions/view";
import { getOrder } from "actions/orders";
import { changeOrderFinishDate } from "utils/apiHandlers/orders/update";
import { dateToString, formatDateToDatePicker } from "utils/functions/date";

const DataChange = ({ closeModal, order }) => {
 const finishDate = order.productionFinishDate
  ? order.productionFinishDate
  : order.finishDate;

 const dispatch = useDispatch();
 //toReq
 const [date, setDate] = useState(formatDateToDatePicker(finishDate));

 const handleSubmit = async (orderId, date) => {
  dispatch(setSpinner(true));
  await changeOrderFinishDate(orderId, date);
  closeModal();
  dispatch(getOrder(orderId, () => dispatch(setSpinner(false)), null));
 };

 console.log(date);
 return (
  <Modal
   closeModal={closeModal}
   title={"Zmiana daty realizacji"}
   variant="success"
  >
   <>
    Aktualna data realizacji zamówienia to:{" "}
    <span style={{ fontWeight: "bold", fontSize: 18 }}>
     {dateToString(finishDate)}
    </span>
    <br />
    Chcesz ją zmienić na:{" "}
    <Form.Control
     type="date"
     style={{ width: "50%", display: "inline" }}
     value={date}
     onChange={e => {
      setDate(e.target.value);
     }}
    />
    <hr />
    <Buttons justify="flex-end">
     <Button
      variant="success"
      disabled={!date}
      onClick={() => {
       handleSubmit(order._id, date);
      }}
     >
      Zmień Datę
     </Button>
     <Button variant="danger" onClick={closeModal}>
      Anuluj
     </Button>
    </Buttons>
   </>
  </Modal>
 );
};

DataChange.propTypes = {
 closeModal: PropTypes.func,
 order: PropTypes.object
};

export default DataChange;
