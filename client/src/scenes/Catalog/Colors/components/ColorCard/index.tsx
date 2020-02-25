import React from 'react';
import withContext from 'hoc/withContext';
import './ColorCard.scss';

interface Props {
 colorName: string;
 colorValue: string;
 onclick: (colorName: string, type: string | null) => void;
 type?: string | null;
 permissionContext: string;
}

const ColorCard: React.FC<Props> = ({
 colorName,
 colorValue,
 onclick,
 type = null,
 permissionContext,
}) => {
 return (
  <div
   className="catalogCard colorCard"
   style={{ backgroundColor: colorValue }}
   onClick={() =>
    permissionContext !== 'employee' ? onclick(colorName, type) : null
   }
   onKeyDown={() =>
    permissionContext !== 'employee' ? onclick(colorName, type) : null
   }
   role="button"
   tabIndex={0}
  >
   <div className="cardCaption">{colorName}</div>
  </div>
 );
};

export default withContext(ColorCard);
