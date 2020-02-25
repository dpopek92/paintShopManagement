import React from 'react';
import permissionContext from 'context';
import GlobalStyle from 'theme/GlobalStyle';
import { theme } from 'theme/MainTheme';
import { ThemeProvider } from 'styled-components';
import withContext from 'hoc/withContext';
// import { withRouter } from 'react-router';

interface Props {
 permission: string | undefined;
}

const MainTemplate: React.FC<Props> = ({ children }) => {
 // loadUser
 // setPositionForEmployee
 const permission = localStorage.permission;
 return (
  <permissionContext.Provider value={permission}>
   <GlobalStyle />
   <ThemeProvider theme={theme}>{children}</ThemeProvider>
  </permissionContext.Provider>
 );
};

export default withContext(MainTemplate);
