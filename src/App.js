import React from 'react';
import { connect } from 'react-redux';

import Header from './components/header';
import Landing from './components/landing';
import About from './components/about';
import Login from './components/login';
import Profile from './components/profile';
import Dashboard from './components/dashboard';
import QuizList from './components/quizlist';
import Question from  './components/question';
import Results from  './components/results';

export function App(props) {
  let mode = <Landing />;
  switch(props.mode.view) {
    case 'about':
      mode = <About />;
      break;
    case 'login':
      mode = <Login />;
      break;
    case 'profile':
      mode = <Profile />;
      break;
    case 'dashboard':
      mode = <Dashboard />;
      break;
    case 'quizlist':
      mode = <QuizList />;
      break;
    case 'question':
      mode = <Question />;
      break;
    case 'results':
      mode = <Results />;
      break;
    default:
      mode = <Landing />;
  }
  
  return (
    <div className="App">
      <Header />
      <main className="main">
      {mode}
      </main>
    </div>
  );
}

const mapStateToProps = state => ({
  user: state.user,
  quiz: state.quiz,
  mode: state.mode
})

export default connect(mapStateToProps)(App);
