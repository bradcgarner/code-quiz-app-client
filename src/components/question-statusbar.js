import React from 'react';
import { connect } from 'react-redux';

export function StatusBar(props) {
  
  const total= props.total;
  const current= props.currentIndex + 1;
  
  return (
    <div className="statusBar">
      {current} &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; {total}
    </div>
  );
}

export default connect()(StatusBar);