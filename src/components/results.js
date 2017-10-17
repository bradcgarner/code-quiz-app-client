import React from 'react';
import { connect } from 'react-redux';

export function Results(props) {
  let infoModal;
  if (props.user) {
      infoModal = <p>Results Test</p>;
      console.log('Results', props.user);
  }
    return (
      <div>
        {infoModal}
        <p>Results</p>
      </div>
    );
}

const mapStateToProps = state => ({
  user: state.user
})

export default connect(mapStateToProps)(Results);