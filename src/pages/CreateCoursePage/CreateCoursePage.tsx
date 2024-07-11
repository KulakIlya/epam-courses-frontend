import { FC } from 'react';
import CourseForm from '../../components/CourseForm';

interface CreateCoursePageProps {}

const CreateCoursePage: FC<CreateCoursePageProps> = () => {
  return (
    <>
      <h2> Course Edit/Create Page</h2>
      <CourseForm />
    </>
  );
};
export default CreateCoursePage;
