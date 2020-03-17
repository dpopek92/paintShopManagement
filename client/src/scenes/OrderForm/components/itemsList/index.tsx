import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Table, Input, Checkbox, InputNumber, Icon } from 'antd';
import { OrderItemT } from 'services/store/types/orders/Orders';
import ItemType from './components/typeCell';
import RightEdgeCell from './components/rightEdgeCell';
import LeftEdgeCell from './components/leftEdgeCell';
import ThicknessCell from './components/thicknessCell';
import { NewOrderT } from 'services/store/types/newOrder/NewOrder';
const { Column, ColumnGroup } = Table;

const StyledTable = styled(Table)`
 .ant-table-body {
  margin: 0 !important;
 }
 thead > tr > th {
  text-align: center;
  font-weight: bold;
  padding: 2px !important;
  &.smallFont {
   font-size: 12px;
  }
  &.right {
   background-color: ${({ theme: { orderTable } }) =>
    orderTable.headerRight} !important;
  }
  &.left {
   background-color: ${({ theme: { orderTable } }) =>
    orderTable.headerLeft} !important;
  }
 }
 tbody > tr > td {
  text-align: center;
  padding: 2px !important;
  &.right {
   background-color: ${({ theme: { orderTable } }) =>
    orderTable.right} !important;
  }
  &.left {
   background-color: ${({ theme: { orderTable } }) =>
    orderTable.left} !important;
  }
 }
`;
const StyledRemoveIcon = styled(Icon)`
 color: red;
 font-weight: bold;
 cursor: pointer;
`;
const StyledFileIcon = styled(Icon)`
 cursor: pointer;
`;

interface PropsT {
 items: OrderItemT[];
 newOrder: NewOrderT;
}

const ItemsList: React.FC<PropsT> = ({ items, newOrder }) => {
 const [list, setList] = useState<any>([]);

 useEffect(() => {
  if (items.length) {
   const itemsList = items.map((item: OrderItemT, index: number) => {
    return {
     key: index,
     lp: index + 1,
     type: <ItemType value={item.type} />,
     height: <Input value={item.height} />,
     h1P: <RightEdgeCell value={item.h1P} />,
     h2P: <RightEdgeCell value={item.h2P} />,
     h1L: <LeftEdgeCell value={item.h1L} />,
     h2L: <LeftEdgeCell value={item.h2L} />,
     hLPaintedEdge: <Checkbox checked={item.hLPaintedEdge} />,
     width: <Input value={item.width} />,
     w1P: <RightEdgeCell value={item.w1P} />,
     w2P: <RightEdgeCell value={item.w2P} />,
     w1L: <LeftEdgeCell value={item.w1L} />,
     w2L: <LeftEdgeCell value={item.w2L} />,
     wLPaintedEdge: <Checkbox checked={item.wLPaintedEdge} />,
     thickness: <ThicknessCell value={item.thickness} item={item} />,
     quantity: <InputNumber value={item.quantity} />,
     paintRight: <Checkbox checked={item.paintRight} />,
     paintLeft: <Checkbox checked={item.paintLeft} />,
     image: <StyledFileIcon type="file" />,
     comments: <Input value={item.comments} />,
     remove: <StyledRemoveIcon type="close" />,
    };
   });
   setList(itemsList);
  }
 }, [items]);
 return (
  <StyledTable bordered size="small" pagination={false} dataSource={list}>
   <Column width={50} title="Lp." dataIndex="lp" key="lp" />
   <Column width={95} title="Typ" dataIndex="type" key="type" />
   <ColumnGroup title="Wysokość">
    <Column width={50} title="Wys. [mm]" dataIndex="height" key="height" />
    <ColumnGroup className="smallFont" title="Uchwyt / R">
     <Column
      width={50}
      className="right"
      title="W1"
      dataIndex="h1P"
      key="h1P"
      onCell={() => ({ className: 'right' })}
     />
     <Column
      width={50}
      className="right"
      title="W2"
      dataIndex="h2P"
      key="h2P"
      onCell={() => ({ className: 'right' })}
     />
    </ColumnGroup>
    <ColumnGroup className="smallFont" title="Otwory pod zawiasy[szt] / R">
     <Column
      width={50}
      className="left"
      title="W1'"
      dataIndex="h1L"
      key="h1L"
      onCell={() => ({ className: 'left' })}
     />
     <Column
      width={50}
      className="left"
      title="W2'"
      dataIndex="h2L"
      key="h2L"
      onCell={() => ({ className: 'left' })}
     />
    </ColumnGroup>
    <Column
     width={50}
     className="smallFont left"
     title="Lakier lewa 100mm po wys"
     dataIndex="hLPaintedEdge"
     key="hLPaintedEdge"
     onCell={() => ({ className: 'left' })}
    />
   </ColumnGroup>
   <ColumnGroup title="Szerokość">
    <Column width={50} title="Szer. [mm]" dataIndex="width" key="width" />
    <ColumnGroup className="smallFont" title="Uchwyt / R">
     <Column
      width={50}
      className="right"
      title="S1"
      dataIndex="w1P"
      key="w1P"
      onCell={() => ({ className: 'right' })}
     />
     <Column
      width={50}
      className="right"
      title="S2"
      dataIndex="w2P"
      key="w2P"
      onCell={() => ({ className: 'right' })}
     />
    </ColumnGroup>
    <ColumnGroup className="smallFont" title="Otwory pod zawiasy[szt] / R">
     <Column
      width={50}
      className="left"
      title="S1'"
      dataIndex="w1L"
      key="w1L"
      onCell={() => ({ className: 'left' })}
     />
     <Column
      width={50}
      className="left"
      title="S2'"
      dataIndex="w2L"
      key="w2L"
      onCell={() => ({ className: 'left' })}
     />
    </ColumnGroup>
    <Column
     width={50}
     className="smallFont left"
     title="Lakier lewa 100mm po szer"
     dataIndex="wLPaintedEdge"
     key="wLPaintedEdge"
     onCell={() => ({ className: 'left' })}
    />
   </ColumnGroup>
   <Column
    width={75}
    title="Grubość płyty [mm]"
    dataIndex="thickness"
    key="thickness"
   />
   <Column width={50} title="Ilość" dataIndex="quantity" key="quantity" />
   <ColumnGroup title="Lakierowane strony">
    <Column
     width={50}
     className="right"
     title="P"
     dataIndex="paintRight"
     key="paintRight"
     onCell={() => ({ className: 'right' })}
    />
    <Column
     width={50}
     className="left"
     title="L"
     dataIndex="paintLeft"
     key="paintLeft"
     onCell={() => ({ className: 'left' })}
    />
   </ColumnGroup>
   <Column width={50} title="Rys." dataIndex="image" key="image" />
   <Column title="Uwagi" dataIndex="comments" key="comments" />
   <Column
    width={40}
    className="smallFont"
    title="Usuń"
    dataIndex="remove"
    key="remove"
   />
  </StyledTable>
 );
};

export default ItemsList;
