import React from 'react';
import { connect } from 'react-redux';

export function Landing(props) {
  console.log('Landing',props.user);
  const gotoLogin = () => { }
  const gotoAbout = () => { }
  
    return (
      <div>
          <p>Logo image</p>
          <button onClick={()=>gotoLogin()}>Login</button>
          <button onClick={()=>gotoAbout()}>About</button>
      </div>
    );
}

const mapStateToProps = state => ({
  user: state.user,
  quiz: state.quiz,
  mode: state.mode
})

export default connect(mapStateToProps)(Landing);