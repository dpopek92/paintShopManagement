import React, { useEffect, useState } from 'react';
import { OrderT } from 'services/store/types/orders/Orders';
import { Table } from 'antd';
import sortListBy from 'services/utils/sort/sortMethods';
import { dateToString } from 'services/utils/date';
import { firstLetterUppercase } from 'services/utils/string';

const columns = [
 {
  title: 'Lp.',
  dataIndex: 'lp',
  sorter: false,
  align: 'center',
 },
 {
  title: 'Klient',
  dataIndex: 'company',
  sorter: true,
  align: 'center',
 },
 {
  title: 'Nr',
  dataIndex: 'number',
  sorter: true,
  align: 'center',
 },
 {
  title: 'Nazwa',
  dataIndex: 'name',
  sorter: false,
  align: 'center',
 },
 {
  title: 'Kolor',
  dataIndex: 'color',
  sorter: true,
  align: 'center',
 },
 {
  title: 'Matowość',
  dataIndex: 'paintType',
  sorter: true,
  align: 'center',
 },
 {
  title: 'Elementy',
  dataIndex: 'elements',
  sorter: false,
  align: 'center',
 },
 {
  title: 'PL',
  dataIndex: 'surfacePL',
  sorter: false,
  align: 'center',
 },
 {
  title: 'PP',
  dataIndex: 'surfacePP',
  sorter: false,
  align: 'center',
 },
 {
  title: 'Data',
  dataIndex: 'date',
  sorter: true,
  align: 'center',
 },
 {
  title: 'Data realizacji',
  dataIndex: 'finishDate',
  sorter: true,
  align: 'center',
 },
];

interface PropsT {
 orders?: OrderT[] | [];
 sortBy: string;
 sortDirection: string;
}

const OrdersList: React.FC<PropsT> = ({ orders, sortBy, sortDirection }) => {
 const [list, setList] = useState<any[]>([]);
 useEffect(() => {
  if (orders) {
   const newList = orders
    .sort(
     (a: OrderT, b: OrderT) => sortListBy.string(a, b, sortDirection, sortBy),
     //   b.user['company'].localeCompare(a.user['company']),
     //  a.user['company'].localeCompare(b.user['company']),
    )
    .map((order: OrderT, index: number) => {
     const {
      user,
      number,
      name,
      color,
      paintType,
      elements,
      surfacePL,
      surfacePP,
      date,
      finishDate,
     } = order;
     return {
      key: index,
      lp: index + 1,
      company: user.company,
      number: number,
      name: name,
      color: color,
      paintType: firstLetterUppercase(paintType),
      elements: elements,
      surfacePL: surfacePL && (surfacePL * 0.000001).toFixed(3),
      surfacePP: surfacePP && (surfacePP * 0.000001).toFixed(3),
      date: dateToString(date),
      finishDate: dateToString(finishDate),
     };
    });

   setList(newList);
  }
 }, [orders]);
 return (
  <div>
   <Table
    size="middle"
    columns={columns}
    dataSource={list}
    pagination={false}
    scroll={{ x: 600 }}
   />
  </div>
 );
};

export default OrdersList;
