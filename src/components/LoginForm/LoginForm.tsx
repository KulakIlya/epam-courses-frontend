import { yupResolver } from '@hookform/resolvers/yup/src/yup.js';
import { FC } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';

import { emailValidation } from '../../constants';
import FormField from '../FormField';
import { Inputs } from './LoginForm.types';

import { AxiosError } from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';
import errorNotification from '../../helpers/errorNotification';
import { useAppDispatch } from '../../redux/hooks';
import { login } from '../../redux/user/operations';
import { ErrorResponse, UserToLogin } from '../../redux/user/user.types';
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
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const methods = useForm<Inputs>({ resolver: yupResolver(schema) });

  const onSubmit = (data: UserToLogin) =>
    dispatch(login(data))
      .unwrap()
      .then(() => navigate('/courses'))
      .catch(error => errorNotification(error as AxiosError<ErrorResponse>));

  return (
    <FormProvider {...methods}>
      <div className={styles.wrapper}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className={styles.form}>
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
