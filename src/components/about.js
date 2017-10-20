import React from 'react';
import { connect } from 'react-redux';
import * as actionsMode from '../actions/mode';

export function About(props) {
  
    return (
      <div className="about">
          <p>About</p>
      </div>
    );
}

const mapStateToProps = state => ({
  mode: state.mode
})

export default connect(mapStateToProps)(About);