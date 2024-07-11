import { FC, useState } from 'react';
import * as yup from 'yup';

import { yupResolver } from '@hookform/resolvers/yup/src/yup.js';
import { FormProvider, useForm } from 'react-hook-form';
import { mockedAuthorsList } from '../../constants';
import { convertTime } from '../../helpers/convertTime';
import AuthorsList from '../AuthorsList';
import Button from '../Button';
import FormField from '../FormField';
import styles from './CourseForm.module.css';
import { Inputs } from './CourseForm.types';

interface CourseFormProps {
  isEditing?: boolean;
}

const schema = yup.object({
  title: yup.string().min(2).required(),
  description: yup.string().min(2).required(),
  duration: yup.number().positive().required('Duration is required'),
});

const authorsList = mockedAuthorsList;

const CourseForm: FC<CourseFormProps> = ({ isEditing = false }) => {
  const methods = useForm<Inputs>({ resolver: yupResolver(schema) });

  const onSubmit = (data: Inputs) => console.log(data);

  const [durationValue] = useState<number | null>(null);
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} noValidate className={styles.form}>
        <div className={styles.wrapper}>
          <h3 className={styles.formTitle}>Main info</h3>
          <div className={`${styles.field} ${styles.mainField}`}>
            <FormField title="title" type="text" />
          </div>
          <div className={`${styles.field} ${styles.mainField}`}>
            <FormField title="description" type="textarea" />
          </div>
          <h3 className={styles.formTitle}>Duration</h3>
          <div className={styles.field}>
            <FormField title="duration" type="number" />
            <span>
              <span className="bolded-text">{convertTime(Number(durationValue))}</span> hours
            </span>
          </div>

          <h3 className={styles.formTitle}>Authors</h3>
          <div className={`${styles.field} ${styles.authorField}`}>
            <FormField title="author name" type="text" />
            <Button type="button">Create author</Button>
          </div>
          <div className={styles.authorsWrapper}>
            <div>
              <h4 className={`${styles.formTitle} ${styles.authorsTitle}`}>Authors List</h4>
              <AuthorsList list={authorsList} type="add" />
            </div>
            <div>
              <h3 className={`${styles.formTitle} ${styles.authorsTitle}`}>Course Authors</h3>
              <AuthorsList list={authorsList} type="remove" />
            </div>
          </div>
        </div>
        <div className={styles.buttonWrapper}>
          <Button redirectTo="/courses">Cancel</Button>
          {!isEditing ? (
            <Button type="submit">Create course</Button>
          ) : (
            <Button type="submit">Update course</Button>
          )}
        </div>
      </form>
    </FormProvider>
  );
};
export default CourseForm;
