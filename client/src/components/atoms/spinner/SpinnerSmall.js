import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const StyledSpinnerBox = styled.div`
 position: relative;
 svg {
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font: 21em "Montserrat";
  width: 200px;
  height: 50px;
 }

 .text-copy {
  fill: none;
  stroke: white;
  stroke-dasharray: 6% 29%;
  stroke-width: 8px;
  stroke-dashoffset: 0%;
  animation: stroke-offset 4s infinite linear;
 }

 .text-copy:nth-child(1) {
  stroke: #73a52e;
  animation-delay: -1;
 }

 .text-copy:nth-child(2) {
  stroke: #343a40;
  animation-delay: -2s;
 }

 .text-copy:nth-child(3) {
  stroke: #73a52e;
  animation-delay: -3s;
 }

 .text-copy:nth-child(4) {
  stroke: #343a40;
  animation-delay: -4s;
 }

 .text-copy:nth-child(5) {
  stroke: #d4d4d4;
  animation-delay: -5s;
 }

 @keyframes stroke-offset {
  100% {
   stroke-dashoffset: -35%;
  }
 }
`;

const SpinnerSmall = props => {
 return (
  <StyledSpinnerBox>
   <svg viewBox="0 0 960 300">
    <symbol id="s-text">
     <text textAnchor="middle" x="50%" y="80%">
      Blow
     </text>
    </symbol>

    <g className="g-ants">
     <use xlinkHref="#s-text" className="text-copy"></use>
     <use xlinkHref="#s-text" className="text-copy"></use>
     <use xlinkHref="#s-text" className="text-copy"></use>
     <use xlinkHref="#s-text" className="text-copy"></use>
     <use xlinkHref="#s-text" className="text-copy"></use>
    </g>
   </svg>
  </StyledSpinnerBox>
 );
};

SpinnerSmall.propTypes = {};

export default SpinnerSmall;
