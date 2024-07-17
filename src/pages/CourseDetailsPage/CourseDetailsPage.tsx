import { FC, useEffect, useState } from 'react';

import Button from '../../components/Button';
import { convertTime } from '../../helpers/convertTime';

import { useParams } from 'react-router-dom';
import errorNotification from '../../helpers/errorNotification';
import formatCreatedAt from '../../helpers/formatCreatedAt';
import { fetchAllAuthors } from '../../redux/authors/operations';
import { selectAuthorsList } from '../../redux/authors/selectors';
import { Course } from '../../redux/courses/courses.types';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import coursesService from '../../services/coursesService';
import styles from './CourseDetailsPage.module.css';

const INITIAL_STATE = {
  _id: '',
  title: '',
  description: '',
  duration: 0,
  owner: '',
  authors: [],
  createdAt: '',
};

const CourseDetailsPage: FC = () => {
  const { id } = useParams();

  const allAuthors = useAppSelector(selectAuthorsList);

  const [{ title, description, _id: courseId, duration, createdAt, authors }, setCourse] =
    useState<Course>(INITIAL_STATE);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetch = async () => {
      try {
        const {
          data: { data },
        } = await coursesService.fetchCourse(id!);

        dispatch(fetchAllAuthors());
        setCourse(data);
      } catch (error) {
        errorNotification(error as string);
      }
    };
    fetch();
  }, [dispatch, id]);
  return (
    <div className={`container ${styles.wrapper}`}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.courseInfo}>
        <div>
          <p className={styles.cardTitle}>Description:</p>
          <p className={`regular-text ${styles.description}`}>{description}</p>
        </div>
        <div className={styles.rightSide}>
          <p>
            <span className={styles.cardTitle}>ID:</span>{' '}
            <span className={`regular-text ${styles.cardValue}`}>{courseId}</span>
          </p>
          <p>
            <span className={styles.cardTitle}>Duration:</span>{' '}
            <span className={`regular-text ${styles.cardValue}`}>
              <span className="bolded-text">{convertTime(duration ?? 0)}</span> hours
            </span>
          </p>
          <p>
            <span className={styles.cardTitle}>Created:</span>{' '}
            <span className={`regular-text ${styles.cardValue}`}>
              {createdAt && formatCreatedAt(createdAt)}
            </span>
          </p>
          <p>
            <span className={styles.cardTitle}>Authors:</span>{' '}
            <span className={`regular-text ${styles.cardValue}`}>
              {authors?.map(id => allAuthors.find(author => id === author._id)?.name).join(', ')}
            </span>
          </p>
        </div>
      </div>
      <Button redirectTo="/courses">Back</Button>
    </div>
  );
};
export default CourseDetailsPage;
