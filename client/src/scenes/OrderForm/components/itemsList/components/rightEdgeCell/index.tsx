import React from 'react';
import { OrderItemRightSideEdgeT } from 'services/store/types/orders/Orders';
import { Select } from 'antd';
import { useSelector } from 'react-redux';
import { AppStateT } from 'services/store';
const { Option } = Select;

interface PropsT {
 value: OrderItemRightSideEdgeT;
}

const RightEdgeCell: React.FC<PropsT> = ({ value }) => {
 const newOrder = useSelector((state: AppStateT) => state.newOrder);
 return (
  <Select value={value} dropdownMatchSelectWidth={false}>
   <Option value="-">-</Option>
   <Option value="r1">R1</Option>
   <Option value="r2">R2</Option>
   {newOrder.isChamfering && <Option value="gierunek">Gierunek</Option>}
  </Select>
 );
};

export default RightEdgeCell;
