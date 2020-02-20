import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
 faExclamation,
 faComments,
 faClock,
 faTint,
 faTruck,
 faUndo
} from "@fortawesome/free-solid-svg-icons";
import withContext from "hoc/withContext";
import {
 isOrderWetForStaticList,
 isOrderWetForDynamicList
} from "utils/orders";

const CellWithIcons = ({ index, item, permissionContext, position }) => {
 let isWet;
 if (permissionContext === "admin") {
  isWet = isOrderWetForStaticList(item);
 } else if (position) {
  isWet = isOrderWetForDynamicList(item, position);
 }

 if (permissionContext === "user") {
  return (
   <>
    <td>
     {item.orderType === "Materiał klienta" ? (
      <FontAwesomeIcon
       icon={faTruck}
       title="Materiał powierzony"
       style={{ margin: 1 }}
      />
     ) : (
      index + 1
     )}
    </td>
   </>
  );
 } else if (
  permissionContext === "employee" ||
  permissionContext === "display"
 ) {
  return (
   <td>
    {isWet && position !== "Surówka" && (
     <FontAwesomeIcon
      title="Mokre"
      icon={faTint}
      style={{ margin: 1, opacity: "0.5" }}
     />
    )}
    {position === "Szlifiernia" && item.wasInGriding && (
     <FontAwesomeIcon icon={faUndo} style={{ margin: 1 }} />
    )}
    {item.priority && (
     <FontAwesomeIcon
      title="Priorytet"
      icon={faExclamation}
      style={{ margin: 1 }}
     />
    )}
    {position === "Surówka" && item.orderType === "Materiał klienta" && (
     <FontAwesomeIcon
      icon={faTruck}
      title="Materiał powierzony"
      style={{ margin: 1 }}
     />
    )}
    {item.employeesComments && item.employeesComments.length > 0 && (
     <FontAwesomeIcon
      icon={faComments}
      title={`${item.employeesComments.length} komentarz/e`}
      style={{ margin: 1 }}
     />
    )}
    {position === "Szlifiernia" &&
     !item.wasInGriding &&
     !isWet &&
     !item.priority &&
     item.employeesComments.length === 0 &&
     index + 1}
    {position === "Surówka" &&
     item.orderType !== "Materiał klienta" &&
     !item.priority &&
     item.employeesComments.length === 0 &&
     index + 1}
    {position !== "Surówka" &&
     position !== "Szlifiernia" &&
     !isWet &&
     !item.priority &&
     item.employeesComments.length === 0 &&
     index + 1}
   </td>
  );
 } else {
  return (
   <td>
    {isWet && (
     <FontAwesomeIcon
      title="Mokre"
      icon={faTint}
      style={{ margin: 1, opacity: "0.5" }}
     />
    )}
    {item.inProduction && item.inProduction.length > 0 && (
     <FontAwesomeIcon
      title={item.inProduction.join(", ")}
      icon={faClock}
      style={{ margin: 1 }}
     />
    )}
    {item.priority && (
     <FontAwesomeIcon
      title="Priorytet"
      icon={faExclamation}
      style={{ margin: 1 }}
     />
    )}
    {item.orderType === "Materiał klienta" && (
     <FontAwesomeIcon
      icon={faTruck}
      title="Materiał powierzony"
      style={{ margin: 1 }}
     />
    )}
    {item.employeesComments && item.employeesComments.length > 0 && (
     <FontAwesomeIcon
      icon={faComments}
      title={`${item.employeesComments.length} komentarz/e`}
      style={{ margin: 1 }}
     />
    )}
    {!isWet &&
     item.orderType !== "Materiał klienta" &&
     (!item.inProduction || item.inProduction.length === 0) &&
     (!item.employeesComments || item.employeesComments.length === 0) &&
     !item.priority &&
     index + 1}
   </td>
  );
 }
};

CellWithIcons.propTypes = {
 index: PropTypes.number,
 item: PropTypes.object,
 permissionContext: PropTypes.string,
 position: PropTypes.string
};

export default withContext(CellWithIcons);
