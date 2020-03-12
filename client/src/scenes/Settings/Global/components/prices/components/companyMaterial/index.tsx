import React from 'react';
import { CompanyMaterialPricesT } from 'services/store/types/settings/Settings';
import GlossFields from '../glossFields';
import SemiGlossFields from '../semiGlossFields';
import BoldItemsFields from '../boldItemsFields';
import Header from 'components/header';
import { InputNumberProps } from 'antd/lib/input-number';

// Do poprawy

interface PropsT extends InputNumberProps {
 values: CompanyMaterialPricesT | undefined;
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

const CompanyMaterial: React.FC<PropsT> = props => {
 const { values } = props;
 return (
  <>
   {values && (
    <div>
     <Header title="Materiał firmy" type="h2" />
     <Header title="Połysk" type="h3" />
     {values.gloss && (
      <GlossFields
       {...props}
       values={values.gloss}
       nestPath="companyMaterial"
      />
     )}
     <Header title="Półmat" type="h3" />
     {values.semiGloss && (
      <SemiGlossFields
       {...props}
       values={values.semiGloss}
       nestPath="companyMaterial"
      />
     )}
     <Header title="Elementy pogrubiane" type="h3" />
     {values.board && (
      <BoldItemsFields
       {...props}
       values={values.board}
       nestPath="companyMaterial"
      />
     )}
    </div>
   )}
  </>
 );
};

export default CompanyMaterial;
