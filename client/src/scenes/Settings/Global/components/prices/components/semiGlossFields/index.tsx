import React from 'react';
import { SemiGlossT } from 'services/store/types/settings/Settings';
import { InputNumberProps } from 'antd/lib/input-number';
import FieldNumber from 'components/FormFields/FieldNumber';

interface PropsT extends InputNumberProps {
 values: SemiGlossT | undefined;
 nestPath?: string;
}

const SemiGlossFields: React.FC<PropsT> = props => {
 const { values, nestPath } = props;
 return (
  <>
   {values && (
    <div>
     <FieldNumber
      {...props}
      name={`${nestPath}.semiGloss.oneSide`}
      label="Jednostronny"
      size="large"
     />
     <FieldNumber
      {...props}
      name={`${nestPath}.semiGloss.bothSides`}
      label="Dwustronny"
      size="large"
     />
     <FieldNumber
      {...props}
      name={`${nestPath}.semiGloss.milledElement`}
      label="CNC (Jednostronny)"
      size="large"
     />
     <FieldNumber
      {...props}
      name={`${nestPath}.semiGloss.milledElementBothSides`}
      label="CNC (Dwustronny)"
      size="large"
     />
    </div>
   )}
  </>
 );
};

export default SemiGlossFields;
