import React from 'react';
import styled from 'styled-components';
import { Button, Select } from 'antd';
import { firstLetterUppercase } from 'services/utils/string';
import { HandleT } from 'services/store/types/orders/Orders';
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
 primaryValue?: HandleT | string;
 secondaryValue?: HandleT | string;
 button?: boolean;
 handleButton?: () => void;
 buttonDisabled?: boolean;
 select?: boolean;
 selectItems?: string[];
 selectValue?: string;
 handleSelect?: (value: any) => void;
}

const ElementItem: React.FC<PropsT> = ({
 title,
 primaryValue,
 secondaryValue,
 button,
 handleButton,
 buttonDisabled = false,
 select,
 selectItems,
 selectValue,
 handleSelect,
}) => {
 console.log(selectValue);
 return (
  <StyledWrapper>
   <StyledFieldWrapper>
    <strong>{firstLetterUppercase(title)}</strong>
   </StyledFieldWrapper>
   <StyledFieldWrapper>
    <div>{primaryValue?.toUpperCase()}</div>
    <div>{secondaryValue?.toUpperCase()}</div>
   </StyledFieldWrapper>

   {/* BUTTON */}
   <StyledFieldWrapper>
    {button && (
     <Button
      size="small"
      type="primary"
      onClick={handleButton}
      disabled={buttonDisabled}
     >
      {primaryValue ? 'Zmień/Dodaj' : 'Wybierz'}
     </Button>
    )}
   </StyledFieldWrapper>

   {/* SELECT */}
   <StyledFieldWrapper>
    {select && selectItems && (
     <StyledSelect value={selectValue} onChange={handleSelect}>
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
