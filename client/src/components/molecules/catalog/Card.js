import React from "react";
import styled from "styled-components";
import withContext from "hoc/withContext";
import PropTypes from "prop-types";
import "./Card.scss";

// const StyledCard = styled.div`
//  position: relative;
//  width: 200px;
//  height: 100px;
//  margin: 5px;
//  border-radius: 5px;
//  border: 1px solid lightgray;
//  background-color: ${({ color }) => color};
//  transition: transform 0.2s;
//  cursor: pointer;
//  &:hover {
//   z-index:100
//   transform: scale(1.2);
//  }
// `;
// const StyledCaption = styled.div`
//  position: absolute;
//  bottom: 3px;
//  left: 3px;
//  max-width: 97%;
//  border-radius: 5px;
//  background-color: rgba(255, 255, 255, 0.5);
//  padding: 3px;
// `;

const Card = ({ name, color, onclick, type = null, permissionContext }) => {
 return (
  // <StyledCard color={color} onClick={() => onclick(name)}>
  //  <StyledCaption>{name}</StyledCaption>
  // </StyledCard>
  <div
   className="catalogCard colorCard"
   color={color}
   onClick={() =>
    permissionContext !== "employee" ? onclick(name, type) : null
   }
   style={{ backgroundColor: color }}
  >
   <div className="cardCaption">{name}</div>
  </div>
 );
};

Card.propTypes = {
 name: PropTypes.string,
 color: PropTypes.string,
 permissionContext: PropTypes.string,
 onClick: PropTypes.func
};

export default withContext(Card);
