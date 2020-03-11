import React, { useState, useEffect, useRef } from 'react';
import {
 ContactT,
 AddressT,
 PhoneT,
 EmailT,
 WebPageT,
 BankAccountT,
 ContactKeysT,
} from 'services/store/types/settings/Settings';
import styled from 'styled-components';
import { Formik, FormikActions } from 'formik';
import { Button, Form, message } from 'antd';
import FormFieldInput from 'components/FormFields/FormFieldInput';
import Header from 'components/header';
import ContactCard from './components/contactCard';
import AddCard from './components/addItemCard';
import SmallDescription from 'components/smallDescription';
import AddPhone from './components/addPhone';
import AddAddress from './components/addAddress';
import AddBankAccount from './components/addBankAccount';
import AddEmail from './components/addEmail';
import AddWebPage from './components/addWebPage';
import { useDispatch } from 'react-redux';
import {
 globalSettingsRemoveItem,
 globalSettingsLoaded,
} from 'services/store/actions/settings';
import update from 'immutability-helper';
import { updateGlobalSettings } from 'services/apiRequests/settings/update';
import { setSpinner } from 'services/store/actions/view';

const initDrawers = {
 address: false,
 phone: false,
 email: false,
 webPage: false,
 bankAccount: false,
};

const StyledForm = styled(Form)`
 button {
  margin-right: 10px;
 }
`;
const StyledContainer = styled.div`
 display: flex;
 flex-wrap: wrap;
 h3 {
  margin-top: 5px;
 }
`;
const StyledWrapper = styled.div`
 width: 50%;
 padding-right: 190px;
 @media (max-width: 768px) {
  width: 100%;
  padding-right: 0;
 }
`;
const StyledCardsWrapper = styled.div`
 display: flex;
 flex-direction: row;
 flex-wrap: wrap;
 margin-bottom: 10px;
 .ant-card {
  margin: 5px 5px;
  width: 280px;
 }
 @media (max-width: 768px) {
  .ant-card {
   width: 100%;
  }
 }
`;

interface PropsT {
 data: ContactT | null;
}

const Contact: React.FC<PropsT> = ({ data }) => {
 const dispatch = useDispatch();
 const [isEdit, setIsEdit] = useState(false);
 const [drawer, setDrawer] = useState(initDrawers);
 const isChanges = useRef(false);

 useEffect(() => {
  return () => {
   if (isChanges.current) {
    alert('Czy chcesz zapisać zmiany?');
   }
  };
 }, []);

 const handleChanges = () => (isChanges.current = true);
 const handleEdit = () => setIsEdit(!isEdit);
 const handleDrawer = (key: string) =>
  setDrawer({ ...initDrawers, [key]: true });
 const handleRemoveItem = (
  key: ContactKeysT,
  index: number,
  setValues?: any,
  values?: ContactT,
 ) => {
  dispatch(globalSettingsRemoveItem(key, index));
  const newValues = update(values, { [key]: { $splice: [[index, 1]] } });
  setValues(newValues);
 };
 const closeDrawers = () => setDrawer(initDrawers);

 return (
  <div>
   {data && (
    <Formik
     //  validationSchema={schema}
     onSubmit={async (values, actions) => {
      dispatch(setSpinner(true));
      await updateGlobalSettings(
       { contact: values },
       data => {
        if (data.contact) actions.setValues(data.contact);
        dispatch(globalSettingsLoaded(data));
        setIsEdit(false);
        dispatch(setSpinner(false));
        message.success('Dane kontaktowe zostały zaktualizowane');
       },
       () => {
        dispatch(setSpinner(false));
        message.error('Błąd serwera');
       },
      );
     }}
     initialValues={data}
     render={props => {
      const { values, setValues, handleSubmit } = props;
      return (
       <>
        <StyledForm
         noValidate
         className="form-container"
         onSubmit={handleSubmit}
        >
         <Header title="Dane kontaktowe" type="h2" />
         <StyledContainer>
          <StyledWrapper>
           <Header title="Dane firmy" type="h3" />
           <FormFieldInput
            {...props}
            label="Nazwa firmy"
            name="companyName"
            size="large"
            disabled={!isEdit}
            required
           />
           <FormFieldInput
            {...props}
            label="NIP"
            name="NIP"
            size="large"
            disabled={!isEdit}
            required
           />
           <FormFieldInput
            {...props}
            label="REGON"
            name="REGON"
            size="large"
            disabled={!isEdit}
            required
           />
           <Header title="Adres" type="h3" />
           <StyledCardsWrapper>
            {values.addresses.map((address: AddressT, index: number) => (
             <ContactCard
              key={address.name}
              title={address.name}
              disabled={!isEdit}
              handleRemove={() =>
               handleRemoveItem('addresses', index, setValues, values)
              }
              content={
               <address>
                <SmallDescription name="Ulica" value={address.street} />
                <SmallDescription
                 name="Kod pocztowy"
                 value={address.postcode}
                />
                <SmallDescription name="Miejscowość" value={address.city} />
                <SmallDescription name="Opis" value={address.description} />
               </address>
              }
             />
            ))}
            {isEdit && (
             <AddCard
              content="Dodaj adres"
              onclick={() => handleDrawer('address')}
             />
            )}
           </StyledCardsWrapper>
           <Header title="Konto bankowe" type="h3" />
           <StyledCardsWrapper>
            {values.bankAccounts.map(
             (bankAccount: BankAccountT, index: number) => (
              <ContactCard
               key={bankAccount.accountNumber}
               title={bankAccount.name}
               disabled={!isEdit}
               handleRemove={() =>
                handleRemoveItem('bankAccounts', index, setValues, values)
               }
               content={
                <>
                 <SmallDescription
                  name="Nazwa banku"
                  value={bankAccount.bankName}
                 />
                 <SmallDescription
                  name="Nr konta"
                  value={bankAccount.accountNumber}
                 />
                </>
               }
              />
             ),
            )}
            {isEdit && (
             <AddCard
              content="Dodaj konto"
              onclick={() => handleDrawer('bankAccount')}
             />
            )}
           </StyledCardsWrapper>
          </StyledWrapper>

          <StyledWrapper>
           <Header title="Telefon" type="h3" />
           <StyledCardsWrapper>
            {values.phones.map((phone: PhoneT, index: number) => (
             <ContactCard
              key={phone.number}
              title={phone.name}
              disabled={!isEdit}
              handleRemove={() =>
               handleRemoveItem('phones', index, setValues, values)
              }
              content={<SmallDescription name="Numer" value={phone.number} />}
             />
            ))}
            {isEdit && (
             <AddCard
              content="Dodaj numer"
              onclick={() => handleDrawer('phone')}
             />
            )}
           </StyledCardsWrapper>
           <Header title="Email" type="h3" />
           <StyledCardsWrapper>
            {values.emails.map((email: EmailT, index: number) => (
             <ContactCard
              key={email.email}
              title={email.name}
              disabled={!isEdit}
              handleRemove={() =>
               handleRemoveItem('emails', index, setValues, values)
              }
              content={<SmallDescription name="E-mail" value={email.email} />}
             />
            ))}
            {isEdit && (
             <AddCard
              content="Dodaj email"
              onclick={() => handleDrawer('email')}
             />
            )}
           </StyledCardsWrapper>
           <Header title="Strona internetowa" type="h3" />
           <StyledCardsWrapper>
            {values.webPages.map((webPage: WebPageT, index: number) => (
             <ContactCard
              key={webPage.webPage}
              title={webPage.name}
              disabled={!isEdit}
              handleRemove={() =>
               handleRemoveItem('webPages', index, setValues, values)
              }
              content={
               <SmallDescription name="Adres" value={webPage.webPage} />
              }
             />
            ))}
            {isEdit && (
             <AddCard
              content="Dodaj stronę"
              onclick={() => handleDrawer('webPage')}
             />
            )}
           </StyledCardsWrapper>
          </StyledWrapper>
         </StyledContainer>
         <Button onClick={handleEdit}>Edytuj</Button>
         <Button type="primary" disabled={!isEdit} htmlType="submit">
          Zatwierdź
         </Button>
        </StyledForm>

        {/* DRAWERS */}
        <AddPhone
         {...props}
         title="Numer telefonu"
         visible={drawer.phone}
         onclose={closeDrawers}
         setChanges={handleChanges}
        />
        <AddAddress
         {...props}
         title="Adres"
         visible={drawer.address}
         onclose={closeDrawers}
         setChanges={handleChanges}
        />
        <AddBankAccount
         {...props}
         title="Numer konta"
         visible={drawer.bankAccount}
         onclose={closeDrawers}
         setChanges={handleChanges}
        />
        <AddEmail
         {...props}
         title="Adres e-mail"
         visible={drawer.email}
         onclose={closeDrawers}
         setChanges={handleChanges}
        />
        <AddWebPage
         {...props}
         title="Adres strony"
         visible={drawer.webPage}
         onclose={closeDrawers}
         setChanges={handleChanges}
        />
       </>
      );
     }}
    />
   )}
  </div>
 );
};

export default Contact;
