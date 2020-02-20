import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'components/molecules/modal/Modal';
import Row from 'templates/FlexRowTemplate';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router';

const PasswordRemind = ({ closeModal }) => {
 const history = useHistory();

 // HANDLERS
 const handleClick = () => {
  history.push('/');
  closeModal();
 };
 return (
  <Modal closeModal={closeModal} title="Odzyskiwanie konta">
   <p style={{ textAlign: 'justify' }}>
    Jeżeli wprowadzony adres e-mail jest prawidłowy, otrzymasz wiadomość
    umożliwiającą ustawienie nowego hasła. Po otrzymaniu wiadomości, postępuj
    zgodnie z instrukcjami.
   </p>
   <hr />
   <Row justify="flex-end">
    <Button variant="success" onClick={handleClick}>
     Strona logowania
    </Button>
   </Row>
  </Modal>
 );
};

PasswordRemind.propTypes = {};

export default PasswordRemind;
