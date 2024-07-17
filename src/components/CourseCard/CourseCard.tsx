import { FC } from 'react';
import { Course } from '../../redux/courses/courses.types';

import { convertTime } from '../../helpers/convertTime';
import Button from '../Button';

import Icon from '../../common/Icon';
import errorNotification from '../../helpers/errorNotification';
import formatCreatedAt from '../../helpers/formatCreatedAt';
import { selectAuthorsList } from '../../redux/authors/selectors';
import { deleteCourse } from '../../redux/courses/operations';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import styles from './CourseCard.module.css';

interface CourseCardProps {
  course: Course;
}

const CourseCard: FC<CourseCardProps> = ({
  course: { title, description, authors, duration, createdAt, _id },
}) => {
  const dispatch = useAppDispatch();

  const allAuthors = useAppSelector(selectAuthorsList);

  const handleRemoveCourse = async () => {
    try {
      await dispatch(deleteCourse(_id));
    } catch (error) {
      errorNotification(error as string);
    }
  };

  return (
    <li className={styles.card}>
      <h2 className={styles.title}>{title}</h2>

      <div className={styles.grid}>
        <div>
          <p className={`${styles.description} regular-text`}>{description}</p>
        </div>
        <div>
          <div>
            <p>
              Authors:{' '}
              <span className="regular-text">
                {authors.map(id => allAuthors.find(author => id === author._id)?.name).join(', ')}
              </span>
            </p>
            <p>
              Duration: <span className="regular-text">{convertTime(duration)} hours</span>
            </p>
            <p>
              Created: <span className="regular-text">{formatCreatedAt(createdAt)}</span>
            </p>
          </div>
          <div className={styles.buttons}>
            <Button redirectTo={`${_id}`}>Show Course</Button>

            <>
              <Button onClick={handleRemoveCourse}>
                <Icon iconName="course-bin" size={{ width: 25, height: 25 }} fillColor="#ffffff" />
              </Button>
              <Button redirectTo={`edit/${_id}`}>
                <Icon iconName="edit" size={{ width: 25, height: 25 }} fillColor="#ffffff" />
              </Button>
            </>
          </div>
        </div>
      </div>
    </li>
  );
};
export default CourseCard;
