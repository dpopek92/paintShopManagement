/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import withContext from 'hoc/withContext';
import { PageHeader, Card, notification, Upload, Button, Icon } from 'antd';
import FullWidthPageTemplate from 'components/templates/fullWidth';
import FlexTemplate from 'components/templates/flexTemplate';
// import { addMilling, addCustomMilling, removeMilling } from 'actions/newOrder';
// import { setComponentInModal } from 'actions/view';
import MILLINGS from 'assets/data/Millings.json';
import CardAction from '../components/CardAction';
import Header from 'components/header';

const openNotification = (milling: string) => {
 notification.success({
  message: 'Fronty frezowane',
  description: `Wybrałeś frezowanie: ${milling.toUpperCase()}`,
 });
};

interface Props {
 permissionContext: string;
}

const Millings = ({ permissionContext }: Props) => {
 const history = useHistory();
 const dispatch = useDispatch();
 //  const userId = useSelector(state => state.auth.user._id);
 const [fileList, setFileList] = useState<any[]>([]);

 const handleClick = (name: string) => {
  if (permissionContext !== 'employee') {
   openNotification(name);
   setFileList([]);
   //    dispatch(addMilling(name));
   //    dispatch(setComponentInModal(null));
  }
 };
 const uploadProps = {
  onRemove: () => {
   setFileList([]);
   //    dispatch(removeMilling());
   //    dispatch(setComponentInModal(null));
  },
  beforeUpload: (file: any) => {
   setFileList([file]);
   openNotification('ze zdjęcia');
   //    dispatch(addCustomMilling(file, userId, 'Inny'));
   //    dispatch(setComponentInModal(null));
   return false;
  },
  fileList,
 };
 return (
  <div>
   <FullWidthPageTemplate>
    <>
     <PageHeader
      ghost={false}
      title={<Header title="Fronty frezowane" type="h1" />}
      extra={
       permissionContext !== 'employee' && [
        <Button
         key="1"
         title="Elementy gładkie z wyfrezowaniem"
         onClick={() => handleClick('CNC')}
        >
         Inny CNC
        </Button>,
        <Upload
         key="2"
         accept="image/*,application/pdf"
         {...uploadProps}
         fileList={fileList}
        >
         <Button>
          <Icon type="upload" /> Dodaj ze zdjęcia
         </Button>
        </Upload>,
       ]
      }
     />

     <FlexTemplate>
      {MILLINGS.map(item => (
       <Card
        key={item.name}
        style={{ width: 300, margin: 5 }}
        bodyStyle={{ padding: 0 }}
        cover={
         <img
          alt={`Front ${item.name}`}
          src={require(`assets/images/millings/${item.name}/${item.image}`)}
         />
        }
        actions={[
         <CardAction onclick={() => handleClick(item.name)}>
          <>
           Wybierz <strong>{item.name}</strong>
          </>
         </CardAction>,
         <CardAction
          onclick={() =>
           history.push(`/catalog/element/${item.name}`, { ...item })
          }
         >
          <>Szczegóły</>
         </CardAction>,
        ]}
       />
      ))}
     </FlexTemplate>
    </>
   </FullWidthPageTemplate>
  </div>
 );
};

export default withContext(Millings);
