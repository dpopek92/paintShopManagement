import React from "react";
import Axios from "axios";
import styled from "styled-components";
import { ContextMenu, MenuItem } from "react-contextmenu";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { handlePaidStatus } from "utils/apiHandlers/orders/update";
import { loadAdminOrders } from "actions/orders";
import { loadCustomerOrders } from "actions/customers";
import { setSpinner } from "actions/view";

const StyledContextMenu = styled(ContextMenu)`
 background-color: white;
 border-radius: 5px;
 border: 1px solid ${({ theme }) => theme.blowLightGrey};
`;
const StyledMenuItem = styled(MenuItem)`
 font-weight: bold;
 padding: 3px 20px;
 &:hover {
  background-color: ${({ theme }) => theme.blowPrimary};
 }
`;

const PaidStatusContextMenu = ({
 setIsContextMenu,
 itemId,
 view,
 customerId
}) => {
 const dispatch = useDispatch();
 const signal = Axios.CancelToken.source();
 const date = useSelector(state => state.view.endedOrdersDate);
 const dateFrom = useSelector(state => state.view.endedOrdersDateFrom);

 const reloadOrders = () => {
  console.log(view);
  console.log(customerId);
  if (view === "ended") {
   dispatch(
    loadAdminOrders(
     "ended",
     date,
     () => dispatch(setSpinner(false)),
     signal.token,
     dateFrom
    )
   );
  } else if (view === "customer") {
   dispatch(
    loadCustomerOrders(
     customerId,
     () => dispatch(setSpinner(false)),
     signal.token
    )
   );
  }
 };

 const setPaidStatus = (id, isPaid) => {
  dispatch(setSpinner(true));
  handlePaidStatus(id, isPaid, () => {
   reloadOrders();
   setIsContextMenu(false);
  });
 };
 return (
  <>
   <StyledContextMenu
    id={`menuItemId_${itemId}`}
    onHide={() => setIsContextMenu(false)}
    onShow={() => setIsContextMenu(true)}
   >
    <StyledMenuItem
     onClick={() => {
      setPaidStatus(itemId, true);
     }}
    >
     <span style={{ color: "Green" }}>Opłacone</span>
    </StyledMenuItem>
    <StyledMenuItem
     onClick={() => {
      setPaidStatus(itemId, false);
     }}
    >
     <span style={{ color: "Red" }}>Nieopłacone</span>
    </StyledMenuItem>
   </StyledContextMenu>
  </>
 );
};

PaidStatusContextMenu.propTypes = {
 setIsContextMenu: PropTypes.func,
 itemId: PropTypes.string
};

export default PaidStatusContextMenu;
