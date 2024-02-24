import { PropsWithChildren } from 'react';

import { cn } from 'utils/cn';

type Props = {
  className?: string;
};

export default function Card({ children, className }: PropsWithChildren<Props>) {
  return (
    <div className={cn('p-3 bg-white border border-slate-200 shadow-sm rounded-xl', className)}>
      {children}
    </div>
  );
}
