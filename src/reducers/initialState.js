export const initialUser = {
  id: null,
  firstName: '',
  lastName: '',
  username: '',
  quizzes: [{
    id: null,
    name: '',
    total: null,
    completed: null,
    correct: null,
    category: '',
    difficulty: null
  }],
  badges: 'none',
  recent: 'nothing'
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
  }]
};

export const initialMode = {
  view: 'answer'
} // landing, login, profile, dashboard, quizlist, 
  // question, result, accuracy, answer