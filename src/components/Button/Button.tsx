import clsx from 'clsx';
import { FC, ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Button.module.css';

interface ButtonProps {
  children: ReactNode;
  type?: 'submit' | 'button';
  onClick?: () => void;
  disabled?: boolean;
  redirectTo?: string;
}

const Button: FC<ButtonProps> = ({ children, type, onClick, disabled, redirectTo }) => {
  const className = clsx(styles.button, disabled && styles.disabled);
  if (redirectTo)
    return (
      <NavLink className={className} to={redirectTo}>
        {children}
      </NavLink>
    );

  return (
    <button className={className} type={type} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};
export default Button;
