import React from 'react';
import { CustomerMaterialT } from 'services/store/types/settings/Settings';
import GlossFields from '../glossFields';
import SemiGlossFields from '../semiGlossFields';
import FormFieldNumber from 'components/FormFields/FormFieldNumber';
import Header from 'components/header';
import { InputNumberProps } from 'antd/lib/input-number';

interface PropsT extends InputNumberProps {
 values: CustomerMaterialT | undefined;
 errors: any;
 touched: any;
 handleBlur: (e: React.ChangeEvent<HTMLInputElement>) => void;
 setFieldValue: (name: string, value: any, shouldValidate?: boolean) => void;
}

const CustomerMaterial: React.FC<PropsT> = props => {
 const { values } = props;
 return (
  <>
   {values && (
    <div>
     <Header title="Materiał klienta" type="h2" />

     <Header title="Połysk" type="h3" />
     {values.gloss && <GlossFields {...props} values={values.gloss} />}

     <Header title="Półmat" type="h3" />
     {values.semiGloss && (
      <SemiGlossFields {...props} values={values.semiGloss} />
     )}
     {values && (
      <FormFieldNumber
       {...props}
       label="Lakierowanie uchwytu"
       name="paintHandle"
       required={true}
       size="large"
      />
     )}
    </div>
   )}
  </>
 );
};

export default CustomerMaterial;
