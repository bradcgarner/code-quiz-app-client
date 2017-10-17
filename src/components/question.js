import React from 'react';
import { connect } from 'react-redux';

export function Question(props) {
  let infoModal;
  if (props.user) {
      infoModal = <p>Question Test</p>;
      console.log('Question', props.user);      
  }
    return (
      <div>
        {infoModal}
        <p>Question</p>
      </div>
    );
}

const mapStateToProps = state => ({
  user: state.user
})

export default connect(mapStateToProps)(Question);