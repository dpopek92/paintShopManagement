export interface ViewT {
 isSpinner: boolean;
 catalogDrawer: CatalogDrawerTypesT;
 homepageKey: string;
}

export type CatalogDrawerTypesT =
 | null
 | 'colors'
 | 'handles'
 | 'millings'
 | 'glassCases'
 | 'veneers';
