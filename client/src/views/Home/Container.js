import React from "react";
import PropTypes from "prop-types";
import withContext from "hoc/withContext";
import FullWidthPageTemplate from "templates/FullWidthPageTemplate";
import AdminHomePage from "./AdminHomePage";
import UserHomePage from "./UserHomePage";
import EmployeeHomePage from "./EmployeeHomePage";
import DisplayHomePage from "./DisplayHomePage";

const Container = ({ permissionContext }) => {
 let homePage = null;
 if (permissionContext === "admin") homePage = <AdminHomePage />;
 else if (permissionContext === "user") homePage = <UserHomePage />;
 else if (permissionContext === "employee") homePage = <EmployeeHomePage />;
 else if (permissionContext === "display") homePage = <DisplayHomePage />;
 return <FullWidthPageTemplate>{homePage}</FullWidthPageTemplate>;
};

Container.propTypes = {
 permissionContext: PropTypes.string
};

export default withContext(Container);
