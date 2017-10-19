import React from 'react';
import { connect } from 'react-redux';
import * as actionsMode from '../actions/mode';

export function Home(props) {
  console.log('Home',props);
  
  const handleHomeButton=()=> {
    if(props.where === 'dashboard') {
      this.props.dispatch(actionsMode.gotoDashboard());      
    } else if (props.where === 'profile') {
      this.props.dispatch(actionsMode.gotoProfile());
    } else {
      this.props.dispatch(actionsMode.gotoLanding());
    }
  }
    return (
      <div>
        <button onClick={()=>handleHomeButton()}>Home</button>
      </div>
    );
}

const mapStateToProps = state => ({
  user: state.user,
  quiz: state.quiz,
  mode: state.mode
})

export default connect(mapStateToProps)(Home);