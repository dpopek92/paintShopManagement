import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import withContext from 'hoc/withContext';
import Buttons from 'templates/FlexRowTemplate';
import { sortMessagesByDate } from 'utils/sort/sortMethods';
import Message from './MessagesListMessage';

const MessagesList = ({
 messages,
 setMessage,
 setIsNewMessage,
 setIsCommandGenerating,
 getMessages,
 permissionContext,
}) => {
 return (
  <div>
   {messages &&
    messages.sort(sortMessagesByDate).map(item => {
     return (
      <Message
       key={item._id}
       item={item}
       setMessage={setMessage}
       getMessages={getMessages}
      />
     );
    })}
   <hr />
   <Buttons justify="flex-end">
    {permissionContext === 'admin' && (
     <Button
      variant="outline-primary"
      onClick={() => {
       setIsCommandGenerating(true);
      }}
     >
      Generuj polecenie
     </Button>
    )}
    <Button
     variant="success"
     onClick={() => {
      setIsNewMessage(true);
     }}
    >
     Nowa wiadomość
    </Button>
   </Buttons>
  </div>
 );
};

MessagesList.propTypes = {
 messages: PropTypes.arrayOf(PropTypes.instanceOf(Object)),
 setMessage: PropTypes.func,
 setIsNewMessage: PropTypes.func,
};

export default withContext(MessagesList);
