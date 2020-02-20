/* eslint-disable no-unused-expressions */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import PropTypes from "prop-types";
import { Button } from 'react-bootstrap';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
 faQrcode,
 faList,
 faExchangeAlt,
 faEnvelope,
} from '@fortawesome/free-solid-svg-icons';
import Row from 'templates/FlexRowTemplate';
import { StyledH1 as Heading } from 'components/atoms/heading/Headings';
import List from 'components/molecules/ordersList/dynamic/List';
import Legend from 'components/molecules/ordersList/Legend';
import { setSpinner, setSortList, setDisplayFromStorage } from 'actions/view';
import {
 loadPositionOrders,
 clearEmployeeFilter,
 setEmployeeActiveOrders,
} from 'actions/employee';
import { getEmployeeMessages } from 'actions/messages';
import { signal } from 'const/';
import ChangePosition from 'components/organisms/modals/employee/ChangePosition';
import TableElementsDisplay from 'components/organisms/modals/employee/TableElementsDisplay';
import Filters from 'components/organisms/ordersList/dynamic/Filters';
import Messages from 'components/organisms/modals/messages/Messages';
import ScanOrder from 'components/organisms/modals/scanOrder/ScanOrder';
import { isUnreadedMessageInArray } from 'utils/functions/messages';
import { BlinkingMessageAnimation } from 'style/animations';
import { getTimetablesForPosition } from 'actions/timetable';
import TransportTimetables from 'components/organisms/transport/TransportTimetables';

const StyledButton = styled.button`
 border: 1px solid ${({ theme }) => theme.blowDark};
 border-radius: 5px;
 animation: ${({ isMessage }) =>
   isMessage ? BlinkingMessageAnimation : 'none'}
  2s infinite;
`;

const EmployeeHomePage = () => {
 const dispatch = useDispatch();
 const timetable = useSelector(state => state.timetable.timetables);
 const user = useSelector(state => state.auth.user);
 const employee = useSelector(state => state.employee);
 const messages = useSelector(state => state.messages);
 const sortBy = useSelector(state => state.view.sortList.employeeOrders);
 const { activeOrders, orders, activePosition: position } = employee;

 const [isUnreadedMessage, setIsUnreadedMessage] = useState(false);
 const [importantOrders, setImportantOrders] = useState([]);
 // display
 const [isChangePosition, setIsChangePosition] = useState(false);
 const [isTableElementsChange, setIsTableElementsChange] = useState(false);
 const [isMessages, setIsMessages] = useState(false);
 const [isScanOrder, setIsScanOrder] = useState(false);

 const getData = () => {
  if (position !== 'Transport') {
   dispatch(
    loadPositionOrders(
     position,
     () => {
      dispatch(setSpinner(false));
     },
     signal.token,
    ),
   );
  }
  dispatch(
   getEmployeeMessages(
    position,
    () => {
     dispatch(setSpinner(false));
    },
    signal.token,
   ),
  );
  dispatch(getTimetablesForPosition(position, signal.token, () => {}));
 };

 // GET ORDERS & SET ACTIVE POSITION & GET TABLE ELEMENTS
 useEffect(() => {
  dispatch(setSpinner(true));
  // SET TABLE ELEMENTS
  if (localStorage.tableElements) {
   const tableElements = JSON.parse(localStorage.tableElements);
   dispatch(setDisplayFromStorage(null, tableElements));
  }
  if (position) {
   getData();
  }

  //   Interval for fetching orders
  const interval = setInterval(() => {
   if (position) {
    getData();
   }
  }, 30000);

  return () => clearInterval(interval);
 }, [user, position]);

 //  CHECK IS NEW MESSAGE
 useEffect(() => {
  if (user._id && messages) {
   const isNewMessage = isUnreadedMessageInArray(user._id, messages);
   setIsUnreadedMessage(isNewMessage);
  }
 }, [user, messages]);

 // TIMETABLES
 useEffect(() => {
  if (timetable.days && timetable.position === position) {
   const day = timetable.days.find(item => {
    const today = new Date();
    const itemDate = new Date(item.date);
    return (
     today.getDate() === itemDate.getDate() &&
     today.getMonth() === itemDate.getMonth()
    );
   });
   if (day) {
    setImportantOrders(day.orders);
   }
  }
 }, [timetable, position]);

 // HANLDERS
 const handleSort = sort => dispatch(setSortList('employeeOrders', sort));
 const handlePosition = () => setIsChangePosition(true);
 const handleTableElements = () => setIsTableElementsChange(true);
 const handleMessages = () => setIsMessages(true);
 const handleScan = () => setIsScanOrder(true);
 const handleClearFilters = () => {
  dispatch(clearEmployeeFilter());
  dispatch(setEmployeeActiveOrders(orders));
  handleSort('byDeadlineForEmployees');
 };
 return (
  <>
   <Row justify="space-between">
    <Row justify="flex-start">
     <Heading>{user.firstname}-</Heading>{' '}
     <h1 className={position}> {position}</h1>
    </Row>
    <div>
     <StyledButton isMessage={isUnreadedMessage} onClick={handleMessages}>
      {' '}
      <FontAwesomeIcon icon={faEnvelope} /> Wiadomości
     </StyledButton>
     <Button variant="success" onClick={handlePosition}>
      <FontAwesomeIcon icon={faExchangeAlt} /> Zmień stanowisko
     </Button>
     {position !== 'Transport' && (
      <>
       <Button variant="secondary" onClick={handleTableElements}>
        <FontAwesomeIcon icon={faList} /> Ustawienia listy
       </Button>
       <Button variant="primary" onClick={handleScan}>
        <FontAwesomeIcon icon={faQrcode} /> Zeskanuj zamówienie
       </Button>
      </>
     )}
    </div>
   </Row>
   {position !== 'Transport' ? (
    <>
     {importantOrders.length ? (
      <div>
       <h3 style={{ fontWeight: 'bold' }}>W pierwszej kolejności:</h3>
       <List
        orders={importantOrders}
        sortBy="none"
        position={position}
        view="important"
       />
       <hr style={{ margin: 30 }} />
      </div>
     ) : null}

     <div style={importantOrders.length ? { opacity: 0.8 } : {}}>
      <div>
       <Filters handleClearFilters={handleClearFilters} />
      </div>
      {activeOrders && (
       <List
        orders={activeOrders}
        sortBy={sortBy}
        setSortOrders={handleSort}
        position={position}
        summary
       />
      )}
     </div>
     <Legend position={position} />
    </>
   ) : (
    <>
     <TransportTimetables position={position} />
    </>
   )}
   {/* MODALS */}
   {isChangePosition && (
    <ChangePosition closeModal={() => setIsChangePosition(false)} />
   )}
   {isTableElementsChange && (
    <TableElementsDisplay closeModal={() => setIsTableElementsChange(false)} />
   )}
   {isMessages && (
    <Messages messages={messages} closeModal={() => setIsMessages(false)} />
   )}
   {isScanOrder && <ScanOrder closeModal={() => setIsScanOrder(false)} />}
  </>
 );
};

EmployeeHomePage.propTypes = {};

export default EmployeeHomePage;
