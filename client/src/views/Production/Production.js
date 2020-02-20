import React, { useState, useEffect } from 'react';
// import PropTypes from "prop-types";
import { useDispatch, useSelector } from 'react-redux';
import Spinner from 'components/atoms/spinner/SpinnerSmall';
import { StyledH1 as Heading } from 'components/atoms/heading/Headings';
import PageTemplate from 'templates/PageTemplate';
import FullWidthPageTemplate from 'templates/FullWidthPageTemplate';
import Row from 'templates/FlexRowTemplate';
import Buttons from 'components/molecules/production/Buttons';
import Filters from 'components/organisms/production/Filters';
import GenerateProductionList from 'components/organisms/modals/production/GenerateProductionList';
import Messages from 'components/organisms/modals/messages/Messages';
import OrdersList from 'components/molecules/ordersList/static/List';
import Legend from 'components/molecules/ordersList/Legend';
import {
 loadProductionOrders,
 setActiveList,
 clearFilters,
} from 'actions/production';
import { setSortList, setSpinner } from 'actions/view';
import { getAllMessages } from 'actions/messages';
import { signal } from 'const/';
import { isUnreadedMessageInArray } from 'utils/functions/messages';

const Production = () => {
 let _isMounted = false;
 const dispatch = useDispatch();
 const user = useSelector(state => state.auth.user);
 const production = useSelector(state => state.production);
 const messages = useSelector(state => state.messages);
 const status = useSelector(state => state.production.filters.status);
 const sortOrders = useSelector(state => state.view.sortList.production);
 const { list: orders, activeList: filteredOrders } = production;

 const [isUnreadedMessage, setIsUnreadedMessage] = useState(false);
 // display
 const [isSpinner, setIsSpinner] = useState(false);
 const [isGenerateList, setIsGenerateList] = useState(false);
 const [isMessages, setIsMessages] = useState(false);

 const getData = onEnd => {
  // setIsSpinner(true);
  dispatch(getAllMessages(() => {}, signal.token));
  // get data
  dispatch(
   loadProductionOrders(
    'inproduction',
    () => (_isMounted ? onEnd() : null),
    signal.token,
   ),
  );
 };

 // GET MESSAGES & ORDERS & SET INTERVAL
 useEffect(() => {
  _isMounted = true;
  dispatch(setSpinner(true));
  getData(() => dispatch(setSpinner(false)));
  //   Interval for fetching orders in Production
  const interval = setInterval(() => {
   setIsSpinner(true);
   getData(() => setIsSpinner(false));
  }, 10000);

  // abort request
  return () => {
   _isMounted = false;
   clearInterval(interval);
  };
 }, []);

 //  CHECK IS NEW MESSAGE
 useEffect(() => {
  if (user._id && messages) {
   const isNewMessage = isUnreadedMessageInArray(user._id, messages);
   setIsUnreadedMessage(isNewMessage);
  }
 }, [user, messages]);

 // HANDLERS
 const handleClearFilters = () => {
  dispatch(setActiveList(orders));
  dispatch(clearFilters());
  dispatch(setSortList('production', 'byStatusDesc'));
 };
 const handleSortOrders = sortBy => {
  dispatch(setSortList('production', sortBy));
 };
 const handleGenerateList = () => setIsGenerateList(true);
 const handleMessages = () => setIsMessages(true);

 return (
  <>
   <PageTemplate>
    <FullWidthPageTemplate>
     <>
      <Row justify="space-between">
       <Heading>Produkcja</Heading>
       {isSpinner && <Spinner />}
       <Buttons
        disabled={!orders}
        handleGenerateList={handleGenerateList}
        handleMessages={handleMessages}
        isUnreadedMessage={isUnreadedMessage}
       />
      </Row>
      <Filters handleClearFilters={handleClearFilters} />
      {filteredOrders && (
       <OrdersList
        orders={filteredOrders}
        view="production"
        summary
        sortBy={sortOrders}
        setSortOrders={handleSortOrders}
        position={status}
       />
      )}
      <Legend view="production" />
     </>
    </FullWidthPageTemplate>
   </PageTemplate>
   {/* MODALS */}
   {isGenerateList && (
    <GenerateProductionList closeModal={() => setIsGenerateList(false)} />
   )}
   {isMessages && (
    <Messages messages={messages} closeModal={() => setIsMessages(false)} />
   )}
  </>
 );
};

// Production.propTypes = {};

export default Production;
