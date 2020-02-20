import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import Modal from 'components/molecules/modal/Modal';
import MessagesList from 'components/molecules/messages/MessagesList';
import Message from 'components/molecules/messages/Message';
import NewMessage from 'components/molecules/messages/NewMessage';
import withContext from 'hoc/withContext';
import { getAllMessages, getEmployeeMessages } from 'actions/messages';
import { signal } from 'const';
import CommandGenerating from 'components/molecules/messages/CommandGenerating';

const Messages = ({ closeModal, messages, permissionContext }) => {
 const dispatch = useDispatch();
 const user = useSelector(state => state.auth.user);
 // display
 const [message, setMessage] = useState(null);
 const [isNewMessage, setIsNewMessage] = useState(false);
 const [isCommandGenerating, setIsCommandGenerating] = useState(false);

 // HANDLERS
 const getMessages = async (position = null, onEnd) => {
  if (permissionContext === 'admin') {
   await dispatch(getAllMessages(onEnd, signal.token));
  } else if (permissionContext === 'employee') {
   await dispatch(getEmployeeMessages(position, onEnd, signal.token));
  } else {
   onEnd();
  }
 };

 return (
  <Modal
   closeModal={closeModal}
   title="Wiadomości"
   size={isCommandGenerating ? 'xl' : 'md'}
  >
   {isNewMessage && (
    <NewMessage setIsNewMessage={setIsNewMessage} getMessages={getMessages} />
   )}
   {message && (
    <Message item={message} setMessage={setMessage} getMessages={getMessages} />
   )}
   {user.permission && !message && !isNewMessage && !isCommandGenerating && (
    <MessagesList
     messages={messages}
     setMessage={setMessage}
     setIsNewMessage={setIsNewMessage}
     setIsCommandGenerating={setIsCommandGenerating}
     getMessages={getMessages}
    />
   )}
   {isCommandGenerating && (
    <CommandGenerating
     setIsCommandGenerating={setIsCommandGenerating}
     getMessages={getMessages}
    />
   )}
  </Modal>
 );
};

Messages.propTypes = {
 closeModal: PropTypes.func,
 messages: PropTypes.arrayOf(PropTypes.instanceOf(Object)),
};

export default withContext(Messages);
