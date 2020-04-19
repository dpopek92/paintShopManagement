import React, { useEffect } from 'react';
import styled from 'styled-components';
import FullWidthPageTemplate from 'components/templates/fullWidth';
import { useDispatch, useSelector } from 'react-redux';
import { AppStateT } from 'services/store';
import { Redirect } from 'react-router';
import { calculateSurfaces } from 'services/store/actions/newOrder';
import { Button } from 'antd';
import { createNewOrder } from 'services/apiRequests/order/post';
// import { getOrderSurfaces } from '../utils';

interface PropsT {}

const OrderFormSummary: React.FC<PropsT> = () => {
 const dispatch = useDispatch();
 const newOrder = useSelector((state: AppStateT) => state.newOrder);

 useEffect(() => {
  dispatch(calculateSurfaces());
 }, []);

 useEffect(() => {
  console.log('Price calc');
  //   console.log(newOrder.elements);
 }, [newOrder.elements]);

 const handleSumbit = async () => {
  console.log('START');
  await createNewOrder(
   newOrder,
   () => {},
   () => {},
  );
  console.log('END');
 };

 if (!newOrder.items.length) {
  return <Redirect to="/neworder" />;
 }
 return (
  <FullWidthPageTemplate>
   <>
    <Button
     disabled={newOrder.elements === 0}
     type="primary"
     onClick={handleSumbit}
    >
     Wyślij
    </Button>
   </>
  </FullWidthPageTemplate>
 );
};

export default OrderFormSummary;
