import Card from 'components/Card';
import NoData from 'components/NoData';
import useAppState from 'hooks/useAppState';
import { cn } from 'utils/cn';

export default function PreviousAnswers() {
  const { previousAnswers } = useAppState();
  return (
    <div className="max-w-2xl flex-1 mx-auto">
      <h2 className="text-lg mb-5">Previous answers:</h2>
      {previousAnswers.length > 0 ? (
        previousAnswers.map((answer) => (
          <Card className="mb-3" key={answer.id}>
            <h3 className="mb-3">{answer.question}</h3>
            <ul>
              {answer.options.map((option, index) => (
                <li
                  key={index}
                  className={cn('p-2 border border-slate-300 rounded-md mb-2', {
                    'text-green-600 border-green-500':
                      answer.answer === index && answer.answer === answer.correctAnswer,
                    'text-red-500 border-red-500':
                      answer.answer === index && answer.answer !== answer.correctAnswer,
                  })}
                >
                  {option}
                </li>
              ))}
            </ul>
          </Card>
        ))
      ) : (
        <NoData />
      )}
    </div>
  );
}
