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
 handleNut: (value: boolean) => void;
 isFelc: boolean;
 handleFelc: (value: boolean) => void;
 isChamfering: boolean;
 handleChamfering: (value: boolean) => void;
 title: string;
}

const ElementMillingItem: React.FC<PropsT> = ({
 isNut,
 handleNut,
 isFelc,
 handleFelc,
 isChamfering,
 handleChamfering,
 title,
}) => {
 return (
  <StyledWrapper>
   <StyledFieldWrapper>
    <strong>{firstLetterUppercase(title)}</strong>
   </StyledFieldWrapper>
   <StyledFieldWrapper>
    <Checkbox
     checked={isChamfering}
     onChange={e => handleChamfering(e.target.checked)}
    >
     Gierunek
    </Checkbox>
   </StyledFieldWrapper>
   <StyledFieldWrapper>
    <Checkbox checked={isFelc} onChange={e => handleFelc(e.target.checked)}>
     Felc
    </Checkbox>
   </StyledFieldWrapper>
   <StyledFieldWrapper>
    <Checkbox checked={isNut} onChange={e => handleNut(e.target.checked)}>
     Nut
    </Checkbox>
   </StyledFieldWrapper>
   <StyledIconWrapper>
    <StyledIcon type="question" />
   </StyledIconWrapper>
  </StyledWrapper>
 );
};

export default ElementMillingItem;
