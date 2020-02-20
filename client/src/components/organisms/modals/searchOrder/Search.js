import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { Form } from 'react-bootstrap';
import Row from 'templates/FlexRowTemplate';
import Modal from 'components/molecules/modal/Modal';
import Select from 'components/atoms/select/CustomersSelect';
import { setSortList } from 'actions/view';
import { loadCustomers } from 'actions/customers';
import { setSearchResult, setSearchValue } from 'actions/search';
import { signal } from 'const';
import List from 'components/molecules/ordersList/static/List';

const Search = ({ closeModal }) => {
 const dispatch = useDispatch();
 const customers = useSelector(state => state.customers.list);
 const search = useSelector(state => state.search);
 const sortOrders = useSelector(state => state.view.sortList.searchModalOrders);

 const { user, number, color, name, searchResult: orders } = search;

 useEffect(() => {
  if (!customers) {
   dispatch(loadCustomers(() => {}, signal.token));
   // abort request
  }
 }, []);
 useEffect(() => {
  const data = {
   user,
   number,
   name,
   color,
  };
  if (user) {
   dispatch(setSearchResult(data, () => {}));
  }
 }, [color, user, number, name]);

 const handleValues = e =>
  dispatch(setSearchValue(e.target.name, e.target.value));
 const handleSortOrders = sortBy =>
  dispatch(setSortList('searchModalOrders', sortBy));

 return (
  <Modal closeModal={closeModal} title="Znajdź zamówienie" size="xl">
   <Row justify="space-between">
    <div>
     <Select
      items={customers}
      value={user}
      onchange={handleValues}
      name="user"
      placeholder="Klient"
     />
    </div>
    <div>
     <Form.Control
      type="text"
      value={number}
      onChange={handleValues}
      placeholder="Numer"
      name="number"
     />
    </div>
    <div>
     <Form.Control
      type="text"
      value={color}
      onChange={handleValues}
      placeholder="Kolor"
      name="color"
     />
    </div>
    <div>
     <Form.Control
      type="text"
      value={name}
      onChange={handleValues}
      placeholder="Nazwa"
      name="name"
     />
    </div>
   </Row>
   <div style={{ marginTop: 20 }}>
    {orders && (
     <List
      orders={orders}
      sortBy={sortOrders}
      setSortOrders={handleSortOrders}
      view="search"
     />
    )}
   </div>
  </Modal>
 );
};

Search.propTypes = {
 closeModal: PropTypes.func,
};

export default Search;

// ATOM - select z przekazaniem tablicy elemnetów i onChange
// Form.Control type="text"y obsłużyć normalnie
