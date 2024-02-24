import { useState } from 'react';

import Card from 'components/Card';
import Icons from 'components/Icons';
import Button from 'components/form/button';
import { cn } from 'utils/cn';

interface Props {
  currentPosition: number;
  totalCount: number;
  data: QuestionType;
  onNext: (answer: AnswerType) => void;
}

export default function Question({ data, currentPosition, totalCount, onNext }: Props) {
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number>();
  const nextHandler = () => {
    if (selectedAnswerIndex !== undefined) {
      onNext({
        question: data.question,
        id: data.id,
        answer: selectedAnswerIndex,
        correctAnswer: data.correctAnswer,
        options: data.options,
      });
      setSelectedAnswerIndex(undefined);
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <h3 className="text-3xl mb-10 flex items-center text-primary-100 justify-between gap-5">
        {data.question}{' '}
        <span className="font-normal">
          <span className="text-5xl">{currentPosition}</span>/{totalCount}
        </span>
      </h3>
      <Card className="p-0 max-w-lg mx-auto">
        {data.options.map((option, index) => (
          <div key={index}>
            <label
              className={cn(
                'relative overflow-hidden block px-5 py-6 hover:bg-[#f9f9f9] select-none cursor-pointer border-b border-slate-100',
                {
                  'bg-blue-50 hover:bg-blue-50': selectedAnswerIndex === index,
                },
              )}
            >
              {option}
              <input
                className="absolute opacity-0"
                type="radio"
                name={data.question}
                value={option}
                checked={selectedAnswerIndex === index}
                onChange={() => setSelectedAnswerIndex(index)}
              />
              {selectedAnswerIndex === index && (
                <Icons.Check
                  size={25}
                  className="text-green-500 absolute right-5 top-1/2 -translate-y-1/2"
                />
              )}
            </label>
          </div>
        ))}
      </Card>
      <Button
        disabled={selectedAnswerIndex === undefined}
        fullWidth
        size="lg"
        className="mt-20"
        onClick={nextHandler}
      >
        Next
      </Button>
    </div>
  );
}
