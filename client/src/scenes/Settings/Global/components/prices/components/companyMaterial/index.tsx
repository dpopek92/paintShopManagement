import React from 'react';
import { CompanyMaterialPricesT } from 'services/store/types/settings/Settings';
import GlossFields from '../glossFields';

// Do poprawy

interface PropsT {
 data: CompanyMaterialPricesT | undefined;
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
 const { data } = props;
 return (
  <>
   {data && (
    <div>
     <h2>Materiał firmy</h2>
     <h3>Połysk</h3>
     {data.gloss && <GlossFields values={data.gloss} {...props} />}
     <h3>Półmat</h3>
     <h3>Elementy pogrubione</h3>
    </div>
   )}
  </>
 );
};

export default CompanyMaterial;
