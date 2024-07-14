import { ChangeEvent, FC, useState } from 'react';
import * as yup from 'yup';

import { yupResolver } from '@hookform/resolvers/yup/src/yup.js';
import { AxiosError } from 'axios';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { convertTime } from '../../helpers/convertTime';
import errorNotification from '../../helpers/errorNotification';
import { addAuthors } from '../../redux/authors/operations';
import { selectAuthorsList } from '../../redux/authors/selectors';
import { addCourse } from '../../redux/courses/operations';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { ErrorResponse } from '../../redux/user/user.types';
import AuthorsList from '../AuthorsList';
import { OnAddAuthor, OnRemoveAuthor } from '../AuthorsList/AuthorsList.types';
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
  omit: yup.string(),
});

const CourseForm: FC<CourseFormProps> = ({ isEditing = false }) => {
  const navigate = useNavigate();

  const [authorsToAdd, setAuthorsToAdd] = useState<string[]>([]);
  const [authorInputValue, setAuthorInputValue] = useState<string>('');
  const [durationValue, setDurationValue] = useState<number | null>(null);

  const authorsList = useAppSelector(selectAuthorsList);

  const filteredAuthorsList = authorsList.filter(item => !authorsToAdd.includes(item.name));

  const methods = useForm<Inputs>({ resolver: yupResolver(schema) });

  const dispatch = useAppDispatch();

  const handleAddAuthor: OnAddAuthor = (newAuthor: string) =>
    setAuthorsToAdd(prev => [...prev, newAuthor]);

  const handleRemoveAuthor: OnRemoveAuthor = (filter: string) =>
    setAuthorsToAdd(prev => prev.filter(item => item !== filter));

  const handleAuthorInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAuthorInputValue(e.target.value);
  };

  const handleCreateAuthorClick = () => {
    if (!authorsToAdd.includes(authorInputValue)) handleAddAuthor(authorInputValue);
    setAuthorInputValue('');
  };

  const handleDurationChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDurationValue(Number(e.target.value));
  };

  const onSubmit = async (data: Inputs) => {
    // eslint-disable-next-line
    const { omit, ...rest } = data;

    try {
      const response = await dispatch(addAuthors(authorsToAdd)).unwrap();

      await dispatch(addCourse({ ...rest, authors: response.map(item => item._id) })).unwrap();

      navigate('/courses');
    } catch (error) {
      errorNotification(error as AxiosError<ErrorResponse>);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} noValidate className={styles.form}>
        <div className={styles.wrapper}>
          <h3 className={styles.formTitle}>Main info</h3>
          <div className={`${styles.field} ${styles.mainField}`}>
            <FormField title="title" name="title" type="text" />
          </div>
          <div className={`${styles.field} ${styles.mainField}`}>
            <FormField title="description" name="description" type="textarea" />
          </div>
          <h3 className={styles.formTitle}>Duration</h3>
          <div className={styles.field}>
            <FormField
              title="duration"
              name="duration"
              type="number"
              onChange={handleDurationChange}
            />
            <span>
              <span className="bolded-text">{convertTime(Number(durationValue))}</span> hours
            </span>
          </div>

          <h3 className={styles.formTitle}>Authors</h3>
          <div className={`${styles.field} ${styles.authorField}`}>
            <FormField
              title="author name"
              name="omit"
              type="text"
              value={authorInputValue}
              onChange={handleAuthorInputChange}
            />
            <Button type="button" onClick={handleCreateAuthorClick}>
              Create author
            </Button>
          </div>
          <div className={styles.authorsWrapper}>
            <div>
              <h4 className={`${styles.formTitle} ${styles.authorsTitle}`}>Authors List</h4>
              <AuthorsList list={filteredAuthorsList} type="add" onAddAuthor={handleAddAuthor} />
            </div>
            <div>
              <h3 className={`${styles.formTitle} ${styles.authorsTitle}`}>Course Authors</h3>
              <AuthorsList list={authorsToAdd} type="remove" onRemoveAuthor={handleRemoveAuthor} />
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
