import Axios from 'axios';
import {
 ContactT,
 PricesT,
 PaintsProducersT,
 RealizationDatesT,
 GlobalSettingsT,
} from 'services/store/types/settings/Settings';

export const updateGlobalSettings = async (
 values: {
  contact?: ContactT;
  prices?: PricesT;
  paintsProducers?: PaintsProducersT;
  realizationDates?: RealizationDatesT;
 },
 onEnd: (data: GlobalSettingsT) => void,
 onError: () => void,
) => {
 try {
  const config = {
   headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
   },
  };
  const body = JSON.stringify(values);

  const res = await Axios.put('/api/settings', body, config);
  onEnd(res.data);
 } catch (err) {
  console.log(err.response);
  if (err.response) {
   onError();
  }
 }
};
