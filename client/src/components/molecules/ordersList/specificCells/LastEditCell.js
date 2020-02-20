import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

const LastEditCell = ({ item }) => {
 const laseEditedId = sessionStorage.getItem("lastEditedOrder");
 return (
  <td
   style={
    item._id === laseEditedId
     ? { fontWeight: "bold", cursor: "default", opacity: ".7" }
     : { visibility: "hidden", cursor: "default", opacity: ".7" }
   }
   title="Ostatnio edytowane"
  >
   <FontAwesomeIcon icon={faEdit} />
  </td>
 );
};

LastEditCell.propTypes = { item: PropTypes.object };

export default LastEditCell;
