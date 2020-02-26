import React from 'react';
import { Redirect } from 'react-router-dom';

const AuthTemplate: React.FC = ({ children }) => {
 const { token } = localStorage;

 if (!token) {
  return <Redirect to="/login" />;
 }
 return <>{children}</>;
};

export default AuthTemplate;
