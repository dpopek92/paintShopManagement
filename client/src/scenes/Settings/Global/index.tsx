import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getGlobalSettings } from 'services/store/actions/settings';
import { setSpinner } from 'services/store/actions/view';
import { updateGlobalSettings } from 'services/apiRequests/settings/update';
import { globalSettingsLoaded } from 'services/store/actions/settings';
import { PageHeader, Tabs, Icon, message } from 'antd';
import FullWidthPageTemplate from 'components/templates/fullWidth';
import Header from 'components/header';
import RealizationDates from './components/realizationDates';
import PaintsProducers from './components/paintsProducers';
import Prices from 'components/prices';
import Contact from './components/contact';
import { AppStateT } from 'services/store';
import { PricesT } from 'services/store/types/settings/Settings';
const { TabPane } = Tabs;

const GlobalSettings = () => {
 const dispatch = useDispatch();
 const settings = useSelector((state: AppStateT) => state.settings);
 const { prices, contact, realizationDates, paintsProducers } = settings;

 useEffect(() => {
  dispatch(getGlobalSettings(() => {}));
 }, []);

 const handlePricesSubmit = async (
  values: PricesT,
  actions: any,
  setIsEdit: any,
 ) => {
  dispatch(setSpinner(true));
  await updateGlobalSettings(
   { prices: values },
   data => {
    if (data.prices) actions.setValues(data.prices);
    dispatch(globalSettingsLoaded(data));
    setIsEdit(false);
    dispatch(setSpinner(false));
    message.success('Dane zostały zaktualizowane');
   },
   () => {
    dispatch(setSpinner(false));
    message.error('Błąd serwera');
   },
  );
 };

 return (
  <FullWidthPageTemplate>
   <>
    <PageHeader
     ghost={false}
     title={<Header title="Ustawienia globalne" type="h1" />}
    />
    <Tabs defaultActiveKey="1">
     <TabPane
      tab={
       <span>
        <Icon type="contacts" />
        Dane kontaktowe
       </span>
      }
      key="1"
     >
      <Contact data={contact} />
     </TabPane>
     <TabPane
      tab={
       <span>
        <Icon type="dollar" />
        Cennik
       </span>
      }
      key="2"
     >
      <Prices data={prices} handleSubmit={handlePricesSubmit} />
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
      <RealizationDates data={realizationDates} />
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
