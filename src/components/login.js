import React from 'react';
import { connect } from 'react-redux';
import { REACT_APP_BASE_URL } from '../config';
import { compose } from 'redux';
import { reduxForm, Field } from 'redux-form';
import * as actionsUser from '../actions/users';
import * as actionsMode from '../actions/mode';
import * as actionsQuiz from '../actions/quiz';

export class Login extends React.Component {

  componentDidMount() {
    this.props.initialize({username: this.props.user.username})
    console.log('did mount username', this.props);
  }
  
  handleSubmitButton(values) {
    this.props.dispatch(actionsUser.login(values));
    this.props.reset();   
  }
  
  handleCreateAccountButton() {
    this.props.dispatch(actionsMode.gotoProfile());
  }

  render() {
    return (
      <div className="login">
        <form className="login" onSubmit={this.props.handleSubmit(values =>
          this.handleSubmitButton(values)
        )}>
          <Field
            className="profileInput"
            name="username" 
            id="username"
            component="input"
            type="text" 
            placeholder="username" 
            required
            value={this.props.mode.view}
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
          <button type="submit" className="loginButton clearfix">Login</button>
        </form>

        <button className="createAccountButton" onClick={e=>this.handleCreateAccountButton()}>Create Account</button>
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