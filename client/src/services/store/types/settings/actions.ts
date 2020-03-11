import { GlobalSettingsT, ContactKeysT, ContactItemsT } from './Settings';

export const SETTINGS_LOADED = 'SETTINGS_LOADED';
export const SETTINGS_LOADED_ERROR = 'SETTINGS_LOADED_ERROR';
export const SETTINGS_ADD_ITEM = 'SETTINGS_ADD_ITEM';
export const SETTINGS_REMOVE_ITEM = 'SETTINGS_REMOVE_ITEM';

export interface settingsAddItemT {
 type: typeof SETTINGS_ADD_ITEM;
 key: ContactKeysT;
 item: ContactItemsT;
}
export interface settingsRemoveItemT {
 type: typeof SETTINGS_REMOVE_ITEM;
 key: ContactKeysT;
 index: number;
}

export interface loadGlobalSettingsT {
 type: typeof SETTINGS_LOADED;
 settings: GlobalSettingsT;
}

export interface loadGlobalSettingsErrorT {
 type: typeof SETTINGS_LOADED_ERROR;
}

export type settingsActionsT =
 | settingsRemoveItemT
 | settingsAddItemT
 | loadGlobalSettingsT
 | loadGlobalSettingsErrorT;
