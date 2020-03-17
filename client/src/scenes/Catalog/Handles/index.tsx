/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PageHeader, Card, notification } from 'antd';
import FullWidthPageTemplate from 'components/templates/fullWidth';
import FlexTemplate from 'components/templates/flexTemplate';
import HANDLES from 'assets/data/Handles.json';
import { useHistory } from 'react-router';
import withContext from 'hoc/withContext';
import CardAction from '../components/CardAction';
import Header from 'components/header';
import { AppStateT } from 'services/store';
import { setCatalogDrawer } from 'services/store/actions/view';
import { setHandle } from 'services/store/actions/newOrder';
import { HandleT } from 'services/store/types/orders/Orders';

const openNotification = (handle: string) => {
 notification.success({
  message: 'Uchwyty frezowane',
  description: `Wybrałeś uchwyt: ${handle.toUpperCase()}`,
 });
};

interface Props {
 permissionContext: string;
}

const Handles = ({ permissionContext }: Props) => {
 const history = useHistory();
 const dispatch = useDispatch();
 const newOrder = useSelector((state: AppStateT) => state.newOrder);
 const { veneerSymbol, color } = newOrder;

 const [handles, setHandles] = useState(HANDLES);

 useEffect(() => {
  if (veneerSymbol || color.toLowerCase().includes('bejca')) {
   const newHandles = handles.filter(
    item => item.name !== 'uk' && item.name !== 'up' && item.name !== 'uc',
   );
   setHandles(newHandles);
  } else {
   setHandles(HANDLES);
  }
 }, [veneerSymbol, color]);

 const handleClick = (name: string) => {
  if (permissionContext !== 'employee') {
   dispatch(setHandle(name as HandleT));
   openNotification(name);
   dispatch(setCatalogDrawer(null));
  }
 };
 return (
  <div>
   <FullWidthPageTemplate>
    <>
     <PageHeader
      ghost={false}
      title={<Header title="Uchwyty frezowane" type="h1" />}
     />
     <FlexTemplate>
      {handles.map(item => (
       <Card
        key={item.name}
        style={{ width: 300, margin: 5 }}
        bodyStyle={{ padding: 0 }}
        cover={
         <img
          alt={`Uchwyt ${item.name}`}
          src={require(`assets/images/handles/${item.name}/${item.image}`)}
         />
        }
        actions={[
         <CardAction onclick={() => handleClick(item.name)}>
          <>
           Wybierz <strong>{item.name.toUpperCase()}</strong>
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

export default withContext(Handles);
