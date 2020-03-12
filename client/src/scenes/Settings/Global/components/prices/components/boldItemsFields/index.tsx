import React from 'react';
import { BoardT } from 'services/store/types/settings/Settings';
import { InputNumberProps } from 'antd/lib/input-number';
import FieldNumber from 'components/FormFields/FieldNumber';

interface PropsT extends InputNumberProps {
 values: BoardT | undefined;
 nestPath?: string;
}

const BoldItemsFields: React.FC<PropsT> = props => {
 const { values, nestPath } = props;
 console.log(props);
 return (
  <>
   {values && (
    <div>
     <FieldNumber
      {...props}
      name={`${nestPath}.board.22`}
      label="22mm"
      size="large"
     />
     <FieldNumber
      {...props}
      name={`${nestPath}.board.25`}
      label="25mm"
      size="large"
     />
     <FieldNumber
      {...props}
      name={`${nestPath}.board.28`}
      label="28mm"
      size="large"
     />
     <FieldNumber
      {...props}
      name={`${nestPath}.board.30`}
      label="30mm"
      size="large"
     />
     <FieldNumber
      {...props}
      name={`${nestPath}.board.38`}
      label="38mm"
      size="large"
     />
    </div>
   )}
  </>
 );
};

export default BoldItemsFields;
