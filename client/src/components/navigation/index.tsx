import React from 'react';
import { useLocation } from 'react-router-dom';
import withContext from 'hoc/withContext';
import GuestNav from './GuestNav';

interface Props {
 permissionContext: string;
}

const Navigation: React.FC<Props> = ({ permissionContext }) => {
 const location = useLocation();

 if (permissionContext === 'admin') return null;
 if (permissionContext === 'user') return null;
 if (permissionContext === 'employee') return null;
 return <GuestNav location={location} />;
};

export default withContext(Navigation);
