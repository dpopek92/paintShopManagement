import React from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "react-bootstrap";
import Modal from "components/molecules/modal/Modal";
import Row from "templates/FlexRowTemplate";
import ListElements from "components/molecules/ordersList/listElements/ListElementsCheckboxes";
import { setListElementsToDiplay } from "actions/view";

const TableElementsDisplay = ({ closeModal }) => {
 const dispatch = useDispatch();
 const tableElements = useSelector(state => state.view.tableElements);

 // HANDLERS
 const handleCheckbox = e => {
  dispatch(setListElementsToDiplay(e.target.value, e.target.checked));
 };
 const handleSetElements = () => {
  localStorage.setItem("tableElements", JSON.stringify(tableElements));
  closeModal();
 };

 return (
  <Modal closeModal={closeModal} title="Ustawienia wyświetlania">
   <ListElements handleCheckbox={handleCheckbox} elements={tableElements} />
   <hr />
   <Row justify="flex-end">
    <Button variant="success" onClick={handleSetElements}>
     Zapisz
    </Button>
    <Button variant="danger" onClick={closeModal}>
     Anuluj
    </Button>
   </Row>
  </Modal>
 );
};

TableElementsDisplay.propTypes = {
 closeModal: PropTypes.func
};

export default TableElementsDisplay;
