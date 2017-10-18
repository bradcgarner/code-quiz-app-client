import { REACT_APP_BASE_URL } from '../config';

export const ACTION_NAME = 'ACTION_NAME';
export const actionName = arg => ({
  type: ACTION_NAME,
  arg
});