import { cn } from 'utils/cn';

type Props = {
  className?: string;
};

export default function Logo({ className }: Props) {
  return (
    <p className={cn('text-2xl font-bold text-blue-500', className)}>
      <span className="text-blue-400">Quiz</span>App
    </p>
  );
}
