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
    if (this.props.user.id) {
      this.props.dispatch(actionsUser.updateUserProfile(values, this.props.user.authToken));
    } else {
      this.props.dispatch(actionsUser.createUser());
    }
  }
  render() {
    const buttonText = this.props.user.id ? 'Save Changes' : 'Create Account';
      return (
        <div className="profile">
          <form onSubmit={this.props.handleSubmit(values => 
            this.handleSubmitButton(values)
          )}>

          <Field 
            className="profileInput"
            name="firstname"
            id="firstName"
            component="input"
            type="text" 
            placeholder="firstname"
            required
          /><br />

          <label className="inputLabel center" htmlFor="firstname">First Name</label>
          <Field 
            className="profileInput"
            name="lastname" 
            id="lastName"
            component="input"
            type="text" 
            placeholder="lastname" 
            required
          /><br />
          <label className="inputLabel center" htmlFor="lastname">Last Name</label>

          <Field
            className="profileInput"
            name="username" 
            id="username"
            component="input"
            type="text" 
            placeholder="username" 
            required
          /><br />
          <label className="inputLabel center" htmlFor="username">Username</label>
          
          <Field 
            className="profileInput"
            name="password" 
            id="password"
            component="input"
            type="text" 
            placeholder="password" 
            required
          /><br />
          <label className="inputLabel center" htmlFor="password">Password</label>
          
          <Field 
            className="profileInput"
            name="password2" 
            id="password2"
            component="input"
            type="text" 
            placeholder="re-type password" 
            required/>
          <label className="inputLabel center" htmlFor="password2">Re-Type Password</label>
          
          <button className="createAccountButton" type="submit">{buttonText}</button>
         </form> 
         {/* <button className="createAccountButton" onClick={e=>this.handleProfileButton()}>Create Account</button> */}
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