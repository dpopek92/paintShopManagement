import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';
import Modal from 'components/molecules/modal/Modal';
import Row from 'templates/FlexRowTemplate';
import { Button } from 'react-bootstrap';

const AccountRecover = ({ closeModal }) => {
 const history = useHistory();

 // HANDLERS
 const handleClick = () => {
  history.push('/login');
  closeModal();
 };
 return (
  <Modal closeModal={closeModal} title="Hasło zmienione">
   <p>Hasło zostało zmienione, możesz się zalogować.</p>
   <hr />
   <Row justify="flex-end">
    <Button variant="success" onClick={handleClick}>
     Zaloguj
    </Button>
   </Row>
  </Modal>
 );
};

AccountRecover.propTypes = {
 closeModal: PropTypes.func,
};

export default AccountRecover;
