import React from 'react';
import { ContactT } from 'services/store/types/settings/Settings';

interface PropsT {
 values: ContactT | null;
}

const Contact: React.FC<PropsT> = ({ values }) => {
 console.log(values);
 return <div>Dane kontaktowe</div>;
};

export default Contact;
