import React from 'react';

interface PropsT {
 name: string;
 value: string | number;
}

const SmallDescription: React.FC<PropsT> = ({ name, value }) => {
 return (
  <div>
   {name}: <strong>{value}</strong>
  </div>
 );
};

export default SmallDescription;
