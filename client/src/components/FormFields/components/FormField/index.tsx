import React from 'react';
import { Form } from 'antd';
import styled from 'styled-components';

const StyledFormItem = styled(Form.Item)`
 .ant-form-item-label {
  label {
   font-weight: bold;
   margin: 0;
  }
 }
 @media (max-width: 768px) {
  width: 100%;

  .ant-form-item-label,
  .ant-form-item-control-wrapper {
   ${({ label }) => {
    if (label) {
     return 'display: inline-block; width: 50%;';
    }
   }}
  }
 }
`;

interface Props {
 label?: string;
 errors: any;
 name: string;
 touched: any;
}

const FormField: React.FC<Props> = ({
 label,
 name,
 errors,
 touched,
 children,
}) => {
 return (
  <StyledFormItem
   label={label}
   labelAlign="left"
   validateStatus={touched[name] && errors[name] ? 'error' : 'success'}
   hasFeedback={touched[name]}
   help={touched[name] && errors[name]}
   labelCol={label ? { span: 12 } : {}}
   wrapperCol={label ? { span: 12 } : {}}
  >
   {children}
  </StyledFormItem>
 );
};

export default FormField;
