import React from 'react';
import { connect } from 'react-redux';
import * as actionsMode from '../actions/mode';

export function Home(props) {
  
  const handleHomeButton=()=> {
    if(props.where === 'dashboard') {
      props.dispatch(actionsMode.gotoDashboard());      
    } else if (props.where === 'profile') {
      props.dispatch(actionsMode.gotoProfile());
    } else {
      props.dispatch(actionsMode.gotoLanding());
    }
  }

  const label = props.label ;

    return (
      <div>
        <button onClick={()=>handleHomeButton()}>{label}</button>
      </div>
    );
}

export default connect()(Home);