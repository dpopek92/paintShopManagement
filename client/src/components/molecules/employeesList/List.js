import React from "react";
// import PropTypes from 'prop-types'
import { useSelector } from "react-redux";
import { Table } from "react-bootstrap";
import ListRow from "./ListRow";

const List = () => {
 const employees = useSelector(state => state.employees.list);

 return (
  <Table responsive="lg" striped bordered hover size="sm">
   <thead>
    <tr>
     <th>LP</th>
     <th>Nazwisko</th>
     <th>Imię</th>
     <th>Stanowisko(a) pracy</th>
    </tr>
   </thead>
   <tbody>
    {employees
     .sort((a, b) => a.surname - b.surname)
     .map((item, index) => (
      <ListRow item={item} index={index} key={item._id} />
     ))}
   </tbody>
  </Table>
 );
};

// List.propTypes = {}

export default List;
