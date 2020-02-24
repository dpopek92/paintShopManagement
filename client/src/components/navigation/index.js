import React from 'react';
import { useLocation } from 'react-router-dom';
import withContext from 'hoc/withContext';
import GuestNav from './GuestNav';

const Navigation = ({ permission }) => {
 const location = useLocation();

 if (permission === 'admin') return null;
 if (permission === 'user') return null;
 if (permission === 'employee') return null;
 return <GuestNav location={location} />;
};

export default withContext(Navigation);
