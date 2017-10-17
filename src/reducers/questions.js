import * as actions from '../actions/questions';
import { initialState } from './initialState';

export const reducer = ( state = initialState, action ) => {
  if ( action.type === 'actions.NAME' ) {
    //do something
  } else if ( action.type === 'actions.NAME' ) {
    // do something else
  } else {
    return state;
  }
}