import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from 'services/store';
import { getGlobalSettings } from 'services/store/actions/settings';
import { PageHeader, Tabs, Icon } from 'antd';
import Header from 'components/header';
import FullWidthPageTemplate from 'components/templates/fullWidth';
import PaintsProducers from './components/paintsProducers';
import RealizationDates from './components/realizationDates';
import Contact from './components/contact';
import Prices from './components/prices';
const { TabPane } = Tabs;

const GlobalSettings = () => {
 const dispatch = useDispatch();
 const settings = useSelector((state: AppState) => state.settings);
 const { prices, contact, realizationDates, paintsProducers } = settings;

 useEffect(() => {
  dispatch(getGlobalSettings(() => {}));
 }, []);
 //  console.log(settings);

 return (
  <FullWidthPageTemplate>
   <>
    <PageHeader ghost={false} title={<Header title="Ustawienia globalne" />} />
    <Tabs defaultActiveKey="1">
     <TabPane
      tab={
       <span>
        <Icon type="dollar" />
        Cennik
       </span>
      }
      key="1"
     >
      <Prices values={prices} />
     </TabPane>
     <TabPane
      tab={
       <span>
        <Icon type="contacts" />
        Dane kontaktowe
       </span>
      }
      key="2"
     >
      <Contact values={contact} />
     </TabPane>
     <TabPane
      tab={
       <span>
        <Icon type="calendar" />
        Terminy realizacji
       </span>
      }
      key="3"
     >
      <RealizationDates values={realizationDates} />
     </TabPane>
     <TabPane
      tab={
       <span>
        <Icon type="bg-colors" />
        Producenci lakierów
       </span>
      }
      key="4"
     >
      <PaintsProducers values={paintsProducers} />
     </TabPane>
    </Tabs>
   </>
  </FullWidthPageTemplate>
 );
};

export default GlobalSettings;
