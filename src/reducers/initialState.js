export const initialUser = { // store.user
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

export const initialQuiz = { // store.quiz
  id: null,    
  name: '',
  category: '',
  difficulty: '',
  current: 0,
  questions: [{
    question: '',
    id: null,
    inputType: 'checkbox',
    answers: [{
      option: '',
      id: null,
    }]
  }],
  menuOfAllQuizzes: []
};

export const initialMode = {  // store.mode
  view: 'landing', // landing, about, login, profile, dashboard, quizlist, 
                   // question, result, accuracy, answer
  modal: '' // userSettings, quizSettings
} 