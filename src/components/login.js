import React from 'react';
import { connect } from 'react-redux';
import { REACT_APP_BASE_URL } from '../config';
import { compose } from 'redux';
import { reduxForm, Field } from 'redux-form';
import * as actionsUser from '../actions/users';
import * as actionsMode from '../actions/mode';
import * as actionsQuiz from '../actions/quiz';

export class Login extends React.Component {
  
  handleSubmitButton(values) {
    this.props.dispatch(actionsUser.login(values));
  }
  
  handleCreateAccountButton() {
    this.props.dispatch(actionsMode.gotoProfile());
  }

  render() {

    return (
      <div>
        <form onSubmit={this.props.handleSubmit(values =>
          this.handleSubmitButton(values)
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

        <button onClick={e=>this.handleCreateAccountButton()}>Create Account</button>
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