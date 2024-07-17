import { ChangeEventHandler, FC, HTMLInputTypeAttribute } from 'react';
import { useFormContext } from 'react-hook-form';

import Input from '../Input';

import styles from './FormField.module.css';

interface FormFieldProps {
  type: HTMLInputTypeAttribute | 'textarea';
  title: string;
  name?: string;
  value?: string;
  defaultValue?: string;
  onChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
}

const FormField: FC<FormFieldProps> = ({ type, title, name, value, onChange, defaultValue }) => {
  const {
    formState: { errors },
  } = useFormContext();

  if (type === 'textarea')
    return (
      <label className={styles.label}>
        <span className={styles.title}>{title}</span>
        <Input
          name={name ?? ''}
          type={type}
          hasError={!!errors[title]}
          value={value}
          onChange={onChange}
          defaultValue={defaultValue}
        />
        {errors[title] && (
          <p className={styles.error} role="alert">
            {errors[title].message as string}
          </p>
        )}
      </label>
    );
  return (
    <label className={styles.label}>
      <span className={styles.title}>{title}</span>
      <Input
        name={name ?? ''}
        type={type}
        hasError={!!errors[title]}
        value={value}
        onChange={onChange}
        defaultValue={defaultValue}
      />
      {errors[title] && (
        <p className={styles.error} role="alert">
          {errors[title].message as string}
        </p>
      )}
    </label>
  );
};

export default FormField;
