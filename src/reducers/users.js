import * as actions from '../actions/users';
import { initialUser } from './initialState';


export const reducer = ( state = initialUser, action ) => {
  if ( action.type === actions.LOGIN ) {
    return Object.assign({}, state, {
      authToken: action.authToken,
      id: action.id,
      username: action.username,
      firstName: action.firstName,
      lastName: action.lastName,
      badges: action.badges,
      recent: action.recent
    })
  } else if ( action.type === 'actions.GOTO_LOGIN' ) {
    return Object.assign({}, state, {
      view: action.view,
    })
  } else {
    return state;
  }
}