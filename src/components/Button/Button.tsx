import clsx from 'clsx';
import { FC, ReactNode } from 'react';
import styles from './Button.module.css';

interface ButtonProps {
  children: ReactNode;
  type: 'submit' | 'button';
  onClick?: () => void;
  disabled?: boolean;
}

const Button: FC<ButtonProps> = ({ children, type, onClick, disabled }) => {
  const className = clsx(styles.button, disabled && styles.disabled);
  return (
    <button className={className} type={type} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};
export default Button;
