/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { PageHeader, Card, notification } from 'antd';
import PageTemplate from 'templates/AuthPageTemplate';
import FullWidthPageTemplate from 'templates/FullWidthPageTemplate';
import FlexTemplate from 'templates/FlexTemplate';
import HANDLES from 'assets/data/Handles.json';
import { addHandle } from 'actions/newOrder';
import { setComponentInModal } from 'actions/view';
import { useHistory } from 'react-router';
import withContext from 'hoc/withContext';
import CardAction from '../components/CardAction';

const openNotification = handle => {
 notification.success({
  message: 'Uchwyty frezowane',
  description: `Wybrałeś uchwyt: ${handle.toUpperCase()}`,
 });
};

const Handles = ({ permissionContext }) => {
 const history = useHistory();
 const dispatch = useDispatch();
 const veneer = useSelector(state => state.newOrder.veneerSymbol);
 const color = useSelector(state => state.newOrder.color);
 const [handles, setHandles] = useState(HANDLES);

 useEffect(() => {
  if (veneer || color.toLowerCase().includes('bejca')) {
   const newHandles = handles.filter(
    item => item.name !== 'uk' && item.name !== 'up' && item.name !== 'uc',
   );
   setHandles(newHandles);
  } else {
   setHandles(HANDLES);
  }
 }, [veneer, color]);

 const handleClick = name => {
  if (permissionContext !== 'employee') {
   dispatch(addHandle(name));
   openNotification(name);
   dispatch(setComponentInModal(null));
  }
 };
 return (
  <div>
   <PageTemplate>
    <FullWidthPageTemplate>
     <>
      <PageHeader
       ghost={false}
       onBack={() => history.goBack()}
       title="Uchwyty frezowane"
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
   </PageTemplate>
  </div>
 );
};

Handles.propTypes = {
 permissionContext: PropTypes.string,
};

export default withContext(Handles);
