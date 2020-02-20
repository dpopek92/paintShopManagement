import React from "react";
import PropTypes from "prop-types";
import { Table, Button } from "react-bootstrap";
import Buttons from "templates/FlexRowTemplate";
import Modal from "components/molecules/modal/Modal";
import {
 dateToStringWithHour,
 getHoursMinutesString
} from "utils/functions/date";

const ProductionHistory = ({ closeModal, order }) => {
 return (
  <Modal closeModal={closeModal} size="xl" title="Historia produkcji">
   <Table responsive="lg" size="sm" style={{ textAlign: "center" }}>
    <thead>
     <tr>
      <th>Stanowisko</th>
      <th>Kto</th>
      <th>Opis</th>
      <th>Kiedy</th>
      <th>Czas</th>
     </tr>
    </thead>
    <tbody>
     {order.productionHistory.map((item, index) => {
      return (
       <tr key={index}>
        <td>
         <span className={item.position} style={{ fontWeight: "bold" }}>
          {item.position}
         </span>
        </td>
        <td>
         {item.employees.map(item => (
          <span key={item}>{item}, </span>
         ))}
        </td>
        <td>{item.desc}</td>
        <td>{dateToStringWithHour(item.date)}</td>
        <td>{item.time ? getHoursMinutesString(item.time) : "-"}</td>
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

ProductionHistory.propTypes = {};

export default ProductionHistory;
