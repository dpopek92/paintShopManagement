import React from 'react';
import styled from 'styled-components';
import { NewOrderT } from 'services/store/types/newOrder/NewOrder';
import { Input, Form } from 'antd';
import { useDispatch } from 'react-redux';
import { setName, setComment } from 'services/store/actions/newOrder';
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
 const dispatch = useDispatch();
 return (
  <StyledWrapper>
   <StyledItem>
    <StyledFormItem label="Nazwa zamówienia">
     <Input
      value={name}
      onChange={e => dispatch(setName(e.target.value))}
      placeholder="Nazwa zamówienia"
     />
    </StyledFormItem>
   </StyledItem>
   <StyledItem>
    <StyledFormItem label="Uwagi do zamówienia">
     <TextArea
      value={comments}
      onChange={e => dispatch(setComment(e.target.value))}
      placeholder="Uwagi do zamówienia"
     />
    </StyledFormItem>
   </StyledItem>
  </StyledWrapper>
 );
};

export default InfoData;
