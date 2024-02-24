import Card from 'components/Card';
import Icons from 'components/Icons';
import Button from 'components/form/button';
import { cn } from 'utils/cn';

interface Props {
  index: number;
  question: QuestionType;
  onDelete?: (id: string) => void;
  onEdit?: (question: QuestionType) => void;
}

export default function QuestionCard({
  index,
  question,
  onDelete = () => {},
  onEdit = () => {},
}: Props) {
  return (
    <Card key={question.id} className="p-4 mb-2">
      <h3 className="flex items-start justify-between">
        <span className="flex-1">
          {index + 1}. {question.question}{' '}
        </span>
        <div className="ml-auto flex">
          <Button onClick={() => onDelete(question.id)} size="sm" color="danger" className="mr-1">
            <Icons.Trash size={12} />
          </Button>
          <Button onClick={() => onEdit(question)} size="sm">
            <Icons.Edit size={12} />
          </Button>
        </div>
      </h3>
      <ol className="grid grid-cols-2 gap-2 mt-5">
        {question.options.map((option, index) => (
          <li
            style={{ listStyleType: 'lower-latin' }}
            className={cn('text-sm list-inside', {
              'text-green-600': index === question.correctAnswer,
            })}
            key={index}
          >
            {option}
          </li>
        ))}
      </ol>
    </Card>
  );
}
