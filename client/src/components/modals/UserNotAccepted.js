import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import axios from 'axios';
import setAuthToken from '../../helpers/setAuthToken';

const UserNotAccepted = ({ id, logOut }) => {
 const [state, setState] = useState(true);
 const [done, setDone] = useState(false);

 const sendLink = async () => {
  if (localStorage.token) {
   setAuthToken(localStorage.token);
  }
  try {
   await axios.get('/api/verify/resend');

   setState(false);
   setDone(true);
  } catch (err) {
   console.log(err.response);
  }
 };

 return (
  <div>
   <Modal
    show={state}
    onHide={() => {
     logOut();
    }}
   >
    <Modal.Header closeButton>
     <Modal.Title className="title--danger">
      Konto nie jest zweryfikowane
     </Modal.Title>
    </Modal.Header>
    <Modal.Body>
     Administrator został poinformowany o utworzeniu konta, musisz oczekiwać na
     akceptację.
     <br />
     <br />
     <h4 style={{ fontWeight: 'bold' }}>Dane kontaktowe:</h4>
     <p>
      tel.: <strong>796 999 540</strong>
      <br />
      E-mail: <strong>biuro@mebleblow.pl</strong>
     </p>
    </Modal.Body>
    <Modal.Footer>
     {/* <Button
      variant="info"
      className="button--wide"
      onClick={() => {
       sendLink();
      }}
     >
      Wyślij link ponownie
     </Button> */}
     <Button
      variant="success"
      className="button--wide"
      onClick={() => {
       logOut();
      }}
     >
      OK
     </Button>
    </Modal.Footer>
   </Modal>

   {/* DONE */}
   <Modal
    show={done}
    onHide={() => {
     logOut();
    }}
   >
    <Modal.Header closeButton>
     <Modal.Title className="title--success">Email wysłany</Modal.Title>
    </Modal.Header>
    <Modal.Body>
     Kliknij w link aktywacyjny w wiadomości, którą od nas otrzymałeś.
    </Modal.Body>
    <Modal.Footer>
     <Button
      variant="success"
      className="button--wide"
      onClick={() => {
       setDone(false);
       logOut();
      }}
     >
      OK
     </Button>
    </Modal.Footer>
   </Modal>
  </div>
 );
};

export default UserNotAccepted;
