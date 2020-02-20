import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { StyledH1 as Heading } from "components/atoms/heading/Headings";
import List from "components/molecules/ordersList/static/List";
import { loadOrders } from "actions/orders";
import { setSpinner, setSortList } from "actions/view";
import { signal } from "const";
import Legend from "components/molecules/ordersList/Legend";

const UserHomePage = () => {
 const dispatch = useDispatch();
 const orders = useSelector(state => state.orders.list);
 const sortOrders = useSelector(state => state.view.sortList.userOrders);

 useEffect(() => {
  dispatch(setSpinner(true));
  dispatch(loadOrders(() => dispatch(setSpinner(false)), signal.token));
  return () => {};
 }, []);

 // HANDLERS
 const handleSortOrders = sortBy => dispatch(setSortList("userOrders", sortBy));
 return (
  <div>
   <Heading>Zamówienia</Heading>
   {orders && (
    <List
     orders={orders}
     view="user"
     sortBy={sortOrders}
     setSortOrders={handleSortOrders}
    />
   )}
   <Legend />
  </div>
 );
};

export default UserHomePage;
