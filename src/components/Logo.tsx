type Props = {
  className?: string;
};

export default function Logo({ className }: Props) {
  return (
    <p className="text-2xl font-bold text-blue-500">
      <span className="text-blue-400">Quiz</span>App
    </p>
  );
}
