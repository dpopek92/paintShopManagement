import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import styled from "styled-components";
import PropTypes from "prop-types";

const StyledWrapper = styled.div`
 display: flex;
 justify-content: center;
 text-align: center;
`;

const StyledCardWrapper = styled(Card)`
 width: fit-content;
 margin: 0 auto;
 h3 {
  color: ${({ theme }) => theme.blowGreen};
 }
 @media (max-width: 768px) {
  width: 100%;
 }
`;

const StyledCard = styled(Card)`
 margin: 5px 5px;
 padding: 3px 8px;
 transition: transform 0.2s ease-in-out;
 &:hover {
  transform: scale(1.1);
  background-color: ${({ theme }) => theme.blowLightGrey};
 }
`;

const StyledCardText = styled.div`
 display: flex;
 flex-direction: row;
 justify-content: space-around;
 @media (max-width: 768px) {
  flex-direction: column;
 }
`;

const Summary = ({ orders }) => {
 const [summary, setSummary] = useState();
 useEffect(() => {
  let PP = 0;
  let PL = 0;
  let CNC = 0;
  let glossPL = 0;
  let glossPP = 0;
  let semiGlossPL = 0;
  let semiGlossPP = 0;

  let elements = 0;
  orders
   .filter(item => item.productionStatus !== "Zakończone")
   .forEach(item => {
    if (item.surfaceCNC) {
     CNC += parseFloat(item.surfaceCNC);
    }
    if (item.surfaceLeft) {
     PP += parseFloat(item.surfaceLeft);
    }
    if (item.surfaceRight) {
     PL += parseFloat(item.surfaceRight);
    }
    if (item.elements) {
     elements += parseInt(item.elements);
    }
    if (item.paintType === "Połysk") {
     if (item.surfaceRight) {
      glossPL += parseFloat(item.surfaceRight);
     }
     if (item.surfaceLeft) {
      glossPP += parseFloat(item.surfaceLeft);
     }
    }
    if (item.paintType !== "Połysk") {
     if (item.surfaceRight) {
      semiGlossPL += parseFloat(item.surfaceRight);
     }
     if (item.surfaceLeft) {
      semiGlossPP += parseFloat(item.surfaceLeft);
     }
    }
   });
  setSummary({
   PL,
   PP,
   CNC,
   elements,
   glossPL,
   glossPP,
   semiGlossPL,
   semiGlossPP
  });
 }, [orders]);
 return (
  <>
   {summary && (
    <StyledWrapper>
     <StyledCardWrapper>
      <Card.Header as="h3">Podsumowanie</Card.Header>
      <Card.Body style={{ padding: 0 }}>
       <StyledCardText>
        <StyledCard>
         <Card.Title style={{ color: "rgb(1, 126, 243)" }}>
          Połysk PL
         </Card.Title>
         <Card.Text>
          {summary.glossPL.toFixed(3)}
          <small>
           m<sup>2</sup>
          </small>
         </Card.Text>
        </StyledCard>
        <StyledCard>
         <Card.Title style={{ color: "rgb(1, 126, 243)" }}>
          Połysk PP
         </Card.Title>
         <Card.Text>
          {summary.glossPP.toFixed(3)}
          <small>
           m<sup>2</sup>
          </small>
         </Card.Text>
        </StyledCard>
        <StyledCard>
         <Card.Title style={{ color: "rgb(88, 88, 88)" }}>
          Półmat/mat PL
         </Card.Title>
         <Card.Text>
          {summary.semiGlossPL.toFixed(3)}
          <small>
           m<sup>2</sup>
          </small>
         </Card.Text>
        </StyledCard>
        <StyledCard>
         <Card.Title style={{ color: "rgb(88, 88, 88)" }}>
          Półmat/mat PP
         </Card.Title>
         <Card.Text>
          {summary.semiGlossPP.toFixed(3)}
          <small>
           m<sup>2</sup>
          </small>
         </Card.Text>
        </StyledCard>
        <StyledCard>
         <Card.Title style={{ color: "rgb(243, 158, 1)" }}>CNC</Card.Title>
         <Card.Text>
          {summary.CNC.toFixed(3)}
          <small>
           m<sup>2</sup>
          </small>
         </Card.Text>
        </StyledCard>
       </StyledCardText>
       <Card.Title>Ogółem</Card.Title>
       <StyledCardText>
        <StyledCard>
         <Card.Title style={{ color: "rgb(146, 36, 180)" }}>PL</Card.Title>
         <Card.Text>
          {summary.PL.toFixed(3)}
          <small>
           m<sup>2</sup>
          </small>
         </Card.Text>
        </StyledCard>
        <StyledCard>
         <Card.Title style={{ color: "rgb(146, 36, 180)" }}>PP</Card.Title>
         <Card.Text>
          {summary.PP.toFixed(3)}
          <small>
           m<sup>2</sup>
          </small>
         </Card.Text>
        </StyledCard>
        <StyledCard>
         <Card.Title style={{ color: "rgb(146, 36, 180)" }}>SUMA</Card.Title>
         <Card.Text>
          {(summary.PL + summary.PP).toFixed(3)}
          <small>
           m<sup>2</sup>
          </small>
         </Card.Text>
        </StyledCard>
        <StyledCard>
         <Card.Title style={{ color: "rgb(146, 36, 180)" }}>
          Elementy
         </Card.Title>
         <Card.Text>
          {summary.elements}
          <small>szt.</small>
         </Card.Text>
        </StyledCard>
       </StyledCardText>
      </Card.Body>
      <small>Podsumowanie aktualnie wyświetlanej listy</small>
     </StyledCardWrapper>
    </StyledWrapper>
   )}
  </>
 );
};

Summary.propTypes = {
 orders: PropTypes.array
};

export default Summary;
