import React from 'react';
import permissionContext from 'context';

const withContext = (Component: React.FC<any>) => {
 return function contextComponent(props: any) {
  return (
   <permissionContext.Consumer>
    {context => <Component {...props} permissionContext={context} />}
   </permissionContext.Consumer>
  );
 };
};

export default withContext;
