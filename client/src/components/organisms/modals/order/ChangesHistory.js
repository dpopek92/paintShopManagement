import React from "react";
import PropTypes from "prop-types";
import { Table, Button } from "react-bootstrap";
import Buttons from "templates/FlexRowTemplate";
import Modal from "components/molecules/modal/Modal";
import { dateToStringWithHour } from "utils/functions/date";

const ChangesHistory = ({ closeModal, order }) => {
 return (
  <Modal closeModal={closeModal} size="xl" title="Historia zmian">
   <Table responsive size="sm" style={{ textAlign: "center" }}>
    <thead>
     <tr>
      <th>Kiedy</th>
      <th>Kto</th>
      <th>Co</th>
      <th>Opis</th>
     </tr>
    </thead>
    <tbody>
     {order.updateHistory.map((item, index) => {
      return (
       <tr key={index}>
        <td>{dateToStringWithHour(item.date)}</td>
        <td>{item.user}</td>
        <td>{item.key}</td>
        <td>{item.desc ? item.desc : `z ${item.from} na ${item.to}`}</td>
       </tr>
      );
     })}
    </tbody>
   </Table>
   <hr />
   <Buttons justify="flex-end">
    <Button variant="danger" onClick={closeModal}>
     Zamknij
    </Button>
   </Buttons>
  </Modal>
 );
};

ChangesHistory.propTypes = {
 closeModal: PropTypes.func,
 order: PropTypes.object
};

export default ChangesHistory;
