import React from 'react';
import { connect } from 'react-redux';

export function Dashboard(props) {
  let infoModal;
  if (props.user) {
      infoModal = <p>Dashboard Test</p>;
      console.log('Dashboard',props.user);
      
  }
    return (
      <div>
        {infoModal}
        <p>Dashboard</p>
      </div>
    );
}

const mapStateToProps = state => ({
  user: state.user
})

export default connect(mapStateToProps)(Dashboard);