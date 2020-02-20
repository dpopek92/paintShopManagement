import React from "react";
import { Redirect, Route } from "react-router-dom";
import withContext from "hoc/withContext";
import PropTypes from "prop-types";

const PrivateRoute = ({
 component: Component,
 permissionContext,
 permissions,
 ...props
}) => {
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

PrivateRoute.propTypes = {
 permissionContext: PropTypes.string,
 permissions: PropTypes.array
};

export default withContext(PrivateRoute);
