import React, { FunctionComponent } from 'react';
import permissionContext from 'context';
import GlobalStyle from 'theme/GlobalStyle';
import { theme } from 'theme/MainTheme';
import { ThemeProvider } from 'styled-components';
import withContext from 'hoc/withContext';

type index = {
 permission?: string;
};

const index: FunctionComponent<index> = ({ children, permission }) => {
 // loadUser
 // setPositionForEmployee
 return (
  <permissionContext.Provider value={permission}>
   <GlobalStyle />
   <ThemeProvider theme={theme}>{children}</ThemeProvider>
  </permissionContext.Provider>
 );
};

export default withContext(index);
