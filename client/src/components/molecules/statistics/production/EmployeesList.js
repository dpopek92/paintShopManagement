import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { Redirect } from "react-router";
import { setActiveEmployee } from "actions/stats";

const StyledEmployee = styled.span`
 cursor: pointer;
 &:hover {
  text-decoration: underline;
 }
`;

const EmployeesList = ({ employees }) => {
 const dispatch = useDispatch();
 const [isRedirect, setIsRedirect] = useState(false);

 if (isRedirect) return <Redirect to="/statistics/employees" />;
 // console.log(employees);
 return (
  <div>
   {employees && employees.length > 0 && (
    <>
     <h4>Pracownicy:</h4>
     <ul>
      {employees.map(item => (
       <li key={item._id}>
        <StyledEmployee
         onClick={() => {
          dispatch(setActiveEmployee(item.id));
          setIsRedirect(true);
         }}
        >
         {item.name}
        </StyledEmployee>
       </li>
      ))}
     </ul>
    </>
   )}
  </div>
 );
};

EmployeesList.propTypes = {
 employees: PropTypes.array
};

export default EmployeesList;
