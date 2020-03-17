import {
 viewActionsT,
 VIEW_SET_SPINNER,
 VIEW_SET_CATALOG_DRAWER,
} from '../types/view/actions';
import { CatalogDrawerTypesT } from '../types/view/View';

export const setSpinner = (isSpinner: boolean): viewActionsT => ({
 type: VIEW_SET_SPINNER,
 isSpinner,
});
export const setCatalogDrawer = (catalogType: CatalogDrawerTypesT) => ({
 type: VIEW_SET_CATALOG_DRAWER,
 catalogType,
});
