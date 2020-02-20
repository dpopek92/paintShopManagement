import React, { useEffect, useState } from 'react';
// import PropTypes from "prop-types";
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Axios from 'axios';
import OrderTemplate from 'templates/OrderTemplate';
import PageTemplate from 'templates/PageTemplate';
import Buttons from 'components/molecules/order/TopButtons';
import OrderRemove from 'components/organisms/modals/order/OrderRemove';
import SetLostElements from 'components/organisms/modals/order/SetLostElements';
import StatusChange from 'components/organisms/modals/order/StatusChange';
import DataChange from 'components/organisms/modals/order/DataChange';
import PaidStatus from 'components/organisms/modals/order/PaidStatus';
import PriceChange from 'components/organisms/modals/order/PriceChange';
import AddComment from 'components/organisms/modals/order/AddComment';
import PickUpReport from 'components/organisms/modals/order/PickUpReport';
import PaintMakers from 'components/organisms/modals/order/PaintMakers';
import { getOrder, removeOrderFromStore } from 'actions/orders';
import { setSpinner } from 'actions/view';
import { setEditedOrder } from 'actions/newOrder';
import {
 downloadOrderFiles,
 downloadOrderLabel,
} from 'utils/apiHandlers/orders/get';
import { setOrderPriority } from 'utils/apiHandlers/orders/update';
import ReadyToPickUp from 'components/organisms/modals/order/ReadyToPickUp';
import SetElementsToCorrect from 'components/organisms/modals/order/SetElementsToCorrect';
import StartOrder from 'components/organisms/modals/order/StartOrder';
import PauseOrder from 'components/organisms/modals/order/PauseOrder';
import StopOrder from 'components/organisms/modals/order/StopOrder';
import ChangesHistory from 'components/organisms/modals/order/ChangesHistory';
import ProductionHistory from 'components/organisms/modals/order/ProductionHistory';
import CustomerOrdersInProduction from 'components/organisms/modals/order/CustomerOrdersInProduction';
import SetManHours from 'components/organisms/modals/order/SetManHours';
import { removeOrderFromDay } from 'utils/apiHandlers/timetable/update';

const Order = ({ match, history }) => {
 const dispatch = useDispatch();
 const signal = Axios.CancelToken.source();
 const order = useSelector(state => state.orders.order);
 // Modals
 const [isOrderRemove, setIsOrderRemove] = useState(false);
 const [isLostElements, setIsLostElements] = useState(false);
 const [isElementToCorrect, setIsElementToCorrect] = useState(false);
 const [isStatusChange, setIsStatusChange] = useState(false);
 const [isFinishDateChange, setIsFinishDateChange] = useState(false);
 const [isPaymentStatusChange, setIsPaymentStatusChange] = useState(false);
 const [isPriceChange, setIsPriceChange] = useState(false);
 const [isAddComment, setIsAddComment] = useState(false);
 const [isReadyToPickUp, setIsReadyToPickUp] = useState(false);
 const [isPickUpReport, setIsPickUpReport] = useState(false);
 const [isPaintMakers, setIsPaintMakers] = useState(false);
 const [isStartOrder, setIsStartOrder] = useState(false);
 const [isStopOrder, setIsStopOrder] = useState(false);
 const [isPauseOrder, setIsPauseOrder] = useState(false);
 const [isChangeHistory, setIsChangeHistory] = useState(false);
 const [isProductionHistory, setIsProductionHistory] = useState(false);
 const [isOrdersInProduction, setIsOrdersInProduction] = useState(false);
 const [isManHours, setIsManHours] = useState(false);
 console.log(order);

 // GET ORDER
 useEffect(() => {
  dispatch(setSpinner(true));
  dispatch(
   getOrder(match.params.id, () => dispatch(setSpinner(false)), signal.token),
  );

  return () => {
   signal.cancel('Api is being canceled [order]');
   dispatch(removeOrderFromStore());
  };
 }, []);

 // HANDLERS
 const getOrderFiles = async () => {
  dispatch(setSpinner(true));
  await downloadOrderFiles(order, order._id);
  dispatch(setSpinner(false));
 };

 const getOrderLabel = async () => {
  dispatch(setSpinner(true));
  await downloadOrderLabel(order, order._id);
  dispatch(setSpinner(false));
 };

 const handleOrderPriority = async () => {
  dispatch(setSpinner(true));
  await setOrderPriority(order._id, !order.priority);
  dispatch(getOrder(order._id, () => dispatch(setSpinner(false)), null));
 };

 const handleEditOrder = () => {
  dispatch(setEditedOrder(order));
  history.push(`/order/${order._id}/edit`);
 };

 const handleOrderDeliver = async position => {
  dispatch(setSpinner(true));
  await removeOrderFromDay({ orderId: order._id, position }, () => {
   dispatch(setSpinner(false));
   history.push('/');
  });
 };

 return (
  <>
   <PageTemplate>
    <>
     {order && (
      <Buttons
       order={order}
       setIsOrderRemove={setIsOrderRemove}
       setIsLostElements={setIsLostElements}
       setIsElementToCorrect={setIsElementToCorrect}
       setIsStatusChange={setIsStatusChange}
       setIsFinishDateChange={setIsFinishDateChange}
       setIsPaymentStatusChange={setIsPaymentStatusChange}
       setIsPriceChange={setIsPriceChange}
       setIsAddComment={setIsAddComment}
       setIsPickUpReport={setIsPickUpReport}
       setIsReadyToPickUp={setIsReadyToPickUp}
       setIsStartOrder={setIsStartOrder}
       setIsStopOrder={setIsStopOrder}
       setIsPauseOrder={setIsPauseOrder}
       getOrderFiles={getOrderFiles}
       getOrderLabel={getOrderLabel}
       handleOrderPriority={handleOrderPriority}
       handleEditOrder={handleEditOrder}
       setIsManHours={setIsManHours}
       handleOrderDeliver={handleOrderDeliver}
      />
     )}
     {order && (
      <OrderTemplate
       order={order}
       setIsPaintMakers={setIsPaintMakers}
       setIsChangeHistory={setIsChangeHistory}
       setIsProductionHistory={setIsProductionHistory}
       setIsOrdersInProduction={setIsOrdersInProduction}
      />
     )}
    </>
   </PageTemplate>

   {/* MODALS */}
   {isOrderRemove && (
    <OrderRemove closeModal={() => setIsOrderRemove(false)} order={order} />
   )}
   {isLostElements && (
    <SetLostElements
     closeModal={() => setIsLostElements(false)}
     order={order}
    />
   )}
   {isStatusChange && (
    <StatusChange closeModal={() => setIsStatusChange(false)} order={order} />
   )}
   {isFinishDateChange && (
    <DataChange closeModal={() => setIsFinishDateChange(false)} order={order} />
   )}
   {isPaymentStatusChange && (
    <PaidStatus
     closeModal={() => setIsPaymentStatusChange(false)}
     order={order}
    />
   )}
   {isPriceChange && (
    <PriceChange closeModal={() => setIsPriceChange(false)} order={order} />
   )}
   {isAddComment && (
    <AddComment closeModal={() => setIsAddComment(false)} order={order} />
   )}
   {isPickUpReport && (
    <PickUpReport closeModal={() => setIsPickUpReport(false)} order={order} />
   )}
   {isPaintMakers && (
    <PaintMakers closeModal={() => setIsPaintMakers(false)} order={order} />
   )}
   {isReadyToPickUp && (
    <ReadyToPickUp closeModal={() => setIsReadyToPickUp(false)} order={order} />
   )}
   {isElementToCorrect && (
    <SetElementsToCorrect
     closeModal={() => setIsElementToCorrect(false)}
     order={order}
    />
   )}
   {isStartOrder && (
    <StartOrder order={order} closeModal={() => setIsStartOrder(false)} />
   )}
   {isPauseOrder && (
    <PauseOrder order={order} closeModal={() => setIsPauseOrder(false)} />
   )}
   {isStopOrder && (
    <StopOrder order={order} closeModal={() => setIsStopOrder(false)} />
   )}
   {isChangeHistory && (
    <ChangesHistory
     order={order}
     closeModal={() => setIsChangeHistory(false)}
    />
   )}
   {isProductionHistory && (
    <ProductionHistory
     order={order}
     closeModal={() => setIsProductionHistory(false)}
    />
   )}
   {isOrdersInProduction && (
    <CustomerOrdersInProduction
     closeModal={() => setIsOrdersInProduction(false)}
    />
   )}
   {isManHours && (
    <SetManHours closeModal={() => setIsManHours(false)} order={order} />
   )}
  </>
 );
};

// Order.propTypes = {};

export default withRouter(Order);
