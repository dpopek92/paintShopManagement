/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const Login = () => {
 return (
  <div style={{ textAlign: 'center' }}>
   <h1 className="title title--success">Konto aktywne!</h1>
   <h5>Użytkownik otrzyma e-mail z informacją.</h5>
   <Link to="/">
    <Button
     variant="info"
     size="lg"
     className="button--wide"
     style={{ marginTop: '20px' }}
    >
     OK
    </Button>
   </Link>
  </div>
 );
};
export default Login;
