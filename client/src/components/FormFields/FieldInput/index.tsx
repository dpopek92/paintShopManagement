import React from 'react';
import { Field } from 'formik';
import { Form, Input } from 'antd';
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

interface PropsT {
 name: string;
 label?: string;
 size?: string;
 disabled?: boolean;
 required?: boolean;
 placeholder?: string;
 type?: string;
 prefix?: any;
}

const FieldInput: React.FC<PropsT> = ({
 name,
 label,
 disabled,
 size,
 required,
 placeholder,
 type,
 prefix,
}) => (
 <Field name={name}>
  {({ field, meta }: any) => (
   <StyledFormItem
    label={label}
    labelAlign="left"
    validateStatus={meta.touched && meta.error ? 'error' : 'success'}
    hasFeedback={meta.touched}
    help={meta.touched && meta.error}
    labelCol={label ? { span: 12 } : {}}
    wrapperCol={label ? { span: 12 } : {}}
   >
    <Input
     {...field}
     placeholder={placeholder}
     disabled={disabled}
     size={size}
     required={required}
     type={type}
     prefix={prefix}
     onBlur={field.onBlur}
    />
   </StyledFormItem>
  )}
 </Field>
);

export default FieldInput;
