import React from "react";
import styled from "styled-components";

const StyledWrapper = styled.div`
 z-index: 1100;
 position: fixed;
 top: 0;
 left: 0;
 height: 100%;
 width: 100%;
 background-color: rgba(255, 255, 255, 0.5);
`;
const StyledSpinnerBox = styled.div`
 z-index: 1101;
 position: absolute;
 top: 40%;
 left: 50%;
 transform: translate(-50%, -90%);
 svg {
  display: block;
  font: 10.5em "Montserrat";
  width: 960px;
  height: 300px;
  margin: 0 auto;
  @media (max-width: 600px) {
   font-size: 7em;
  }
 }

 .text-copy {
  fill: none;
  stroke: white;
  stroke-dasharray: 6% 29%;
  stroke-width: 5px;
  stroke-dashoffset: 0%;
  animation: stroke-offset 5.5s infinite linear;
  @media (max-width: 600px) {
   stroke-width: 3px;
  }
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
const Spinner = () => {
 return (
  <StyledWrapper>
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
  </StyledWrapper>
 );
};

Spinner.propTypes = {};

export default Spinner;
