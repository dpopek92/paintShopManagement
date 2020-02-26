import React from 'react';
import AuthTemplate from 'components/templates/authTemplate';
import FullWidthPageTemplate from 'components/templates/fullWidth';
import withContext from 'hoc/withContext';
import AdminHome from './Admin';

interface Props {
 permissionContext: string;
}

const Home: React.FC<Props> = ({ permissionContext }) => {
 let homePage = null;
 if (permissionContext === 'admin') homePage = <AdminHome />;
 else if (permissionContext === 'user') homePage = null;
 else if (permissionContext === 'employee') homePage = null;
 return <FullWidthPageTemplate>{homePage}</FullWidthPageTemplate>;
};

export default withContext(Home);
