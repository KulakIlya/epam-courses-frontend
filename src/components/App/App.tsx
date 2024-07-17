import { FC, lazy, Suspense, useEffect } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';

import { useAppDispatch } from '../../redux/hooks';
import { fetchUser } from '../../redux/user/operations';

import errorNotification from '../../helpers/errorNotification';

import Loader from '../../common/Loader';
import PrivateRoute from '../PrivateRoute';
import RestrictedRoute from '../RestrictedRoute';
import SharedLayout from '../SharedLayout';

const RegistrationPage = lazy(() => import('../../pages/RegistrationPage'));
const LoginPage = lazy(() => import('../../pages/LoginPage'));
const CoursesPage = lazy(() => import('../../pages/CoursesPage'));
const CourseDetailsPage = lazy(() => import('../../pages/CourseDetailsPage'));
const CreateCoursePage = lazy(() => import('../../pages/CreateCoursePage'));

const App: FC = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetch = async () => {
      try {
        await dispatch(fetchUser());
      } catch (error) {
        errorNotification(error as string);
        navigate('/login');
      }
    };
    fetch();
  }, [dispatch, navigate]);

  return (
    <SharedLayout>
      <Suspense fallback={<Loader />}>
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
              path="edit/:id"
              element={<PrivateRoute element={<CreateCoursePage />} redirectTo="/login" />}
            />
          </Route>
          <Route path="*" element={<Navigate to="/courses" />} />
        </Routes>
      </Suspense>
    </SharedLayout>
  );
};
export default App;
