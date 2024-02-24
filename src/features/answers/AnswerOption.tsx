import { cn } from 'utils/cn';

interface Props {
  isCorrect: boolean;
  value: string;
}

export default function AnswerOption({ isCorrect, value }: Props) {
  return (
    <li
      className={cn('text-sm p-2 border border-slate-300 rounded-md mb-2', {
        'bg-green-600 text-white border-transparent': isCorrect,
        'bg-red-500 text-white border-transparent': !isCorrect,
      })}
    >
      {value}
    </li>
  );
}
