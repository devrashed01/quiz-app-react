import clsx from 'clsx';
import { useRef, useState } from 'react';
import { LoaderIcon } from 'react-hot-toast';

import Icons from 'components/Icons';
import { cn } from 'utils/cn';
import useClickOutside from 'utils/useClickOutside';

type Props = {
  value?: SelectOption;
  placeholder?: string;
  options: SelectOption[];
  name?: string;
  className?: string;
  containerClass?: string;
  align?: 'left' | 'right';
  error?: boolean;
  helpText?: string;
  label?: string;
  isLoading?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'outlined' | 'contained';
  onChange: (target: { target: { value: SelectOption; name: string } }) => void;
};

const Select = ({
  value,
  placeholder,
  options,
  onChange,
  name = '',
  className = '',
  containerClass = '',
  align = 'left',
  error,
  helpText,
  isLoading = false,
  label,
  size = 'md',
  variant = 'outlined',
}: Props) => {
  const [open, setOpen] = useState<boolean>(false);

  const toggle = () => {
    setOpen((prev) => !prev);
  };
  const closeHandler = () => {
    setOpen(false);
  };

  const ref = useRef(null);
  useClickOutside(ref, closeHandler);

  const selectHandler = (value: SelectOption) => {
    onChange({ target: { value, name } });
    closeHandler();
  };

  return (
    <div ref={ref} className={clsx('relative inline-block', containerClass)}>
      {label && (
        <label htmlFor={name} className="block text-sm font-medium text-slate-500 mb-2">
          {label}
        </label>
      )}
      <div
        onClick={toggle}
        className={cn(
          'w-full cursor-pointer border border-transparent select-none flex items-center rounded-md px-3',
          {
            'h-[40px]': size === 'lg',
            'h-[35px]': size === 'md',
            'h-[30px]': size === 'sm',
            'bg-slate-200': variant === 'contained',
            'bg-inherit border-[1.5px] border-slate-300': variant === 'outlined',
            'border-red-400 focus:border-red-500 focus:ring-red-500': error,
          },
          className,
        )}
      >
        <span className={clsx('whitespace-nowrap mr-auto', { 'text-gray': !value })}>
          {value?.label ?? placeholder}
        </span>{' '}
        {isLoading && <LoaderIcon className="mr-3" />}
        <Icons.ChevronDown size={15} className="ml-1" />
      </div>
      <ul
        className={clsx(
          'absolute top-full z-20 min-w-full w-max border border-slate-200 border-solid shadow-sm rounded-md bg-white transition-all',
          {
            'visible opacity-100': open,
            'invisible opacity-0': !open,
          },
          align === 'left' ? 'left-0' : 'right-0',
        )}
      >
        {options.length <= 0 && (
          <li role="button" className="px-3 py-4">
            No Option Found
          </li>
        )}
        {options.map((option, i) => (
          <li
            role="button"
            key={i}
            className="px-3 py-1 hover:bg-slate-50 cursor-pointer"
            onClick={() => selectHandler(option)}
          >
            {option.label}
          </li>
        ))}
      </ul>
      <p className="text-red-500 text-sm font-semibold my-1">{helpText}</p>
    </div>
  );
};

export default Select;
