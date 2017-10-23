import { REACT_APP_BASE_URL } from '../config';
import * as actionsMode from './mode';
import * as actionsQuiz from './quiz';
const deepAssign = require('deep-assign');


export const UPDATE_USER_STORE = 'UPDATE_USER_STORE';
export const updateUserStore = user => {
  return deepAssign({}, user, {  type: UPDATE_USER_STORE } )
}

export const UPDATE_USER_QUIZ_SCORE = 'UPDATE_USER_QUIZ_SCORE';
export const updateUserQuizScore = (quizId, totalCorrect, totalCompleted) => ({
  type: UPDATE_USER_QUIZ_SCORE,
  quizId,
  totalCorrect,
  totalCompleted
});

// @@@@@@@@@@@@@@@@@ ASYNC @@@@@@@@@@@@@@@@@@@

export const login = (credentials) => dispatch => {
  const url = `${REACT_APP_BASE_URL}/api/auth/login`;
  const auth = `${credentials.username}:${credentials.password}`; // u & pw as string
  const headers = {"Authorization": "Basic " + btoa(auth)}; // base64 encryption
  const init = { 
    method: 'POST',
    headers
  };
  console.log('init', init);
  return fetch(url, init)
  .then(res=>{
    console.log(res);
    if (!res.ok) { 
      return Promise.reject(res.statusText);
    }
    return res.json();
  }) 
  .then(user => { 
    console.log('user from db', user);
    dispatch(updateUserStore(user));
    if (user.quizzes.length > 0 ) {
      return dispatch(actionsMode.gotoDashboard());      
    } else {
    return dispatch(actionsQuiz.fetchQuizzes()); 
    }
  })
  .catch(error => {
   // dispatch(loginError(error));
    console.log(error);
  });
    
  
}
// create new user
export const createUser = (credentials) => dispatch => { //credential should include   username, password, firstName, lastName  
  const url = `${REACT_APP_BASE_URL}/api/users`;
  const headers = { "Content-Type": "application/json"};
  const init = { 
    method: 'POST',
    body: JSON.stringify(credentials),
    headers
  };
  console.log('init', init);
  return fetch(url, init)
  .then(res=>{ //response user api repr firstName, lastName, username, id
    console.log(res);
    if (!res.ok) { 
      return Promise.reject(res.statusText);
    }
    return res.json();
  }) 
  .then(user => { 
    dispatch(updateUserStore(user));
  })
  .then(()=>{
    return dispatch(actionsMode.gotoLogin());
  })
  .catch(error => {
   // dispatch(loginError(error));
    console.log(error);
  });
}

//update user core profile: username, password, firstName, lastName
export const updateUserProfile = (credentials, authToken) => dispatch => { //credentials MAY include username, password, firstName, lastName
  const url = `${REACT_APP_BASE_URL}/api/users/${credentials.id}`;
  const headers = { "Content-Type": "application/json", "Authorization": "Bearer " + authToken};
  const init = { 
    method: 'PUT',
    body: credentials,
    headers
  };
  console.log('init', init);
  return fetch(url, init)
  .then(res=>{   //response user api repr (no need to do anything with it) 
    console.log(res);
    if (!res.ok) { 
      return Promise.reject(res.statusText);
    }
    return res.json();
  }) 
  .then(user => { 
    user.authToken = authToken;
    return dispatch(updateUserStore(user));
    // let user know profile is updated
  })
  .catch(error => {
   // dispatch(loginError(error));
    console.log(error);
  });
}

// update user non-profile data (quizzes taken, badges, etc.)
export const updateUserData = (userData, authToken) => dispatch => { 
  const url = `${REACT_APP_BASE_URL}/api/users/${userData.id}/data`;
  const headers = { "Content-Type": "application/json", "Authorization": "Bearer " + authToken};
  const init = { 
    method: 'PUT',
    headers,
    body: JSON.stringify(userData) //user data should flow the exact format ofthe schema
  };
  console.log('init at update user data', init);
  return fetch(url, init)
  .then(res=>{          //response=user.apiRepr() with archived quizzes filtered out
    console.log(res);
    if (!res.ok) { 
      return Promise.reject(res.statusText);
    }
    return res.json();
  }) 
  .then(user => { 
    console.log('user returned from db',user);
    user.authToken = authToken;
    return dispatch(updateUserStore(user)); // archived quizzes not included
  })
  .catch(error => {
  // dispatch(loginError(error));
    console.log(error);
  });
}
  
//get user by Id  - used at login
export const getUser = (id) => dispatch => { 
  console.log('id',id)
  const url = `${REACT_APP_BASE_URL}/api/users/${id}/`;
  console.log('url', url);
  const init = { 
    method: 'GET'
  };
  return fetch(url, init)
  .then(res=>{//response user api repr  
    console.log(res);
    if (!res.ok) { 
      return Promise.reject(res.statusText);
    }
    return res.json();
  }) 
  .then(user => { 
    console.log('user found', user); 
    return dispatch(updateUserStore(user));
  })
  .catch(error => {
  // dispatch(loginError(error));
    console.log(error);
  });
}

export const submitChoices = (choices, user, nextIndex) => dispatch => { // nextIndex === 999 if score
  console.log('choice as received by submitChoices',choices)
  console.log('nextIndex as received by submitChoices',nextIndex)
  const url = `${REACT_APP_BASE_URL}/api/choices/`;
  console.log('url for submitChoices', url);
  const headers = { "Content-Type": "application/json", "Authorization": "Bearer " + user.authToken};
  const init = { 
    method: 'POST',
    headers,
    body: JSON.stringify(choices),
  };
  console.log('init for submitChoices', init);
  return fetch(url, init)
  .then(res=>{  // response is object including properties correct & id
    console.log('response after fetch in submitChoices', res);
    if (!res.ok) { 
      return Promise.reject(res.statusText);
    }
    return res.json();
  })
  .then(choice=>{    
    console.log('choice scored', choice); 
    return dispatch(actionsQuiz.scoreChoice(choice)); // update CURRENT QUIZ with score of 1 question
  })
  .then(()=>{
    return fetch(`${REACT_APP_BASE_URL}/api/choices/quizzes/${choices.quizId}/users/${user.id}/${choices.attempt}`)
  })   
  .then(res => {
    console.log('choices fetched',res);
    if (!res.ok) {
      return Promise.reject(res.statusText);
    }
    return res.json();
  })
  .then(allQuizChoices => { // this is to update state.user.quizzes[].completed
    console.log('allQuizChoices length', allQuizChoices.length, allQuizChoices); 
    const quizIndexToUpdate = user.quizzes.findIndex(quiz=>quiz.id === choices.quizId);
    console.log('quizIndexToUpdate', quizIndexToUpdate);
    console.log('quiz to update', user.quizzes[quizIndexToUpdate]);
    const updatedUser = deepAssign({}, user );
    updatedUser.quizzes[quizIndexToUpdate].completed = allQuizChoices.length;
    console.log('updatedUser',updatedUser);
    dispatch(updateUserData(updatedUser, user.authToken));
  })
  .then(()=> {
    if ( nextIndex === 999 ) { /// 999 === score
      dispatch(actionsMode.gotoResults());
      console.log('choices.quizId', choices.quizId, 'user', user, 'attempt', choices.attempt);
      dispatch(actionsQuiz.scoreQuiz(choices.quizId, user, choices.attempt));
    } else {
      dispatch(actionsQuiz.updateCurrentQuestion(nextIndex));
    }
  })
  .catch(error => {
   // dispatch(loginError(error));
    console.log(error);
  });
}

//get choices by quiz id and user id   async
//const url = `${REACT_APP_BASE_URL}/api/choices/quizzes/:quizId/users/:userId`;
//quizId and userId
//response array api reprof each choice
