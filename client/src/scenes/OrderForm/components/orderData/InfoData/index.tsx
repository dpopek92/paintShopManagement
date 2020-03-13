import React from 'react';
import styled from 'styled-components';
import { NewOrderT } from 'services/store/types/newOrder/NewOrder';
import { Input, Form } from 'antd';
const { TextArea } = Input;

const StyledWrapper = styled.div`
 width: 100%;
 display: flex;
 flex-direction: row;
 justify-content: space-around;
 @media (max-width: 768px) {
  flex-direction: column;
 }
`;
const StyledItem = styled.div`
 width: 50%;
 padding: 0 20px;
 @media (max-width: 768px) {
  width: 100%;
 }
`;
const StyledFormItem = styled(Form.Item)`
 text-align: center;
 label {
  font-weight: bold;
 }
 input,
 textarea {
  text-align: center;
 }
`;

interface PropsT {
 newOrder: NewOrderT;
}

const InfoData: React.FC<PropsT> = ({ newOrder: { name, comments } }) => {
 return (
  <StyledWrapper>
   <StyledItem>
    <StyledFormItem label="Nazwa zamówienia">
     <Input value={name} placeholder="Nazwa zamówienia" />
    </StyledFormItem>
   </StyledItem>
   <StyledItem>
    <StyledFormItem label="Uwagi do zamówienia">
     <TextArea value={comments} placeholder="Uwagi do zamówienia" />
    </StyledFormItem>
   </StyledItem>
  </StyledWrapper>
 );
};

export default InfoData;
