import { PropsWithChildren } from 'react';
import { cn } from 'utils/cn';

type Props = {
  className?: string;
  color?: 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
  fullWidth?: boolean;
  size?: 'sm' | 'md' | 'lg';
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
};

export default function Button({
  children,
  className = '',
  type = 'submit',
  color = 'primary',
  disabled = false,
  size = 'md',
  onClick,
  fullWidth = false,
}: PropsWithChildren<Props>) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'rounded-md capitalize select-none',
        {
          'bg-primary-100 hover:bg-primary-200 text-white': color === 'primary',
          'bg-slate-300 hover:bg-slate-500 text-white': color === 'secondary',
          'bg-[#d24747] hover:bg-red-600 text-white': color === 'danger',
          'text-sm py-2 px-2': size === 'sm',
          'text-md font-medium py-2 px-2 lg:px-4': size === 'md',
          'text-lg font-medium py-3 px-5': size === 'lg',
          'w-full': fullWidth,
          'cursor-not-allowed pointer-events-none': disabled,
          'opacity-50': disabled,
        },
        className,
      )}
      type={type}
    >
      {children}
    </button>
  );
}
