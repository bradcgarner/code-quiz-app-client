import * as actions from '../actions/users';
import { initialUser } from './initialState';

export const reducer = ( state = initialUser, action ) => {
  if ( action.type === 'actions.NAME' ) {
    //do something
  } else if ( action.type === 'actions.NAME' ) {
    // do something else
  } else {
    return state;
  }
}