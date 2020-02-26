import React from 'react';
import styled from 'styled-components';
import { Spin } from 'antd';

const StyledWrapper = styled.div`
 z-index: 1100;
 position: fixed;
 top: 0;
 left: 0;
 height: 100%;
 width: 100%;
 background-color: rgba(255, 255, 255, 0.5);
`;
const StyledBox = styled.div`
 z-index: 1101;
 position: absolute;
 top: 40%;
 left: 50%;
 transform: translate(-50%, -50%);
`;

const Spinner = () => (
 <StyledWrapper>
  <StyledBox>
   <Spin size="large" />
  </StyledBox>
 </StyledWrapper>
);

export default Spinner;
