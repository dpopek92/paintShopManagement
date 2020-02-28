import React from 'react';
import { GlossT } from 'services/store/types/settings/Settings';
import FormFieldNumber from 'components/FormFields/FormFieldNumber';

// do poprawy

interface PropsT {
 values: GlossT | undefined;
 label?: string;
 placeholder?: string;
 errors: any;
 touched: any;
 handleBlur: (e: React.ChangeEvent<HTMLInputElement>) => void;
 setFieldValue: (name: string, value: any, shouldValidate?: boolean) => void;
 prefix?: any;
 required?: boolean;
 disabled?: boolean;
 size?: 'default' | 'small' | 'large';
}

const GlossFields: React.FC<PropsT> = props => {
 //  console.log(values);
 console.log('Props', props);
 const { values, setFieldValue } = props;
 return (
  <>
   {values && (
    <div>
     <FormFieldNumber
      label="Jednostronny"
      setFieldValue={setFieldValue}
      name="oneSide"
      values={values}
      required={true}
      //  disabled={}
      size="large"
      {...props}
     />
    </div>
   )}
  </>
 );
};

export default GlossFields;
