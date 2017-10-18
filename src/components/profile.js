import React from 'react';
import { connect } from 'react-redux';
import { REACT_APP_BASE_URL } from '../config';

export function Profile(props) {
  console.log('Profile',props.user);

  const buttonText = props.user.id ? 'Save Changes' : 'Create Account';
  const saveProfile = () => {
    //
  }

    return (
      <div>
        <h2 className="temp">3 Profile</h2>
        <form>
          <input name="username" type="text" placeholder="username" required="true"/>
          <label htmlFor="username">Username</label>
          <input name="firstname" type="text" placeholder="firstname" required="true"/>
          <label htmlFor="firstname">First Name</label>
          <input name="lastname" type="text" placeholder="lastname" required="true"/>
          <label htmlFor="lastname">Last Name</label>
          <input name="password" type="text" placeholder="password" required="true"/>
          <label htmlFor="password">Password</label>
          <input name="password2" type="text" placeholder="re-type password" required="true"/>
          <label htmlFor="password2">Re-Type Password</label>
          <button type="submit" onClick={()=>saveProfile()}>{buttonText}</button>
        </form>
      </div>
    );
}

const mapStateToProps = state => ({
  user: state.user,
  quiz: state.quiz,
  mode: state.mode
})

export default connect(mapStateToProps)(Profile);