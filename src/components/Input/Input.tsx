import clsx from 'clsx';
import { FC, HTMLInputTypeAttribute, InputHTMLAttributes } from 'react';
import { useFormContext } from 'react-hook-form';

import styles from './Input.module.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  type: HTMLInputTypeAttribute | 'textarea';
  name: string;
  hasError?: boolean;
}

const Input: FC<InputProps> = ({ name, type, defaultValue, hasError }) => {
  const { register } = useFormContext() ?? {};

  const className = clsx(styles.input, hasError && styles.hasError);

  if (name === 'search') return <input className={className} placeholder="Input text" />;

  if (type === 'textarea')
    return (
      <textarea
        className={className}
        {...register(name)}
        placeholder="Input text"
        aria-invalid={hasError ? 'true' : 'false'}
      ></textarea>
    );

  if (defaultValue)
    return (
      <input
        className={className}
        type={type}
        {...register(name)}
        placeholder="Input text"
        aria-invalid={hasError ? 'true' : 'false'}
      />
    );

  return (
    <input
      className={className}
      type={type}
      {...register(name)}
      placeholder="Input text"
      aria-invalid={hasError ? 'true' : 'false'}
    />
  );
};
export default Input;
