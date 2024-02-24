import Card from 'components/Card';
import NoData from 'components/NoData';
import AnswerOption from './AnswerOption';

type Props = {
  answers: AnswerType[];
};

export default function AnswersList({ answers }: Props) {
  return (
    <>
      {answers.length > 0 ? (
        answers.map((answer, index) => (
          <Card className="mb-3" key={answer.id}>
            <h3 className="mb-3">
              {index + 1}. {answer.question}
            </h3>
            <ul>
              {answer.options.map((option, index) => (
                <AnswerOption
                  key={index}
                  isCorrect={answer.answer === index && answer.answer === answer.correctAnswer}
                  value={option}
                />
              ))}
            </ul>
          </Card>
        ))
      ) : (
        <NoData />
      )}
    </>
  );
}
