import React, { useEffect } from 'react';
import FullWidthPageTemplate from 'components/templates/fullWidth';
import { PageHeader, Tabs } from 'antd';
import Header from 'components/header';
import { useDispatch, useSelector } from 'react-redux';
import { AppStateT } from 'services/store';
import { setHomePageKey } from 'services/store/actions/view';
import { getOrders } from 'services/store/actions/orders';
import OrdersList from 'components/ordersList';
const { TabPane } = Tabs;

const AdminHome = () => {
 const dispatch = useDispatch();
 const key = useSelector((state: AppStateT) => state.view.homepageKey);
 const orders = useSelector((state: AppStateT) => state.orders.orders);
 const sortBy = useSelector((state: AppStateT) => state.orders.sortBy);
 const sortDirection = useSelector(
  (state: AppStateT) => state.orders.sortDirection,
 );

 useEffect(() => {
  if (key === 'new') {
   dispatch(getOrders('new', () => {}));
  }
 }, [key]);

 const handleKey = (key: string) => dispatch(setHomePageKey(key));
 return (
  <FullWidthPageTemplate>
   <>
    <PageHeader ghost={false} title={<Header title="Zamówienia" type="h1" />} />
    <Tabs defaultActiveKey={key} size="large" onChange={handleKey}>
     <TabPane tab="Nowe" key="new">
      <OrdersList
       orders={orders}
       sortBy={sortBy.new}
       sortDirection={sortDirection.new}
      />
     </TabPane>
     <TabPane tab="Odebrane" key="ended">
      Zakończone
     </TabPane>
    </Tabs>
   </>
  </FullWidthPageTemplate>
 );
};

export default AdminHome;
