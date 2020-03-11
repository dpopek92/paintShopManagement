import { GlobalSettingsT } from '../types/settings/Settings';
import {
 settingsActionsT,
 SETTINGS_LOADED,
 SETTINGS_ADD_ITEM,
 SETTINGS_REMOVE_ITEM,
} from '../types/settings/actions';
import update from 'immutability-helper';

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
  case SETTINGS_ADD_ITEM: {
   const { key, item } = action;
   if (state.contact) {
    const contact = update(state.contact, {
     [key]: { $push: [item] },
    });
    return { ...state, contact };
   }
   return state;
  }
  case SETTINGS_REMOVE_ITEM: {
   if (state.contact) {
    const { key, index } = action;
    const contact = update(state.contact, {
     [key]: { $splice: [[index, 1]] },
    });
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
