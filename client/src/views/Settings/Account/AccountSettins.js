import React, { useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import withContext from "hoc/withContext";
import { StyledH1 as Heading } from "components/atoms/heading/Headings";
import PageTemplate from "templates/PageTemplate";
import FullWidthTemplate from "templates/FullWidthPageTemplate";
import Row from "templates/FlexRowTemplate";
import UserData from "components/organisms/settings/account/UserData";
import EmployeeData from "components/organisms/settings/account/EmployeeData";
import AccountRemove from "components/organisms/modals/account/AccountRemove";
import PasswordChange from "components/organisms/modals/account/PasswordChange";

const AccountSettins = ({ permissionContext }) => {
 const user = useSelector(state => state.auth.user);
 const [isAccountRemove, setIsAccountRemove] = useState(false);
 const [isPasswordChange, setIsPasswordChange] = useState(false);

 // HANDLERS
 const handleAccountRemve = () => setIsAccountRemove(true);
 const handlePasswordChange = () => setIsPasswordChange(true);
 return (
  <>
   <PageTemplate>
    <FullWidthTemplate>
     <>
      <Row justify="space-between">
       <Heading>Twoje dane</Heading>
       <div>
        <Button variant="danger" onClick={handleAccountRemve}>
         Usuń konto
        </Button>
        <Button variant="outline-dark" onClick={handlePasswordChange}>
         Zmień hasło
        </Button>
       </div>
      </Row>
      {user.permission && (
       <>{permissionContext === "employee" ? <EmployeeData /> : <UserData />}</>
      )}
     </>
    </FullWidthTemplate>
   </PageTemplate>
   {/* MODALS */}
   {isAccountRemove && (
    <AccountRemove closeModal={() => setIsAccountRemove(false)} />
   )}
   {isPasswordChange && (
    <PasswordChange closeModal={() => setIsPasswordChange(false)} />
   )}
  </>
 );
};

AccountSettins.propTypes = {
 permissionContext: PropTypes.string
};

export default withContext(AccountSettins);
