import React from 'react';
import FormFieldNumber from 'components/FormFields/FormFieldNumber';
import { SemiGlossT } from 'services/store/types/settings/Settings';

interface PropsT {
 values: SemiGlossT | undefined;
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

const SemiGlossFields: React.FC<PropsT> = props => {
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
     <FormFieldNumber
      label="Dwustronny"
      setFieldValue={setFieldValue}
      name="bothSides"
      values={values}
      required={true}
      //  disabled={}
      size="large"
      {...props}
     />
     <FormFieldNumber
      label="CNC (Jednostronny)"
      setFieldValue={setFieldValue}
      name="milledElement"
      values={values}
      required={true}
      //  disabled={}
      size="large"
      {...props}
     />
     <FormFieldNumber
      label="CNC (Dwustronny)"
      setFieldValue={setFieldValue}
      name="milledElementBothSides"
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

export default SemiGlossFields;
