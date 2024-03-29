import Card from 'components/Card';
import Button from 'components/form/button';

interface Props {
  onClick: () => void;
}

export default function QuizCompleteScreen({ onClick }: Props) {
  return (
    <Card className="p-10 flex flex-col items-center text-center justify-center gap-10">
      <h3 className="text-2xl text-slate-700">You have successfully completed the quiz</h3>
      <Button onClick={onClick}>Okay</Button>
    </Card>
  );
}
