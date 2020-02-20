import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenSquare } from "@fortawesome/free-solid-svg-icons";
import withContext from "hoc/withContext";

const StyledIcon = styled(FontAwesomeIcon)`
 color: black;
 &:hover {
  color: ${({ theme }) => theme.blowPrimary};
 }
`;

const PaintMakers = ({ order, setIsPaintMakers, permissionContext }) => {
 return (
  <div>
   {order.paintMaker && permissionContext !== "user" ? (
    <p style={{ margin: 0 }}>
     <StyledIcon
      icon={faPenSquare}
      style={{ cursor: "pointer" }}
      title="Zmień producenta"
      onClick={() => setIsPaintMakers(true)}
     />
     <small style={{ fontWeight: "bold" }}> Podkład</small>
     <span>
      {" "}
      <small>- {order.paintMakerBase}</small>
     </span>
    </p>
   ) : null}
   {order.paintMakerBase && permissionContext !== "user" ? (
    <p style={{ margin: 0 }}>
     <StyledIcon
      icon={faPenSquare}
      style={{ cursor: "pointer" }}
      title="Zmień producenta"
      onClick={() => setIsPaintMakers(true)}
     />
     <small style={{ fontWeight: "bold" }}> Lakier</small>
     <span>
      {" "}
      <small>- {order.paintMaker}</small>
     </span>
    </p>
   ) : null}
  </div>
 );
};

PaintMakers.propTypes = {
 order: PropTypes.object,
 permissionContext: PropTypes.string
};

export default withContext(PaintMakers);
