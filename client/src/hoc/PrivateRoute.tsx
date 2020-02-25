import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import withContext from 'hoc/withContext';

interface Props {
 component: React.FC<any>;
 permissionContext: string;
 permissions: string[];
}

const PrivateRoute = ({
 component: Component,
 permissionContext,
 permissions,
 ...props
}: Props) => {
 return (
  <Route
   {...props}
   render={props =>
    permissions.includes(permissionContext) ? (
     <Component {...props} />
    ) : (
     <Redirect to="/" />
    )
   }
  />
 );
};

export default withContext(PrivateRoute);
