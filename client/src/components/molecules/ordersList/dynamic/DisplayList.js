import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import Row from "templates/FlexRowTemplate";
import { StyledH3 as Heading } from "components/atoms/heading/Headings";
import List from "./List";

const DisplayList = ({ orders, position }) => {
 const [sort, setSort] = useState({ sortBy: "byDeadlineForEmployees" });

 // HANLDERS
 const handleSort = sortBy => setSort({ sortBy });
 const handleDefaultSort = () => setSort({ sortBy: "byDeadlineForEmployees" });
 return (
  <div>
   <Row justify="space-between">
    <Heading>{position}</Heading>
    {sort.sortBy !== "byDeadlineForEmployees" && (
     <Button size="sm" variant="outline-secondary" onClick={handleDefaultSort}>
      Sortowanie domyślne
     </Button>
    )}
   </Row>
   <List
    orders={orders}
    position={position}
    sortBy={sort.sortBy}
    setSortOrders={handleSort}
    summary
   />
  </div>
 );
};

DisplayList.propTypes = {};

export default DisplayList;
