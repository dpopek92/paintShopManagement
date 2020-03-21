import React from 'react';
import { ServicesPricesT } from 'services/store/types/settings/Settings';
import Header from 'components/header';
import { InputNumberProps } from 'antd/lib/input-number';
import FieldNumber from 'components/FormFields/FieldNumber';

interface PropsT extends InputNumberProps {
 values: ServicesPricesT | undefined;
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

const ServicesFields: React.FC<PropsT> = props => {
 const { values, setFieldValue, setFieldTouched } = props;
 return (
  <>
   {values && (
    <div>
     <Header title="Usługi" type="h2" />
     <FieldNumber
      {...props}
      name={`services.milledHandle`}
      label="Frez. + Lak. uchwytu"
      size="large"
     />
     <FieldNumber
      {...props}
      name={`services.milledPartHandle`}
      label="Frez. + Lak. uchwytu częściowego"
      size="large"
     />
     <FieldNumber
      {...props}
      name={`services.millingHandle`}
      label="Frezowanie uchwytu"
      size="large"
     />
     <FieldNumber
      {...props}
      name={`services.chamfering`}
      label="Gierowanie"
      size="large"
     />
     <FieldNumber
      {...props}
      name={`services.backMilling`}
      label="Frezowanie pod plecy"
      size="large"
     />
     <FieldNumber
      {...props}
      name={`services.hingeHole`}
      label="Nawiercanie otworów"
      size="large"
     />
     <FieldNumber
      {...props}
      name={`services.manHour`}
      label="Prace stolarskie"
      size="large"
     />
    </div>
   )}
  </>
 );
};

export default ServicesFields;
