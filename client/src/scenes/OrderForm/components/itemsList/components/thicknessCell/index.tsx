import React from 'react';
import styled from 'styled-components';
import { Select } from 'antd';
import {
 OrderItemThicknessT,
 OrderItemT,
} from 'services/store/types/orders/Orders';
import { useSelector } from 'react-redux';
import { AppStateT } from 'services/store';
import { containsOneOf } from 'services/utils/array';
const { Option } = Select;

const handles = ['up', 'uk', 'up45', 'uk45', 'p45', 'uc'];
const handleValues = [];

interface PropsT {
 value: OrderItemThicknessT;
 item: OrderItemT;
}

const ThicknessCell: React.FC<PropsT> = ({ value, item }) => {
 const { h1P, h2P, w1P, w2P, type } = item;

 if (containsOneOf(handles, [h1P, h2P, w1P, w2P]))
  return (
   <Select value={value} dropdownMatchSelectWidth={false}>
    <Option value={18}>18</Option>
    <Option value={19}>19</Option>
    <Option value={22}>22</Option>
   </Select>
  );
 else if (type === 'frez' || type === 'witryna')
  return (
   <Select value={value} dropdownMatchSelectWidth={false}>
    <Option value={18}>18</Option>
    <Option value={22}>22</Option>
    <Option value={25}>25</Option>
    <Option value={28}>28</Option>
    <Option value={30}>30</Option>
    <Option value={38}>38</Option>
   </Select>
  );
 else
  return (
   <Select value={value} dropdownMatchSelectWidth={false}>
    <Option value={3}>3</Option>
    <Option value={6}>6</Option>
    <Option value={8}>8</Option>
    <Option value={10}>10</Option>
    <Option value={12}>12</Option>
    <Option value={16}>16</Option>
    <Option value={18}>18</Option>
    <Option value={22}>22</Option>
    <Option value={25}>25</Option>
    <Option value={28}>28</Option>
    <Option value={30}>30</Option>
    <Option value={38}>38</Option>
   </Select>
  );
};

export default ThicknessCell;
