import { FC, useMemo } from 'react';
import CourseCard from '../CourseCard';

import { Course } from '../../redux/courses/courses.types';
import styles from './CoursesList.module.css';

interface CoursesListProps {
  list: Course[];
  filter: string;
}

const CoursesList: FC<CoursesListProps> = ({ list, filter }) => {
  const filteredList = useMemo(() => {
    return list.filter(
      item =>
        item._id.toLowerCase().includes(filter.toLowerCase()) ||
        item.title.toLowerCase().includes(filter.toLowerCase())
    );
  }, [filter, list]);

  return (
    <ul className={styles.list}>
      {filteredList.map(item => (
        <CourseCard course={item} key={item._id} />
      ))}
    </ul>
  );
};
export default CoursesList;
