import { PropsWithChildren, createContext, useEffect, useState } from 'react';

import { defaultQuestions } from 'constants/questions';

interface State {
  userRole?: UserRole;
  questions: QuestionType[];
  answers: AnswerType[];
  previousAnswers: AnswerType[];
}

interface AppState extends State {
  logOut: () => void;
  logIn: (user: UserRole) => void;
  submitAnswers: (answers: AnswerType[]) => void;
  deleteQuestion: (id: string) => void;
  updateQuestion: (question: QuestionType, id: string) => void;
  addQuestion: (question: QuestionType) => void;
}

const initState: State = {
  userRole: undefined,
  questions: [],
  answers: [],
  previousAnswers: [],
};

const initAppState = initState as AppState;

export const AppContext = createContext<AppState>(initAppState);

const AppContextProvider = ({ children }: PropsWithChildren<unknown>) => {
  const cachedState = localStorage.getItem('state');
  const [state, setState] = useState<AppState>(cachedState ? JSON.parse(cachedState) : initState);

  useEffect(() => {
    localStorage.setItem('state', JSON.stringify(state));
  }, [state]);

  useEffect(() => {
    if (state.questions.length === 0) {
      setState((prev) => ({
        ...prev,
        questions: defaultQuestions,
      }));
    }
  }, [state.questions.length]);

  const logOut = () => {
    setState((prev) => ({
      ...prev,
      userRole: undefined,
    }));
    window.location.replace('/');
  };

  const logIn = (userRole: UserRole) => {
    setState((prev) => ({
      ...prev,
      userRole,
    }));
  };

  const submitAnswers = (answers: AnswerType[]) => {
    setState((prev) => ({
      ...prev,
      answers,
      previousAnswers: prev.answers,
    }));
  };

  const deleteQuestion = (id: string) => {
    const newQuestions = state.questions.filter((question) => question.id !== id);
    setState((prev) => ({
      ...prev,
      questions: newQuestions,
    }));
  };

  const updateQuestion = (question: QuestionType, id: string) => {
    const newQuestions = state.questions.map((q) => (q.id === id ? question : q));
    setState((prev) => ({
      ...prev,
      questions: newQuestions,
    }));
  };

  const addQuestion = (question: QuestionType) => {
    setState((prev) => ({
      ...prev,
      questions: [...prev.questions, question],
    }));
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        logOut,
        logIn,
        submitAnswers,
        deleteQuestion,
        updateQuestion,
        addQuestion,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
