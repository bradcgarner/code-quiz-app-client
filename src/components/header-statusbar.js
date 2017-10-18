import React from 'react';
import { connect } from 'react-redux';

export function StatusBar(props) {
  let infoModal;
  console.log('StatusBar',props.user);
  
  if (props.user) {
      infoModal = <p className="temp">StatusBar Test</p>;
  }
    return (
      <div>
        {infoModal}
        <h2 className="temp">StatusBar</h2>
      </div>
    );
}

const mapStateToProps = state => ({
  user: state.user
})

export default connect(mapStateToProps)(StatusBar);