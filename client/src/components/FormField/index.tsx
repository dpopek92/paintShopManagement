import React from 'react';
import { Input, Form } from 'antd';
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
 placeholder?: string;
 type: string;
 errors: any;
 name: string;
 touched: any;
 values: any;
 handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
 handleBlur: (e: React.ChangeEvent<HTMLInputElement>) => void;
 prefix?: any;
 required?: boolean;
 disabled?: boolean;
 size?: 'default' | 'small' | 'large';
}

const FormField: React.FC<Props> = ({
 label,
 placeholder,
 type,
 name,
 errors,
 touched,
 values,
 handleChange,
 handleBlur,
 prefix,
 required,
 disabled,
 size,
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
   {type === 'password' ? (
    <Input.Password
     prefix={prefix}
     required={required}
     placeholder={placeholder}
     type={type}
     name={name}
     value={values[name]}
     onChange={handleChange}
     onBlur={handleBlur}
     disabled={disabled}
     size={size}
    />
   ) : (
    <Input
     prefix={prefix}
     required={required}
     placeholder={placeholder}
     type={type}
     name={name}
     value={values[name]}
     onChange={handleChange}
     onBlur={handleBlur}
     disabled={disabled}
     size={size}
    />
   )}
  </StyledFormItem>
 );
};

export default FormField;
