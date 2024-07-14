import clsx from 'clsx';
import { FC, HTMLInputTypeAttribute, InputHTMLAttributes } from 'react';
import { useFormContext } from 'react-hook-form';

import styles from './Input.module.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  type: HTMLInputTypeAttribute | 'textarea';
  name: string;
  hasError?: boolean;
}

const Input: FC<InputProps> = ({ name, type, defaultValue, hasError, value, onChange }) => {
  const { register } = useFormContext() ?? {};

  const className = clsx(styles.input, hasError && styles.hasError);

  if (name === 'search')
    return (
      <input
        className={className}
        placeholder="Input text"
        name={name}
        value={value}
        onChange={onChange}
      />
    );

  if (type === 'textarea')
    return (
      <textarea
        className={className}
        {...register(name)}
        placeholder="Input text"
        aria-invalid={hasError ? 'true' : 'false'}
        value={value}
        onChange={onChange}
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
        value={value}
        onChange={onChange}
      />
    );

  return (
    <input
      className={className}
      type={type}
      {...register(name)}
      placeholder="Input text"
      aria-invalid={hasError ? 'true' : 'false'}
      value={value}
      onChange={onChange}
    />
  );
};
export default Input;
