import Axios from 'axios';
import { Dispatch } from 'redux';
import {
 SETTINGS_LOADED_ERROR,
 SETTINGS_LOADED,
 SETTINGS_ADD_ITEM,
 SETTINGS_REMOVE_ITEM,
 loadGlobalSettingsT,
 loadGlobalSettingsErrorT,
 settingsAddItemT,
 settingsRemoveItemT,
} from '../types/settings/actions';
import {
 GlobalSettingsT,
 ContactKeysT,
 ContactItemsT,
} from '../types/settings/Settings';

export const globalSettingsAddItem = (
 key: ContactKeysT,
 item: ContactItemsT,
): settingsAddItemT => ({
 type: SETTINGS_ADD_ITEM,
 key,
 item,
});
export const globalSettingsRemoveItem = (
 key: ContactKeysT,
 index: number,
): settingsRemoveItemT => ({
 type: SETTINGS_REMOVE_ITEM,
 key,
 index,
});

export const globalSettingsLoaded = (
 settings: GlobalSettingsT,
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

  dispatch(globalSettingsLoaded(res.data));
  onEnd();
 } catch (err) {
  console.log('ERROR:', err);
  dispatch(globalSettingsLoadError());
  onEnd();
 }
};
