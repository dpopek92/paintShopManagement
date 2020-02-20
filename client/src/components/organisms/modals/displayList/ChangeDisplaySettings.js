import React from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import Row from "templates/FlexRowTemplate";
import Modal from "components/molecules/modal/Modal";
import ListElements from "components/molecules/ordersList/listElements/ListElementsCheckboxes";
import { setPositionsToDiplay, setListElementsToDiplay } from "actions/view";
import PositionsCheckboxes from "components/molecules/ordersList/positionsList/PositionsCheckboxes";

const ChangeDisplaySettings = ({ closeModal }) => {
 const dispatch = useDispatch();
 const positions = useSelector(state => state.view.positions);
 const tableElements = useSelector(state => state.view.tableElements);

 const handlePosition = e => {
  dispatch(setPositionsToDiplay(e.target.value, e.target.checked));
 };
 const handleTableElements = e => {
  dispatch(setListElementsToDiplay(e.target.value, e.target.checked));
 };
 const handleSave = () => {
  localStorage.setItem("positionsToDisplay", JSON.stringify(positions));
  localStorage.setItem("tableElements", JSON.stringify(tableElements));
  closeModal();
 };
 return (
  <Modal closeModal={closeModal} title="Ustawienia wyświetlania" size="lg">
   <Row justify="space-around">
    <PositionsCheckboxes handleCheckbox={handlePosition} elements={positions} />
    <ListElements
     handleCheckbox={handleTableElements}
     elements={tableElements}
    />
   </Row>
   <hr />
   <Row justify="flex-end">
    <Button variant="success" onClick={handleSave}>
     Zapisz
    </Button>
    <Button variant="danger" onClick={closeModal}>
     Anuluj
    </Button>
   </Row>
  </Modal>
 );
};

ChangeDisplaySettings.propTypes = {};

export default ChangeDisplaySettings;
