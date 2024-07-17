import { yupResolver } from '@hookform/resolvers/yup/src/yup.js';
import { ChangeEvent, FC, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import * as yup from 'yup';

import { convertTime } from '../../helpers/convertTime';
import errorNotification from '../../helpers/errorNotification';

import { addAuthors } from '../../redux/authors/operations';
import { selectAuthorsList } from '../../redux/authors/selectors';
import { addCourse, updateCourse } from '../../redux/courses/operations';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';

import AuthorsList from '../AuthorsList';
import { OnAddAuthor, OnRemoveAuthor } from '../AuthorsList/AuthorsList.types';
import Button from '../Button';
import FormField from '../FormField';

import styles from './CourseForm.module.css';

import Loader from '../../common/Loader';
import coursesService from '../../services/coursesService';
import { Inputs } from './CourseForm.types';

const schema = yup.object({
  title: yup.string().min(2).required(),
  description: yup.string().min(2).required(),
  duration: yup.number().positive().required('Duration is required'),
  _: yup.string(),
});

const CourseForm: FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const authorsList = useAppSelector(selectAuthorsList);

  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [authorsToAdd, setAuthorsToAdd] = useState<(string | undefined)[]>([]);
  const [authorInputValue, setAuthorInputValue] = useState('');
  const [durationValue, setDurationValue] = useState<number | null>(null);

  const filteredAuthorsList = authorsList.filter(item => !authorsToAdd.includes(item.name));

  const methods = useForm<Inputs>({
    resolver: yupResolver(schema),
  });

  const handleAddAuthor: OnAddAuthor = (newAuthor: string) =>
    setAuthorsToAdd(prev => [...prev, newAuthor]);

  const handleRemoveAuthor: OnRemoveAuthor = (filter: string) =>
    setAuthorsToAdd(prev => prev.filter(item => item !== filter));

  const handleAuthorInputChange = (e: ChangeEvent<HTMLInputElement>) =>
    setAuthorInputValue(e.target.value);

  const handleCreateAuthorClick = () => {
    if (!authorsToAdd.includes(authorInputValue)) handleAddAuthor(authorInputValue);
    setAuthorInputValue('');
  };

  const handleDurationChange = (e: ChangeEvent<HTMLInputElement>) =>
    setDurationValue(Number(e.target.value));

  const onSubmit = async (data: Inputs) => {
    // eslint-disable-next-line
    const { _, ...rest } = data;

    try {
      const response = await dispatch(addAuthors(authorsToAdd as string[])).unwrap();

      if (!id)
        await dispatch(addCourse({ ...rest, authors: response.map(item => item._id) })).unwrap();

      if (id)
        await dispatch(
          updateCourse({ ...rest, _id: id, authors: response.map(item => item._id) })
        ).unwrap();

      navigate('/courses');
    } catch (error) {
      errorNotification(error as string);
    }
  };

  useEffect(() => {
    if (!id || !authorsList.length) return;

    setIsLoading(true);

    const fetch = async () => {
      const {
        data: {
          data: { title, authors, description, duration },
        },
      } = await coursesService.fetchCourse(id);

      methods.setValue('title', title);
      methods.setValue('description', description);
      methods.setValue('duration', duration);

      setDurationValue(duration);
      setAuthorsToAdd(authors?.map(id => authorsList.find(author => id === author._id)?.name));

      setIsLoading(false);
    };
    fetch();
  }, [authorsList, id, methods]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className={styles.form}>
        <>
          {isLoading ? (
            <Loader />
          ) : (
            <>
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
                    name="_"
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
                    <AuthorsList
                      list={filteredAuthorsList}
                      type="add"
                      onAddAuthor={handleAddAuthor}
                    />
                  </div>
                  <div>
                    <h3 className={`${styles.formTitle} ${styles.authorsTitle}`}>Course Authors</h3>
                    <AuthorsList
                      list={authorsToAdd}
                      type="remove"
                      onRemoveAuthor={handleRemoveAuthor}
                    />
                  </div>
                </div>
              </div>
              <div className={styles.buttonWrapper}>
                <Button redirectTo="/courses">Cancel</Button>
                {!id ? (
                  <Button type="submit">Create course</Button>
                ) : (
                  <Button type="submit">Update course</Button>
                )}
              </div>
            </>
          )}
        </>
      </form>
    </FormProvider>
  );
};
export default CourseForm;
