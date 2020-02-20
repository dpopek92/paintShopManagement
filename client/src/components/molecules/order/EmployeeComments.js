import React from "react";
import styled from "styled-components";
import { Table } from "react-bootstrap";
import PropTypes from "prop-types";
import { dateToString } from "utils/functions/date";
import withContext from "hoc/withContext";

const TightColumn = styled.th`
 width: 150px;
`;

const EmployeeComments = ({ comments, permissionContext }) => {
 return (
  <div>
   {permissionContext !== "user" && comments && comments.length > 0 && (
    <Table responsive striped bordered hover size="sm">
     <thead>
      <tr>
       <th colSpan={3}>Uwagi pracowników:</th>
      </tr>
      <tr>
       <TightColumn>Kiedy:</TightColumn>
       <TightColumn>Kto</TightColumn>
       <th>Uwagi:</th>
      </tr>
     </thead>
     <tbody>
      {comments.map(item => {
       return (
        <tr key={item._id}>
         <td>{dateToString(item.date)}</td>
         <td>{item.position}</td>
         <td>{item.comment}</td>
        </tr>
       );
      })}
     </tbody>
    </Table>
   )}
  </div>
 );
};

EmployeeComments.propTypes = {
 comments: PropTypes.array
};

export default withContext(EmployeeComments);
