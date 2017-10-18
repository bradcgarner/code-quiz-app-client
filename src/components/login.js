import React from 'react';
import { connect } from 'react-redux';
import { REACT_APP_BASE_URL } from '../config';
import { compose } from 'redux';
import { reduxForm, Field } from 'redux-form';
import * as userActions from '../actions/users';

export class Login extends React.Component {
  
  onSubmit(values) {
    console.log('submitting login',values);
    this.props.dispatch(userActions.submitCredentials(values));
  }
  gotoProfile() {
    // 
  };

  render() {
    console.log('Login',this.props);    


    return (
      <div>
        <h2 className="temp">2 Login</h2>
        <form onSubmit={this.props.handleSubmit(values =>
          this.onSubmit(values)
        )}>
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
          <button type="submit">Login</button>
        </form>

        <button onClick={e=>this.gotoProfile()}>Create Account</button>
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
  reduxForm({form:'login'}) // in the state we'll have state.form.login
)(Login);