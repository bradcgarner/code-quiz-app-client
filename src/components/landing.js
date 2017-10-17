import React from 'react';
import { connect } from 'react-redux';

export function Landing(props) {
  let infoModal;
  if (props.user) {
      infoModal = <p>Landing Test</p>;
      console.log('Landing',props.user);
      
  }
    return (
      <div>
        {infoModal}
        <p>Landing</p>
      </div>
    );
}

const mapStateToProps = state => ({
  user: state.user
})

export default connect(mapStateToProps)(Landing);