import React from 'react';
import FormField from '../components/FormField';
import { Input } from 'antd';

interface Props {
 label?: string;
 placeholder?: string;
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

const FormFieldPassword: React.FC<Props> = ({
 label,
 placeholder,
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
  <FormField label={label} name={name} errors={errors} touched={touched}>
   <Input.Password
    prefix={prefix}
    required={required}
    placeholder={placeholder}
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

export default FormFieldPassword;
