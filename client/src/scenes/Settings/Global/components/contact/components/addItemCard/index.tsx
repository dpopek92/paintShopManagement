import React from 'react';
import { Card } from 'antd';
import styled from 'styled-components';

interface PropsT {
 content: string;
 onclick: () => void;
}

const StyledCard = styled(Card)`
 position: relative;
 height: inherit;
 opacity: 0.3;
 transition: opacity 0.2s;
 cursor: pointer;
 &:hover {
  opacity: 1;
 }
`;
const StyledAddIconContainer = styled.div`
 position: absolute;
 top: 50%;
 left: 50%;
 transform: translate(-50%, -50%);
 text-align: center;
 font-size: 22px;
 color: ${({ theme }) => theme.primary};
 p {
  margin: 0;
 }
`;

const AddCard: React.FC<PropsT> = ({ content, onclick }) => (
 <StyledCard onClick={onclick}>
  <StyledAddIconContainer>
   <p>{content}</p>
  </StyledAddIconContainer>
 </StyledCard>
);

export default AddCard;
