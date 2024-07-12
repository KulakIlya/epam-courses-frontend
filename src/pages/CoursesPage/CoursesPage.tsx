import { FC, useEffect } from 'react';

import Button from '../../components/Button';
import CoursesList from '../../components/CoursesList';
import SearchBar from '../../components/SearchBar';

import errorNotification from '../../helpers/errorNotification';
import { useAppDispatch } from '../../redux/hooks';
import { fetchUser } from '../../redux/user/operations';
import styles from './CoursesPage.module.css';

const CoursesPage: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUser())
      .unwrap()
      .catch(err => errorNotification(err));
  }, [dispatch]);
  return (
    <>
      <div className={styles.wrapper}>
        <SearchBar />
        <Button redirectTo="add">Add course</Button>
      </div>
      <CoursesList />
    </>
  );
};
export default CoursesPage;
