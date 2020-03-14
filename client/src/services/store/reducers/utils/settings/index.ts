import update from 'immutability-helper';
import {
 settingsAddItemT,
 settingsRemoveItemT,
} from 'services/store/types/settings/actions';
import { ContactT } from 'services/store/types/settings/Settings';

export const addContactItem = (action: settingsAddItemT, contact: ContactT) => {
 const { key, item } = action;
 return update(contact, {
  [key]: { $push: [item] },
 });
};

export const removeContactItem = (
 action: settingsRemoveItemT,
 contact: ContactT,
) => {
 const { key, index } = action;
 return update(contact, { [key]: { $splice: [[index, 1]] } });
};
