import React from 'react';
import styled from 'styled-components';
import FrontModel from './components/frontModel';
import ElementsList from './components/elementsList';

interface PropsT {}

const Sidebar: React.FC<PropsT> = () => {
 return (
  <div>
   <FrontModel />
   <hr />
   <ElementsList />
  </div>
 );
};

export default Sidebar;
