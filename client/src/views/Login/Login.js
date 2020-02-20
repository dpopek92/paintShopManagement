import React from 'react';
// import PropTypes from "prop-types";
import { useDispatch } from 'react-redux';
import { StyledH1 as Heading } from 'components/atoms/heading/Headings';
import Row from 'templates/FlexRowTemplate';
import LoginForm from 'components/organisms/loginForm/LoginForm';
import AuthTemplate from 'templates/AuthTemplate';
import { auth } from 'utils/apiHandlers/auth/post';
import { logInSuccess, loadUser, logInFail } from 'actions/auth';
import { setSpinner } from 'actions/view';

const Login = () => {
  const dispatch = useDispatch();

  // HANDLERS
  const handleAuth = async (body, actions) => {
    dispatch(setSpinner(true));
    await auth(
      body,
      data => {
        dispatch(logInSuccess(data));
        dispatch(loadUser());
        dispatch(setSpinner(false));
      },
      () => {
        dispatch(logInFail());
        actions.setErrors({
          email: 'Nieprawidłowy email lub hasło',
          password: 'Nieprawidłowy email lub hasło'
        });
        dispatch(setSpinner(false));
      }
    );
  };
  return (
    <AuthTemplate>
      <Row justify="center">
        <div style={{ margin: '0 5px' }}>
          <Heading>Panel logowania</Heading>
          <LoginForm handleAuth={handleAuth} />
        </div>
      </Row>
    </AuthTemplate>
  );
};

// Login.propTypes = {};

export default Login;
