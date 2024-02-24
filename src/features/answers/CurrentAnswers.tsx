import Card from 'components/Card';
import useAppState from 'hooks/useAppState';
import { cn } from 'utils/cn';

export default function CurrentAnswers() {
  const { answers } = useAppState();

  return (
    <>
      {answers.map((answer, index) => (
        <Card className="mb-3" key={answer.id}>
          <h3 className="mb-3">
            {index + 1}. {answer.question}
          </h3>
          <ul>
            {answer.options.map((option, index) => (
              <li
                key={index}
                className={cn('text-sm p-2 border border-slate-300 rounded-md mb-2', {
                  'bg-green-600 text-white border-transparent':
                    answer.answer === index && answer.answer === answer.correctAnswer,
                  'bg-red-500 text-white border-transparent':
                    answer.answer === index && answer.answer !== answer.correctAnswer,
                })}
              >
                {option}
              </li>
            ))}
          </ul>
        </Card>
      ))}
    </>
  );
}
