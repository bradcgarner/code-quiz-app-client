import React from 'react';
import { connect } from 'react-redux';

export function Login(props) {
  let infoModal;
  if (props.user) {
      infoModal = <p>Login Test</p>;
      console.log('Login',props.user);
      
  }
    return (
      <div>
        {infoModal}
        <p>Login</p>
      </div>
    );
}

const mapStateToProps = state => ({
  user: state.user
})

export default connect(mapStateToProps)(Login);