import { FC, lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { useAppSelector } from '../../redux/hooks';

import Loader from '../../common/Loader';
import { selectIsLoading } from '../../redux/user/selectors';
import PrivateRoute from '../PrivateRoute';
import RestrictedRoute from '../RestrictedRoute';
import SharedLayout from '../SharedLayout';

const RegistrationPage = lazy(() => import('../../pages/RegistrationPage'));
const LoginPage = lazy(() => import('../../pages/LoginPage'));
const CoursesPage = lazy(() => import('../../pages/CoursesPage'));
const CourseDetailsPage = lazy(() => import('../../pages/CourseDetailsPage'));
const CreateCoursePage = lazy(() => import('../../pages/CreateCoursePage'));

const App: FC = () => {
  const isLoading = useAppSelector(selectIsLoading);

  return (
    <SharedLayout>
      {isLoading ? (
        <Loader />
      ) : (
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
              <Route
                index
                element={<PrivateRoute element={<CoursesPage />} redirectTo="/login" />}
              />
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
      )}
    </SharedLayout>
  );
};
export default App;
