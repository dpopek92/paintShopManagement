import React from 'react';
import { Input, Form } from 'antd';

interface Props {
 label?: string;
 placeholder: string;
 type: string;
 errors: any;
 name: string;
 touched: any;
 values: any;
 handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
 handleBlur: (e: React.ChangeEvent<HTMLInputElement>) => void;
 prefix?: any;
 required?: boolean;
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
}) => {
 return (
  <Form.Item
   label={label}
   validateStatus={touched[name] && errors[name] ? 'error' : 'success'}
   hasFeedback={touched[name]}
   help={touched[name] && errors[name]}
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
    />
   )}
  </Form.Item>
 );
};

export default FormField;
