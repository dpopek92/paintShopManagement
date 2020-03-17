import React from 'react';
import { Select } from 'antd';
import { OrderItemTypeT } from 'services/store/types/orders/Orders';
import { useSelector } from 'react-redux';
import { AppStateT } from 'services/store';
const { Option } = Select;

interface PropsT {
 value: OrderItemTypeT;
}

const ItemType: React.FC<PropsT> = ({ value }) => {
 const newOrder = useSelector((state: AppStateT) => state.newOrder);
 const { millingSymbol, glassCaseSymbol } = newOrder;
 return (
  <Select value={value} dropdownMatchSelectWidth={false}>
   <Option value="gładki">Gładki</Option>
   {millingSymbol && <Option value="frez">Frez</Option>}
   {glassCaseSymbol && <Option value="witryna">Witryna</Option>}
  </Select>
 );
};

export default ItemType;
