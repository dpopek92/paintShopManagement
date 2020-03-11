import React from 'react';
import FormField from '../components/FormField';
import { Input } from 'antd';

interface Props {
 label?: string;
 placeholder?: string;
 type?: string;
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

const FormFieldInput: React.FC<Props> = ({
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
 //  console.log(values);
 return (
  <FormField label={label} name={name} errors={errors} touched={touched}>
   <Input
    prefix={prefix}
    required={required}
    placeholder={placeholder}
    type={type}
    name={name}
    value={values[name]}
    onChange={e => {
     console.log(e.target.value);
     handleChange(e);
    }}
    onBlur={handleBlur}
    disabled={disabled}
    size={size}
   />
  </FormField>
 );
};

export default FormFieldInput;
