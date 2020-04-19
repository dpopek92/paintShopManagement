import { CatalogDrawerTypesT } from './View';

export const VIEW_SET_SPINNER = 'VIEW_SET_SPINNER';
export const VIEW_SET_CATALOG_DRAWER = 'VIEW_SET_CATALOG_DRAWER';
export const VIEW_SET_HOMEPAGE_KEY = 'VIEW_SET_HOMEPAGE_KEY';

export interface setHomepageKeyT {
 type: typeof VIEW_SET_HOMEPAGE_KEY;
 key: string;
}
export interface setSpinnerT {
 type: typeof VIEW_SET_SPINNER;
 isSpinner: boolean;
}
export interface setCatalogDrawerT {
 type: typeof VIEW_SET_CATALOG_DRAWER;
 catalogType: CatalogDrawerTypesT;
}

export type viewActionsT = setHomepageKeyT | setSpinnerT | setCatalogDrawerT;
