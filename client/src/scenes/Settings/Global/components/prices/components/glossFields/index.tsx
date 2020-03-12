import React from 'react';
import { GlossT } from 'services/store/types/settings/Settings';
import { InputNumberProps } from 'antd/lib/input-number';
import FieldNumber from 'components/FormFields/FieldNumber';

interface PropsT extends InputNumberProps {
 values: GlossT | undefined;
 nestPath?: string;
}

const GlossFields: React.FC<PropsT> = props => {
 const { values, nestPath } = props;
 return (
  <>
   {values && (
    <div>
     <FieldNumber
      {...props}
      name={`${nestPath}.gloss.oneSide`}
      label="Jednostronny"
      size="large"
     />
     <FieldNumber
      {...props}
      name={`${nestPath}.gloss.bothSides`}
      label="Dwustronny"
      size="large"
     />
     <FieldNumber
      {...props}
      name={`${nestPath}.gloss.oneGlossSecondSemigloss`}
      label="Połysk/Półmat"
      size="large"
     />
    </div>
   )}
  </>
 );
};

export default GlossFields;
