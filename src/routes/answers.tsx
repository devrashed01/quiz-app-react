import { useEffect, useMemo, useState } from 'react';

import Button from 'components/form/button';
import AnswersList from 'features/answers/AnswersList';
import Question from 'features/answers/Question';
import QuizCompleteScreen from 'features/answers/QuizCompleteScreen';
import useAppState from 'hooks/useAppState';

export default function AnswersPage() {
  const { questions, submitAnswers, answers, userRole, previousAnswers } = useAppState();
  const [currentQuestionPosition, setCurrentQuestionPosition] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [answered, setAnswered] = useState<AnswerType[]>([]);
  const [showQuestions, setShowQuestions] = useState(false);

  const isUser = userRole === 'user';

  // Show questions if there are no answers submitted yet and the user is the one viewing the page
  useEffect(() => {
    if (answers.length <= 0 && isUser) {
      setShowQuestions(true);
    }
  }, [answers.length, isUser]);

  // update the current question position from the local storage
  useEffect(() => {
    const position = localStorage.getItem('currentQuestionPosition');
    if (position) {
      setCurrentQuestionPosition(JSON.parse(position));
    }
  }, []);

  // update the answered questions from the local storage
  useEffect(() => {
    const cachedAnswered = localStorage.getItem('answered');
    if (cachedAnswered) {
      setAnswered(JSON.parse(cachedAnswered));
    }
  }, []);

  const nextHandler = (answer: AnswerType) => {
    const isLastQuestion = currentQuestionPosition === questions.length - 1;
    if (isLastQuestion) {
      submitAnswers([...answered, answer]);
      setIsComplete(true);

      localStorage.removeItem('currentQuestionPosition');
      localStorage.removeItem('answered');
      return;
    }

    setAnswered((prev) => [...prev, answer]);
    setCurrentQuestionPosition((prev) => prev + 1);
    localStorage.setItem('currentQuestionPosition', JSON.stringify(currentQuestionPosition + 1));
    localStorage.setItem('answered', JSON.stringify([...answered, answer]));
  };

  const retakeQuiz = () => {
    if (!isUser) return;
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

  return (
    <div className="lg:flex gap-5">
      <div className="max-w-2xl mx-auto flex-1">
        {!showQuestions && (
          <>
            {answers.length > 0 && (
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-lg">
                  Total correct answer: {totalCorrectAnswers} out of {answers.length}
                </h3>
                {isUser && <Button onClick={retakeQuiz}>Retake quiz</Button>}
              </div>
            )}
            <AnswersList answers={answers} />
          </>
        )}
        {showQuestions && isUser && (
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
      {/* show previous answers only on (user & has submitted answers & not performing quiz) */}
      {!showQuestions && answers.length > 0 && isUser && (
        <div className="max-w-2xl flex-1 mx-auto">
          <h2 className="text-lg mb-5">Previous answers</h2>
          <AnswersList answers={previousAnswers} />
        </div>
      )}
    </div>
  );
}
