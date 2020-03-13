import React, { useEffect } from 'react';
import permissionContext from 'context';
import GlobalStyle from 'theme/GlobalStyle';
import { theme } from 'theme/MainTheme';
import { ThemeProvider } from 'styled-components';
import { useSelector } from 'react-redux';
import { AppStateT } from 'services/store';

const MainTemplate: React.FC = ({ children }) => {
 const user = useSelector((state: AppStateT) => state.auth.user);
 let { permission } = localStorage;
 useEffect(() => {}, [user]);
 return (
  <permissionContext.Provider value={permission}>
   <GlobalStyle />
   <ThemeProvider theme={theme}>{children}</ThemeProvider>
  </permissionContext.Provider>
 );
};

export default MainTemplate;
