type _ChangeHandlerEvent = React.ChangeEvent<HTMLInputElement>;
type _FormSubmitEvent = React.FormEvent<HTMLFormElement>;
type _SelectValue = { target: { value: SelectOption; name: string } };

type UserRole = 'admin' | 'user' | undefined;

type QuestionType = {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
};

type Option = {
  answer: string;
  correct: boolean;
};

type AnswerType = {
  id: string;
  question: string;
  answer: number;
  correctAnswer: number;
  options: string[];
};

type SelectOption = {
  label: string;
  value: string;
};
