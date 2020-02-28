import React from 'react';
import { CompanyMaterialPricesT } from 'services/store/types/settings/Settings';
import GlossFields from '../glossFields';
import SemiGlossFields from '../semiGlossFields';
import BoldItemsFields from '../boldItemsFields';

// Do poprawy

interface PropsT {
 values: CompanyMaterialPricesT | undefined;
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

const CompanyMaterial: React.FC<PropsT> = props => {
 const { values } = props;
 return (
  <>
   {values && (
    <div>
     <h2>Materiał firmy</h2>
     <h3>Połysk</h3>
     {values.gloss && <GlossFields {...props} values={values.gloss} />}
     <h3>Półmat</h3>
     {values.semiGloss && (
      <SemiGlossFields {...props} values={values.semiGloss} />
     )}
     <h3>Elementy pogrubione</h3>
     {values.board && <BoldItemsFields {...props} values={values.board} />}
    </div>
   )}
  </>
 );
};

export default CompanyMaterial;
