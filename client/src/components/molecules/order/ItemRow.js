import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import withContext from "hoc/withContext";

const PrimaryColumn = styled.td`
 background-color: rgba(205, 231, 169, 0.5);
`;
const SecondaryColumn = styled.td`
 background-color: rgba(252, 215, 160, 0.5);
`;

const ItemRow = ({ index, item, permissionContext }) => {
 let rowClassName = "";
 let title;
 if (permissionContext !== "employee" && !item.includedToPrice) {
  rowClassName += " elementNotIncludedToPrice";
 }
 if (permissionContext !== "user" && item.elementLost) {
  rowClassName += " elementLost";
  title = `${item.elementLost.position}, szt:${item.elementLost.quantity}`;
 }
 if (permissionContext !== "user" && item.elementToCorrect) {
  rowClassName += " elementToCorrect";
  title = `${item.elementToCorrect.position}, szt:${item.elementToCorrect.quantity}`;
 }
 if (
  permissionContext === "admin" &&
  (item.width >= 2750 || item.height >= 2750)
 ) {
  rowClassName += " elementToLong";
  title = `>2750 m.b.`;
 }
 return (
  <tr title={title} className={rowClassName}>
   <>
    <td>{index + 1}</td>
    <td>{item.type}</td>
    <th>{item.height}</th>
    <PrimaryColumn>{item.h1PEdge}</PrimaryColumn>
    <PrimaryColumn>{item.h2PEdge}</PrimaryColumn>
    <SecondaryColumn>{item.h1LEdge}</SecondaryColumn>
    <SecondaryColumn>{item.h2LEdge}</SecondaryColumn>
    <SecondaryColumn>
     {item.hLPaintedEdge ? <FontAwesomeIcon icon={faCheck} /> : ""}
    </SecondaryColumn>
    <th>{item.width}</th>
    <PrimaryColumn>{item.w1PEdge}</PrimaryColumn>
    <PrimaryColumn>{item.w2PEdge}</PrimaryColumn>
    <SecondaryColumn>{item.w1LEdge}</SecondaryColumn>
    <SecondaryColumn>{item.w2LEdge}</SecondaryColumn>
    <SecondaryColumn>
     {item.wLPaintedEdge ? <FontAwesomeIcon icon={faCheck} /> : ""}
    </SecondaryColumn>
    <td>{item.thickness}</td>
    <td>{item.quantity}</td>
    <PrimaryColumn>
     {item.paintRight ? <FontAwesomeIcon icon={faCheck} /> : ""}
    </PrimaryColumn>
    <SecondaryColumn>
     {item.paintLeft ? <FontAwesomeIcon icon={faCheck} /> : ""}
    </SecondaryColumn>
    <td>{item.comments}</td>
    <PrimaryColumn>
     {item.surfaceRight ? item.surfaceRight.toFixed(3) : ""}
    </PrimaryColumn>
    <SecondaryColumn>
     {item.surfaceLeft ? item.surfaceLeft.toFixed(3) : ""}
    </SecondaryColumn>
   </>
  </tr>
 );
};

ItemRow.propTypes = {
 index: PropTypes.number,
 item: PropTypes.object,
 permissionContext: PropTypes.string
};

export default withContext(ItemRow);
