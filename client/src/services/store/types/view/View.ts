export interface ViewT {
 isSpinner: boolean;
 catalogDrawer: CatalogDrawerTypesT;
}

export type CatalogDrawerTypesT =
 | null
 | 'colors'
 | 'handles'
 | 'millings'
 | 'glassCases'
 | 'veneers';
