import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Form } from 'react-bootstrap';
import { StyledH3 as Heading } from 'components/atoms/heading/Headings';
import Buttons from 'templates/FlexRowTemplate';
import { addNewMessage } from 'utils/apiHandlers/messages/post';
import { setSpinner } from 'actions/view';
import { employeesPositions } from 'const/';

const NewMessage = ({ setIsNewMessage, getMessages }) => {
 const dispatch = useDispatch();
 const position = useSelector(state => state.employee.activePosition);
 // toReq
 const [message, setMessage] = useState('');
 const [positions, setPositions] = useState([]);

 // HANDLERS
 const handleChange = e => {
  if (e.target.checked) {
   if (!positions.includes(e.target.value)) {
    setPositions(positions.concat(e.target.value));
   }
  } else {
   if (positions.includes(e.target.value)) {
    const newPositions = positions.filter(item => item !== e.target.value);
    setPositions(newPositions);
   }
  }
 };
 const handleSendMessage = async () => {
  dispatch(setSpinner(true));
  await addNewMessage(message, positions, () => {
   getMessages(position, () => {
    dispatch(setSpinner(false));
    setIsNewMessage(false);
   });
  });
 };
 return (
  <div>
   <Form.Control
    as="textarea"
    placeholder="Treść nowej wiadomości..."
    style={{ height: '100px', marginBottom: 10 }}
    value={message}
    onChange={e => {
     setMessage(e.target.value);
    }}
   />
   <Heading>Do kogo?</Heading>
   <Form.Group>
    <Form.Check
     style={{ marginBottom: 10 }}
     id="Biuro"
     key="Biuro"
     value="Biuro"
     type="checkbox"
     label="Biuro"
     name="Position"
     onChange={handleChange}
    />
    {employeesPositions.map(item => {
     return (
      <Form.Check
       style={{ marginBottom: 10 }}
       id={item}
       key={item}
       value={item}
       type="checkbox"
       label={item}
       name="Position"
       onChange={handleChange}
      />
     );
    })}
   </Form.Group>
   <hr />
   <Buttons justify="flex-end">
    <Button
     variant="success"
     disabled={!message || positions.length === 0}
     onClick={handleSendMessage}
    >
     Wyślij
    </Button>
    <Button
     variant="danger"
     onClick={() => {
      setIsNewMessage(false);
     }}
    >
     Wróć
    </Button>
   </Buttons>
  </div>
 );
};

NewMessage.propTypes = {
 setIsNewMessage: PropTypes.func,
 getMessages: PropTypes.func,
};

export default NewMessage;
