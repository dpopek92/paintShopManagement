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
// import { addGlassCase } from 'actions/newOrder';
// import { setComponentInModal } from 'actions/view';
import CardAction from '../components/CardAction';

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
 //  const veneer = useSelector(state => state.newOrder.veneerSymbol);
 //  const color = useSelector(state => state.newOrder.color);
 const [glassCases, setGlassCases] = useState(GLASSCASES);

 useEffect(
  () => {
   //   if (veneer || color.toLowerCase().includes('bejca')) {
   //    const newGlassCases = glassCases.filter(item => item.name === 'w4');
   //    setGlassCases(newGlassCases);
   //   } else {
   setGlassCases(GLASSCASES);
   //   }
  },
  [],
  //  [veneer, color]
 );

 const handleClick = (name: string) => {
  if (permissionContext !== 'employee') {
   openNotification(name);
   //    dispatch(addGlassCase(name));
   //    dispatch(setComponentInModal(null));
  }
 };
 return (
  <div>
   <FullWidthPageTemplate>
    <>
     <PageHeader
      ghost={false}
      onBack={() => history.goBack()}
      title="Witryny"
     />
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
