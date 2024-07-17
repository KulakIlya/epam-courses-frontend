import { FC, useEffect, useState } from 'react';

import Button from '../../components/Button';
import CoursesList from '../../components/CoursesList';
import SearchBar from '../../components/SearchBar';

import errorNotification from '../../helpers/errorNotification';

import { fetchAllAuthors } from '../../redux/authors/operations';
import { fetchAllCourses } from '../../redux/courses/operations';
import { selectCourseList } from '../../redux/courses/selectors';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchUser } from '../../redux/user/operations';
import { selectIsLoggedIn } from '../../redux/user/selectors';

import styles from './CoursesPage.module.css';

import { selectAuthorsList } from '../../redux/authors/selectors';
import { HandleFilter } from './CoursesPage.type';

const CoursesPage: FC = () => {
  const [filter, setFilter] = useState<string>('');

  const coursesList = useAppSelector(selectCourseList);
  const authors = useAppSelector(selectAuthorsList);
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  const dispatch = useAppDispatch();

  const handleFilter: HandleFilter = (newFilter: string) => setFilter(newFilter);

  useEffect(() => {
    const fetch = async () => {
      try {
        if (!isLoggedIn) await dispatch(fetchUser()).unwrap();
        if (!coursesList.length) await dispatch(fetchAllCourses()).unwrap();

        if (!authors.length) await dispatch(fetchAllAuthors()).unwrap();
      } catch (error) {
        errorNotification(error as string);
      }
    };
    fetch();
  }, [dispatch, isLoggedIn, authors, coursesList]);

  return (
    <>
      <div className={styles.wrapper}>
        <SearchBar onSubmit={handleFilter} />
        <Button redirectTo="add">Add course</Button>
      </div>
      <CoursesList list={coursesList} filter={filter} />
    </>
  );
};
export default CoursesPage;
