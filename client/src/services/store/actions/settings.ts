import Axios from 'axios';
import { Dispatch } from 'redux';
import {
 loadGlobalSettingsT,
 SETTINGS_LOADED,
 loadGlobalSettingsErrorT,
 SETTINGS_LOADED_ERROR,
} from '../types/settings/actions';
import { SettingsT } from '../types/settings/Settings';

export const globalSettingsLoaded = (
 settings: SettingsT,
): loadGlobalSettingsT => ({
 type: SETTINGS_LOADED,
 settings,
});

export const globalSettingsLoadError = (): loadGlobalSettingsErrorT => ({
 type: SETTINGS_LOADED_ERROR,
});

export const getGlobalSettings = (onEnd: () => void) => async (
 dispatch: Dispatch,
) => {
 console.log('THUNK', 'getGlobalSettings');
 try {
  const res = await Axios.get('/api/settings/');

  //   console.log(res.data);
  dispatch(globalSettingsLoaded(res.data));
  onEnd();
 } catch (err) {
  console.log('ERROR:', err);
  dispatch(globalSettingsLoadError());
  onEnd();
 }
};
