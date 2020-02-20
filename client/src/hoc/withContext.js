import React from "react";
import permissionContext from "context";

const withContext = Component => {
 return function contextComponent(props) {
  return (
   <permissionContext.Consumer>
    {context => <Component {...props} permissionContext={context} />}
   </permissionContext.Consumer>
  );
 };
};

export default withContext;
