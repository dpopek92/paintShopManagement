import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import Fade from "react-reveal/Fade";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
 faTimes,
 faFileUpload,
 faTrashAlt
} from "@fortawesome/free-solid-svg-icons";
import Input from "components/atoms/inputs/Input";
import ItemTypeSelect from "components/atoms/select/orderFormItem/ItemTypeSelect";
import RightSideSelect from "components/atoms/select/orderFormItem/ItemRightSideEdgeSelect";
import LeftSideSelect from "components/atoms/select/orderFormItem/ItemLeftSideEdgeSelect";
import ThicknessSelect from "components/atoms/select/orderFormItem/ItemThicknessSelect";
import {
 handleItemData,
 removeOrderItem,
 addImage,
 removeImage
} from "actions/newOrder";
import { setModelRightSide, setModelLeftSide } from "actions/view";

const PrimaryColumn = styled.td`
 background-color: rgba(205, 231, 169, 0.5);
`;
const SecondaryColumn = styled.td`
 background-color: rgba(252, 215, 160, 0.5);
`;
const StyledInputFile = styled.input`
 width: 0.1px;
 height: 0.1px;
 opacity: 0;
 overflow: hidden;
 position: absolute;
 z-index: -1;
`;
const StyledLabelFile = styled.label`
 cursor: pointer;
 margin: 0;
`;

const OrderItemsRow = ({ item, index, fastWrite, newOrder }) => {
 const dispatch = useDispatch();
 const id = useSelector(state => state.auth.user._id);
 const userId = newOrder.user ? newOrder.user : id;

 const handleItem = e => {
  const value =
   e.target.type === "checkbox" ? e.target.checked : e.target.value;
  if (e.target.type === "text" && e.target.name !== "comments") {
   const numbers = /^(\s*|\d+)$/;
   if (!e.target.value.match(numbers)) return;
  }
  dispatch(handleItemData(index, e.target.name, value));
 };

 const handleFocus = (leftSide, rightSide) => {
  if (leftSide) dispatch(setModelLeftSide(leftSide));
  if (rightSide) dispatch(setModelRightSide(rightSide));
 };

 const handleBlur = () => {
  dispatch(setModelLeftSide(""));
  dispatch(setModelRightSide(""));
 };

 return (
  <>
   <Fade bottom>
    <tr>
     <td>{index + 1}</td>
     <td>
      <ItemTypeSelect
       value={item.type}
       newOrder={newOrder}
       fastWrite={fastWrite}
       onchange={handleItem}
      />
     </td>
     {/* 
    |--------------------------------------------------
    |
    | HEIGHT
    |
    |--------------------------------------------------
    */}
     <td>
      <Input
       autoComplete="off"
       name="height"
       value={item.height}
       onChange={handleItem}
       onFocus={() => handleFocus("rightEdge leftEdge", "rightEdge leftEdge")}
       onBlur={handleBlur}
       focus
      />
     </td>
     <PrimaryColumn>
      {/* rightSideLeftEdge */}
      <RightSideSelect
       name="h1PEdge"
       value={item.h1PEdge}
       newOrder={newOrder}
       fastWrite={fastWrite}
       onchange={handleItem}
       onfocus={() => handleFocus(null, "leftEdge leftAnimation")}
       onblur={handleBlur}
      />
     </PrimaryColumn>
     <PrimaryColumn>
      {/* rightSideRightEdge */}
      <RightSideSelect
       name="h2PEdge"
       value={item.h2PEdge}
       newOrder={newOrder}
       fastWrite={fastWrite}
       onchange={handleItem}
       onfocus={() => handleFocus(null, "rightEdge rightAnimation")}
       onblur={handleBlur}
      />
     </PrimaryColumn>
     <SecondaryColumn>
      {/* leftSideLeftEdge */}
      <LeftSideSelect
       name="h1LEdge"
       value={item.h1LEdge}
       newOrder={newOrder}
       fastWrite={fastWrite}
       onchange={handleItem}
       onfocus={() => handleFocus("leftEdge leftAnimation", null)}
       onblur={handleBlur}
      />
     </SecondaryColumn>
     <SecondaryColumn>
      {/* leftSideRightEdge */}
      <LeftSideSelect
       name="h2LEdge"
       value={item.h2LEdge}
       newOrder={newOrder}
       fastWrite={fastWrite}
       onchange={handleItem}
       onfocus={() => handleFocus("rightEdge rightAnimation", null)}
       onblur={handleBlur}
      />
     </SecondaryColumn>
     <SecondaryColumn>
      <input
       tabIndex={fastWrite ? "-1" : "0"}
       type="checkbox"
       name="hLPaintedEdge"
       checked={item.hLPaintedEdge}
       onChange={handleItem}
      />
     </SecondaryColumn>
     {/* 
     |--------------------------------------------------
     |
     | WIDTH
     |
     |--------------------------------------------------
     */}
     <td>
      <Input
       autoComplete="off"
       name="width"
       value={item.width}
       onChange={handleItem}
       onFocus={() => handleFocus("topEdge bottomEdge", "topEdge bottomEdge")}
       onBlur={handleBlur}
       focus
      />
     </td>
     <PrimaryColumn>
      {/* rigthSideTopEdge */}
      <RightSideSelect
       name="w1PEdge"
       value={item.w1PEdge}
       newOrder={newOrder}
       fastWrite={fastWrite}
       onchange={handleItem}
       onfocus={() => handleFocus(null, "topEdge topAnimation")}
       onblur={handleBlur}
      />
     </PrimaryColumn>
     <PrimaryColumn>
      {/* rightSideBottomEdge */}
      <RightSideSelect
       name="w2PEdge"
       value={item.w2PEdge}
       newOrder={newOrder}
       fastWrite={fastWrite}
       onchange={handleItem}
       onfocus={() => handleFocus(null, "bottomEdge bottomAnimation")}
       onblur={handleBlur}
      />
     </PrimaryColumn>
     <SecondaryColumn>
      {/* leftSideTopEdge */}
      <LeftSideSelect
       name="w1LEdge"
       value={item.w1LEdge}
       newOrder={newOrder}
       fastWrite={fastWrite}
       onchange={handleItem}
       onfocus={() => handleFocus("topEdge topAnimation", null)}
       onblur={handleBlur}
      />
     </SecondaryColumn>
     <SecondaryColumn>
      {/* leftSideBottomEdge */}
      <LeftSideSelect
       name="w2LEdge"
       value={item.w2LEdge}
       newOrder={newOrder}
       fastWrite={fastWrite}
       onchange={handleItem}
       onfocus={() => handleFocus("bottomEdge bottomAnimation", null)}
       onblur={handleBlur}
      />
     </SecondaryColumn>
     <SecondaryColumn>
      <input
       tabIndex={fastWrite ? "-1" : "0"}
       type="checkbox"
       name="wLPaintedEdge"
       checked={item.wLPaintedEdge}
       onChange={handleItem}
      />
     </SecondaryColumn>
     {/* 
     |--------------------------------------------------
     |
     | OTHERS
     |
     |--------------------------------------------------
     */}
     <td>
      <ThicknessSelect
       fastWrite={fastWrite}
       item={item}
       onchange={handleItem}
      />
     </td>
     <td>
      <Input
       autoComplete="off"
       name="quantity"
       value={item.quantity}
       onChange={handleItem}
       onFocus={() => {}}
       onBlur={() => {}}
       focus
      />
     </td>
     <PrimaryColumn>
      {" "}
      <input
       tabIndex={fastWrite ? "-1" : "0"}
       type="checkbox"
       name="paintRight"
       checked={item.paintRight}
       onChange={handleItem}
      />
     </PrimaryColumn>
     <SecondaryColumn>
      <input
       tabIndex={fastWrite ? "-1" : "0"}
       type="checkbox"
       name="paintLeft"
       checked={item.paintLeft}
       onChange={handleItem}
      />
     </SecondaryColumn>
     <td>
      {!item.image.file && !item.image.path ? (
       <>
        <StyledInputFile
         tabIndex={fastWrite ? "-1" : "0"}
         type="file"
         accept="image/*,application/pdf"
         id={`file${index}`}
         onChange={e => dispatch(addImage(item.id, e.target.files[0], userId))}
        />
        <StyledLabelFile htmlFor={`file${index}`}>
         <FontAwesomeIcon icon={faFileUpload} title="Dodaj rysunek" />
        </StyledLabelFile>
       </>
      ) : (
       <FontAwesomeIcon
        icon={faTrashAlt}
        style={{ color: "#c01212", cursor: "pointer" }}
        title="Usuń rysunek"
        onClick={() => dispatch(removeImage(index))}
       />
      )}
     </td>
     <td>
      <Input
       autoComplete="off"
       tabIndex={fastWrite ? "-1" : "0"}
       name="comments"
       value={item.comments}
       onChange={handleItem}
       focus
      />
     </td>
     <td
      onClick={() => {
       dispatch(removeOrderItem(index));
      }}
      style={{ color: "#c01212", cursor: "pointer" }}
     >
      <FontAwesomeIcon icon={faTimes} />
     </td>
    </tr>
   </Fade>
  </>
 );
};

OrderItemsRow.propTypes = {
 item: PropTypes.object,
 index: PropTypes.number,
 fastWrite: PropTypes.bool,
 newOrder: PropTypes.object
};

export default OrderItemsRow;
