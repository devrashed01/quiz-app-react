import { useMemo, useState } from 'react';

import Button from 'components/form/button';
import CurrentAnswers from 'features/answers/CurrentAnswers';
import PreviousAnswers from 'features/answers/PreviousAnswers';
import Question from 'features/answers/Question';
import QuizCompleteScreen from 'features/answers/QuizCompleteScreen';
import useAppState from 'hooks/useAppState';

export default function AnswersPage() {
  const { questions, submitAnswers, answers, userRole } = useAppState();
  const [currentQuestionPosition, setCurrentQuestionPosition] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [answered, setAnswered] = useState<AnswerType[]>([]);
  const [showQuestions, setShowQuestions] = useState(false);

  const nextHandler = (answer: AnswerType) => {
    const isLastQuestion = currentQuestionPosition === questions.length - 1;
    if (isLastQuestion) {
      submitAnswers([...answered, answer]);
      setIsComplete(true);
    }

    setAnswered((prev) => [...prev, answer]);
    setCurrentQuestionPosition((prev) => prev + 1);
  };

  const retakeQuiz = () => {
    setCurrentQuestionPosition(0);
    setIsComplete(false);
    setAnswered([]);
    setShowQuestions(true);
  };

  const onQuizComplete = () => {
    setShowQuestions(false);
  };

  const totalCorrectAnswers = useMemo(() => {
    return answers.filter((answer) => answer.answer === answer.correctAnswer).length;
  }, [answers]);

  const isUser = userRole === 'user';

  return (
    <div className="lg:flex gap-5">
      <div className="max-w-2xl mx-auto flex-1">
        {answers.length > 0 && !showQuestions ? (
          <>
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg">
                Total correct answer: {totalCorrectAnswers} out of {questions.length}
              </h3>
              {isUser && <Button onClick={retakeQuiz}>Retake quiz</Button>}
            </div>
            <CurrentAnswers />
          </>
        ) : (
          <>
            {isComplete ? (
              <QuizCompleteScreen onClose={onQuizComplete} />
            ) : (
              <Question
                currentPosition={currentQuestionPosition + 1}
                totalCount={questions.length}
                data={questions[currentQuestionPosition]}
                onNext={nextHandler}
              />
            )}
          </>
        )}
      </div>

      {!showQuestions && answers.length > 0 && isUser && <PreviousAnswers />}
    </div>
  );
}
