import { FC } from 'react';
import { mockedCoursesList } from '../../constants';

import Button from '../../components/Button';
import styles from './CourseDetailsPage.module.css';
import { convertTime } from '../../helpers/convertTime';

const { title, description, id: courseId, duration, creationDate } = mockedCoursesList[0];

const CourseDetailsPage: FC = () => {
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
            <span className={`regular-text ${styles.cardValue}`}>{creationDate}</span>
          </p>
          <p>
            <span className={styles.cardTitle}>Authors:</span>{' '}
            <span className={`regular-text ${styles.cardValue}`}>
              {/* {authors?.map(id => allAuthors.find(author => id === author.id)?.name).join(', ')} */}
            </span>
          </p>
        </div>
      </div>
      <Button redirectTo="/courses">Back</Button>
    </div>
  );
};
export default CourseDetailsPage;
