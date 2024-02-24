import clsx from 'clsx';
import { ChangeEventHandler } from 'react';
import { cn } from 'utils/cn';

type Props = {
  label?: string | JSX.Element;
  type?: React.HTMLInputTypeAttribute | 'toggle';
  name?: string;
  disabled?: boolean;
  className?: string;
  inputClassName?: string;
  error?: boolean;
  helpText?: string;
  value?: string | number | readonly string[] | undefined;
  placeholder?: string;
  prefix?: string | JSX.Element;
  afterFix?: JSX.Element;
  readOnly?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'outlined' | 'contained';
};

export default function Input({
  label,
  type = 'text',
  name,
  disabled = false,
  className = '',
  inputClassName = '',
  value = '',
  placeholder,
  error,
  helpText,
  prefix = '',
  afterFix,
  readOnly = false,
  size = 'md',
  variant = 'outlined',
  onChange,
}: Props) {
  return (
    <div className={clsx('w-full', className)}>
      {label && (
        <label
          htmlFor={name}
          className="flex items-center gap-2 text-sm font-medium text-slate-500 mb-2"
        >
          {label}
        </label>
      )}
      <div
        className={cn(
          'relative flex items-center border border-transparent placeholder-slate-400  disabled:bg-slate-50 disabled:text-slate-500 focus:outline-none focus:ring-sky-500 w-full rounded-md overflow-hidden sm:text-sm focus:ring-1 invalid:text-pink-600  focus:invalid:ring-pink-500 disabled:shadow-none',
          {
            'h-[40px]': size === 'lg',
            'h-[35px]': size === 'md',
            'h-[30px]': size === 'sm',
            'bg-slate-200': variant === 'contained',
            'bg-inherit border-[1.5px] border-slate-300': variant === 'outlined',
            'border-red-400': error,
          },
          inputClassName,
        )}
      >
        {prefix && <span className="pl-1">{prefix}</span>}
        <input
          readOnly={readOnly}
          placeholder={placeholder}
          value={value}
          type={type}
          name={name}
          id={name}
          disabled={disabled}
          className={clsx('px-3 h-full w-full outline-none bg-inherit', {
            '!pl-[1px]': prefix,
          })}
          onChange={onChange}
        />
        {afterFix && afterFix}
      </div>
      <p className="text-red-500 text-xs font-medium my-1">{helpText}</p>
    </div>
  );
}
