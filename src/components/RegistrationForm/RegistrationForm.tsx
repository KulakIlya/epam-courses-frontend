import { yupResolver } from '@hookform/resolvers/yup/src/yup.js';
import { FC } from 'react';
import * as yup from 'yup';

import { FormProvider, useForm } from 'react-hook-form';
import { emailValidation } from '../../constants';
import FormField from '../FormField';
import { Inputs } from './RegistrationForm.types';

import { NavLink } from 'react-router-dom';
import Button from '../Button';
import styles from './RegistrationForm.module.css';

const schema = yup
  .object({
    name: yup.string().required('Name is required'),
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

const RegistrationForm: FC = () => {
  const methods = useForm<Inputs>({ resolver: yupResolver(schema) });
  return (
    <FormProvider {...methods}>
      <div className={styles.wrapper}>
        <form className={styles.form}>
          <FormField type="text" title="name" />
          <FormField type="email" title="email" />
          <FormField type="password" title="password" />
          <Button type="submit">Registration</Button>
        </form>
        <p className={styles.text}>
          If you have an account you may <NavLink to="/login">Login</NavLink>
        </p>
      </div>
    </FormProvider>
  );
};
export default RegistrationForm;
