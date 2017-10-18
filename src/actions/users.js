import { REACT_APP_BASE_URL } from '../config';

export const x = 'x';
export const x2 = (username, password) => ({
  type: x,
  username,
  password
});



export const login = (credentials) => dispatch => {
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
    // dispatch synchrnous action
  })
}




