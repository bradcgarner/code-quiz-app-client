import { REACT_APP_BASE_URL } from '../config';
import * as actionsMode from './mode';

const qs = require('qs');
const assert = require('assert');

export const UPDATE_USER_STORE = 'UPDATE_USER_STORE';
export const updateUserStore = user => {
  return Object.assign({}, user, {  type: UPDATE_USER_STORE } )
}

export const SCORE_CHOICE = 'SCORE_CHOICE';
export const scoreChoice = correct => ({
  type: SCORE_CHOICE
  // reach into store and update sub-document
  // correct: correct.id,
  // correct: correct.correct
});

// @@@@@@@@@@@@@@@@@ ASYNC @@@@@@@@@@@@@@@@@@@

export const login = (credentials) => dispatch => {
  const url = `${REACT_APP_BASE_URL}/api/auth/login`;
  const auth = `${credentials.username}:${credentials.password}`; // u & pw as string
  const headers = {"Authorization": "Basic " + btoa(auth)}; // base64 encryption
  const init = { 
    method: 'POST',
    headers: headers,
    mode: 'cors',
    cache: 'default'//not caching anything just passing
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
    
    dispatch(updateUserStore(user));
    return dispatch(actionsMode.gotoDashboard());
  })
  .catch(error => {
   // dispatch(loginError(error));
    console.log(error);
  });
    
  
}
////create new user  async
export const createUser = (credentials) => dispatch => { //credential should include   username, password, firstName, lastName
  console.log('credentials',credentials)// dispatch synchronous form validation here
  const url = `${REACT_APP_BASE_URL}/api/users`;
  console.log('url', url);
  const init = { 
    method: 'POST',
    body: credentials,
    mode: 'cors',
    cache: 'default'
  };
  console.log('init', init);
  return fetch(url, init)
  .then(res=>{//response user api repr firstName, lastName, username, id
    console.log(res);
    if (!res.ok) { 
      return Promise.reject(res.statusText);
    }
    return res.json();
  }) 
  .then(user => { 
    console.log('user created', user); 
    return dispatch(actionsMode.gotoLogin());
  })
  .catch(error => {
   // dispatch(loginError(error));
    console.log(error);
  });
}


//const url = `${REACT_APP_BASE_URL}/api/users/:id`;
//username, password, firstName, lastName
export const updateUserProfile = (credentials, authToken) => dispatch => { //credential may include   username, password, firstName, lastName
  console.log('credentials',credentials)// dispatch synchronous form validation here
  const url = `${REACT_APP_BASE_URL}/api/users/:id`;
  console.log('url', url);
  const headers = { "Content-Type": "application/json", "Authorization": "Bearer " + authToken};
  //console.log('headers for token', headers);
  const init = { 
    method: 'PUT',
    body: credentials,
    headers: headers,
    mode: 'cors',
    cache: 'default'
  };
  console.log('init', init);
  return fetch(url, init)
  .then(res=>{//response user api repr  no need to do anything with response
    console.log(res);
    if (!res.ok) { 
      return Promise.reject(res.statusText);
    }
    return res.json();
  }) 
  .then(user => { 
    console.log('user updated', user); 
    return dispatch(updateUserStore(user));
  })
  .catch(error => {
   // dispatch(loginError(error));
    console.log(error);
  });
}

//update user  put async
  export const updateUserData = (userData, authToken) => dispatch => { 
    console.log('userData',userData)
    const url = `${REACT_APP_BASE_URL}/api/users/${userData.id}/data`;
    console.log('url', url);
    const headers = { "Content-Type": "application/json", "Authorization": "Bearer " + authToken};
    console.log('headers at update user data', headers);
    const init = { 
      method: 'PUT',
      headers: headers,
      body: JSON.stringify(userData) //user data should flow the exact format ofthe schema
    };
    // ######## The body is showing up as populated on the 
    // ######## client, but showing up empty on the server.
    // ######## The same method, format, headers work in Postman,
    // ######## but not here
    console.log('init at update user data', init);
    return fetch(url, init)
    .then(res=>{//response user api repr  no need to do anything with response
      console.log(res);
      if (!res.ok) { 
        return Promise.reject(res.statusText);
      }
      return res.json();
    }) 
    .then(user => { 
      console.log('user updated, ready for STORE', user); 
      return dispatch(updateUserStore(user));
    })
    .catch(error => {
     // dispatch(loginError(error));
      console.log(error);
    });
  }
  
  //get user by Id  async
  //response user api repr
  export const getUser = (id) => dispatch => { 
    console.log('id',id)
    const url = `${REACT_APP_BASE_URL}/api/users/:id/`;
    console.log('url', url);
    const init = { 
      method: 'GET',
      mode: 'cors',
      cache: 'default'
    };
    console.log('init', init);
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
  

  //delete by user id  async
  //const url = `${REACT_APP_BASE_URL}/api/users/:id/`;
  //id
  // response code


  ///////CHOICES
  // choice must have this format
  //   {   "userId": "59e51b41c5944e09d2bc9036",
  //       "questionId": "59e651e1c7bea3a51c15d900",
  //       "quizId": "59e651e1c7bea3a51c15d8fe",
  //       "choices" : [
  //         {"optionId" : "59e651e1c7bea3a51c15d904"},
  //         {"optionId" : "59e651e1c7bea3a51c15d905"},
  //       ]
  //    }
export const submitChoices = (choices, authToken, next) => dispatch => { 
  console.log('choice as received by submitChoices',choices)
  const url = `${REACT_APP_BASE_URL}/api/choices/`;
  console.log('url for submitChoices', url);
  const headers = { "Content-Type": "application/json", "Authorization": "Bearer " + authToken};
  const init = { 
    method: 'POST',
    headers: headers,
    body: JSON.stringify(choices),
  };
  console.log('init for submitChoices', init);
  return fetch(url, init)
  .then(res=>{//response is object{correct, id}
    console.log('response after fetch in submitChoices', res);
    if (!res.ok) { 
      return Promise.reject(res.statusText);
    }
    return res.json();
  }) 
  .then(correct => { 
    console.log('choice scored', correct); 
    return dispatch(scoreChoice(correct));
  })
  .then(()=> {
    if ( next === 'score' ) {
      dispatch(actionsMode.gotoResult);
      dispatch(actionsQuiz.scoreQuiz(choices.quizId, choices.userId));
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
