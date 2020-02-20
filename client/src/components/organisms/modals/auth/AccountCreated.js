import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import Modal from 'components/molecules/modal/Modal';
import Row from 'templates/FlexRowTemplate';
import { withRouter } from 'react-router';

const AccountCreated = ({ closeModal, history }) => {
 return (
  <Modal closeModal={closeModal} title="Konto utworzono pomyślnie">
   <p>
    Dziękujemy za założenie konta. Proszę oczekiwać na zatwierdzenie przez
    administratora.
   </p>
   <br />
   <h4 style={{ fontWeight: 'bold' }}>Dane kontaktowe:</h4>
   <p>
    tel.: <strong>796 999 540</strong>
    <br />
    E-mail: <strong>biuro@mebleblow.pl</strong>
   </p>
   <hr />
   <Row justify="flex-end">
    <Button
     variant="success"
     onClick={() => {
      history.push('/login');
      closeModal();
     }}
    >
     Zakończ
    </Button>
   </Row>
  </Modal>
 );
};

AccountCreated.propTypes = {};

export default withRouter(AccountCreated);
