import * as actions from '../actions/questions';
import { initialMode } from './initialState';

export const reducer = ( state = initialMode, action ) => {
  if ( action.type === 'actions.NAME' ) {
    //do something
  } else if ( action.type === 'actions.NAME' ) {
    // do something else
  } else {
    return state;
  }
}