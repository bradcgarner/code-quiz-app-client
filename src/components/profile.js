import React from 'react';
import { connect } from 'react-redux';
import { REACT_APP_BASE_URL } from '../config';
import * as actionsUser from '../actions/users';
import * as actionsMode from '../actions/mode';
import * as actionsQuiz from '../actions/quiz';

export class Profile extends React.Component {
constructor(props) {
  super(props)
}

  handleSubmitButton() { // add form validation first
    if (this.props.user.id) {
      this.props.dispatch(actionsUser.updateUserProfile())
    } else {
      this.props.dispatch(actionsUser.createUser());
    }
  }
  render() {
    console.log('Profile',this.props.user);
    const buttonText = this.props.user.id ? 'Save Changes' : 'Create Account';
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
            <button type="submit" onClick={()=>this.handleSubmitButton()}>{buttonText}</button>
          </form>
        </div>
      );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  quiz: state.quiz,
  mode: state.mode
})

export default connect(mapStateToProps)(Profile);