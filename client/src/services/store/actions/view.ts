import { viewActions, VIEW_SET_SPINNER } from '../types/view/actions';

export const setSpinner = (isSpinner: boolean): viewActions => ({
 type: VIEW_SET_SPINNER,
 isSpinner,
});
