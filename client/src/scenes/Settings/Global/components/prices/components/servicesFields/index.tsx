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
 return (
  <>
   {values && (
    <div>
     <h2>Usługi</h2>
     <FormFieldNumber
      label="Frezowanie+Lakierowanie uchwytu"
      setFieldValue={setFieldValue}
      values={values}
      name="milledHandle"
      required={true}
      size="large"
      {...props}
     />
     <FormFieldNumber
      label="Frezowanie+Lakierowanie uchwytu częściowego"
      setFieldValue={setFieldValue}
      values={values}
      name="milledPartHandle"
      required={true}
      size="large"
      {...props}
     />
     <FormFieldNumber
      label="Frezowanie uchwytu"
      setFieldValue={setFieldValue}
      values={values}
      name="millingHandle"
      required={true}
      size="large"
      {...props}
     />
     <FormFieldNumber
      label="Gierowanie"
      setFieldValue={setFieldValue}
      values={values}
      name="chamfering"
      required={true}
      size="large"
      {...props}
     />
     <FormFieldNumber
      label="Frezowanie pod plecy"
      setFieldValue={setFieldValue}
      values={values}
      name="backMilling"
      required={true}
      size="large"
      {...props}
     />
     <FormFieldNumber
      label="Nawiercanie otworów"
      setFieldValue={setFieldValue}
      values={values}
      name="hingeHole"
      required={true}
      size="large"
      {...props}
     />
     <FormFieldNumber
      label="Prace stolarskie"
      setFieldValue={setFieldValue}
      values={values}
      name="manHour"
      required={true}
      size="large"
      {...props}
     />
    </div>
   )}
  </>
 );
};

export default ServicesFields;
