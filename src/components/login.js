import React from 'react';
import { connect } from 'react-redux';

export function Login(props) {
  console.log('Login',props.user);

  const userLogin = (e) => {
    e.preventDefault;
    // login endpoint
  };

  const gotoProfile = () => {
    // 
  };

    return (
      <div>
        <h2 className="temp">2 Login</h2>
        <form>
          <input name="username" type="text" placeholder="username" required="true"/>
          <label htmlFor="username">Username</label>
          <input name="password" type="text" placeholder="password" required="true"/>
          <label htmlFor="password">Password</label>
          <button type="submit" onClick={e=>userLogin(e)}>Login</button>
        </form>
        <button onClick={e=>gotoProfile()}>Create Account</button>
      </div>
    );
}

const mapStateToProps = state => ({
  user: state.user,
  quiz: state.quiz,
  mode: state.mode
})

export default connect(mapStateToProps)(Login);