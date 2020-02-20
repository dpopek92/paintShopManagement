/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button, Form } from 'react-bootstrap';
import Row from 'templates/FlexRowTemplate';
import DateComponent from 'components/atoms/date/Date';
import List from 'components/molecules/ordersList/static/List';
import { employeesPositions } from 'const/';
import { dateToString } from 'utils/functions/date';
import { useSelector, useDispatch } from 'react-redux';
import { setSortList, setSpinner } from 'actions/view';
import { addNewMessage } from 'utils/apiHandlers/messages/post';

const StyledRow = styled.div`
 display: flex;
 flex-direction: row;
 flex-wrap: nowrap;
 justify-content: space-between;
 div {
  width: 95%;
 }
`;
const StyledWrapper = styled.div`
 margin: 0 2px;
 text-align: center;
 input {
  border-color: #ced4da;
 }
`;
const StyledParagraph = styled.p`
 margin-bottom: 2px;
`;
const StyledListWrapper = styled.div`
 max-height: 60vh;
 overflow-y: auto;
 margin-top: 20px;
`;

const CommandGenerating = ({ setIsCommandGenerating, getMessages }) => {
 const dispatch = useDispatch();
 const orders = useSelector(state => state.production.activeList);
 const sortOrders = useSelector(state => state.view.sortList.production);
 const currentDate = new Date().toISOString().substr(0, 10);
 const [date, setDate] = useState(currentDate);
 const [position, setPosition] = useState([]);
 const [info, setInfo] = useState('');
 const [text, setText] = useState('');
 const [message, setMessage] = useState('');
 const [ordersArr, setOrdersArr] = useState([]);

 useEffect(() => {
  setInfo(
   `Proszę o wykonanie do dnia: ${dateToString(
    date,
   )} następujących zamówień: ${ordersArr.map(order => ` ${order}`)}.`,
  );
 }, [date, ordersArr]);
 useEffect(() => {
  setMessage(`${info} ${text}`);
 }, [info, text]);

 // HANDLERS
 const handleDate = e => setDate(e.target.value);
 const handlePosition = e => setPosition([e.target.value]);
 const handleText = e => setText(e.target.value);
 const handleOrders = e => {
  const { value, checked } = e.target;
  if (checked) {
   if (!ordersArr.includes(value)) {
    setOrdersArr(ordersArr.concat(value));
   }
  } else {
   const newOrders = ordersArr.filter(item => item !== value);
   setOrdersArr(newOrders);
  }
 };
 const handleSortOrders = sortBy => {
  dispatch(setSortList('production', sortBy));
 };
 const handleSendMessage = async () => {
  dispatch(setSpinner(true));
  await addNewMessage(message, position, () => {
   getMessages(null, () => {
    dispatch(setSpinner(false));
    setIsCommandGenerating(false);
   });
  });
 };
 return (
  <>
   <div>
    <StyledRow>
     <StyledWrapper>
      <StyledParagraph>
       <strong>Stanowisko:</strong>
      </StyledParagraph>
      <Form.Control as="select" value={position} onChange={handlePosition}>
       <option value="" />
       {employeesPositions.map(item => (
        <option
         key={item}
         value={item}
         className={item}
         style={{ fontWeight: 'bold' }}
        >
         {item}
        </option>
       ))}
      </Form.Control>
     </StyledWrapper>

     <StyledWrapper>
      <StyledParagraph>
       <strong>Wiadomość:</strong>
      </StyledParagraph>
      <Form.Control
       type="text"
       onChange={handleText}
       value={text}
      ></Form.Control>
     </StyledWrapper>

     <StyledWrapper>
      <StyledParagraph>
       <strong>Na kiedy:</strong>
      </StyledParagraph>
      <DateComponent value={date} onchange={handleDate} />
     </StyledWrapper>

     <StyledWrapper>
      <StyledParagraph>
       <strong>Treść:</strong>
      </StyledParagraph>
      <Form.Control
       as="textarea"
       rows="4"
       value={message}
       disabled
      ></Form.Control>
     </StyledWrapper>
    </StyledRow>
    <StyledListWrapper>
     {orders && (
      <List
       orders={orders}
       sortBy={sortOrders}
       view="generateCommand"
       handleGenListCheckbox={handleOrders}
       setSortOrders={handleSortOrders}
      />
     )}
    </StyledListWrapper>
   </div>
   <hr />
   <Row justify="flex-end">
    <Button
     variant="success"
     disabled={position.length === 0 || ordersArr.length === 0}
     onClick={handleSendMessage}
    >
     Wyślij
    </Button>
   </Row>
  </>
 );
};

CommandGenerating.propTypes = {
 setIsCommandGenerating: PropTypes.func,
 getMessages: PropTypes.func,
};

export default CommandGenerating;
