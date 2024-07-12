import { FC, lazy, Suspense, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import errorNotification from '../../helpers/errorNotification';
import { useAppDispatch } from '../../redux/hooks';
import { fetchUser } from '../../redux/user/operations';
import PrivateRoute from '../PrivateRoute';
import RestrictedRoute from '../RestrictedRoute';
import SharedLayout from '../SharedLayout';

const RegistrationPage = lazy(() => import('../../pages/RegistrationPage'));
const LoginPage = lazy(() => import('../../pages/LoginPage'));
const CoursesPage = lazy(() => import('../../pages/CoursesPage'));
const CourseDetailsPage = lazy(() => import('../../pages/CourseDetailsPage'));
const CreateCoursePage = lazy(() => import('../../pages/CreateCoursePage'));

const App: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUser())
      .unwrap()
      .catch(err => errorNotification(err));
  }, [dispatch]);

  return (
    <SharedLayout>
      <Suspense fallback={<p>Loading...</p>}>
        <Routes>
          <Route
            path="/registration"
            element={<RestrictedRoute element={<RegistrationPage />} redirectTo="/courses" />}
          />
          <Route
            path="/login"
            element={<RestrictedRoute element={<LoginPage />} redirectTo="/courses" />}
          />
          <Route path="/courses">
            <Route index element={<PrivateRoute element={<CoursesPage />} redirectTo="/login" />} />
            <Route
              path=":id"
              element={<PrivateRoute element={<CourseDetailsPage />} redirectTo="/login" />}
            />
            <Route
              path="add"
              element={<PrivateRoute element={<CreateCoursePage />} redirectTo="/login" />}
            />
            <Route
              path="update/:id"
              element={<PrivateRoute element={<CreateCoursePage />} redirectTo="/login" />}
            />
          </Route>
        </Routes>
      </Suspense>
    </SharedLayout>
  );
};
export default App;
