import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const authTemplate = ({ children }) => {
 const { token } = localStorage;
 if (!token) {
  return <Redirect to="/login" />;
 }
 return <>{children}</>;
};

authTemplate.propTypes = { children: PropTypes.element };

export default authTemplate;
