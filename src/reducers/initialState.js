export const initialUser = {
  id: null,
  firstName: '',
  lastName: '',
  username: '',
  quizzes: [{
    id: 555,
    name: 'test',
    total: 3,
    completed: 1,
    correct: 1,
    category: '',
    difficulty: 3
  }],
  badges: 'none',
  recent: 'nothing',
  authToken: ''
};

export const initialQuiz = {
  id: null,    
  name: '',
  category: '',
  difficulty: '',
  current: 0,
  questions: [{
    question: '',
    inputType: 'checkbox',
    answers: [{
      option: '',
      id: null,
    }]
  }],
  menuOfAllQuizzes: []
};

export const initialMode = {
  view: 'landing'
} // landing, about, login, profile, dashboard, quizlist, 
  // question, result, accuracy, answer