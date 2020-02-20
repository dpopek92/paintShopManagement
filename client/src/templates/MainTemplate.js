import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadUser } from "actions/auth";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import { ThemeProvider } from "styled-components";
import permissionContext from "context";
import GlobalStyle from "theme/GlobalStyle";
import { theme } from "theme/MainTheme";
import { setActivePosition } from "actions/employee";

const MainTemplate = ({ children }) => {
 const dispatch = useDispatch();
 const user = useSelector(state => state.auth.user);
 const permission = localStorage.permission;
 useEffect(() => {
  loadUser();
 }, []);
 useEffect(() => {
  // SET POSITION
  if (user.permission === "employee") {
   if (
    localStorage.activePosition &&
    user.positions.includes(localStorage.activePosition)
   ) {
    dispatch(setActivePosition(localStorage.getItem("activePosition")));
   } else {
    dispatch(setActivePosition(user.positions[0]));
   }
  }
 }, [user]);

 return (
  <>
   <permissionContext.Provider value={permission}>
    <GlobalStyle />
    <ThemeProvider theme={theme}>{children}</ThemeProvider>
   </permissionContext.Provider>
  </>
 );
};

MainTemplate.propTypes = {
 children: PropTypes.element
};

export default withRouter(MainTemplate);
