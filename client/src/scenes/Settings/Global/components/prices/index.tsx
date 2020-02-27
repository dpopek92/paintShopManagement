import React from 'react';
import { PricesT } from 'services/store/types/settings/Settings';

interface PropsT {
 values: PricesT | null;
}

const Prices: React.FC<PropsT> = ({ values }) => {
 console.log(values);
 return <div>Cennik</div>;
};

export default Prices;
