import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const StyledWrapper = styled.div`
 display: flex;
 flex-direction: "row";
 flex-wrap: wrap;
 justify-content: space-between;
 @media (max-width: 600px) {
  justify-content: "center";
 }
`;

const PriceInfo = ({ name, value, unit }) => {
 let currentUnit;
 if (unit === "szt") currentUnit = "szt.";
 else if (unit === "mb") currentUnit = "m.b.";
 else if (unit === "m2")
  currentUnit = (
   <span>
    m<sup>2</sup>
   </span>
  );
 return (
  <StyledWrapper>
   <p>{name}:</p>
   <span>
    <strong>{value}</strong> <small>zł/{currentUnit}</small>
   </span>
  </StyledWrapper>
 );
};

PriceInfo.propTypes = {
 name: PropTypes.string,
 value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
 unit: PropTypes.oneOf(["szt", "mb", "m2"])
};

export default PriceInfo;
