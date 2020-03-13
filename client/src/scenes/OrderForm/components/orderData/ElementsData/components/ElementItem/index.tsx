import React from 'react';
import styled from 'styled-components';
import { Button, Select } from 'antd';
import { firstLetterUppercase } from 'services/utils/string';
const { Option } = Select;

const StyledWrapper = styled.div`
 text-align: center;
`;
const StyledFieldWrapper = styled.div`
 margin-bottom: 5px;
`;
const StyledSelect = styled(Select)`
 min-width: 120px;
 max-width: 200px;
`;

interface PropsT {
 title: string;
 primaryValue?: string;
 secondaryValue?: string;
 button?: boolean;
 handleButton?: () => void;
 select?: boolean;
 selectItems?: string[];
 selectValue?: string;
 handleSelect?: () => void;
}

const ElementItem: React.FC<PropsT> = ({
 title,
 primaryValue,
 secondaryValue,
 button,
 handleButton,
 select,
 selectItems,
 selectValue,
 handleSelect,
}) => {
 return (
  <StyledWrapper>
   <StyledFieldWrapper>
    <strong>{firstLetterUppercase(title)}</strong>
   </StyledFieldWrapper>
   <StyledFieldWrapper>
    <div>{primaryValue?.toUpperCase()}</div>
    <div>{secondaryValue?.toUpperCase()}</div>
   </StyledFieldWrapper>
   <StyledFieldWrapper>
    {button && (
     <Button size="small" type="primary" onClick={handleButton}>
      {primaryValue ? 'Zmień/Dodaj' : 'Wybierz'}
     </Button>
    )}
   </StyledFieldWrapper>
   <StyledFieldWrapper>
    {select && selectItems && (
     <StyledSelect defaultValue={selectValue} onChange={handleSelect}>
      {selectItems.map((item: string) => (
       <Option key={item} value={item}>
        {firstLetterUppercase(item)}
       </Option>
      ))}
     </StyledSelect>
    )}
   </StyledFieldWrapper>
  </StyledWrapper>
 );
};

export default ElementItem;
