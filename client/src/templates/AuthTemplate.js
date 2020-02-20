import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const AuthTemplate = ({ children }) => {
 const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
 const token = localStorage.token;
 if (token && isAuthenticated) {
  return <Redirect to="/" />;
 }
 return <>{children}</>;
};

AuthTemplate.propTypes = { children: PropTypes.element.isRequired };

export default AuthTemplate;
