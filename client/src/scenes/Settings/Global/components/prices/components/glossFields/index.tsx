import React from 'react';
import { GlossT } from 'services/store/types/settings/Settings';
import FormFieldNumber from 'components/FormFields/FormFieldNumber';
import { InputNumberProps } from 'antd/lib/input-number';

interface PropsT extends InputNumberProps {
 values: GlossT | undefined;
 errors: any;
 touched: any;
 handleBlur: (e: React.ChangeEvent<HTMLInputElement>) => void;
 setFieldValue: (name: string, value: any, shouldValidate?: boolean) => void;
}

const GlossFields: React.FC<PropsT> = props => {
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
      label="Połysk/Półmat"
      setFieldValue={setFieldValue}
      name="oneGlossSecondSemigloss"
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
