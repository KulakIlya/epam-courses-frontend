import { FC } from 'react';
import { Course } from '../../redux/courses/courses.types';

import { mockedAuthorsList } from '../../constants';
import { convertTime } from '../../helpers/convertTime';
import Button from '../Button';

import Icon from '../../common/Icon';
import styles from './CourseCard.module.css';

interface CourseCardProps {
  course: Course;
}

const CourseCard: FC<CourseCardProps> = ({
  course: { title, description, authors, duration, creationDate, id },
}) => {
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
                {authors
                  .map(id => mockedAuthorsList.find(author => id === author.id)?.name)
                  .join(', ')}
              </span>
            </p>
            <p>
              Duration: <span className="regular-text">{convertTime(duration)} hours</span>
            </p>
            <p>
              Created: <span className="regular-text">{creationDate}</span>
            </p>
          </div>
          <div className={styles.buttons}>
            <Button redirectTo={`${id}`}>Show Course</Button>

            <>
              <Button>
                <Icon iconName="course-bin" size={{ width: 25, height: 25 }} fillColor="#ffffff" />
              </Button>
              <Button>
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
