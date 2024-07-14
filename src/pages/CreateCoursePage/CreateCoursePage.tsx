import { FC, useEffect } from 'react';
import CourseForm from '../../components/CourseForm';
import { fetchAllAuthors } from '../../redux/authors/operations';
import { selectAuthorsList } from '../../redux/authors/selectors';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';

interface CreateCoursePageProps {}

const CreateCoursePage: FC<CreateCoursePageProps> = () => {
  const authors = useAppSelector(selectAuthorsList);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!authors.length) dispatch(fetchAllAuthors());
  }, [dispatch, authors]);

  return (
    <>
      <h2> Course Edit/Create Page</h2>
      <CourseForm />
    </>
  );
};
export default CreateCoursePage;
