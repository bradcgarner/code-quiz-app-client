import { REACT_APP_BASE_URL } from '../config';
import * as actionsMode from './mode';
import * as actionsQuiz from './quiz';

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
  console.log('credentials',JSON.stringify(credentials));// dispatch synchronous form validation here
  
  const url = `${REACT_APP_BASE_URL}/api/users`;
  const headers = { "Content-Type": "application/json"};
  
  const init = { 
    method: 'POST',
    body: JSON.stringify(credentials),
    headers
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
  const url = `${REACT_APP_BASE_URL}/api/users/${credentials.id}`;
  console.log('url', url);
  const headers = { "Content-Type": "application/json", "Authorization": "Bearer " + authToken};
  //console.log('headers for token', headers);
  const init = { 
    method: 'PUT',
    body: credentials,
    headers
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
    user.authToken = authToken;
    console.log('user updated - should have auth token', user); 
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
      headers,
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
      user.authToken = authToken;
      console.log('user updated, ready for STORE, should have auth token', user); 
      return dispatch(updateUserStore(user));
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

export const submitChoices = (choices, authToken, next) => dispatch => { 
  console.log('choice as received by submitChoices',choices)
  const url = `${REACT_APP_BASE_URL}/api/choices/`;
  console.log('url for submitChoices', url);
  const headers = { "Content-Type": "application/json", "Authorization": "Bearer " + authToken};
  const init = { 
    method: 'POST',
    headers,
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
      //dispatch(actionsQuiz.scoreQuiz(choices.quizId, choices.userId));
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
