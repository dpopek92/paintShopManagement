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
   labelCol={label ? { span: 6 } : {}}
   wrapperCol={label ? { span: 18 } : {}}
  >
   {children}
  </StyledFormItem>
 );
};

export default FormField;
