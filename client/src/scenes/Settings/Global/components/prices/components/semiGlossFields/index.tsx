import React from 'react';
import FormFieldNumber from 'components/FormFields/FormFieldNumber';
import { SemiGlossT } from 'services/store/types/settings/Settings';
import { InputNumberProps } from 'antd/lib/input-number';

interface PropsT extends InputNumberProps {
 values: SemiGlossT | undefined;
 errors: any;
 touched: any;
 handleBlur: (e: React.ChangeEvent<HTMLInputElement>) => void;
 setFieldValue: (name: string, value: any, shouldValidate?: boolean) => void;
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
