import React from 'react';
import { BoardT } from 'services/store/types/settings/Settings';
import FormFieldNumber from 'components/FormFields/FormFieldNumber';
import { InputNumberProps } from 'antd/lib/input-number';

interface PropsT extends InputNumberProps {
 values: BoardT | undefined;
 errors: any;
 touched: any;
 handleBlur: (e: React.ChangeEvent<HTMLInputElement>) => void;
 setFieldValue: (name: string, value: any, shouldValidate?: boolean) => void;
}

const BoldItemsFields: React.FC<PropsT> = props => {
 const { values, setFieldValue } = props;
 return (
  <>
   {values && (
    <div>
     <FormFieldNumber
      label="22mm"
      setFieldValue={setFieldValue}
      name="22"
      values={values}
      required={true}
      // disabled={}
      size="large"
      {...props}
     />
     <FormFieldNumber
      label="25mm"
      setFieldValue={setFieldValue}
      name="25"
      values={values}
      required={true}
      // disabled={}
      size="large"
      {...props}
     />
     <FormFieldNumber
      label="28mm"
      setFieldValue={setFieldValue}
      name="28"
      values={values}
      required={true}
      // disabled={}
      size="large"
      {...props}
     />
     <FormFieldNumber
      label="30mm"
      setFieldValue={setFieldValue}
      name="30"
      values={values}
      required={true}
      // disabled={}
      size="large"
      {...props}
     />
     <FormFieldNumber
      label="38mm"
      setFieldValue={setFieldValue}
      name="38"
      values={values}
      required={true}
      // disabled={}
      size="large"
      {...props}
     />
    </div>
   )}
  </>
 );
};

export default BoldItemsFields;
