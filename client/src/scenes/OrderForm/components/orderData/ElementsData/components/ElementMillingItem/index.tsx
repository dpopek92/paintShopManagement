import React from 'react';
import styled from 'styled-components';
import { Checkbox, Icon } from 'antd';
import { firstLetterUppercase } from 'services/utils/string';

const StyledWrapper = styled.div`
 text-align: center;
`;
const StyledFieldWrapper = styled.div`
 margin-bottom: 5px;
`;
const StyledIconWrapper = styled.div`
 text-align: right;
`;
const StyledIcon = styled(Icon)`
 cursor: pointer;
 &:hover {
  color: ${({ theme }) => theme.primary};
 }
`;

interface PropsT {
 isNut: boolean;
 isFelc: boolean;
 isChamfering: boolean;
 title: string;
}

const ElementMillingItem: React.FC<PropsT> = ({
 isNut,
 isFelc,
 isChamfering,
 title,
}) => {
 return (
  <StyledWrapper>
   <StyledFieldWrapper>
    <strong>{firstLetterUppercase(title)}</strong>
   </StyledFieldWrapper>
   <StyledFieldWrapper>
    <Checkbox checked={isChamfering}>Gierunek</Checkbox>
   </StyledFieldWrapper>
   <StyledFieldWrapper>
    <Checkbox checked={isFelc}>Felc</Checkbox>
   </StyledFieldWrapper>
   <StyledFieldWrapper>
    <Checkbox checked={isNut}>Nut</Checkbox>
   </StyledFieldWrapper>
   <StyledIconWrapper>
    <StyledIcon type="question" />
   </StyledIconWrapper>
  </StyledWrapper>
 );
};

export default ElementMillingItem;
