import React from 'react';
import { ServicesT } from 'services/store/types/settings/Settings';
import FormFieldNumber from 'components/FormFields/FormFieldNumber';
import Header from 'components/header';
import { InputNumberProps } from 'antd/lib/input-number';

interface PropsT extends InputNumberProps {
 values: ServicesT | undefined;
 errors: any;
 touched: any;
 handleBlur: (e: React.ChangeEvent<HTMLInputElement>) => void;
 setFieldValue: (name: string, value: any, shouldValidate?: boolean) => void;
}

const ServicesFields: React.FC<PropsT> = props => {
 const { values, setFieldValue } = props;
 return (
  <>
   {values && (
    <div>
     <Header title="Usługi" type="h2" />
     <FormFieldNumber
      label="Frez. + Lak. uchwytu"
      setFieldValue={setFieldValue}
      values={values}
      name="milledHandle"
      required={true}
      size="large"
      {...props}
     />
     <FormFieldNumber
      label="Frez. + Lak. uchwytu częściowego"
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
