import React from 'react';
import styled from 'styled-components';
import { Table } from 'antd';
const { Column, ColumnGroup } = Table;

const StyledTable = styled(Table)`
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
`;

interface PropsT {}

const ItemsList: React.FC<PropsT> = () => {
 return (
  <StyledTable bordered size="small">
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
     />
     <Column
      width={50}
      className="right"
      title="W2"
      dataIndex="h2P"
      key="h2P"
     />
    </ColumnGroup>
    <ColumnGroup className="smallFont" title="Otwory pod zawiasy[szt] / R">
     <Column
      width={50}
      className="left"
      title="W1'"
      dataIndex="h1L"
      key="h1L"
     />
     <Column
      width={50}
      className="left"
      title="W2'"
      dataIndex="h2L"
      key="h2L"
     />
    </ColumnGroup>
    <Column
     width={50}
     className="smallFont left"
     title="Lakier lewa 100mm po wys"
     dataIndex="hLPaintedEdge"
     key="hLPaintedEdge"
    />
   </ColumnGroup>
   <ColumnGroup title="Szerokość">
    <Column width={50} title="Szer. [mm]" dataIndex="width" key="width" />
    <ColumnGroup title="Uchwyt / R">
     <Column
      width={50}
      className="right"
      title="S1"
      dataIndex="w1P"
      key="w1P"
     />
     <Column
      width={50}
      className="right"
      title="S2"
      dataIndex="w2P"
      key="w2P"
     />
    </ColumnGroup>
    <ColumnGroup title="Otwory pod zawiasy[szt] / R">
     <Column
      width={50}
      className="left"
      title="S1'"
      dataIndex="w1L"
      key="w1L"
     />
     <Column
      width={50}
      className="left"
      title="S2'"
      dataIndex="w2L"
      key="w2L"
     />
    </ColumnGroup>
    <Column
     width={50}
     className="smallFont left"
     title="Lakier lewa 100mm po szer"
     dataIndex="wLPaintedEdge"
     key="wLPaintedEdge"
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
    />
    <Column
     width={50}
     className="left"
     title="L"
     dataIndex="paintLeft"
     key="paintLeft"
    />
   </ColumnGroup>
   <Column width={50} title="Rys." dataIndex="image" key="image" />
   <Column title="Uwagi" dataIndex="comments" key="comments" />
  </StyledTable>
 );
};

export default ItemsList;
