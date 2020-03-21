import React, { useState } from 'react';
import styled from 'styled-components';
import { OrderItemT } from 'services/store/types/orders/Orders';
import ItemType from './components/typeCell';
import { Input, Checkbox, InputNumber, Icon } from 'antd';
import RightEdgeCell from './components/rightEdgeCell';
import LeftEdgeCell from './components/leftEdgeCell';
import ThicknessCell from './components/thicknessCell';

const StyledIconRemove = styled.td`
 color: red;
 font-weight: bold;
 cursor: pointer;
`;
const StyledIcon = styled.td`
 cursor: pointer;
`;
const StyledInput = styled(Input)`
 &:focus {
  background-color: #a9e4fc;
 }
`;
const StyledInputNumber = styled(InputNumber)`
 &:focus {
  background-color: #a9e4fc;
 }
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
const StyledRow = styled.tr`
 &.focused {
  background-color: #ededed;
 }
`;

interface PropsT {
 item: OrderItemT;
 index: number;
 handleItem: (index: number, field: string, value: any) => void;
 handleRemoveItem: (index: number) => void;
 handleAddItemImage: (index: number, file: File) => void;
 handleRemoveItemImage: (index: number) => void;
 fastWrite: boolean;
}

const ItemsListRow: React.FC<PropsT> = ({
 item,
 index,
 handleItem,
 handleRemoveItem,
 handleAddItemImage,
 handleRemoveItemImage,
 fastWrite,
}) => {
 const [rowClassName, setRowClassName] = useState('');

 const handleFocus = () => {
  setRowClassName('focused');
 };
 const handleBlur = () => {
  setRowClassName('');
 };
 return (
  <StyledRow className={rowClassName}>
   <td>{index + 1}</td>
   <td>
    <ItemType
     value={item.type}
     handleChange={value => handleItem(index, 'type', value)}
     fastWrite={fastWrite}
    />
   </td>
   <td>
    <StyledInput
     value={item.height}
     onChange={e => handleItem(index, 'height', e.target.value)}
     onFocus={handleFocus}
     onBlur={handleBlur}
    />
   </td>
   <td className="right">
    <RightEdgeCell
     value={item.h1P}
     handleChange={value => handleItem(index, 'h1P', value)}
     handleFocus={handleFocus}
     handleBlur={handleBlur}
     fastWrite={fastWrite}
    />
   </td>
   <td className="right">
    <RightEdgeCell
     value={item.h2P}
     handleChange={value => handleItem(index, 'h2P', value)}
     handleFocus={handleFocus}
     handleBlur={handleBlur}
     fastWrite={fastWrite}
    />
   </td>
   <td className="left">
    <LeftEdgeCell
     value={item.h1L}
     handleChange={value => handleItem(index, 'h1L', value)}
     handleFocus={handleFocus}
     handleBlur={handleBlur}
     fastWrite={fastWrite}
    />
   </td>
   <td className="left">
    <LeftEdgeCell
     value={item.h2L}
     handleChange={value => handleItem(index, 'h2L', value)}
     handleFocus={handleFocus}
     handleBlur={handleBlur}
     fastWrite={fastWrite}
    />
   </td>
   <td className="left">
    <Checkbox
     checked={item.hLPaintedEdge}
     onChange={e => handleItem(index, 'hLPaintedEdge', e.target.checked)}
     tabIndex={fastWrite ? -1 : 0}
    />
   </td>
   <td>
    <StyledInput
     value={item.width}
     onChange={e => handleItem(index, 'width', e.target.value)}
     onFocus={handleFocus}
     onBlur={handleBlur}
    />
   </td>
   <td className="right">
    <RightEdgeCell
     value={item.w1P}
     handleChange={value => handleItem(index, 'w1P', value)}
     handleFocus={handleFocus}
     handleBlur={handleBlur}
     fastWrite={fastWrite}
    />
   </td>
   <td className="right">
    <RightEdgeCell
     value={item.w2P}
     handleChange={value => handleItem(index, 'w2P', value)}
     handleFocus={handleFocus}
     handleBlur={handleBlur}
     fastWrite={fastWrite}
    />
   </td>
   <td className="left">
    <LeftEdgeCell
     value={item.w1L}
     handleChange={value => handleItem(index, 'w1L', value)}
     handleFocus={handleFocus}
     handleBlur={handleBlur}
     fastWrite={fastWrite}
    />
   </td>
   <td className="left">
    <LeftEdgeCell
     value={item.w2L}
     handleChange={value => handleItem(index, 'w2L', value)}
     handleFocus={handleFocus}
     handleBlur={handleBlur}
     fastWrite={fastWrite}
    />
   </td>
   <td className="left">
    <Checkbox
     checked={item.wLPaintedEdge}
     onChange={e => handleItem(index, 'wLPaintedEdge', e.target.checked)}
     tabIndex={fastWrite ? -1 : 0}
    />
   </td>
   <td>
    <ThicknessCell
     value={item.thickness}
     item={item}
     handleChange={value => handleItem(index, 'thickness', value)}
     fastWrite={fastWrite}
    />
   </td>
   <td>
    <StyledInputNumber
     value={item.quantity}
     onChange={value => handleItem(index, 'quantity', value)}
     onFocus={handleFocus}
     onBlur={handleBlur}
    />
   </td>
   <td className="right">
    <Checkbox
     checked={item.paintRight}
     onChange={e => handleItem(index, 'paintRight', e.target.checked)}
     tabIndex={fastWrite ? -1 : 0}
    />
   </td>
   <td className="left">
    <Checkbox
     checked={item.paintLeft}
     onChange={e => handleItem(index, 'paintLeft', e.target.checked)}
     tabIndex={fastWrite ? -1 : 0}
    />
   </td>
   <StyledIcon>
    {!item.image ? (
     <>
      <StyledInputFile
       tabIndex={fastWrite ? -1 : 0}
       type="file"
       accept="image/*,application/pdf"
       id={`file${index}`}
       onChange={e => {
        if (e.target.files) handleAddItemImage(index, e.target.files[0]);
       }}
      />
      <StyledLabelFile htmlFor={`file${index}`}>
       <Icon type="file" tabIndex={fastWrite ? -1 : 0} />
      </StyledLabelFile>
     </>
    ) : (
     <Icon
      type="delete"
      style={{ color: 'red' }}
      tabIndex={fastWrite ? -1 : 0}
      onClick={() => handleRemoveItemImage(index)}
     />
    )}
   </StyledIcon>
   <td>
    <StyledInput
     value={item.comments}
     onChange={e => handleItem(index, 'comments', e.target.value)}
     onFocus={handleFocus}
     onBlur={handleBlur}
     tabIndex={fastWrite ? -1 : 0}
    />
   </td>
   <StyledIconRemove onClick={() => handleRemoveItem(index)}>
    <Icon type="close" tabIndex={fastWrite ? -1 : 0} />
   </StyledIconRemove>
  </StyledRow>
 );
};

export default ItemsListRow;
