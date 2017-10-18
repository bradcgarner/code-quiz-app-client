import React from 'react';
import { connect } from 'react-redux';

export function Settings(props) {
  console.log('Settings',props);
  
  const gotoSettings = () => {
    // go to either user settings or quiz settings
  }
  
    return (
      <div>
        <button onClick={()=>gotoSettings()}>Settings</button>
      </div>
    );
}

const mapStateToProps = state => ({
  user: state.user
})

export default connect(mapStateToProps)(Settings);