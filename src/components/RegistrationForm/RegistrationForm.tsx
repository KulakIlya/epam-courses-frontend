import { yupResolver } from '@hookform/resolvers/yup/src/yup.js';
import { AxiosError } from 'axios';
import { FC } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router-dom';
import * as yup from 'yup';

import { emailValidation } from '../../constants';
import FormField from '../FormField';

import { ErrorResponse } from '../../redux/user/user.types';
import Button from '../Button';
import styles from './RegistrationForm.module.css';

import errorNotification from '../../helpers/errorNotification';
import userService from '../../services/userService';
import { Inputs } from './RegistrationForm.types';

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
  const navigate = useNavigate();

  const methods = useForm<Inputs>({ resolver: yupResolver(schema) });

  const onSubmit = async (data: Inputs) => {
    try {
      await userService.registerUser(data);
      navigate('/login');
    } catch (error) {
      errorNotification(error as AxiosError<ErrorResponse>);
    }
  };

  return (
    <FormProvider {...methods}>
      <div className={styles.wrapper}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className={styles.form}>
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
