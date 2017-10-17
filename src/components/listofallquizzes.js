import React from 'react';
import { connect } from 'react-redux';

export function ListOfAllQuestions(props) {
  let infoModal;
  if (props.user) {
      infoModal = <p>ListOfAllQuestions Test</p>;
      console.log('ListOfAllQuestions',props.user);
      
  }
    return (
      <div>
        {infoModal}
        <p>ListOfAllQuestions</p>
      </div>
    );
}

const mapStateToProps = state => ({
  user: state.user
})

export default connect(mapStateToProps)(ListOfAllQuestions);