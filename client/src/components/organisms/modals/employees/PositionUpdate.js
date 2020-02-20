import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import Modal from "components/molecules/modal/Modal";
import Buttons from "templates/FlexRowTemplate";
import { setSpinner } from "actions/view";
import { loadEmployee } from "actions/employees";
import { employeesPositions as positionsArr, signal } from "const/";
import { setEmployeePositions } from "utils/apiHandlers/employees/update";

const PositionUpdate = ({ closeModal, employeeId }) => {
 const dispatch = useDispatch();
 const [positions, setPositions] = useState([]);

 // HANDLERS
 const handleChange = e => {
  if (e.target.checked) {
   setPositions(positions.concat(e.target.value));
  } else {
   const newPositions = positions.filter(item => item !== e.target.value);
   setPositions(newPositions);
  }
 };
 const handlePositionUpdate = async () => {
  dispatch(setSpinner(true));
  await setEmployeePositions(employeeId, positions, () => {
   dispatch(
    loadEmployee(
     employeeId,
     () => {
      dispatch(setSpinner(false));
      closeModal();
     },
     signal.token
    )
   );
  });
 };
 return (
  <Modal closeModal={closeModal} title="Edycja stanowisk">
   <p>Zaznacz stanowiska dla pracownika</p>
   <Form.Group>
    {positionsArr.map(item => {
     return (
      <Form.Check
       key={item}
       value={item}
       type="checkbox"
       checked={positions.includes(item)}
       id={item}
       name={item}
       label={item}
       onChange={handleChange}
      />
     );
    })}
   </Form.Group>

   <hr />
   <Buttons justify="flex-end">
    <Button variant="success" onClick={handlePositionUpdate}>
     Zatwierdź
    </Button>
    <Button variant="danger" onClick={closeModal}>
     Anuluj
    </Button>
   </Buttons>
  </Modal>
 );
};

PositionUpdate.propTypes = {
 employeeId: PropTypes.string,
 closeModal: PropTypes.func
};

export default PositionUpdate;
