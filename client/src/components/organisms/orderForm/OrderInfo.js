import React from "react";
import styled from "styled-components";
import { Form } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import Fade from "react-reveal/Fade";
import { StyledH6 as Heading } from "components/atoms/heading/Headings";
import Row from "templates/FlexRowTemplate";
import Card from "components/atoms/card/Card";
import { handleOrderName, handleOrderComments } from "actions/newOrder";

const StyledWrapper = styled.div`
 text-align: center;
 margin: 0 5px;
 width: 45%;
 input,
 textarea {
  text-align: center;
 }
 @media (max-width: 600px) {
  width: 100%;
 }
`;

const OrderInfo = () => {
 const dispatch = useDispatch();
 const name = useSelector(state => state.newOrder.name);
 const comments = useSelector(state => state.newOrder.comments);

 const handleName = e => {
  dispatch(handleOrderName(e.target.value));
 };
 const handleComments = e => {
  dispatch(handleOrderComments(e.target.value));
 };
 return (
  <Fade bottom>
   <Card>
    <Row justify="space-around">
     <StyledWrapper>
      <Heading>Nazwa zamówienia</Heading>
      <Form.Control
       type="text"
       value={name}
       placeholder="Nazwa zamówienia"
       onChange={handleName}
      />
     </StyledWrapper>
     <StyledWrapper>
      <Heading>Uwagi do zamówienia</Heading>
      <Form.Control
       as="textarea"
       value={comments}
       placeholder="Uwagi dotyczące całego zamówienia"
       onChange={handleComments}
      />
     </StyledWrapper>
    </Row>
   </Card>
  </Fade>
 );
};

OrderInfo.propTypes = {};

export default OrderInfo;
