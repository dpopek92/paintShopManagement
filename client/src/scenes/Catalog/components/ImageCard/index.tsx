/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
import React from 'react';
import withContext from 'hoc/withContext';

interface Props {
 itemName: string;
 itemImage: string;
 type: string;
 onclick: (itemName: string, type: string) => void;
 permissionContext: string;
}

const ImageCard: React.FC<Props> = ({
 itemName,
 itemImage,
 type,
 onclick,
 permissionContext,
}) => {
 return (
  <div
   className="catalogCard imageCard"
   style={{
    backgroundImage: `url(${require(`assets/images/${type}/${itemImage}`)})`,
   }}
   tabIndex={0}
   role="button"
   onClick={() =>
    permissionContext !== 'employee' ? onclick(itemName, type) : null
   }
   onKeyDown={() =>
    permissionContext !== 'employee' ? onclick(itemName, type) : null
   }
  >
   <div className="cardCaption">{itemName}</div>
  </div>
 );
};

export default withContext(ImageCard);
