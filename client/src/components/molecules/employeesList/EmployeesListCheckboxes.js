import React from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { Form } from "react-bootstrap";

const EmployeesListCheckboxes = ({ employees, handleCheck }) => {
 const user = useSelector(state => state.auth.user);
 return (
  <div>
   <Form.Group>
    {employees.map(item => {
     if (
      user &&
      user.surname === item.surname &&
      user.firstname === item.firstname
     ) {
      return (
       <Form.Check
        style={{ marginBottom: 10 }}
        id={item._id}
        key={item._id}
        value={item._id}
        checked={true}
        disabled
        type={"checkbox"}
        label={`${item.firstname} ${item.surname}`}
        name="Employee"
        onChange={handleCheck}
       />
      );
     } else {
      return (
       <Form.Check
        style={{ marginBottom: 10 }}
        id={item._id}
        key={item._id}
        value={item._id}
        type={"checkbox"}
        label={`${item.firstname} ${item.surname}`}
        name="Employee"
        onChange={handleCheck}
       />
      );
     }
    })}
   </Form.Group>
  </div>
 );
};

EmployeesListCheckboxes.propTypes = {
 employees: PropTypes.array,
 handleCheck: PropTypes.func
};

export default EmployeesListCheckboxes;
