import React from 'react';
import { useLocation } from 'react-router-dom';
import withContext from 'hoc/withContext';
import GuestNav from './GuestNav';
import AdminNav from './AdminNav';
import { useDispatch } from 'react-redux';
import { logOutUser } from 'services/store/actions/auth';

interface Props {
 permissionContext: string;
}

const Navigation: React.FC<Props> = ({ permissionContext }) => {
 const dispatch = useDispatch();
 const location = useLocation();
 const handleLogout = () => {
  dispatch(logOutUser());
 };

 if (permissionContext === 'admin')
  return <AdminNav location={location} logoutUser={handleLogout} />;
 if (permissionContext === 'user') return null;
 if (permissionContext === 'employee') return null;
 return <GuestNav location={location} />;
};

export default withContext(Navigation);
