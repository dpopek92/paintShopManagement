/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import withContext from 'hoc/withContext';
import { PageHeader, Card, notification } from 'antd';
import FullWidthPageTemplate from 'components/templates/fullWidth';
import FlexTemplate from 'components/templates/flexTemplate';
import GLASSCASES from 'assets/data/GlassCases.json';
import CardAction from '../components/CardAction';
import Header from 'components/header';
import { AppStateT } from 'services/store';
import { setGlassCase } from 'services/store/actions/newOrder';
import { setCatalogDrawer } from 'services/store/actions/view';

const openNotification = (glassCase: string) => {
 notification.success({
  message: 'Witryny',
  description: `Wybrałeś witrynę: ${glassCase.toUpperCase()}`,
 });
};

interface Props {
 permissionContext: string;
}

const Veneers = ({ permissionContext }: Props) => {
 const history = useHistory();
 const dispatch = useDispatch();
 const newOrder = useSelector((state: AppStateT) => state.newOrder);
 const { veneerSymbol, color } = newOrder;

 const [glassCases, setGlassCases] = useState(GLASSCASES);

 useEffect(() => {
  if (veneerSymbol || color.toLowerCase().includes('bejca')) {
   const newGlassCases = glassCases.filter(item => item.name === 'w4');
   setGlassCases(newGlassCases);
  } else {
   setGlassCases(GLASSCASES);
  }
 }, [veneerSymbol, color]);

 const handleClick = (name: string) => {
  if (permissionContext !== 'employee') {
   openNotification(name);
   dispatch(setGlassCase(name));
   dispatch(setCatalogDrawer(null));
  }
 };
 return (
  <div>
   <FullWidthPageTemplate>
    <>
     <PageHeader ghost={false} title={<Header title="Witryny" type="h1" />} />
     <FlexTemplate>
      {glassCases.map(item => (
       <Card
        key={item.name}
        style={{ width: 300, margin: 5 }}
        bodyStyle={{ padding: 0 }}
        cover={
         <img
          alt={`Front ${item.name}`}
          src={require(`assets/images/glassCases/${item.name}/${item.image}`)}
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

export default withContext(Veneers);
