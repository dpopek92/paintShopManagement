import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import PasswordRemindModal from 'components/organisms/modals/passwordRemind/PasswordRemind';
import { StyledH1 as Heading } from 'components/atoms/heading/Headings';
import Row from 'templates/FlexRowTemplate';
import PasswordRemindForm from 'components/organisms/passwordRemind/PasswordRemind';
import AuthTemplate from 'templates/AuthTemplate';
import { useDispatch } from 'react-redux';
import { setSpinner } from 'actions/view';
import { passwordRemind } from 'utils/apiHandlers/account/post';

const PasswordRemind = () => {
 const dispatch = useDispatch();

 // display
 const [isPasswordRemind, setIsPasswordRemind] = useState(false);

 // HANDLERS
 const handlePasswordRemind = async email => {
  dispatch(setSpinner(true));

  await passwordRemind(email, () => {
   dispatch(setSpinner(false));
   setIsPasswordRemind(true);
  });
 };

 return (
  <>
   <AuthTemplate>
    <Row justify="center">
     <div>
      <Heading>Odzyskiwanie konta</Heading>
      <PasswordRemindForm handlePasswordRemind={handlePasswordRemind} />
     </div>
    </Row>
   </AuthTemplate>
   {/* MODALS */}
   {isPasswordRemind && (
    <PasswordRemindModal closeModal={() => setIsPasswordRemind(false)} />
   )}
  </>
 );
};

// PasswordRemind.propTypes = {};

export default PasswordRemind;
