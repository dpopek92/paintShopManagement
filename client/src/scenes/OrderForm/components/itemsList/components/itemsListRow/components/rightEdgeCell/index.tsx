import React from 'react';
import { OrderItemRightSideEdgeT } from 'services/store/types/orders/Orders';
import { Select } from 'antd';
import { useSelector } from 'react-redux';
import { AppStateT } from 'services/store';
const { Option } = Select;

interface PropsT {
 value: OrderItemRightSideEdgeT;
 handleChange: (value: OrderItemRightSideEdgeT) => void;
 handleFocus: () => void;
 handleBlur: () => void;
 fastWrite: boolean;
}

const RightEdgeCell: React.FC<PropsT> = ({
 value,
 handleChange,
 handleBlur,
 handleFocus,
 fastWrite,
}) => {
 const newOrder = useSelector((state: AppStateT) => state.newOrder);
 const { handleSymbol2, handleSymbol1 } = newOrder;
 return (
  <Select
   value={value}
   onChange={(value: OrderItemRightSideEdgeT) => handleChange(value)}
   onFocus={handleFocus}
   onBlur={handleBlur}
   dropdownMatchSelectWidth={false}
   style={{ maxWidth: 60 }}
   tabIndex={fastWrite ? -1 : 0}
  >
   <Option value="-">-</Option>
   <Option value="r1">R1</Option>
   <Option value="r2">R2</Option>
   {handleSymbol1 && (
    <Option value={handleSymbol1}>{handleSymbol1.toUpperCase()}</Option>
   )}
   {handleSymbol2 && (
    <Option value={handleSymbol2}>{handleSymbol2.toUpperCase()}</Option>
   )}
   {newOrder.isChamfering && <Option value="gierunek">Gierunek</Option>}
  </Select>
 );
};

export default RightEdgeCell;
