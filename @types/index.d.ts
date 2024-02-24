type Question = {
  id: number;
  answer: number;
  selectedAnswer: number;
  question: string;
  options: string[];
};

type AppContextProps = {
  showResult: boolean;
  userType: string;
  questions: Question[];
  answers: Question[];
  previousAnswers: Question[];
  handleStateChange: (newState: Question[] | boolean | string, type: string) => void;
};

type QuestFormData = {
  id?: number;
  question: string;
  options: string[];
  answer: number;
  selectedAnswer: number;
};
