import React from 'react';
import FormField from '../components/FormField';
import { InputNumber } from 'antd';

interface Props {
 label?: string;
 placeholder?: string;
 errors: any;
 name: string;
 touched: any;
 values: any;
 handleBlur: (e: React.ChangeEvent<HTMLInputElement>) => void;
 setFieldValue: (name: string, value: any, shouldValidate?: boolean) => void;
 prefix?: any;
 required?: boolean;
 disabled?: boolean;
 size?: 'default' | 'small' | 'large';
}

const FormFieldNumber: React.FC<Props> = ({
 label,
 placeholder,
 setFieldValue,
 name,
 errors,
 touched,
 values,
 handleBlur,
 prefix,
 required,
 disabled,
 size,
}) => {
 const handleChange = (value: number | undefined) => setFieldValue(name, value);
 return (
  <FormField label={label} name={name} errors={errors} touched={touched}>
   <InputNumber
    prefix={prefix}
    required={required}
    placeholder={placeholder}
    type="number"
    name={name}
    value={values[name]}
    onChange={handleChange}
    onBlur={handleBlur}
    disabled={disabled}
    size={size}
   />
  </FormField>
 );
};

export default FormFieldNumber;
