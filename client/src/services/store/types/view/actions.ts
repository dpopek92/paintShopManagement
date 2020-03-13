export const VIEW_SET_SPINNER = 'VIEW_SET_SPINNER';

export interface setSpinnerT {
 type: typeof VIEW_SET_SPINNER;
 isSpinner: boolean;
}

export type viewActionsT = setSpinnerT;
