import { FC } from 'react';

import Button from '../../components/Button';
import CoursesList from '../../components/CoursesList';
import SearchBar from '../../components/SearchBar';

import styles from './CoursesPage.module.css';

const CoursesPage: FC = () => {
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
