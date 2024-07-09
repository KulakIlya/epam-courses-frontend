import { yupResolver } from '@hookform/resolvers/yup/src/yup.js';
import { FC } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';

import { emailValidation } from '../../constants';
import FormField from '../FormField';
import { Inputs } from './LoginForm.types';

import { NavLink } from 'react-router-dom';
import Button from '../Button';
import styles from './LoginForm.module.css';

const schema = yup
  .object({
    email: yup
      .string()
      .matches(emailValidation, 'Email is not valid')
      .required('Email is required'),
    password: yup
      .string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  })
  .required();

const LoginForm: FC = () => {
  const methods = useForm<Inputs>({ resolver: yupResolver(schema) });

  return (
    <FormProvider {...methods}>
      <div className={styles.wrapper}>
        <form className={styles.form}>
          <FormField title="email" type="email" />
          <FormField title="password" type="password" />
          <Button type="submit">Login</Button>
        </form>
        <p className={styles.text}>
          If you don't have an account you may <NavLink to="/registration">Registration</NavLink>
        </p>
      </div>
    </FormProvider>
  );
};
export default LoginForm;
