import React from 'react';
import { connect } from 'react-redux';

export function StatusBar(props) {
  
    return (
      <div>
        <p>StatusBar</p>
      </div>
    );
}

const mapStateToProps = state => ({
  user: state.user
})

export default connect(mapStateToProps)(StatusBar);