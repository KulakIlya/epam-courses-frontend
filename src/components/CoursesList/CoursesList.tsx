import { FC } from 'react';
import { mockedCoursesList } from '../../constants';
import CourseCard from '../CourseCard';

import styles from './CoursesList.module.css';

interface CoursesListProps {}

const CoursesList: FC<CoursesListProps> = () => {
  return (
    <ul className={styles.list}>
      {mockedCoursesList.map(item => (
        <CourseCard course={item} key={item.id} />
      ))}
    </ul>
  );
};
export default CoursesList;
