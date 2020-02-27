import { SettingsT } from './Settings';

export const SETTINGS_LOADED = 'SETTINGS_LOADED';
export const SETTINGS_LOADED_ERROR = 'SETTINGS_LOADED_ERROR';

export interface loadGlobalSettingsT {
 type: typeof SETTINGS_LOADED;
 settings: SettingsT;
}

export interface loadGlobalSettingsErrorT {
 type: typeof SETTINGS_LOADED_ERROR;
}

export type settingsActionsT = loadGlobalSettingsT | loadGlobalSettingsErrorT;
