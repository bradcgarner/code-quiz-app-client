import React from 'react';
import { connect } from 'react-redux';

export function Home(props) {
  console.log('Home',props);
  
  const gotoHome = () => {
    // go home (dashboard, profile, landing), read from props.where
  }

    return (
      <div>
        <button onClick={()=>gotoHome()}>Home</button>
      </div>
    );
}

const mapStateToProps = state => ({
  user: state.user,
  quiz: state.quiz,
  mode: state.mode
})

export default connect(mapStateToProps)(Home);