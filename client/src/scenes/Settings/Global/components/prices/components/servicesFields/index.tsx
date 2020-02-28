import React from 'react';
import { ServicesT } from 'services/store/types/settings/Settings';
import FormFieldNumber from 'components/FormFields/FormFieldNumber';

interface PropsT {
 values: ServicesT | undefined;
 errors: any;
 label?: string;
 placeholder?: string;
 touched: any;
 handleBlur: (e: React.ChangeEvent<HTMLInputElement>) => void;
 setFieldValue: (name: string, value: any, shouldValidate?: boolean) => void;
 prefix?: any;
 required?: boolean;
 disabled?: boolean;
 size?: 'default' | 'small' | 'large';
}

const ServicesFields: React.FC<PropsT> = props => {
 const { values, setFieldValue } = props;
 console.log(values);
 return (
  <>
   {values && (
    <div>
     <h2>Usługi</h2>
     texts
     {/* <FormFieldNumber label="Frezowanie+Lakierowanie uchwytu" setFieldValue={setFieldValue} values={values} name="milledHandle" required={true} size="large" {...props}/> */}
    </div>
   )}
  </>
 );
};

export default ServicesFields;
