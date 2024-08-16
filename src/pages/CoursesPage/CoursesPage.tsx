import { FC, useEffect, useState } from 'react';

import Button from '../../components/Button';
import CoursesList from '../../components/CoursesList';
import SearchBar from '../../components/SearchBar';

import errorNotification from '../../helpers/errorNotification';

import { fetchAllCourses } from '../../redux/courses/operations';
import { selectCourseList } from '../../redux/courses/selectors';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { selectIsLoggedIn } from '../../redux/user/selectors';

import styles from './CoursesPage.module.css';

import { useNavigate } from 'react-router';
import { fetchAllAuthors } from '../../redux/authors/operations';
import { selectAuthorsList } from '../../redux/authors/selectors';
import { fetchUser } from '../../redux/user/operations';
import { HandleFilter } from './CoursesPage.type';

const CoursesPage: FC = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<string>('');

  const coursesList = useAppSelector(selectCourseList);
  const authors = useAppSelector(selectAuthorsList);
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  const dispatch = useAppDispatch();

  const handleFilter: HandleFilter = (newFilter: string) => setFilter(newFilter);

  useEffect(() => {
    const fetch = async () => {
      try {
        if (isLoggedIn) return;

        await dispatch(fetchUser())
          .unwrap()
          .catch(() => navigate('/login'));

        await dispatch(fetchAllCourses());

        await dispatch(fetchAllAuthors());
      } catch (error) {
        errorNotification(error as string);
      }
    };

    fetch();
  }, [dispatch, isLoggedIn, authors, coursesList, navigate]);

  return (
    <>
      <div className={styles.wrapper}>
        <SearchBar onSubmit={handleFilter} />
        <Button redirectTo="add">Add course</Button>
      </div>
      <CoursesList list={coursesList || []} filter={filter} />
    </>
  );
};
export default CoursesPage;
