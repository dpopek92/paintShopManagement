import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { ContextMenuTrigger } from "react-contextmenu";
import PaidStatusContextMenu from "./PaidStatusContextMenu";

const PaidStatusCell = ({ item, setIsContextMenu, ...props }) => {
 const user = useSelector(state => state.auth.user);
 return (
  <td style={{ padding: 0 }}>
   <>
    <ContextMenuTrigger id={`menuItemId_${item._id}`}>
     <div
      style={{
       color: item.isPaid ? "green" : "red",
       fontWeight: "bold"
      }}
     >
      {item.isPaid ? "Opłacone" : "Nieopłacone"}
     </div>
    </ContextMenuTrigger>
    {(user.surname === "Kępa" || user.surname === "Popek") && (
     <PaidStatusContextMenu
      setIsContextMenu={setIsContextMenu}
      itemId={item._id}
      {...props}
     />
    )}
   </>
  </td>
 );
};

PaidStatusCell.propTypes = {
 item: PropTypes.object,
 setIsContextMenu: PropTypes.func
};

export default PaidStatusCell;
