import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form } from "react-bootstrap";
import withContext from "hoc/withContext";
import Modal from "components/molecules/modal/Modal";
import Buttons from "templates/FlexRowTemplate";
import { setSpinner } from "actions/view";
import { getOrder } from "actions/orders";
import { addOrderComment } from "utils/apiHandlers/orders/update";

const AddComment = ({ closeModal, order, permissionContext }) => {
 const [comment, setComment] = useState("");
 const [position, setPosition] = useState("");
 const activePosition = useSelector(state => state.employee.activePosition);
 const user = useSelector(state => state.auth.user);
 const dispatch = useDispatch();

 // SET INFO WHO ADD A COMMENT
 useEffect(() => {
  if (permissionContext === "admin") {
   user && setPosition(user.firstname);
  } else {
   setPosition(activePosition);
  }
 }, []);

 // HANDLERS
 const handleSubmit = async (orderId, comment, name) => {
  dispatch(setSpinner(true));
  await addOrderComment(orderId, comment, name);
  dispatch(getOrder(orderId, () => dispatch(setSpinner(false)), null));
  closeModal();
 };

 return (
  <Modal closeModal={closeModal} title={"Dodaj komentarz"} variant="success">
   <>
    <Form.Control
     as="textarea"
     placeholder="Komentarz do zamówienia..."
     style={{ height: "100px" }}
     value={comment}
     onChange={e => {
      setComment(e.target.value);
     }}
    />
    <hr />
    <Buttons justify="flex-end">
     <Button
      variant="success"
      disabled={!comment}
      onClick={() => {
       handleSubmit(order._id, comment, position);
      }}
     >
      Dodaj
     </Button>
     <Button variant="danger" onClick={closeModal}>
      Anuluj
     </Button>
    </Buttons>
   </>
  </Modal>
 );
};

AddComment.propTypes = {
 closeModal: PropTypes.func,
 order: PropTypes.object
};

export default withContext(AddComment);
