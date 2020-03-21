import React, { useEffect } from 'react';
import styled from 'styled-components';
import FullWidthPageTemplate from 'components/templates/fullWidth';
import { useDispatch, useSelector } from 'react-redux';
import { AppStateT } from 'services/store';
import { Redirect } from 'react-router';
import { calculateSurfaces } from 'services/store/actions/newOrder';
// import { getOrderSurfaces } from '../utils';

interface PropsT {}

const OrderFormSummary: React.FC<PropsT> = () => {
 const dispatch = useDispatch();
 const newOrder = useSelector((state: AppStateT) => state.newOrder);
 useEffect(() => {
  dispatch(calculateSurfaces());
 }, []);

 if (!newOrder.items.length) {
  return <Redirect to="/neworder" />;
 }
 return (
  <FullWidthPageTemplate>
   <>Podsumowanie</>
  </FullWidthPageTemplate>
 );
};

export default OrderFormSummary;
