import React from 'react';
import styled from 'styled-components';
import { OrderItemT } from 'services/store/types/orders/Orders';
import ItemsListRow from './components/itemsListRow';

const StyledTable = styled.table`
 width: 100%;
 border-radius: 5px;
 font-size: 14px;
 text-align: center;
 thead > tr > th {
  font-weight: bold;
  border: 1px solid #ebebeb;
  padding: 2px;
  &.smallFont {
   font-size: 12px;
  }
  &.right {
   background-color: ${({ theme: { orderTable } }) => orderTable.headerRight};
  }
  &.left {
   background-color: ${({ theme: { orderTable } }) => orderTable.headerLeft};
  }
 }
 tbody > tr > td {
  border: 1px solid #ebebeb;
  padding: 2px;
  &.right {
   background-color: ${({ theme: { orderTable } }) => orderTable.right};
  }
  &.left {
   background-color: ${({ theme: { orderTable } }) => orderTable.left};
  }
 }
 th,
 td {
  &.width40 {
   width: 40px;
  }
  &.width50 {
   width: 50px;
  }
  &.width60 {
   width: 60px;
  }
  &.width75 {
   width: 75px;
  }
  &.width95 {
   width: 95px;
  }
 }
`;

interface PropsT {
 items: OrderItemT[];
 handleItem: (index: number, field: string, value: any) => void;
 handleRemoveItem: (index: number) => void;
 isFastWrite: boolean;
}

const ItemsList: React.FC<PropsT> = ({
 items,
 handleItem,
 handleRemoveItem,
 isFastWrite,
}) => {
 return (
  <>
   <StyledTable>
    <thead>
     <tr>
      <th rowSpan={4} className="width50">
       Lp.
      </th>
      <th rowSpan={4} className="width95">
       Typ
      </th>
      <th colSpan={6}>Wysokość</th>
      <th colSpan={6}>Szerokość</th>
      <th rowSpan={4} className="width75">
       Grubość [mm]
      </th>
      <th rowSpan={4} className="width50">
       Ilość
      </th>
      <th rowSpan={2} colSpan={2}>
       Lakierowane strony
      </th>
      <th rowSpan={4} className="width50">
       Rys.
      </th>
      <th rowSpan={4}>Uwagi</th>
      <th rowSpan={4} className="smallFont width40">
       Usuń
      </th>
     </tr>
     <tr>
      <th rowSpan={2} className="width60">
       Wys. [mm]
      </th>
      <th colSpan={2} className="smallFont">
       Uchwyt / R
      </th>
      <th colSpan={2} className="smallFont">
       Otwory pod zawiasy / R
      </th>
      <th rowSpan={2} className="smallFont width50 left">
       Lakier lewa 100mm po wys
      </th>
      <th rowSpan={2} className="width60">
       Szer. [mm]
      </th>
      <th colSpan={2} className="smallFont">
       Uchwyt / R
      </th>
      <th colSpan={2} className="smallFont">
       Otwory pod zawiasy / R
      </th>
      <th rowSpan={2} className="smallFont width50 left">
       Lakier lewa 100mm po szer
      </th>
     </tr>
     <tr>
      <th className="width50 right">W1</th>
      <th className="width50 right">W2</th>
      <th className="width50 left">W1'</th>
      <th className="width50 left">W2'</th>
      <th className="width50 right">S1</th>
      <th className="width50 right">S2</th>
      <th className="width50 left">S1'</th>
      <th className="width50 left">S2'</th>
      <th className="width50 right">P</th>
      <th className="width50 left">L</th>
     </tr>
    </thead>
    <tbody>
     {items.length
      ? items.map((item: OrderItemT, index: number) => (
         <ItemsListRow
          key={index}
          item={item}
          index={index}
          handleItem={handleItem}
          handleRemoveItem={handleRemoveItem}
          fastWrite={isFastWrite}
         />
        ))
      : null}
    </tbody>
   </StyledTable>
  </>
 );
};

export default ItemsList;
