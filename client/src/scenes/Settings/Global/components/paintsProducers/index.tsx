import React from 'react';
import { PaintsProducersT } from 'services/store/types/settings/Settings';

interface PropsT {
 values: PaintsProducersT | null;
}

const PaintsProducers: React.FC<PropsT> = ({ values }) => {
 console.log(values);
 return <div>Producenci lakierów</div>;
};

export default PaintsProducers;
