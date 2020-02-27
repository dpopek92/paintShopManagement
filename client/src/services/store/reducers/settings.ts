import { SettingsT } from '../types/settings/Settings';
import { settingsActionsT, SETTINGS_LOADED } from '../types/settings/actions';

const initialState: SettingsT = {
 paintsProducers: null,
 realizationDates: null,
 prices: null,
 contact: null,
};

const settingsReducer = (
 state = initialState,
 action: settingsActionsT,
): SettingsT => {
 switch (action.type) {
  case SETTINGS_LOADED: {
   return action.settings;
  }
  default:
   return state;
 }
};

export { settingsReducer };
