import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { dateToStringWithHour } from "utils/functions/date";
import { isOrderNeedsToBeSandedAgain } from "utils/orders";

const LastOperationCell = ({ item, view, position }) => {
 let warning = false;
 if (
  view === "production" ||
  position === "Szlifiernia" ||
  position === "Lakiernia"
 ) {
  warning = isOrderNeedsToBeSandedAgain(item);
 }
 return (
  <td style={{ wordWrap: "break-word" }}>
   <>
    {warning && (
     <>
      <FontAwesomeIcon
       style={{ color: "red" }}
       icon={faClock}
       title="Oczekuje dłużej niż 12h"
      />
     </>
    )}
    {item.lastOperation &&
     `${item.lastOperation.position} - ${dateToStringWithHour(
      item.lastOperation.date
     )}`}
   </>
  </td>
 );
};

LastOperationCell.propTypes = {
 item: PropTypes.object,
 view: PropTypes.string,
 position: PropTypes.string
};

export default LastOperationCell;
