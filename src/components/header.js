import React from 'react';
import { connect } from 'react-redux';
import Home from './header-home';
import Settings from './header-settings';
import StatusBar from './header-statusbar';

export function Header(props) {
  console.log('Header',props);  
  let home = '';
  let header = '';
  let header2 = '';
  let settings = '';
  let username = props.user.id ? `${props.user.firstName}'s ` : 'New User\'s' ;
  if (props.mode.view === 'landing') {
    // do nothing

  } else if (props.mode.view === 'login') {
    home =<Home where={'landing'}/>; 
    header = <h1>Login</h1>;

  } else if (props.mode.view === 'profile') {
    home =<Home where={'dashboard'}/>; 
    header = <h1>{username} Profile</h1>

  } else if (props.mode.view === 'dashboard') {
    home =<Home where={'profile'}/>; 
    header = <h1>{username} Dashboard</h1>
    settings = <Settings type ={'user'}/>;

  } else if (props.mode.view === 'quizlist') {
    home =<Home where={'dashboard'}/>; 
    header = <h1>Menu of Quizzes</h1>;
    settings = <Settings type={'user'}/>;
    
  } else if (props.mode.view === 'question') {
    home =<Home where={'dashboard'}/>; 
    header = <h1>{props.quiz.name}</h1>;
    header2 = <StatusBar />;
    settings = <Settings type={'quiz'}/>;
    
  } else if (props.mode.view === 'result') {
    home =<Home where={'dashboard'}/>; 
    header = <h1>{props.quiz.name}</h1>;
    header2 = <h3>Results</h3>;
    settings = <Settings type={'quiz'}/>;
    
  } else if (props.mode.view === 'accuracy') {
    home =<Home where={'dashboard'}/>; 
    header = <h1>{props.quiz.name}</h1>;
    header2 = <h3>Check Accuracy</h3>;
    
  } else if (props.mode.view === 'answer') {
    home =<Home where={'dashboard'}/>; 
    header = <h1>{props.quiz.name}</h1>;
    header2 = <h3>Correct Answers</h3>;
  }

    return (
      <div>
        {home}
        {header}
        {header2}
        {settings}
      </div>
    );
}

const mapStateToProps = state => ({
  user: state.user,
  quiz: state.quiz,
  mode: state.mode
})

export default connect(mapStateToProps)(Header);