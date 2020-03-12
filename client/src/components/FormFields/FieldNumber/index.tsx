import React from 'react';
import { Field } from 'formik';
import { Form, InputNumber } from 'antd';
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
}

const FieldNumber: React.FC<PropsT> = props => {
 const { name, label, disabled, size, required } = props;
 return (
  <Field name={name}>
   {({ field, form, meta }: any) => (
    <StyledFormItem
     label={label}
     labelAlign="left"
     validateStatus={meta.touched && meta.error ? 'error' : 'success'}
     hasFeedback={meta.touched}
     help={meta.touched && meta.error}
     labelCol={label ? { span: 12 } : {}}
     wrapperCol={label ? { span: 12 } : {}}
    >
     <InputNumber
      {...field}
      onChange={(value: number | undefined) => form.setFieldValue(name, value)}
      disabled={disabled}
      size={size}
      required={required}
      onBlur={field.onBlur}
     />
    </StyledFormItem>
   )}
  </Field>
 );
};

export default FieldNumber;
