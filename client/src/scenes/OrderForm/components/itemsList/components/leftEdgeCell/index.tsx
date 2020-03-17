import React from 'react';
import styled from 'styled-components';
import { OrderItemLeftSideEdgeT } from 'services/store/types/orders/Orders';
import { Select } from 'antd';
import { useSelector } from 'react-redux';
import { AppStateT } from 'services/store';
const { Option } = Select;

interface PropsT {
 value: OrderItemLeftSideEdgeT;
}

const LeftEdgeCell: React.FC<PropsT> = ({ value }) => {
 const newOrder = useSelector((state: AppStateT) => state.newOrder);
 const { isFelc, isNut, isChamfering } = newOrder;
 return (
  <Select value={value} dropdownMatchSelectWidth={false}>
   <Option value="-">-</Option>
   <Option value="r1">R1</Option>
   <Option value="r2">R2</Option>
   <Option value="2 otw.">2 otw.</Option>
   <Option value="3 otw.">3 otw.</Option>
   <Option value="4 otw.">4 otw.</Option>
   <Option value="5 otw.">5 otw.</Option>
   <Option value="6 otw.">6 otw.</Option>
   <Option value="7 otw.">7 otw.</Option>
   <Option value="8 otw.">8 otw.</Option>
   {isFelc && <Option value="felc">Felc</Option>}
   {isNut && <Option value="nut">Nut</Option>}
   {isChamfering && <Option value="gierunek">Gierunek</Option>}
  </Select>
 );
};

export default LeftEdgeCell;
