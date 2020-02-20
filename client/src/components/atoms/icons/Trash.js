import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

const Trash = ({ onclick }) => {
 return (
  <FontAwesomeIcon
   icon={faTrashAlt}
   onClick={onclick}
   style={{ color: "#fa3e54", cursor: "pointer" }}
  />
 );
};

Trash.propTypes = {
 onclick: PropTypes.func
};

export default Trash;
