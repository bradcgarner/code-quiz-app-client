import React from 'react';
import { connect } from 'react-redux';
import { REACT_APP_BASE_URL } from '../config';
import { compose } from 'redux';
import { reduxForm, Field } from 'redux-form';
import * as actionsUser from '../actions/users';
import * as actionsMode from '../actions/mode';
import * as actionsQuiz from '../actions/quiz';

export class Profile extends React.Component {

  handleSubmitButton(values) { // add form validation first
    console.log(values);
    if (this.props.user.id) {
      
      this.props.dispatch(actionsUser.updateUserProfile(values, this.props.user.authToken));
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
          <form onSubmit={this.props.handleSubmit(values => 
            this.handleSubmitButton(values)
            )}>
          <Field 
            name="firstname"
            id="firstName"
            component="input"
            type="text" 
            placeholder="firstname"
            required/>
          <label htmlFor="firstname">First Name</label>
          <Field 
            name="lastname" 
            id="lastName"
            component="input"
            type="text" 
            placeholder="lastname" 
            required/>
          <label htmlFor="lastname">Last Name</label>

          <Field
            name="username" 
            id="username"
            component="input"
            type="text" 
            placeholder="username" 
            required
          />
          <label htmlFor="username">Username</label>
          <Field 
            name="password" 
            id="password"
            component="input"
            type="text" 
            placeholder="password" 
            required
          />
          <label htmlFor="password">Password</label>
          <Field 
            name="password2" 
            id="password2"
            component="input"
            type="text" 
            placeholder="re-type password" 
            required/>
          <label htmlFor="password2">Re-Type Password</label>
          <button type="submit">Login</button>
         </form> 
         <button onClick={e=>this.handleProfileButton()}>Create Account</button>
        </div>
      );
  }
}
 

       

const mapStateToProps = state => ({
  user: state.user,
  quiz: state.quiz,
  mode: state.mode
})

export default compose(
  connect(mapStateToProps),
  reduxForm({form:'profile'})
)(Profile);