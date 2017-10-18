import React from 'react';
import Header from './components/header';
import Landing from './components/landing';
import Login from './components/login';
import Profile from './components/profile';
import Dashboard from './components/dashboard';
import QuizList from './components/quizlist';
import Question from  './components/question';
import Results from  './components/results';

export default function App(props) {
  return (
    <div className="App">
      <Header />
      <hr />
      <Landing />
      <hr />
      <Login />
      <hr />
      <Profile />
      <hr />
      <Dashboard />
      <hr />
      <QuizList />
      <hr />
      <Question />
      <hr />
      <Results />
    </div>
  );
}
