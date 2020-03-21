import React from 'react';
import { CustomerMaterialPricesT } from 'services/store/types/settings/Settings';
import GlossFields from '../glossFields';
import SemiGlossFields from '../semiGlossFields';
import Header from 'components/header';
import { InputNumberProps } from 'antd/lib/input-number';

interface PropsT extends InputNumberProps {
 values: CustomerMaterialPricesT | undefined;
 errors: any;
 touched: any;
 handleBlur: (e: React.ChangeEvent<HTMLInputElement>) => void;
 setFieldValue: (name: string, value: any, shouldValidate?: boolean) => void;
 setFieldTouched: (
  name: string,
  touched?: boolean,
  shouldValidate?: boolean,
 ) => void;
}

const CustomerMaterial: React.FC<PropsT> = props => {
 const { values } = props;
 return (
  <>
   {values && (
    <div>
     <Header title="Materiał klienta" type="h2" />

     <Header title="Połysk" type="h3" />
     {values.gloss && (
      <GlossFields
       {...props}
       values={values.gloss}
       nestPath="customerMaterial"
      />
     )}

     <Header title="Półmat" type="h3" />
     {values.semiGloss && (
      <SemiGlossFields
       {...props}
       values={values.semiGloss}
       nestPath="customerMaterial"
      />
     )}
     {/* {values && (
      <FormFieldNumber
       {...props}
       label="Lakierowanie uchwytu"
       name="paintHandle"
       required={true}
       size="large"
       nestPath="customerMaterial"
      />
     )} */}
    </div>
   )}
  </>
 );
};

export default CustomerMaterial;
