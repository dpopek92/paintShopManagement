import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { withRouter } from "react-router-dom";

const StyledRow = styled.tr`
 cursor: pointer;
`;
const ListRow = ({ item, index, history }) => {
 return (
  <StyledRow
   onClick={() => history.push(`/employees/${item._id}`, { ...item })}
  >
   <td>{index + 1}</td>
   <td>{item.surname}</td>
   <td>{item.firstname}</td>
   <td style={{ fontWeight: "bold" }}>
    {item.positions.map(position => (
     <span className={position} key={position}>
      {position}{" "}
     </span>
    ))}
   </td>
  </StyledRow>
 );
};

ListRow.propTypes = {
 item: PropTypes.object,
 index: PropTypes.number
};

export default withRouter(ListRow);
