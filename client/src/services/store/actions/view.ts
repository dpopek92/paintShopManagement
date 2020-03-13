import { viewActionsT, VIEW_SET_SPINNER } from '../types/view/actions';

export const setSpinner = (isSpinner: boolean): viewActionsT => ({
 type: VIEW_SET_SPINNER,
 isSpinner,
});
