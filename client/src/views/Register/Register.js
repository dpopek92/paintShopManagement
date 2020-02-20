import React, { useState } from 'react';
// import PropTypes from "prop-types";
import AuthTemplate from 'templates/AuthTemplate';
import styled from 'styled-components';
import { StyledH1 as Heading } from 'components/atoms/heading/Headings';
import { useDispatch } from 'react-redux';
import { register } from 'utils/apiHandlers/auth/post';
import { setSpinner } from 'actions/view';
import RegisterForm from 'components/organisms/registerForm/RegisterForm';
import AccountCreated from 'components/organisms/modals/auth/AccountCreated';

const StyledBox = styled.div`
  margin: 0 auto;
  width: 500px;
  padding: 5px;
  @media (max-width: 600px) {
    width: 100%;
    button {
      width: 100%;
    }
  }
`;

const Register = () => {
  const dispatch = useDispatch();
  //display
  const [isAccountCreated, setIsAccountCreated] = useState(false);

  // HANDLERS
  const handleRegister = async (body, actions) => {
    dispatch(setSpinner(true));
    await register(
      body,
      () => {
        setIsAccountCreated(true);
        dispatch(setSpinner(false));
      },
      () => {
        actions.setErrors({ email: 'Podany email jest już zajęty' });
        dispatch(setSpinner(false));
      }
    );
  };
  return (
    <>
      <AuthTemplate>
        <StyledBox>
          <Heading>Rejestracja</Heading>
          <RegisterForm handleRegister={handleRegister} />
        </StyledBox>
      </AuthTemplate>
      {/* MODALS */}
      {isAccountCreated && (
        <AccountCreated closeModal={() => setIsAccountCreated(false)} />
      )}
    </>
  );
};

// Register.propTypes = {};

export default Register;
