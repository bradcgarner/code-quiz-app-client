import React from 'react';
import { connect } from 'react-redux';

export function Profile(props) {
  let infoModal;
  if (props.user) {
      infoModal = <p>Profile Test</p>;
      console.log('Profile',props.user);
      
  }
    return (
      <div>
        {infoModal}
       <p>Profile</p>
      </div>
    );
}

const mapStateToProps = state => ({
  user: state.user
})

export default connect(mapStateToProps)(Profile);