import React from 'react';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import Row from 'templates/FlexRowTemplate';
import { BlinkingMessageAnimation } from 'style/animations';

const StyledButton = styled.button`
 border: 1px solid ${({ theme }) => theme.blowDark};
 border-radius: 5px;
 animation: ${({ isMessage }) =>
   isMessage ? BlinkingMessageAnimation : 'none'}
  2s infinite;
`;

const Buttons = ({
 disabled,
 handleGenerateList,
 handleMessages,
 isUnreadedMessage,
}) => {
 return (
  <div>
   <Row>
    <StyledButton isMessage={isUnreadedMessage} onClick={handleMessages}>
     <FontAwesomeIcon icon={faEnvelope} /> Wiadomości
    </StyledButton>
    <Button variant="primary" disabled={disabled} onClick={handleGenerateList}>
     Stwórz listę
    </Button>
   </Row>
  </div>
 );
};

Buttons.propTypes = {
 disabled: PropTypes.bool,
 isUnreadedMessage: PropTypes.bool,
 handleGenerateList: PropTypes.func,
 handleMessages: PropTypes.func,
};

export default Buttons;
