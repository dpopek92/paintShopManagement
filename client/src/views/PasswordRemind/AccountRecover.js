import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import AccountRecoverModal from 'components/organisms/modals/passwordRemind/AccountRecover';
import { StyledH1 as Heading } from 'components/atoms/heading/Headings';
import Row from 'templates/FlexRowTemplate';
import AccountRecoverForm from 'components/organisms/passwordRemind/AccountRecover';
import { useDispatch } from 'react-redux';
import { setSpinner } from 'actions/view';
import { passwordRecover } from 'utils/apiHandlers/account/update';

const AccountRecover = ({ match }) => {
 const { params } = match;
 const dispatch = useDispatch();

 // display
 const [isPasswordChanged, setIsPasswordChanged] = useState(false);

 // HANDLERS
 const handlePasswordChange = async password => {
  dispatch(setSpinner(true));
  console.log(password);
  await passwordRecover(params.userId, password, () => {
   dispatch(setSpinner(false));
   setIsPasswordChanged(true);
  });
 };

 return (
  <>
   <Row justify="center">
    <div>
     <Heading>Podaj nowe hasło</Heading>
     <AccountRecoverForm handlePasswordChange={handlePasswordChange} />
    </div>
   </Row>
   {/* MODALS */}
   {isPasswordChanged && (
    <AccountRecoverModal closeModal={() => setIsPasswordChanged(false)} />
   )}
  </>
 );
};

AccountRecover.propTypes = {};

export default AccountRecover;
