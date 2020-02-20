import React, { useEffect } from 'react';
import Axios from 'axios';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { Tabs, Tab, Button } from 'react-bootstrap';
// import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { StyledH1 as Heading } from 'components/atoms/heading/Headings';
import Date from 'components/atoms/date/Date';
import List from 'components/molecules/ordersList/static/List';
import Search from 'components/organisms/modals/searchOrder/Search';
import Legend from 'components/molecules/ordersList/Legend';
import { loadAdminOrders } from 'actions/orders';
import {
 setAdminHomePageKey,
 setSpinner,
 setEndedOrdersDate,
 setEndedOrdersDateFrom,
 setSortList,
} from 'actions/view';
import { setHomeSearch, setSearchValuesEmpty } from 'actions/search';

const StyledRow = styled.div`
 display: flex;
 flex-direction: row;
 flex-wrap: wrap;
 justify-content: space-between;
 @media (max-width: 600px) {
  flex-direction: column;
  /* justify-content: "center"; */
  div {
   text-align: center;
   width: 100%;
   margin: 5px auto;
   button {
    width: 100%;
    margin: 5px auto;
   }
  }
 }
`;

const AdminHomePage = () => {
 const dispatch = useDispatch();
 const signal = Axios.CancelToken.source();
 const key = useSelector(state => state.view.adminHomePageKey);
 const date = useSelector(state => state.view.endedOrdersDate);
 const dateFrom = useSelector(state => state.view.endedOrdersDateFrom);
 const isSearch = useSelector(state => state.search.isSearch);
 const orders = useSelector(state => state.orders.list);
 const sortNewOrders = useSelector(state => state.view.sortList.newOrders);
 const sortEndedOrders = useSelector(state => state.view.sortList.endedOrders);

 useEffect(() => {
  dispatch(setSpinner(true));
  dispatch(
   loadAdminOrders(
    key.toLowerCase(),
    date,
    () => dispatch(setSpinner(false)),
    signal.token,
    dateFrom,
   ),
  );
 }, [key, date, dateFrom]);

 const handleSearch = () => dispatch(setHomeSearch(true));
 const handleCloseSearch = () => dispatch(setSearchValuesEmpty(false));
 const handleDate = e => dispatch(setEndedOrdersDate(e.target.value));
 const handleDateFrom = e => dispatch(setEndedOrdersDateFrom(e.target.value));
 const handleSortNewOrders = sortBy => {
  dispatch(setSortList('newOrders', sortBy));
 };
 const handleSortEndedOrders = sortBy => {
  dispatch(setSortList('endedOrders', sortBy));
 };

 return (
  <>
   <div>
    <StyledRow>
     <Heading>Zamówienia</Heading>
     <div>
      {key === 'Ended' && (
       <>
        Od <Date value={date} onchange={handleDate} /> Do{' '}
        <Date value={dateFrom} onchange={handleDateFrom} />
       </>
      )}
      <Button variant="outline-primary" onClick={handleSearch}>
       <FontAwesomeIcon icon={faSearch} /> Znajdź zamówienie
      </Button>
     </div>
    </StyledRow>
    <Tabs
     id="controlled-tab-example"
     activeKey={key}
     onSelect={key => dispatch(setAdminHomePageKey(key))}
    >
     <Tab eventKey="New" title="Nowe" id="newOrders">
      {orders && key === 'New' && (
       <>
        <List
         orders={orders}
         view="new"
         summary
         sortBy={sortNewOrders}
         setSortOrders={handleSortNewOrders}
        />
        <Legend view="new" />
       </>
      )}
     </Tab>
     <Tab eventKey="Ended" title="Odebrane">
      {orders && key === 'Ended' && (
       <>
        <List
         orders={orders}
         view="ended"
         summary
         sortBy={sortEndedOrders}
         setSortOrders={handleSortEndedOrders}
        />

        <Legend view="ended" />
       </>
      )}
     </Tab>
    </Tabs>
   </div>
   {/* MODALS */}
   {isSearch && <Search closeModal={handleCloseSearch} />}
  </>
 );
};

// AdminHomePage.propTypes = {};

export default AdminHomePage;
