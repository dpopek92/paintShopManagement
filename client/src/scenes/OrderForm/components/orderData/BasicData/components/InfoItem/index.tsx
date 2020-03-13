import React from 'react';
import styled from 'styled-components';
import { firstLetterUppercase } from 'services/utils/string';

const StyledWrapper = styled.div`
 text-align: center;
`;
const StyledTitleWrapper = styled.div`
 margin-bottom: 5px;
`;

interface PropsT {
 title: string;
 text: string;
}

const InfoItem: React.FC<PropsT> = ({ title, text }) => {
 return (
  <StyledWrapper>
   <StyledTitleWrapper>
    <strong>{firstLetterUppercase(title)}</strong>
   </StyledTitleWrapper>
   <div>
    <span>{firstLetterUppercase(text)}</span>
   </div>
  </StyledWrapper>
 );
};

export default InfoItem;
