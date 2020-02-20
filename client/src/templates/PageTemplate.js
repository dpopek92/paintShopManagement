import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const PageTemplate = ({ children }) => {
 const { token } = localStorage;
 if (!token) {
  return <Redirect to="/login" />;
 }
 return <>{children}</>;
};

PageTemplate.propTypes = { children: PropTypes.element };

export default PageTemplate;
