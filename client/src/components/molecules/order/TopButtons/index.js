import React from "react";
import PropTypes from "prop-types";
import FullWidthTemplate from "templates/FullWidthPageTemplate";
import ButtonsRowTemplate from "templates/FlexRowTemplate";
import withContext from "hoc/withContext";
import AdminButtons from "./AdminButtons";
import EmployeeButtons from "./EmployeeButtons";
import UserButtons from "./UserButtons";

const index = ({ permissionContext, ...props }) => {
 return (
  <FullWidthTemplate>
   <ButtonsRowTemplate justify="flex-end">
    {permissionContext === "admin" && (
     <>
      <AdminButtons {...props} />
     </>
    )}
    {permissionContext === "employee" && (
     <>
      <EmployeeButtons {...props} />
     </>
    )}
    {permissionContext === "user" && (
     <>
      <UserButtons {...props} />
     </>
    )}
   </ButtonsRowTemplate>
  </FullWidthTemplate>
 );
};

index.propTypes = {
 permissionContext: PropTypes.string
};

export default withContext(index);
