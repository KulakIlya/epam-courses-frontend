import { FC, lazy, Suspense, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import errorNotification from '../../helpers/errorNotification';
import { useAppDispatch } from '../../redux/hooks';
import { fetchUser } from '../../redux/user/operations';
import SharedLayout from '../SharedLayout';

const RegistrationPage = lazy(() => import('../../pages/RegistrationPage'));
const LoginPage = lazy(() => import('../../pages/LoginPage'));
const CoursesPage = lazy(() => import('../../pages/CoursesPage'));
const CourseDetailsPage = lazy(() => import('../../pages/CourseDetailsPage'));
const CreateCoursePage = lazy(() => import('../../pages/CreateCoursePage'));

const App: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUser()).unwrap().catch(errorNotification);
  }, [dispatch]);

  return (
    <SharedLayout>
      <Suspense fallback={<p>Loading...</p>}>
        <Routes>
          <Route path="/registration" element={<RegistrationPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/courses">
            <Route index element={<CoursesPage />} />
            <Route path=":id" element={<CourseDetailsPage />} />
            <Route path="add" element={<CreateCoursePage />} />
            <Route path="update/:id" element={<CreateCoursePage />} />
          </Route>
        </Routes>
      </Suspense>
    </SharedLayout>
  );
};
export default App;
