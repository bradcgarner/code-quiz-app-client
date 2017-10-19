import { REACT_APP_BASE_URL } from '../config';
import * as actionsMode from './mode';

export const LOGIN= 'LOGIN';
export const login = (authToken, id, username, firstName, lastName, badges, recent) => ({
  type: LOGIN,
  authToken,
  id,
  username,
  firstName,
  lastName,
  badges,
  recent
});

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

export const submitCredentials = (credentials) => dispatch => {
  console.log('credentials',credentials)// dispatch synchronous form validation here
  const url = `${REACT_APP_BASE_URL}/api/auth/login`;
  console.log('url', url);
  const auth = `${credentials.username}:${credentials.password}`; // u & pw as string
  console.log('auth', auth);
  const headers = new Headers({"Authorization": "Basic " + btoa(auth)}); // base64 encryption
  console.log('headers', headers);
  const init = { 
    method: 'POST',
    headers: headers,
    mode: 'cors',
    cache: 'default'
  };
  console.log('init', init);
  fetch(url, init)
  .then(res=>{
    console.log(res);
    if (!res.ok) { 
      return Promise.reject(res.statusText);
    }
    return res.json();
  }) 
  .then(user => { 
    console.log('logged in!', user); 
    
    dispatch(login(user.authToken, user.id, user.username,
      user.firstName,
      user.lastName,
      user.badges,
      user.recent));
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
  fetch(url, init)
  .then(res=>{//response user api repr firstName, lastName, username, id
    console.log(res);
    if (!res.ok) { 
      return Promise.reject(res.statusText);
    }
    return res.json();
  }) 
  .then(user => { 
    console.log('user created', user); 
    dispatch(actionsMode.gotoLogin());
  })
  .catch(error => {
   // dispatch(loginError(error));
    console.log(error);
  });
}


//const url = `${REACT_APP_BASE_URL}/api/users/:id`;
//username, password, firstName, lastName
export const updateUserProfile = (credentials) => dispatch => { //credential may include   username, password, firstName, lastName
  console.log('credentials',credentials)// dispatch synchronous form validation here
  const url = `${REACT_APP_BASE_URL}/api/users/:id`;
  console.log('url', url);
  const init = { 
    method: 'PUT',
    body: credentials,
    mode: 'cors',
    cache: 'default'
  };
  console.log('init', init);
  fetch(url, init)
  .then(res=>{//response user api repr  no need to do anything with response
    console.log(res);
    if (!res.ok) { 
      return Promise.reject(res.statusText);
    }
    return res.json();
  }) 
  .then(user => { 
    console.log('user updated', user); 
    dispatch(updateUserStore(user));
  })
  .catch(error => {
   // dispatch(loginError(error));
    console.log(error);
  });
}

//update user  put async
  export const updateUserData = (userData) => dispatch => { 
    console.log('userData',userData)
    const url = `${REACT_APP_BASE_URL}/api/users/:id/quiz`;
    console.log('url', url);
    const init = { 
      method: 'PUT',
      body: userData, //user data should flow the exact format ofthe schema
      mode: 'cors',
      cache: 'default'
    };
    console.log('init', init);
    fetch(url, init)
    .then(res=>{//response user api repr  no need to do anything with response
      console.log(res);
      if (!res.ok) { 
        return Promise.reject(res.statusText);
      }
      return res.json();
    }) 
    .then(user => { 
      console.log('user updated', user); 
      dispatch(updateUserStore(user));
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
    fetch(url, init)
    .then(res=>{//response user api repr  
      console.log(res);
      if (!res.ok) { 
        return Promise.reject(res.statusText);
      }
      return res.json();
    }) 
    .then(user => { 
      console.log('user found', user); 
      dispatch(updateUserStore(user));
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
export const submitChoices = choice => dispatch => { 
  console.log('choice',choice)
  const url = `${REACT_APP_BASE_URL}/api/choices/`;
  console.log('url', url);
  const init = { 
    method: 'POST',
    body: choice,
    mode: 'cors',
    cache: 'default'
  };
  console.log('init', init);
  fetch(url, init)
  .then(res=>{//response is object{correct, id}
    console.log(res);
    if (!res.ok) { 
      return Promise.reject(res.statusText);
    }
    return res.json();
  }) 
  .then(correct => { 
    console.log('choice scored', correct); 
    dispatch(scoreChoice(correct));
    // read question #s from store:
    // if not last, gotoQuestion(1)
    // if last, gotoResults(quiz)
    // send choices to server/db<
    // if last, calculate score for entire quiz
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
