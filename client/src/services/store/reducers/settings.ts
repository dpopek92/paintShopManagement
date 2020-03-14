import { GlobalSettingsT } from '../types/settings/Settings';
import {
 settingsActionsT,
 SETTINGS_LOADED,
 SETTINGS_ADD_CONTACT_ITEM,
 SETTINGS_REMOVE_CONTACT_ITEM,
} from '../types/settings/actions';
import update from 'immutability-helper';
import { addContactItem, removeContactItem } from './utils/settings';

const initialState: GlobalSettingsT = {
 paintsProducers: null,
 realizationDates: null,
 prices: null,
 contact: null,
};

const settingsReducer = (
 state = initialState,
 action: settingsActionsT,
): GlobalSettingsT => {
 switch (action.type) {
  case SETTINGS_ADD_CONTACT_ITEM: {
   if (state.contact) {
    const contact = addContactItem(action, state.contact);
    return { ...state, contact };
   }
   return state;
  }
  case SETTINGS_REMOVE_CONTACT_ITEM: {
   if (state.contact) {
    const contact = removeContactItem(action, state.contact);
    return { ...state, contact };
   }
   return state;
  }

  case SETTINGS_LOADED: {
   return action.settings;
  }
  default:
   return state;
 }
};

export { settingsReducer };
